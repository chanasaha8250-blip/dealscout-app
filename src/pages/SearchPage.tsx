import { useState } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts, demoSearchQueries } from '@/data/mockData';

interface SearchPageProps {
  onSearch: (query: string) => void;
}

export function SearchPage({ onSearch }: SearchPageProps) {
  const [value, setValue] = useState('');

  const handleSearch = (q: string) => {
    onSearch(q);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Search Deals</h1>

        {/* Search input */}
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm border border-slate-200">
          <Search size={20} className="ml-2 text-slate-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(value)}
            placeholder="Search for products or paste a product link..."
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={() => handleSearch(value)}
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-95"
          >
            Compare
          </button>
        </div>

        {/* Demo pills */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-slate-600">Quick demo searches:</p>
          <div className="flex flex-wrap gap-2">
            {demoSearchQueries.map((q) => (
              <button
                key={q}
                onClick={() => handleSearch(q)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <TrendingUp size={14} className="text-emerald-500" />
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* All products */}
        <div className="mb-4 flex items-center gap-2">
          <TrendingDown size={20} className="text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900">All Deals</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
