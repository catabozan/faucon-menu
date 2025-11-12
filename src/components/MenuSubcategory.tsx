import type { MenuSubcategory as MenuSubcategoryType } from '@/utils/types';
import { MenuItemGroup } from './MenuItemGroup';

interface MenuSubcategoryProps {
  subcategory: MenuSubcategoryType;
  categoryIndex: number;
  subcategoryIndex: number;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showDots: boolean;
}

export function MenuSubcategory({
  subcategory,
  categoryIndex,
  subcategoryIndex,
  currencySymbol,
  currencyPosition,
  showDots
}: MenuSubcategoryProps) {
  return (
    <div id={`subcategory-${categoryIndex}-${subcategoryIndex}`} class="mb-8">
      {subcategory.name && (
        <h3 class="text-xl font-semibold mb-4 text-gray-300">{subcategory.name}</h3>
      )}
      {subcategory.items.map((itemGroup, index) => (
        <MenuItemGroup
          key={index}
          itemGroup={itemGroup}
          currencySymbol={currencySymbol}
          currencyPosition={currencyPosition}
          showDots={showDots}
        />
      ))}
    </div>
  );
}
