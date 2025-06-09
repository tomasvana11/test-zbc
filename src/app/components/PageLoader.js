'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Délka zobrazení loaderu, můžeš upravit

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: '100%',
        backgroundColor: '#9D6219',
        zIndex: 9999,
        animation: 'pulse 1s ease-in-out infinite',
      }}
    />
  );
}
