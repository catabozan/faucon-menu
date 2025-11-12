import type { MenuItemGroup as MenuItemGroupType } from '@/utils/types';
import { MenuItem } from './MenuItem';

interface MenuItemGroupProps {
  itemGroup: MenuItemGroupType;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  showDots: boolean;
}

export function MenuItemGroup({ itemGroup, currencySymbol, currencyPosition, showDots }: MenuItemGroupProps) {
  if (itemGroup.items.length === 1) {
    // Single item - show with name
    return (
      <div class="mb-1">
        <MenuItem
          item={itemGroup.items[0]}
          currencySymbol={currencySymbol}
          currencyPosition={currencyPosition}
          showName={true}
          showDots={showDots}
        />
      </div>
    );
  }

  // Multiple items - show as table with name header
  return (
    <div class="mb-1">
      <div class="text-lg font-medium text-gray-200 mb-2">{itemGroup.name}</div>
      <div class="space-y-2 ml-4">
        {itemGroup.items.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            currencySymbol={currencySymbol}
            currencyPosition={currencyPosition}
            showName={false}
            showDots={showDots}
          />
        ))}
      </div>
    </div>
  );
}
