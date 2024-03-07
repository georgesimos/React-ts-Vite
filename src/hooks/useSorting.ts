import React from 'react';
import { FinancialInstrument } from '../types';

type SortOrder = 'asc' | 'desc';

const useSorting = () => {
  const [sortBy, setSortBy] =
    React.useState<keyof FinancialInstrument>('ticker');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc');

  const handleSort = React.useCallback(
    (newSortBy: keyof FinancialInstrument) => {
      setSortBy(newSortBy);
      if (sortBy === newSortBy) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortOrder('asc');
      }
    },
    [sortBy],
  );

  return { sortBy, sortOrder, handleSort };
};

export default useSorting;
