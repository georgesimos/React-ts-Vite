import { render, screen, waitFor } from '../utils/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import useData from '../hooks/useData';
import Application from './Application';
import { FinancialInstrument } from '../types';

vi.mock('../hooks/useData');

describe('Application', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading state correctly', () => {
    vi.mocked(useData).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<Application />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders error state correctly', async () => {
    const errorMessage = 'Failed to fetch data';

    vi.mocked(useData).mockReturnValue({
      data: null,
      loading: false,
      error: new Error(errorMessage),
    });

    render(<Application />);

    const errorElement = await screen.findByText(`Error: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders not data available', async () => {
    vi.mocked(useData).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<Application />);

    const errorElement = await screen.findByText('No data available');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders Results component with data correctly', async () => {
    const data: FinancialInstrument[] = [
      { ticker: 'AAPL', price: 145.12, assetClass: 'Equities' },
      { ticker: 'GOOGL', price: 2730.68, assetClass: 'Equities' },
    ];
    vi.mocked(useData).mockReturnValue({
      data,
      loading: false,
      error: null,
    });

    render(<Application />);

    await waitFor(() => expect(screen.getByText('AAPL')).toBeInTheDocument());
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
  });
});
