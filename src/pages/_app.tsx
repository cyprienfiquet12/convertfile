import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Forcer le mode sombre par défaut
    document.documentElement.classList.add('dark');
  }, []);

  return <Component {...pageProps} />;
} 