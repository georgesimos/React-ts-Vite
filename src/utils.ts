import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AssetClass } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getColorClass = (assetClass: AssetClass): string => {
  switch (assetClass) {
    case 'Macro':
      return 'bg-white';
    case 'Equities':
      return 'bg-blue-100';
    case 'Credit':
      return 'bg-green-100';
    default:
      return 'bg-white';
  }
};
