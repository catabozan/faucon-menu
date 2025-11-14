import type { MenuItem as MenuItemType } from '@/utils/types';
import { formatPrice } from '@/utils/priceFormatter';

interface MenuItemProps {
  item: MenuItemType;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showName?: boolean;
  showDots: boolean;
}

export function MenuItem({ item, currencySymbol, currencyPosition, showName = false, showDots }: MenuItemProps) {
  const price = formatPrice(item.price, currencySymbol, currencyPosition);

  if (showName) {
    // Single item display with name
    return (
      <div class="py-2">
        <div>
          <span class="float-right text-lg font-semibold text-accent whitespace-nowrap ml-2">{price}</span>
          <div class="overflow-hidden flex items-baseline gap-2 min-w-0">
            <span class="text-lg font-medium whitespace-nowrap text-gray-200">{item.name}</span>
            {item.quantity && (
              <span class="text-gray-400 whitespace-nowrap flex-shrink-0">{item.quantity}</span>
            )}
            <span class={`flex-grow mx-2 mb-1 min-w-4 ${showDots ? 'border-b border-dotted border-gray-700' : ''}`} />
          </div>
        </div>
        {item.comment && (
          <p class="text-sm text-gray-400 mt-1 break-words">{item.comment}</p>
        )}
      </div>
    );
  }

  // Row in a grouped table (no name shown)
  return (
    <div class="py-1">
      <div class="flex items-baseline gap-2">
        {item.quantity && (
          <span class="text-gray-400 whitespace-nowrap flex-shrink-0">{item.quantity}</span>
        )}
        <span class={`flex-grow mx-2 mb-1 min-w-4 ${showDots ? 'border-b border-dotted border-gray-700' : ''}`} />
        <span class="text-gray-100 font-medium whitespace-nowrap flex-shrink-0">{price}</span>
      </div>
      {item.comment && (
        <p class="text-sm text-gray-400 mt-1 break-words">{item.comment}</p>
      )}
    </div>
  );
}
