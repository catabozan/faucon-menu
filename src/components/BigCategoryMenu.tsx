import { forwardRef } from 'preact/compat';
import type { MenuCategory } from '@/utils/types';

interface BigCategoryMenuProps {
  menuData: MenuCategory[];
  onCategoryClick: (index: number) => void;
  headerRef: { current: HTMLElement | null };
}

export const BigCategoryMenu = forwardRef<HTMLDivElement, BigCategoryMenuProps>(
  ({ menuData, onCategoryClick, headerRef }, ref) => {
    const scrollToCategory = (index: number) => {
      const categoryEl = document.getElementById(`category-${index}`);
      if (categoryEl && headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const targetPosition = categoryEl.offsetTop - headerHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      onCategoryClick(index);
    };

    return (
      <div ref={ref} class="bg-gray-950 border-b border-gray-800">
        <div class="px-4 py-6">
          <div class="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {menuData.map((category, index) => (
              <button
                key={index}
                onClick={() => scrollToCategory(index)}
                class="px-6 py-3 rounded-lg text-base font-medium transition-colors bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
