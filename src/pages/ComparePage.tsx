import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Truck, ShieldCheck, Zap, Trophy, Check } from 'lucide-react';
import type { ComparisonResult, StoreName } from '@/types';
import { generateMockComparison } from '@/data/mockData';
import { formatPrice, calculateDiscount, calculateWorthyScore } from '@/lib/utils';
import { buyButtonLabel, getStoreLogoBg, getStoreColor } from '@/lib/earnKaro';
import { RedirectModal } from '@/components/RedirectModal';
import { StoreBadge } from '@/components/StoreBadge';
import { useAppStore } from '@/store/appStore';

interface ComparePageProps {
  query: string;
  onBack: () => void;
}

interface RankedResult extends ComparisonResult {
  worthyScore: number;
  isBest: boolean;
}

export function ComparePage({ query, onBack }: ComparePageProps) {
  const [results, setResults] = useState<RankedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<{ store: StoreName; url: string } | null>(null);
  const earnKaroId = useAppStore((s) => s.earnKaroId);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const raw = generateMockComparison(query);
      const ranked: RankedResult[] = raw
        .map((r) => ({
          ...r,
          worthyScore: calculateWorthyScore(r.price, r.deliveryDays),
          isBest: false,
        }))
        .sort((a, b) => b.worthyScore - a.worthyScore);
      if (ranked.length > 0) ranked[0].isBest = true;
      setResults(ranked);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />
        <p className="text-sm font-medium text-slate-500">Comparing prices across stores...</p>
      </div>
    );
  }

  const bestPrice = Math.min(...results.map((r) => r.price));
  const savings = Math.max(...results.map((r) => r.originalPrice - r.price));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-xs text-slate-400">Price comparison for</p>
            <h1 className="truncate text-sm font-bold text-slate-900">{query}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* Savings banner */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-lg font-extrabold">Save up to {formatPrice(savings)}</p>
            <p className="text-xs text-emerald-50">Found {results.length} stores with this product</p>
          </div>
        </div>

        {/* Comparison list */}
        <div className="space-y-4">
          {results.map((result, index) => {
            const colors = getStoreColor(result.storeName);
            return (
              <div
                key={result.storeName}
                className={`relative overflow-hidden rounded-2xl border-2 bg-white p-5 shadow-sm transition-all ${
                  result.isBest ? 'border-emerald-400 shadow-lg' : 'border-slate-200'
                }`}
              >
                {result.isBest && (
                  <div className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    <Trophy size={10} className="mr-1 inline" />
                    BEST VALUE
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  {/* Store info */}
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${getStoreLogoBg(result.storeName)} shadow-md`}>
                      <span className="text-sm font-extrabold text-white">
                        {result.storeName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <StoreBadge store={result.storeName} />
                      <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Star size={11} fill="currentColor" className="text-amber-400" />
                          {result.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck size={11} />
                          {result.deliveryDays} day delivery
                        </span>
                        {result.inStock && (
                          <span className="flex items-center gap-0.5 font-medium text-emerald-600">
                            <Check size={11} />
                            In stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-slate-900">{formatPrice(result.price)}</p>
                    <p className="text-xs text-slate-400 line-through">{formatPrice(result.originalPrice)}</p>
                    <p className="text-xs font-bold text-emerald-600">
                      {calculateDiscount(result.price, result.originalPrice)}% OFF
                    </p>
                  </div>
                </div>

                {/* Worthy score bar */}
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">Worthy Score</span>
                    <span className={`font-bold ${result.isBest ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {result.worthyScore}/100
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        result.isBest ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-slate-300'
                      }`}
                      style={{ width: `${result.worthyScore}%` }}
                    />
                  </div>
                </div>

                {result.price === bestPrice && (
                  <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <Zap size={12} fill="currentColor" />
                    Lowest price found
                  </p>
                )}

                {/* Buy button */}
                <button
                  onClick={() => setRedirect({ store: result.storeName, url: result.url })}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl ${getStoreLogoBg(result.storeName)} px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110 active:scale-[0.98]`}
                >
                  {buyButtonLabel(result.storeName)}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          You'll be redirected securely via EarnKaro to complete your purchase on the store's official website.
        </p>
      </div>

      {redirect && (
        <RedirectModal
          store={redirect.store}
          originalUrl={redirect.url}
          earnKaroId={earnKaroId}
          onClose={() => setRedirect(null)}
        />
      )}
    </div>
  );
}
