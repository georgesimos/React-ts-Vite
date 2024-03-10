import { describe, it, expect } from 'vitest';
import { getColorClass } from './utils';
import { AssetClass } from '../types';

describe('getColorClass', () => {
  it('returns "bg-white" for asset class "Macro"', () => {
    const assetClass = 'Macro';
    const result = getColorClass(assetClass);
    expect(result).toBe('bg-white');
  });

  it('returns "bg-blue-100" for asset class "Equities"', () => {
    const assetClass = 'Equities';
    const result = getColorClass(assetClass);
    expect(result).toBe('bg-blue-100');
  });

  it('returns "bg-green-100" for asset class "Credit"', () => {
    const assetClass = 'Credit';
    const result = getColorClass(assetClass);
    expect(result).toBe('bg-green-100');
  });

  it('returns an empty string for unknown asset class', () => {
    const assetClass = 'Unknown' as AssetClass;
    const result = getColorClass(assetClass);
    expect(result).toBe('bg-white');
  });
});
