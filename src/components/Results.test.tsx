import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';
import Results from './Results';
import { FinancialInstrument } from '../types';

const mockData: FinancialInstrument[] = [
  { ticker: 'AAPL', price: 150, assetClass: 'Equities' },
  { ticker: 'GOOGL', price: 2500, assetClass: 'Equities' },
  { ticker: 'TSLA', price: 700, assetClass: 'Equities' },
  { ticker: 'EPS', price: 1168.46, assetClass: 'Credit' },
  { ticker: 'ZET', price: -27, assetClass: 'Credit' },
  { ticker: 'ETA', price: 3089.2, assetClass: 'Macro' },
  { ticker: 'THETA', price: 1075.44, assetClass: 'Macro' },
];

describe('Results', () => {
  it('renders table headings correctly', () => {
    render(<Results data={mockData} />);

    const tableHeadings = screen.getAllByRole('columnheader');
    expect(tableHeadings).toHaveLength(3);
    expect(tableHeadings[0]).toHaveTextContent('TICKER');
    expect(tableHeadings[1]).toHaveTextContent('PRICE');
    expect(tableHeadings[2]).toHaveTextContent('ASSET CLASS');
  });

  it('renders table rows correctly', () => {
    render(<Results data={mockData} />);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(8); // Including the table header row

    const sortedByTickers = mockData.sort((a, b) =>
      a.ticker.localeCompare(b.ticker),
    );
    sortedByTickers.forEach((instrument, index) => {
      const row = tableRows[index + 1]; // Skip the header row
      const cells = row.querySelectorAll('td');
      expect(cells[0]).toHaveTextContent(instrument.ticker);
      expect(cells[1]).toHaveTextContent(instrument.price.toString());
      expect(cells[2]).toHaveTextContent(instrument.assetClass);
    });
  });

  it('sorts table data by ticker when clicking ticker header', async () => {
    render(<Results data={mockData} />);

    let tableRows = screen.getAllByRole('row');
    const sortedTickers = mockData.map((item) => item.ticker).sort();
    // Check if the rows are sorted by ticker in ascending order by default
    mockData.forEach((_, index) => {
      const row = tableRows[index + 1]; // Skip the header row
      const cells = row.querySelectorAll('td');
      expect(cells[0]).toHaveTextContent(sortedTickers[index]);
    });

    // Click the ticker header to sort the rows in descending order
    const tickerHeader = screen.getByText('TICKER');
    await userEvent.click(tickerHeader);

    // find the new rows after sorting
    tableRows = screen.getAllByRole('row');
    const reversedTickers = sortedTickers.reverse();
    mockData.forEach((_, index) => {
      const row = tableRows[index + 1]; // Skip the header row
      const cells = row.querySelectorAll('td');
      expect(cells[0]).toHaveTextContent(reversedTickers[index]);
    });
  });

  it('sorts table data by price when clicking price header', async () => {
    render(<Results data={mockData} />);

    const priceHeader = screen.getByText('PRICE');
    await userEvent.click(priceHeader);

    const tableRows = screen.getAllByRole('row');
    const sortedPrices = mockData
      .map((item) => item.price)
      .sort((a, b) => a - b);
    // Check if the rows are sorted by price
    mockData.forEach((_, i) => {
      const row = tableRows[i + 1]; // Skip the header row
      const cells = row.querySelectorAll('td');
      expect(cells[1]).toHaveTextContent(sortedPrices[i].toString());
    });
  });

  it('sorts table data by asset class when clicking asset class header', async () => {
    render(<Results data={mockData} />);

    const assetClassHeader = screen.getByText('ASSET CLASS');
    await userEvent.click(assetClassHeader);

    const tableRows = screen.getAllByRole('row');
    const sortedAssetClasses = mockData
      .map((item) => item.assetClass)
      .sort((a, b) => {
        const classOrder: Record<string, number> = {
          Equities: 0,
          Macro: 1,
          Credit: 2,
        };
        return classOrder[a] - classOrder[b];
      });
    // Check if the rows are sorted by asset class
    mockData.forEach((_, i) => {
      const row = tableRows[i + 1]; // Skip the header row
      const cells = row.querySelectorAll('td');
      expect(cells[2]).toHaveTextContent(sortedAssetClasses[i]);
    });
  });
});
