import { useState } from 'react';
import { Search, Flame, Zap, TrendingUp } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts, demoSearchQueries } from '@/data/mockData';
import { useAppStore } from '@/store/appStore';

interface HomePageProps {
  onSearch: (query: string) => void;
}

export function HomePage({ onSearch }: HomePageProps) {
  const [searchValue, setSearchValue] = useState('');
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-28 pt-14 sm:pb-32 sm:pt-20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
            <Zap size={12} fill="currentColor" />
            Powered by EarnKaro
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Find the <span className="text-emerald-400">best price</span>
            <br className="hidden sm:block" /> across every store
          </h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Compare prices from Amazon, Flipkart, Myntra, Ajio & Croma in seconds.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl">
            <Search size={20} className="ml-2 text-slate-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Paste any Amazon, Flipkart, or Myntra link to find a better price..."
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-95"
            >
              Compare
            </button>
          </div>

          {/* Demo search pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-500">Try:</span>
            {demoSearchQueries.map((q) => (
              <button
                key={q}
                onClick={() => onSearch(q)}
                className="rounded-full border border-slate-600 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending deals — pulled up to overlap hero */}
      <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
              <Flame size={18} className="text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Trending Deals</h2>
          </div>
          <button
            onClick={() => setActiveTab('categories')}
            className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            <TrendingUp size={14} />
            View all
          </button>
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
