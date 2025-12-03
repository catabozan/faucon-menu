import { h } from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';
import type { JSX } from 'preact';
import { SettingsButton } from './SettingsButton';
import { SettingsModal } from './SettingsModal';
import { MenuContent } from '../MenuContent';
import {
  loadPrintSettings,
  savePrintSettings,
  getDefaultPrintSettings,
  getPresetSettings,
  initializeCategorySettings,
} from '@/utils/printSettings';
import type { PrintSettings, PresetName } from '@/utils/printSettingsTypes';
import type { MenuCategory } from '@/utils/types';

interface PrintAppProps {
  menuData: MenuCategory[];
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showDots: boolean;
}

export function PrintApp({
  menuData,
  currencySymbol,
  currencyPosition,
  showDots,
}: PrintAppProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPreset, setCurrentPreset] = useState<PresetName | null>('clair');
  const [settings, setSettings] = useState<PrintSettings>(() => {
    // Try to load from localStorage
    const saved = loadPrintSettings();
    if (saved) {
      return saved;
    }

    // Initialize with defaults
    const defaults = getDefaultPrintSettings();
    const categorySettings = initializeCategorySettings(
      menuData.map(cat => cat.name)
    );

    return {
      ...defaults,
      categories: categorySettings,
    };
  });

  // Apply CSS variables when settings change
  useEffect(() => {
    const styleId = 'print-custom-settings';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      :root {
        --print-title-color: ${settings.colors.pageTitle};
        --print-category-color: ${settings.colors.categoryTitle};
        --print-subcategory-color: ${settings.colors.subcategoryTitle};
        --print-price-color: ${settings.colors.prices};
        --print-dotted-line-color: ${settings.colors.dottedLines};
        --print-quantity-color: ${settings.colors.quantityText};
        --print-item-name-color: ${settings.colors.itemName};
        --print-background-color: ${settings.colors.backgroundColor};
        --print-base-font-size: ${settings.typography.baseFontSize}pt;
        --print-title-size: ${settings.typography.titleSize}rem;
        --print-title-weight: ${settings.typography.titleWeight};
        --print-category-size: ${settings.typography.categorySize}rem;
        --print-category-weight: ${settings.typography.categoryWeight};
        --print-subcategory-size: ${settings.typography.subcategorySize}rem;
        --print-item-size: ${settings.typography.itemSize}rem;
        --print-item-weight: ${settings.typography.itemWeight};
        --print-price-size: ${settings.typography.priceSize}rem;
        --print-price-weight: ${settings.typography.priceWeight};
        --print-line-height: ${settings.typography.lineHeight};
        --print-title-margin-bottom: ${settings.spacing.titleMarginBottom}rem;
        --print-category-spacing: ${settings.spacing.categorySpacing}rem;
        --print-subcategory-spacing: ${settings.spacing.subcategorySpacing}rem;
        --print-item-spacing: ${settings.spacing.itemSpacing}rem;
        --print-table-row-spacing: ${settings.spacing.tableRowSpacing}rem;
        --print-columns: ${settings.layout.columns};
        --print-bg-logo-opacity: ${settings.layout.logoOpacity};
      }
    `;
  }, [settings]);

  // Filter and reorder menu data based on category settings
  const filteredMenuData = useMemo(() => {
    const { order, visibility } = settings.categories;

    // Filter visible categories
    const visibleCategories = menuData.filter(
      cat => visibility[cat.name] !== false
    );

    // Sort by custom order
    return visibleCategories.sort((a, b) => {
      const indexA = order.indexOf(a.name);
      const indexB = order.indexOf(b.name);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [menuData, settings.categories]);

  const handleSettingsChange = (newSettings: PrintSettings) => {
    setSettings(newSettings);
    savePrintSettings(newSettings);
    // Reset current preset indicator when user customizes
    setCurrentPreset(null);
  };

  const handlePresetSelect = (presetName: PresetName) => {
    const preset = getPresetSettings(presetName);
    const newSettings = {
      ...preset,
      categories: settings.categories, // Preserve category settings
    };
    setSettings(newSettings);
    savePrintSettings(newSettings);
    setCurrentPreset(presetName);
  };

  return (
    <div class="print-app">
      {/* Settings Button */}
      <SettingsButton onClick={() => setIsModalOpen(true)} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onPresetSelect={handlePresetSelect}
        currentPreset={currentPreset}
      />

      {/* Menu Content */}
      <div class="print-container">
        {/* Title Header */}
        <div class="print-header">
          <h1 class="print-title">{import.meta.env.HEADER_TITLE}</h1>
        </div>

        <div class="print-content">
          <MenuContent
            menuData={filteredMenuData}
            currencySymbol={currencySymbol}
            currencyPosition={currencyPosition}
            showDots={showDots}
          />
        </div>
      </div>

      {/* Print Button */}
      <button
        class="print-button fixed bottom-8 right-8 z-40 px-6 py-3 bg-gray-800 text-gray-100 rounded-full font-semibold shadow-lg hover:bg-gray-700 transition-all"
        onClick={() => window.print()}
        type="button"
      >
        <svg
          class="inline-block w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        Imprimer
      </button>
    </div>
  );
}
