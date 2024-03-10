import { getColorClass } from '../utils/utils';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableCaption,
  TableContainer,
} from './Table';
import React from 'react';
import useSorting from '../hooks/useSorting';
import { FinancialInstrument } from '../types';

interface ResultsProps {
  data: FinancialInstrument[];
}

type TableColumn = {
  key: keyof FinancialInstrument;
  label: string;
};

const TABLE_HEADINGS: TableColumn[] = [
  { key: 'ticker', label: 'TICKER' },
  { key: 'price', label: 'PRICE' },
  { key: 'assetClass', label: 'ASSET CLASS' },
];

const Results: React.FC<ResultsProps> = ({ data }) => {
  const { sortBy, sortOrder, handleSort } = useSorting();

  // We don't actually need to memoize this, but it's a good practice to do so
  // in case the data grows and we need to optimize performance.
  const sortedData = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      if (sortBy === 'assetClass') {
        const classOrder: Record<string, number> = {
          Equities: 0,
          Macro: 1,
          Credit: 2,
        };
        return classOrder[a.assetClass] - classOrder[b.assetClass];
      }
      if (sortBy === 'ticker') {
        return a.ticker.localeCompare(b.ticker);
      }
      return a.price - b.price;
    });

    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }, [data, sortBy, sortOrder]);

  return (
    <TableContainer className="my-5 max-h-screen">
      <Table>
        <TableCaption className="my-4">
          Description
          <p className="mt-1 text-sm font-normal text-gray-400">
            A single page application that represents a table of financial
            instruments.
          </p>
        </TableCaption>
        <TableHead>
          <TableRow>
            {TABLE_HEADINGS.map((heading) => (
              <TableHeader
                key={heading.key}
                onClick={() => handleSort(heading.key)}
              >
                {heading.label}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow
              key={item.ticker}
              className={getColorClass(item.assetClass)}
            >
              <TableCell>{item.ticker}</TableCell>
              <TableCell
                className={item.price >= 0 ? 'text-blue-500' : 'text-red-500'}
              >
                {item.price}
              </TableCell>
              <TableCell>{item.assetClass}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Results;
