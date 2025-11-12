import type { MenuCategory as MenuCategoryType } from '@/utils/types';
import { MenuCategory } from './MenuCategory';

interface MenuContentProps {
  menuData: MenuCategoryType[];
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showDots: boolean;
}

export function MenuContent({ menuData, currencySymbol, currencyPosition, showDots }: MenuContentProps) {
  return (
    <main id="menu-content" class="px-4 py-6 max-w-4xl mx-auto">
      {menuData.map((category, index) => (
        <MenuCategory
          key={index}
          category={category}
          categoryIndex={index}
          currencySymbol={currencySymbol}
          currencyPosition={currencyPosition}
          showDots={showDots}
        />
      ))}
    </main>
  );
}
