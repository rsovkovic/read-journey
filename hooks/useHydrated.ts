import { useState, useEffect } from 'react';

export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const handler = requestAnimationFrame(() => {
      setHydrated(true);
    });
    return () => cancelAnimationFrame(handler);
  }, []);

  return hydrated;
};
