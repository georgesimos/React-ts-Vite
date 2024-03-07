import { renderHook, waitFor } from '../utils/test-utils';
import { describe, it, expect, vi, afterAll } from 'vitest';
import useData from './useData';

const expectedData = [
  {
    ticker: 'ALPHA',
    price: 3150.67,
    assetClass: 'Credit',
  },
  {
    ticker: 'BETA',
    price: 3791.37,
    assetClass: 'Equities',
  },
];

describe('useData', () => {
  // Spy on the global fetch function
  const fetchSpy = vi.spyOn(globalThis, 'fetch');
  // Run after all the tests
  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it('fetches data successfully', async () => {
    // Mock the return value of the global fetch function with a successful response
    const mockResolveValue: Promise<Response> = Promise.resolve({
      ok: true,
      json: async () => expectedData,
    } as Response);

    fetchSpy.mockReturnValue(mockResolveValue);

    const { result } = renderHook(() => useData());

    await waitFor(() => expect(result.current.data).toEqual(expectedData));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    // Mock the return value of the global fetch function with an error
    const mockRejectValue: Promise<Response> = Promise.resolve({
      ok: false,
      status: 500,
      statusText: 'Failed to fetch data',
      json: async () => 'Failed to fetch data',
    } as Response);

    fetchSpy.mockReturnValue(mockRejectValue);

    const { result } = renderHook(() => useData());

    await waitFor(() =>
      expect(result.current.error?.message).toBe('Failed to fetch data'),
    );

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
  });
});
