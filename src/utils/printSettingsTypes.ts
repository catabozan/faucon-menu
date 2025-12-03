/**
 * Type definitions for print customization settings
 */

export interface PrintColors {
  pageTitle: string;
  categoryTitle: string;
  subcategoryTitle: string;
  prices: string;
  dottedLines: string;
  quantityText: string;
  itemName: string;
  backgroundColor: string;
}

export interface PrintTypography {
  baseFontSize: number;      // in pt
  titleSize: number;          // in rem
  titleWeight: number;        // 100-900
  categorySize: number;       // in rem
  categoryWeight: number;     // 100-900
  subcategorySize: number;    // in rem
  itemSize: number;           // in rem
  itemWeight: number;         // 100-900
  priceSize: number;          // in rem
  priceWeight: number;        // 100-900
  lineHeight: number;         // unitless
}

export interface PrintSpacing {
  titleMarginBottom: number;  // in rem
  categorySpacing: number;    // in rem
  subcategorySpacing: number; // in rem
  itemSpacing: number;        // in rem
  tableRowSpacing: number;    // in rem (for grouped items with quantities)
}

export interface PrintLayout {
  columns: number;            // 1-8
  logoOpacity: number;        // 0-1 (0 = hidden, 1 = fully visible)
}

export interface CategorySettings {
  order: string[];                        // Category names in custom order
  visibility: { [key: string]: boolean }; // Show/hide per category
}

export interface PrintSettings {
  colors: PrintColors;
  typography: PrintTypography;
  spacing: PrintSpacing;
  layout: PrintLayout;
  categories: CategorySettings;
}

export type PresetName = 'classique' | 'clair';

// Deep partial type for nested objects
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface PresetTheme {
  name: PresetName;
  label: string;
  settings: DeepPartial<Omit<PrintSettings, 'categories'>>; // Presets only override specific fields
}
