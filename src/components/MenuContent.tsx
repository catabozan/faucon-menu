import type { MenuCategory as MenuCategoryType } from '@/utils/types';
import { MenuCategory } from './MenuCategory';

interface MenuContentProps {
  menuData: MenuCategoryType[];
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showDots: boolean;
  categoryBreaks?: Set<string>;
}

export function MenuContent({ menuData, currencySymbol, currencyPosition, showDots, categoryBreaks }: MenuContentProps) {
  return (
    <main id="menu-content" class="px-4 py-6 max-w-4xl mx-auto pt-16">
      {menuData.map((category, index) => (
        <MenuCategory
          key={index}
          category={category}
          categoryIndex={index}
          currencySymbol={currencySymbol}
          currencyPosition={currencyPosition}
          showDots={showDots}
          hasColumnBreak={categoryBreaks?.has(category.name) ?? false}
        />
      ))}
    </main>
  );
}
