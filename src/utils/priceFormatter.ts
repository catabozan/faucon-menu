/**
 * Format price according to Swiss convention:
 * - If price has decimal places (e.g., 3.7), show with 2 decimals: 3.70
 * - If price is a round number (e.g., 7, 7.0, 7.00), show as: 7.-
 */
export function formatPrice(price: number, currencySymbol: string, currencyPosition: 'before' | 'after'): string {
  // Check if price is a whole number
  const isWholeNumber = price === Math.floor(price);

  let formattedPrice: string;

  if (isWholeNumber) {
    // Round number: format as "7.-"
    formattedPrice = `${price.toFixed(0)}.-`;
  } else {
    // Has decimals: format with 2 decimal places
    formattedPrice = price.toFixed(2);
  }

  // Add currency symbol
  if (currencyPosition === 'before') {
    return `${currencySymbol} ${formattedPrice}`;
  } else {
    return `${formattedPrice} ${currencySymbol}`;
  }
}
