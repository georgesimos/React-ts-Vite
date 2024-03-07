import { useState, useEffect } from 'react';
import { FinancialInstrument } from '../types';

export const useData = (): {
  data: FinancialInstrument[] | null;
  loading: boolean;
  error: Error | null;
} => {
  const [data, setData] = useState<FinancialInstrument[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data/sampleData.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData: FinancialInstrument[] = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useData;
