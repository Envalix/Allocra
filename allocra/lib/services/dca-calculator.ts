/**
 * DCA Calculation Service
 *
 * Core business logic for Dollar Cost Averaging calculations.
 * Handles plan allocation strategies and step generation.
 *
 * Usage:
 *   import { calculateDcaSteps, calculateMonthlyAllocation } from '@/lib/services/dca-calculator';
 */

// ============================================
// Types
// ============================================

export interface DcaAllocation {
  stepNumber: number;
  scheduledDate: Date;
  recommendedAmount: number;
  recommendedShares?: number;
  note?: string;
}

export interface TotalInvestmentPlan {
  totalAmount: number;
  numberOfSteps: number;
  startDate: Date;
  frequency: 'daily' | 'weekly' | 'monthly';
  priceDropBuyMore?: boolean;
  priceDropThreshold?: number; // Percentage drop to trigger extra buy
}

export interface MonthlyInvestmentPlan {
  monthlyAmount: number;
  startDate: Date;
  endDate?: Date;
  dayOfMonth?: number; // 1-28 recommended to avoid month-end issues
}

export interface DcaSummary {
  totalInvested: number;
  totalShares: number;
  averagePrice: number;
  steps: DcaAllocation[];
  estimatedEndDate: Date;
}

// ============================================
// Total Investment Plan Calculator
// ============================================

/**
 * Calculate DCA steps for a total investment plan
 *
 * Distributes a fixed total amount evenly across multiple buy events.
 * Optionally adjusts allocation based on price drops.
 *
 * @param plan - Total investment plan configuration
 * @returns Array of DCA allocations
 */
export function calculateTotalInvestmentSteps(plan: TotalInvestmentPlan): DcaAllocation[] {
  const { totalAmount, numberOfSteps, startDate, frequency } = plan;

  if (numberOfSteps <= 0) {
    throw new Error('Number of steps must be greater than 0');
  }

  if (totalAmount <= 0) {
    throw new Error('Total amount must be greater than 0');
  }

  const baseAmount = totalAmount / numberOfSteps;
  const steps: DcaAllocation[] = [];

  for (let i = 0; i < numberOfSteps; i++) {
    const scheduledDate = getNextScheduledDate(startDate, frequency, i);

    steps.push({
      stepNumber: i + 1,
      scheduledDate,
      recommendedAmount: Math.round(baseAmount * 100) / 100, // Round to 2 decimals
      note: i === 0 ? 'First investment' : undefined,
    });
  }

  return steps;
}

/**
 * Calculate DCA steps for a monthly investment plan
 *
 * Generates recurring monthly buy events until end date.
 *
 * @param plan - Monthly investment plan configuration
 * @param months - Number of months to calculate (default: 12)
 * @returns Array of DCA allocations
 */
export function calculateMonthlySteps(
  plan: MonthlyInvestmentPlan,
  months: number = 12
): DcaAllocation[] {
  const { monthlyAmount, startDate, endDate, dayOfMonth = 1 } = plan;

  if (monthlyAmount <= 0) {
    throw new Error('Monthly amount must be greater than 0');
  }

  const steps: DcaAllocation[] = [];
  const currentDate = new Date(startDate);

  // Set to specified day of month
  currentDate.setDate(Math.min(dayOfMonth, 28)); // Cap at 28 to avoid month issues

  for (let i = 0; i < months; i++) {
    // Check if we've passed the end date
    if (endDate && currentDate > endDate) {
      break;
    }

    steps.push({
      stepNumber: i + 1,
      scheduledDate: new Date(currentDate),
      recommendedAmount: monthlyAmount,
      note: i === 0 ? 'First monthly investment' : undefined,
    });

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return steps;
}

// ============================================
// Price-Based Adjustments
// ============================================

/**
 * Adjust allocation based on price drop
 *
 * If price has dropped significantly, recommend investing more.
 * This implements a "buy the dip" strategy within the DCA framework.
 *
 * @param baseAmount - Original recommended amount
 * @param currentPrice - Current stock price
 * @param averagePrice - Average price of previous purchases
 * @param dropThreshold - Percentage drop to trigger bonus (default: 10%)
 * @param bonusMultiplier - How much extra to invest (default: 1.5x)
 * @returns Adjusted amount
 */
export function adjustForPriceDrop(
  baseAmount: number,
  currentPrice: number,
  averagePrice: number,
  dropThreshold: number = 10,
  bonusMultiplier: number = 1.5
): number {
  if (averagePrice <= 0) {
    return baseAmount; // No adjustment for first purchase
  }

  const priceDrop = ((averagePrice - currentPrice) / averagePrice) * 100;

  if (priceDrop >= dropThreshold) {
    return baseAmount * bonusMultiplier;
  }

  return baseAmount;
}

/**
 * Calculate shares from investment amount
 */
export function calculateShares(amount: number, price: number): number {
  if (price <= 0) {
    throw new Error('Price must be greater than 0');
  }
  return amount / price;
}

/**
 * Calculate average purchase price
 */
export function calculateAveragePrice(totalInvested: number, totalShares: number): number {
  if (totalShares <= 0) {
    return 0;
  }
  return totalInvested / totalShares;
}

// ============================================
// Summary Calculations
// ============================================

/**
 * Generate DCA plan summary
 */
export function calculatePlanSummary(
  steps: DcaAllocation[],
  executedSteps: Array<{ amount: number; shares: number }> = []
): DcaSummary {
  const totalInvested = executedSteps.reduce((sum, step) => sum + step.amount, 0);
  const totalShares = executedSteps.reduce((sum, step) => sum + step.shares, 0);
  const averagePrice = calculateAveragePrice(totalInvested, totalShares);

  const lastStep = steps[steps.length - 1];
  const estimatedEndDate = lastStep?.scheduledDate || new Date();

  return {
    totalInvested,
    totalShares,
    averagePrice,
    steps,
    estimatedEndDate,
  };
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get next scheduled date based on frequency
 */
function getNextScheduledDate(
  startDate: Date,
  frequency: 'daily' | 'weekly' | 'monthly',
  stepIndex: number
): Date {
  const date = new Date(startDate);

  switch (frequency) {
    case 'daily':
      date.setDate(date.getDate() + stepIndex);
      break;
    case 'weekly':
      date.setDate(date.getDate() + stepIndex * 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + stepIndex);
      break;
  }

  return date;
}

/**
 * Validate DCA plan parameters
 */
export function validatePlanParams(params: {
  amount?: number;
  steps?: number;
  frequency?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (params.amount !== undefined && params.amount <= 0) {
    errors.push('Investment amount must be greater than 0');
  }

  if (params.steps !== undefined && params.steps <= 0) {
    errors.push('Number of steps must be greater than 0');
  }

  if (params.steps !== undefined && params.steps > 365) {
    errors.push('Maximum 365 steps allowed');
  }

  if (params.frequency && !['daily', 'weekly', 'monthly'].includes(params.frequency)) {
    errors.push('Frequency must be daily, weekly, or monthly');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default {
  calculateTotalInvestmentSteps,
  calculateMonthlySteps,
  adjustForPriceDrop,
  calculateShares,
  calculateAveragePrice,
  calculatePlanSummary,
  validatePlanParams,
};
