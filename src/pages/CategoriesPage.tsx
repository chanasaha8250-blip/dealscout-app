import {
  Smartphone, Footprints, Shirt, Home as HomeIcon,
  Sparkles, Gamepad2, Watch, Headphones, ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { mockCategories, mockProducts } from '@/data/mockData';
import { ProductCard } from '@/components/ProductCard';
import { useState } from 'react';

const iconMap: Record<string, LucideIcon> = {
  Smartphone, Footprints, Shirt, Home: HomeIcon,
  Sparkles, Gamepad2, Watch, Headphones,
};

export function CategoriesPage() {
  const [selected, setSelected] = useState<string | null>(null);

  if (selected) {
    const filtered = mockProducts.filter((p) => p.category === selected);
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelected(null)}
            className="mb-5 flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            ← Back to categories
          </button>
          <h1 className="mb-6 text-2xl font-bold text-slate-900">{selected}</h1>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-slate-400">No deals found in this category yet.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Browse Categories</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {mockCategories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Smartphone;
            return (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.name)}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                  <Icon size={22} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-400">{cat.count} deals</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
