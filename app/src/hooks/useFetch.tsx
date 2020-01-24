import { useState, useEffect } from 'react';

const API_ROOT = 'http://localhost:8000/';

const useFetch = (endpoint: string, options: Object = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${API_ROOT}${endpoint}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
      } catch(error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return [data, error, loading];
}

export default useFetch;
