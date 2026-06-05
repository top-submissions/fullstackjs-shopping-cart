import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { API_BASE_URL } from '../../../config/config';
import useProducts from './useProducts';

describe('useProducts', () => {
  it('returns loading state initially', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );

    const { result } = renderHook(() => useProducts());

    expect(result.current).toEqual({
      products: [],
      loading: true,
      error: '',
    });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/products`);
  });

  it('returns products array on successful fetch', async () => {
    const products = [
      {
        id: 1,
        title: 'Test Product',
        price: 24.99,
        image: 'https://example.com/product.jpg',
        category: 'test',
      },
    ];

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(products),
        })
      )
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(products);
    expect(result.current.error).toBe('');
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/products`);
  });

  it('returns error message when fetch rejects', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network request failed')))
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Network request failed');
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/products`);
  });
});
