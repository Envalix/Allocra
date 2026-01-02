/**
 * Global Type Definitions
 *
 * Shared types used across the application.
 */

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: Record<string, unknown>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
}

// ============================================
// Stock Types
// ============================================

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  exchange?: string;
  currency: string;
  lastPrice?: number;
  lastPriceAt?: Date;
}

export interface StockQuote {
  symbol: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  previousClose?: number;
  volume?: number;
  change?: number;
  changePercent?: number;
  timestamp: Date;
}

// ============================================
// DCA Plan Types
// ============================================

export type DcaPlanType = 'TOTAL_INVESTMENT' | 'MONTHLY';

export type TriggerType = 'PRICE_BASED' | 'TIME_BASED' | 'HYBRID';

export type DcaPlanStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

export type Frequency = 'daily' | 'weekly' | 'monthly';

export interface DcaPlan {
  id: string;
  userId: string;
  stockId: string;
  name: string;
  planType: DcaPlanType;
  triggerType: TriggerType;
  status: DcaPlanStatus;

  // Investment amounts
  totalAmount?: number;
  monthlyAmount?: number;
  targetShares?: number;

  // Time-based settings
  frequency?: Frequency;
  dayOfWeek?: number;
  dayOfMonth?: number;
  executionTime?: string;

  // Price-based settings
  priceDropPercent?: number;
  priceTargetLow?: number;
  priceTargetHigh?: number;

  // Duration
  startDate: Date;
  endDate?: Date;

  // Progress
  totalInvested: number;
  totalShares: number;
  averagePrice?: number;

  // Notifications
  emailNotifications: boolean;
  notifyOnTrigger: boolean;
  notifyOnComplete: boolean;

  createdAt: Date;
  updatedAt: Date;

  // Relations (when included)
  stock?: Stock;
  steps?: DcaStep[];
}

// ============================================
// DCA Step Types
// ============================================

export type DcaStepStatus = 'PENDING' | 'TRIGGERED' | 'EXECUTED' | 'SKIPPED' | 'CANCELLED';

export interface DcaStep {
  id: string;
  planId: string;
  stepNumber: number;
  status: DcaStepStatus;

  scheduledDate?: Date;
  triggerPrice?: number;

  recommendedAmount: number;
  recommendedShares?: number;

  executedAt?: Date;
  actualPrice?: number;
  actualAmount?: number;
  actualShares?: number;

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Alert Event Types
// ============================================

export type AlertEventType =
  | 'TRIGGER_FIRED'
  | 'STEP_REMINDER'
  | 'PLAN_STARTED'
  | 'PLAN_COMPLETED'
  | 'PLAN_PAUSED'
  | 'PRICE_ALERT'
  | 'WEEKLY_SUMMARY';

export type AlertDeliveryStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'BOUNCED';

export interface AlertEvent {
  id: string;
  userId: string;
  planId?: string;
  eventType: AlertEventType;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
  deliveryStatus: AlertDeliveryStatus;
  deliveredAt?: Date;
  failureReason?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Form Types
// ============================================

export interface CreatePlanForm {
  name: string;
  stockSymbol: string;
  planType: DcaPlanType;
  triggerType?: TriggerType;
  totalAmount?: number;
  monthlyAmount?: number;
  frequency?: Frequency;
  dayOfMonth?: number;
  priceDropPercent?: number;
  emailNotifications?: boolean;
}

export interface UpdatePlanForm extends Partial<CreatePlanForm> {
  status?: DcaPlanStatus;
}
