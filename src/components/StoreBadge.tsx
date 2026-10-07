import type { StoreName } from '@/types';
import { getStoreLogoBg } from '@/lib/earnKaro';

export function StoreBadge({ store, size = 'sm' }: { store: StoreName; size?: 'sm' | 'xs' }) {
  const sizeClass = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';
  return (
    <span
      className={`${getStoreLogoBg(store)} ${sizeClass} inline-flex items-center rounded-full font-bold tracking-wide text-white shadow-sm`}
    >
      {store}
    </span>
  );
}
