import '@/styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  // Sayfa yüklendiğinde, localStorage'daki tema tercihini kontrol et
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return <Component {...pageProps} />;
}
