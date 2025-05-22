
// Currency utilities for the application

// Exchange rate (1 USD to Iraqi Dinar)
export const USD_TO_IQD_RATE = 1300;

/**
 * Format a price in IQD currency
 * @param price Price in USD
 * @returns Formatted price string in IQD
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ar-IQ', { 
    style: 'currency', 
    currency: 'IQD',
    maximumFractionDigits: 0
  }).format(price * USD_TO_IQD_RATE);
};

/**
 * Format a price in USD currency
 * @param price Price in USD
 * @returns Formatted price string in USD
 */
export const formatPriceUSD = (price: number): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Convert price from USD to IQD
 * @param priceUSD Price in USD
 * @returns Price in IQD
 */
export const convertToIQD = (priceUSD: number): number => {
  return priceUSD * USD_TO_IQD_RATE;
};

/**
 * Convert price from IQD to USD
 * @param priceIQD Price in IQD
 * @returns Price in USD
 */
export const convertToUSD = (priceIQD: number): number => {
  return priceIQD / USD_TO_IQD_RATE;
};
