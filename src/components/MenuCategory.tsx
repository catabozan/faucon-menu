import type { MenuCategory as MenuCategoryType } from '@/utils/types';
import { MenuSubcategory } from './MenuSubcategory';

interface MenuCategoryProps {
  category: MenuCategoryType;
  categoryIndex: number;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showDots: boolean;
}

export function MenuCategory({
  category,
  categoryIndex,
  currencySymbol,
  currencyPosition,
  showDots
}: MenuCategoryProps) {
  return (
    <section id={`category-${categoryIndex}`} class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-accent">{category.name}</h2>
      {category.subcategories.map((subcategory, subIndex) => (
        <MenuSubcategory
          key={subIndex}
          subcategory={subcategory}
          categoryIndex={categoryIndex}
          subcategoryIndex={subIndex}
          currencySymbol={currencySymbol}
          currencyPosition={currencyPosition}
          showDots={showDots}
        />
      ))}
    </section>
  );
}
