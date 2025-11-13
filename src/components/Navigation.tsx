import { useEffect, useState } from 'preact/hooks';
import type { MenuCategory } from '@/utils/types';
import type { RefObject } from 'preact';

interface NavigationProps {
  menuData: MenuCategory[];
  currentCategoryIndex: number;
  setCurrentCategoryIndex: (index: number) => void;
  headerRef: RefObject<HTMLElement>;
  bigMenuRef: RefObject<HTMLDivElement> | null;
  headerTitle: string;
}

export function Navigation({
  menuData,
  currentCategoryIndex,
  setCurrentCategoryIndex,
  headerRef,
  bigMenuRef,
  headerTitle
}: NavigationProps) {
  const [isBigMenuVisible, setIsBigMenuVisible] = useState(true);

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

  // Setup Intersection Observer for big menu visibility
  useEffect(() => {
    if (!bigMenuRef || !bigMenuRef.current) {
      setIsBigMenuVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsBigMenuVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(bigMenuRef.current);

    return () => {
      observer.disconnect();
    };
  }, [bigMenuRef]);

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
  }, [menuData, currentCategoryIndex, setCurrentCategoryIndex, headerRef]);

  const currentCategory = menuData[currentCategoryIndex];
  const hasSubcategories = currentCategory?.subcategories.some(sub => sub.name);

  const showCategoryPills = !bigMenuRef || !isBigMenuVisible;

  return (
    <header
      ref={headerRef}
      id="header"
      class="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800"
    >
      <div class="px-4 py-4">
        <h1 class="text-2xl font-bold text-center mb-4">{headerTitle}</h1>

        {/* Category Navigation Pills - Only show when big menu is not visible */}
        {showCategoryPills && (
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
        )}

        {/* Subcategory Navigation Pills */}
        {hasSubcategories && (
          <nav class={`overflow-x-auto scrollbar-hide ${showCategoryPills ? 'pt-2 border-t border-gray-800 mt-2' : ''}`}>
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
