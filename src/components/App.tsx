import { useState, useEffect } from 'preact/hooks';
import type { MenuCategory } from '@/utils/types';
import { parseCSV } from '@/utils/csvParser';
import { transformMenuData } from '@/utils/menuTransformer';
import { Navigation } from './Navigation';
import { MenuContent } from './MenuContent';

interface AppProps {
  csvUrl: string;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showDots: boolean;
}

export function App({ csvUrl, currencySymbol, currencyPosition, showDots }: AppProps) {
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMenu = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error('Failed to fetch CSV');

      const csvText = await response.text();
      const rows = parseCSV(csvText);
      const data = transformMenuData(rows);

      setMenuData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading menu:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, [csvUrl]);

  if (loading) {
    return (
      <div class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-100 mb-4"></div>
          <p class="text-gray-400">Chargement du menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="text-center max-w-md">
          <p class="text-red-400 text-lg mb-4">Erreur de chargement du menu</p>
          <button
            onClick={loadMenu}
            class="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation menuData={menuData} />
      <MenuContent
        menuData={menuData}
        currencySymbol={currencySymbol}
        currencyPosition={currencyPosition}
        showDots={showDots}
      />
    </>
  );
}
