/**
 * Utility functions for managing print customization settings
 */

import type { PrintSettings, PresetName, PresetTheme } from './printSettingsTypes';

const STORAGE_KEY = 'faucon-print-settings';
const SETTINGS_VERSION = 1;

/**
 * Returns default print settings matching the current CSS defaults
 */
export function getDefaultPrintSettings(): Omit<PrintSettings, 'categories'> {
  return {
    colors: {
      pageTitle: '#d9c551',
      categoryTitle: '#d9c551',
      prices: '#d9c551',
      dottedLines: '#374151',
      quantityText: '#9ca3af',
      itemName: '#e5e7eb',
      backgroundColor: '#030712',
    },
    typography: {
      baseFontSize: 9,
      titleSize: 1.8,
      titleWeight: 700,
      categorySize: 1.1,
      categoryWeight: 700,
      subcategorySize: 1.0,
      itemSize: 0.75,
      itemWeight: 500,
      priceSize: 0.75,
      priceWeight: 700,
      lineHeight: 1.0,
    },
    spacing: {
      titleMarginBottom: 1.5,
      categorySpacing: 0.8,
      subcategorySpacing: 0.5,
      itemSpacing: 0.3,
      tableRowSpacing: 0.15,
    },
    layout: {
      columns: 5,
      logoOpacity: 0.08,
    },
  };
}

/**
 * Returns preset theme configurations
 */
export function getPresetSettings(presetName: PresetName): Omit<PrintSettings, 'categories'> {
  const presets: Record<PresetName, Omit<PrintSettings, 'categories'>> = {
    classique: {
      colors: {
        pageTitle: '#d9c551',
        categoryTitle: '#d9c551',
        prices: '#d9c551',
        dottedLines: '#374151',
        quantityText: '#9ca3af',
        itemName: '#e5e7eb',
        backgroundColor: '#030712',
      },
      typography: {
        baseFontSize: 9,
        titleSize: 1.8,
        titleWeight: 700,
        categorySize: 1.1,
        categoryWeight: 700,
        subcategorySize: 1.0,
        itemSize: 0.75,
        itemWeight: 500,
        priceSize: 0.75,
        priceWeight: 700,
        lineHeight: 1.0,
      },
      spacing: {
        titleMarginBottom: 1.5,
        categorySpacing: 0.8,
        subcategorySpacing: 0.5,
        itemSpacing: 0.3,
        tableRowSpacing: 0.15,
      },
      layout: {
        columns: 5,
        logoOpacity: 0.08,
      },
    },
    clair: {
      colors: {
        pageTitle: '#1e40af',      // Blue-700
        categoryTitle: '#1e40af',  // Blue-700
        prices: '#059669',         // Green-600
        dottedLines: '#d1d5db',    // Gray-300
        quantityText: '#6b7280',   // Gray-500
        itemName: '#111827',       // Gray-900 (dark text for light background)
        backgroundColor: '#ffffff', // White background for light theme
      },
      typography: {
        baseFontSize: 9,
        titleSize: 1.8,
        titleWeight: 700,
        categorySize: 1.1,
        categoryWeight: 700,
        subcategorySize: 1.0,
        itemSize: 0.75,
        itemWeight: 500,
        priceSize: 0.75,
        priceWeight: 700,
        lineHeight: 1.0,
      },
      spacing: {
        titleMarginBottom: 1.5,
        categorySpacing: 0.8,
        subcategorySpacing: 0.5,
        itemSpacing: 0.3,
        tableRowSpacing: 0.15,
      },
      layout: {
        columns: 5,
        logoOpacity: 0.15, // Higher opacity for light theme
      },
    },
  };

  return presets[presetName];
}

/**
 * Get all available presets with their labels
 */
export function getAvailablePresets(): PresetTheme[] {
  return [
    {
      name: 'classique',
      label: 'Classique',
      settings: getPresetSettings('classique'),
    },
    {
      name: 'clair',
      label: 'Clair',
      settings: getPresetSettings('clair'),
    },
  ];
}

/**
 * Initialize category settings from menu data
 */
export function initializeCategorySettings(categoryNames: string[]): {
  order: string[];
  visibility: { [key: string]: boolean };
} {
  return {
    order: [...categoryNames],
    visibility: Object.fromEntries(categoryNames.map(name => [name, true])),
  };
}

/**
 * Load settings from localStorage
 */
export function loadPrintSettings(): PrintSettings | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    // Validate version
    if (parsed.version !== SETTINGS_VERSION) {
      console.warn('Settings version mismatch, ignoring stored settings');
      return null;
    }

    return validatePrintSettings(parsed.settings);
  } catch (e) {
    console.warn('Failed to load settings from localStorage:', e);
    return null;
  }
}

/**
 * Save settings to localStorage
 */
export function savePrintSettings(settings: PrintSettings): void {
  try {
    const toStore = {
      version: SETTINGS_VERSION,
      settings,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.warn('Failed to save settings to localStorage:', e);
    alert('Impossible de sauvegarder les paramètres. Le stockage est peut-être plein.');
  }
}

/**
 * Validate and merge settings with defaults
 */
export function validatePrintSettings(data: any): PrintSettings {
  const defaults = getDefaultPrintSettings();

  // Create a validated settings object
  const validated: any = {
    colors: { ...defaults.colors },
    typography: { ...defaults.typography },
    spacing: { ...defaults.spacing },
    layout: { ...defaults.layout },
    categories: {
      order: [],
      visibility: {},
    },
  };

  // Merge colors
  if (data.colors && typeof data.colors === 'object') {
    Object.assign(validated.colors, data.colors);
  }

  // Merge and validate typography
  if (data.typography && typeof data.typography === 'object') {
    if (typeof data.typography.baseFontSize === 'number') {
      validated.typography.baseFontSize = Math.max(6, Math.min(14, data.typography.baseFontSize));
    }
    if (typeof data.typography.titleSize === 'number') {
      validated.typography.titleSize = Math.max(0.8, Math.min(3.0, data.typography.titleSize));
    }
    if (typeof data.typography.titleWeight === 'number') {
      validated.typography.titleWeight = Math.max(100, Math.min(900, Math.round(data.typography.titleWeight / 100) * 100));
    }
    if (typeof data.typography.categorySize === 'number') {
      validated.typography.categorySize = Math.max(0.8, Math.min(2.0, data.typography.categorySize));
    }
    if (typeof data.typography.categoryWeight === 'number') {
      validated.typography.categoryWeight = Math.max(100, Math.min(900, Math.round(data.typography.categoryWeight / 100) * 100));
    }
    if (typeof data.typography.subcategorySize === 'number') {
      validated.typography.subcategorySize = Math.max(0.8, Math.min(1.5, data.typography.subcategorySize));
    }
    if (typeof data.typography.itemSize === 'number') {
      validated.typography.itemSize = Math.max(0.5, Math.min(1.2, data.typography.itemSize));
    }
    if (typeof data.typography.itemWeight === 'number') {
      validated.typography.itemWeight = Math.max(100, Math.min(900, Math.round(data.typography.itemWeight / 100) * 100));
    }
    if (typeof data.typography.priceSize === 'number') {
      validated.typography.priceSize = Math.max(0.5, Math.min(1.2, data.typography.priceSize));
    }
    if (typeof data.typography.priceWeight === 'number') {
      validated.typography.priceWeight = Math.max(100, Math.min(900, Math.round(data.typography.priceWeight / 100) * 100));
    }
    if (typeof data.typography.lineHeight === 'number') {
      validated.typography.lineHeight = Math.max(0.8, Math.min(2.0, data.typography.lineHeight));
    }
  }

  // Merge and validate spacing
  if (data.spacing && typeof data.spacing === 'object') {
    if (typeof data.spacing.titleMarginBottom === 'number') {
      validated.spacing.titleMarginBottom = Math.max(0, Math.min(3, data.spacing.titleMarginBottom));
    }
    if (typeof data.spacing.categorySpacing === 'number') {
      validated.spacing.categorySpacing = Math.max(0, Math.min(3, data.spacing.categorySpacing));
    }
    if (typeof data.spacing.subcategorySpacing === 'number') {
      validated.spacing.subcategorySpacing = Math.max(0, Math.min(2, data.spacing.subcategorySpacing));
    }
    if (typeof data.spacing.itemSpacing === 'number') {
      validated.spacing.itemSpacing = Math.max(0, Math.min(2, data.spacing.itemSpacing));
    }
    if (typeof data.spacing.tableRowSpacing === 'number') {
      validated.spacing.tableRowSpacing = Math.max(0, Math.min(1, data.spacing.tableRowSpacing));
    }
  }

  // Merge and validate layout
  if (data.layout && typeof data.layout === 'object') {
    if (typeof data.layout.columns === 'number') {
      validated.layout.columns = Math.max(1, Math.min(8, Math.round(data.layout.columns)));
    }
    if (typeof data.layout.logoOpacity === 'number') {
      validated.layout.logoOpacity = Math.max(0, Math.min(1, data.layout.logoOpacity));
    }
  }

  // Merge categories
  if (data.categories && typeof data.categories === 'object') {
    if (Array.isArray(data.categories.order)) {
      validated.categories.order = data.categories.order;
    }
    if (typeof data.categories.visibility === 'object') {
      validated.categories.visibility = data.categories.visibility;
    }
  }

  return validated as PrintSettings;
}

/**
 * Merge partial settings with existing settings
 */
export function mergePrintSettings(
  current: PrintSettings,
  partial: Partial<PrintSettings>
): PrintSettings {
  return {
    colors: { ...current.colors, ...(partial.colors || {}) },
    typography: { ...current.typography, ...(partial.typography || {}) },
    spacing: { ...current.spacing, ...(partial.spacing || {}) },
    layout: { ...current.layout, ...(partial.layout || {}) },
    categories: { ...current.categories, ...(partial.categories || {}) },
  };
}
