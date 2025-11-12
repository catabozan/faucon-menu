// Type definitions for menu data

export interface CSVRow {
  category: string;
  subcategory: string;
  name: string;
  quantity: string;
  price: string;
  comment: string;
}

export interface MenuItem {
  name: string;
  quantity: string;
  price: number;
  comment: string;
}

export interface MenuItemGroup {
  name: string;
  items: MenuItem[];
  hasComments: boolean;
}

export interface MenuSubcategory {
  name: string;
  items: MenuItemGroup[];
}

export interface MenuCategory {
  name: string;
  subcategories: MenuSubcategory[];
}

export interface Config {
  csvUrl: string;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
}
