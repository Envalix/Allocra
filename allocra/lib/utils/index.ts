/**
 * Utility Functions
 *
 * Common helper functions used across the application.
 */

// ============================================
// Number Formatting
// ============================================

/**
 * Format number as currency
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number as compact (e.g., 1.2K, 3.4M)
 */
export function formatCompact(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercent(
  value: number,
  decimals: number = 2,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Format number of shares
 */
export function formatShares(shares: number): string {
  if (shares >= 1) {
    return shares.toFixed(shares % 1 === 0 ? 0 : 2);
  }
  return shares.toFixed(4);
}

// ============================================
// Date Formatting
// ============================================

/**
 * Format date for display
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  locale: string = 'en-US'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(d);
}

/**
 * Format date as relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return rtf.format(-diffMinutes, 'minute');
  if (diffHours < 24) return rtf.format(-diffHours, 'hour');
  if (diffDays < 30) return rtf.format(-diffDays, 'day');
  if (diffDays < 365) return rtf.format(-Math.floor(diffDays / 30), 'month');
  return rtf.format(-Math.floor(diffDays / 365), 'year');
}

/**
 * Get next scheduled date based on frequency
 */
export function getNextScheduledDate(
  startDate: Date,
  frequency: 'daily' | 'weekly' | 'monthly',
  step: number = 0
): Date {
  const date = new Date(startDate);

  switch (frequency) {
    case 'daily':
      date.setDate(date.getDate() + step);
      break;
    case 'weekly':
      date.setDate(date.getDate() + step * 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + step);
      break;
  }

  return date;
}

// ============================================
// String Utilities
// ============================================

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================
// Stock Utilities
// ============================================

/**
 * Calculate price change percentage
 */
export function calculatePriceChange(currentPrice: number, previousPrice: number): {
  change: number;
  changePercent: number;
} {
  const change = currentPrice - previousPrice;
  const changePercent = previousPrice > 0 ? (change / previousPrice) * 100 : 0;
  return { change, changePercent };
}

/**
 * Calculate number of shares from amount and price
 */
export function calculateShares(amount: number, price: number): number {
  if (price <= 0) return 0;
  return amount / price;
}

/**
 * Calculate average price from total investment and shares
 */
export function calculateAveragePrice(totalInvested: number, totalShares: number): number {
  if (totalShares <= 0) return 0;
  return totalInvested / totalShares;
}

// ============================================
// Validation Utilities
// ============================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate stock symbol format
 */
export function isValidStockSymbol(symbol: string): boolean {
  // 1-5 uppercase letters
  const symbolRegex = /^[A-Z]{1,5}$/;
  return symbolRegex.test(symbol);
}

/**
 * Validate positive number
 */
export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

// ============================================
// Array Utilities
// ============================================

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Sort array by date field
 */
export function sortByDate<T>(
  array: T[],
  dateKey: keyof T,
  order: 'asc' | 'desc' = 'desc'
): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey] as string).getTime();
    const dateB = new Date(b[dateKey] as string).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
}

// ============================================
// Async Utilities
// ============================================

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry async function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}
