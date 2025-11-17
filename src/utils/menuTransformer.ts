import type { CSVRow, MenuItem, MenuItemGroup, MenuSubcategory, MenuCategory } from './types';

/**
 * Transform parsed CSV rows into structured menu data
 * Groups items by category and subcategory
 * Applies grouping logic: if any item with same name has a comment, all become separate items
 */
export function transformMenuData(rows: CSVRow[]): MenuCategory[] {
  const categoryMap = new Map<string, Map<string, MenuItem[]>>();

  // First pass: organize by category -> subcategory -> items
  for (const row of rows) {
    if (!row.category || !row.name || !row.price) continue;

    const categoryName = row.category;
    const subcategoryName = row.subcategory || '';

    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, new Map());
    }

    const subcategoryMap = categoryMap.get(categoryName)!;
    if (!subcategoryMap.has(subcategoryName)) {
      subcategoryMap.set(subcategoryName, []);
    }

    const item: MenuItem = {
      name: row.name,
      quantity: row.quantity,
      price: parseFloat(row.price),
      comment: row.comment,
    };

    subcategoryMap.get(subcategoryName)!.push(item);
  }

  // Second pass: group items and build final structure
  const categories: MenuCategory[] = [];

  for (const [categoryName, subcategoryMap] of categoryMap) {
    const subcategories: MenuSubcategory[] = [];

    for (const [subcategoryName, items] of subcategoryMap) {
      const groupedItems = groupMenuItems(items);

      subcategories.push({
        name: subcategoryName,
        items: groupedItems,
      });
    }

    categories.push({
      name: categoryName,
      subcategories,
    });
  }

  return categories;
}

/**
 * Group menu items by name (trimmed)
 * Items with the same name are always grouped together in a table
 * Comments are displayed within the table rows
 */
function groupMenuItems(items: MenuItem[]): MenuItemGroup[] {
  const nameMap = new Map<string, MenuItem[]>();

  // Group by trimmed name
  for (const item of items) {
    const trimmedName = item.name.trim();
    if (!nameMap.has(trimmedName)) {
      nameMap.set(trimmedName, []);
    }
    nameMap.get(trimmedName)!.push(item);
  }

  const groups: MenuItemGroup[] = [];

  for (const [name, itemList] of nameMap) {
    // Always group items with the same name together
    groups.push({
      name,
      items: itemList,
      hasComments: false,
    });
  }

  return groups;
}
