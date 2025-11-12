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
      <div class="flex items-baseline gap-2 py-2">
        <div class="flex-shrink-0">
          <div class="flex items-baseline gap-2">
            <span class="text-lg font-medium text-gray-200">{item.name}</span>
            {item.quantity && (
              <span class="text-gray-400">{item.quantity}</span>
            )}
          </div>
          {item.comment && (
            <p class="text-sm text-gray-400 mt-1">{item.comment}</p>
          )}
        </div>
        {showDots && <span class="flex-grow border-b border-dotted border-gray-700 mx-2 mb-1" />}
        <span class="text-lg font-semibold text-gray-100 whitespace-nowrap flex-shrink-0">{price}</span>
      </div>
    );
  }

  // Row in a grouped table (no name shown)
  return (
    <div class="flex items-baseline gap-2 py-1">
      <div class="flex-shrink-0">
        {item.quantity && (
          <span class="text-gray-400">{item.quantity}</span>
        )}
        {item.comment && (
          <span class="text-sm text-gray-400 ml-2">{item.comment}</span>
        )}
      </div>
      {showDots && <span class="flex-grow border-b border-dotted border-gray-700 mx-2 mb-1" />}
      <span class="text-gray-100 font-medium whitespace-nowrap flex-shrink-0">{price}</span>
    </div>
  );
}
