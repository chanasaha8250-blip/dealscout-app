import type { StoreName } from '@/types';

export function generateEarnKaroLink(originalStoreUrl: string, earnKaroId: string): string {
  return `https://ekaro.in/enlinks?url=${encodeURIComponent(originalStoreUrl)}&id=${earnKaroId}`;
}

export function getStoreColor(store: StoreName): { bg: string; text: string; ring: string; gradient: string } {
  const colors: Record<StoreName, { bg: string; text: string; ring: string; gradient: string }> = {
    Amazon: {
      bg: 'bg-[#FF9900]',
      text: 'text-[#131921]',
      ring: 'ring-[#FF9900]',
      gradient: 'from-[#FF9900] to-[#FFB733]',
    },
    Flipkart: {
      bg: 'bg-[#2874F0]',
      text: 'text-white',
      ring: 'ring-[#2874F0]',
      gradient: 'from-[#2874F0] to-[#5390F5]',
    },
    Myntra: {
      bg: 'bg-[#E8006D]',
      text: 'text-white',
      ring: 'ring-[#E8006D]',
      gradient: 'from-[#E8006D] to-[#FF3D8B]',
    },
    Ajio: {
      bg: 'bg-[#2E2E2E]',
      text: 'text-white',
      ring: 'ring-[#2E2E2E]',
      gradient: 'from-[#2E2E2E] to-[#4A4A4A]',
    },
    Croma: {
      bg: 'bg-[#12644B]',
      text: 'text-white',
      ring: 'ring-[#12644B]',
      gradient: 'from-[#12644B] to-[#1B8A68]',
    },
  };
  return colors[store];
}

export function getStoreLogoBg(store: StoreName): string {
  const map: Record<StoreName, string> = {
    Amazon: 'bg-[#FF9900]',
    Flipkart: 'bg-[#2874F0]',
    Myntra: 'bg-[#E8006D]',
    Ajio: 'bg-[#2E2E2E]',
    Croma: 'bg-[#12644B]',
  };
  return map[store];
}

export function getStoreText(store: StoreName): string {
  const map: Record<StoreName, string> = {
    Amazon: 'text-[#FF9900]',
    Flipkart: 'text-[#2874F0]',
    Myntra: 'text-[#E8006D]',
    Ajio: 'text-gray-700',
    Croma: 'text-[#12644B]',
  };
  return map[store];
}

export function buyButtonLabel(store: StoreName): string {
  const verbs: Record<StoreName, string> = {
    Amazon: 'Buy on Amazon',
    Flipkart: 'Get it on Flipkart',
    Myntra: 'Shop on Myntra',
    Ajio: 'View on Ajio',
    Croma: 'Buy on Croma',
  };
  return verbs[store];
}
