import { useEffect, useState, useRef } from 'preact/hooks';
import type { MenuCategory } from '@/utils/types';

interface NavigationProps {
  menuData: MenuCategory[];
}

export function Navigation({ menuData }: NavigationProps) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll to category
  const scrollToCategory = (index: number) => {
    const categoryEl = document.getElementById(`category-${index}`);
    if (categoryEl && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const targetPosition = categoryEl.offsetTop - headerHeight - 16;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  // Scroll to subcategory
  const scrollToSubcategory = (categoryIndex: number, subcategoryIndex: number) => {
    const subcategoryEl = document.getElementById(`subcategory-${categoryIndex}-${subcategoryIndex}`);
    if (subcategoryEl && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const targetPosition = subcategoryEl.offsetTop - headerHeight - 16;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  // Setup scroll spy
  useEffect(() => {
    let ticking = false;

    const updateActiveCategory = () => {
      if (!headerRef.current) return;

      const headerHeight = headerRef.current.offsetHeight;
      const scrollPosition = window.scrollY + headerHeight + 32;

      let newCategoryIndex = 0;

      for (let i = menuData.length - 1; i >= 0; i--) {
        const categoryEl = document.getElementById(`category-${i}`);
        if (categoryEl && categoryEl.offsetTop <= scrollPosition) {
          newCategoryIndex = i;
          break;
        }
      }

      if (newCategoryIndex !== currentCategoryIndex) {
        setCurrentCategoryIndex(newCategoryIndex);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveCategory();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuData, currentCategoryIndex]);

  const currentCategory = menuData[currentCategoryIndex];
  const hasSubcategories = currentCategory?.subcategories.some(sub => sub.name);

  return (
    <header
      ref={headerRef}
      id="header"
      class="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800"
    >
      <div class="px-4 py-4">
        <h1 class="text-2xl font-bold text-center mb-4">Carte de Boissons</h1>

        {/* Category Navigation Pills */}
        <nav class="overflow-x-auto pb-2 scrollbar-hide">
          <div class="flex gap-2 min-w-max px-1">
            {menuData.map((category, index) => (
              <button
                key={index}
                onClick={() => scrollToCategory(index)}
                class={
                  index === currentCategoryIndex
                    ? 'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-950'
                    : 'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Subcategory Navigation Pills */}
        {hasSubcategories && (
          <nav class="overflow-x-auto pt-2 border-t border-gray-800 mt-2 scrollbar-hide">
            <div class="flex gap-2 min-w-max px-1">
              {currentCategory.subcategories.map((subcategory, subIndex) =>
                subcategory.name ? (
                  <button
                    key={subIndex}
                    onClick={() => scrollToSubcategory(currentCategoryIndex, subIndex)}
                    class="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors bg-gray-800 text-gray-300 hover:bg-gray-700"
                  >
                    {subcategory.name}
                  </button>
                ) : null
              )}
            </div>
          </nav>
        )}
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
}
