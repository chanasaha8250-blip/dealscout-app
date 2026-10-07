import { useEffect, useState } from 'react';
import type { StoreName } from '@/types';
import { generateEarnKaroLink, getStoreLogoBg } from '@/lib/earnKaro';

interface RedirectModalProps {
  store: StoreName;
  originalUrl: string;
  earnKaroId: string;
  onClose: () => void;
}

export function RedirectModal({ store, originalUrl, earnKaroId, onClose }: RedirectModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const affiliateLink = generateEarnKaroLink(originalUrl, earnKaroId);
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 100));
    }, 60);

    const timer = setTimeout(() => {
      window.location.href = affiliateLink;
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [originalUrl, earnKaroId]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close overlay"
      />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl animate-[fadeIn_0.2s_ease]">
        <div className="flex flex-col items-center gap-5">
          {/* Store logo pulse */}
          <div className="relative">
            <div className={`absolute inset-0 ${getStoreLogoBg(store)} rounded-2xl animate-ping opacity-30`} />
            <div className={`relative ${getStoreLogoBg(store)} flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg`}>
              <span className="text-lg font-extrabold text-white">{store.slice(0, 2).toUpperCase()}</span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900">
              Taking you securely to {store}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              to complete your purchase...
            </p>
            <p className="mt-1 text-sm font-semibold text-emerald-600">
              Applying best deals
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">Redirecting via EarnKaro secure link...</p>
          </div>

          <button
            onClick={onClose}
            className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
