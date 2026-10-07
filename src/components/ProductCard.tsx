import { useState } from 'react';
import { Star, Truck, TrendingDown } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { buyButtonLabel, getStoreLogoBg } from '@/lib/earnKaro';
import { StoreBadge } from './StoreBadge';
import { RedirectModal } from './RedirectModal';
import { useAppStore } from '@/store/appStore';

export function ProductCard({ product }: { product: Product }) {
  const [redirecting, setRedirecting] = useState(false);
  const earnKaroId = useAppStore((s) => s.earnKaroId);

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <StoreBadge store={product.storeName} />
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
            {product.discountPercentage}% OFF
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-center gap-1 text-xs text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-0.5 text-slate-500">
              <Truck size={12} />
              {product.deliveryDays}d delivery
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-slate-800">
            {product.title}
          </h3>

          <div className="mt-auto">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">
                {formatPrice(product.currentPrice)}
              </span>
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>

            <button
              onClick={() => setRedirecting(true)}
              className={`flex w-full items-center justify-center gap-2 rounded-xl ${getStoreLogoBg(product.storeName)} px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110 active:scale-[0.98]`}
            >
              <TrendingDown size={16} />
              {buyButtonLabel(product.storeName)}
            </button>
          </div>
        </div>
      </div>

      {redirecting && (
        <RedirectModal
          store={product.storeName}
          originalUrl={product.originalStoreUrl}
          earnKaroId={earnKaroId}
          onClose={() => setRedirecting(false)}
        />
      )}
    </>
  );
}
