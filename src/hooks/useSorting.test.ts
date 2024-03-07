import { act, renderHook } from '../utils/test-utils';
import { describe, it, expect } from 'vitest';
import useSorting from './useSorting';

describe('useSorting', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSorting());

    expect(result.current.sortBy).toBe('ticker');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('should update sortBy and sortOrder when handleSort is called', () => {
    const { result } = renderHook(() => useSorting());

    act(() => {
      result.current.handleSort('price');
    });

    expect(result.current.sortBy).toBe('price');
    expect(result.current.sortOrder).toBe('asc');

    act(() => {
      result.current.handleSort('price');
    });

    expect(result.current.sortBy).toBe('price');
    expect(result.current.sortOrder).toBe('desc');

    act(() => {
      result.current.handleSort('ticker');
    });

    expect(result.current.sortBy).toBe('ticker');
    expect(result.current.sortOrder).toBe('asc');
  });
});
