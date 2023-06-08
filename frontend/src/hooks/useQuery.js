import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function useQuery() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = (await axios.get(`${import.meta.env.VITE_API_URL}/images`))
          .data;

        setData(res);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response.data.message);
        }

        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, error };
}
