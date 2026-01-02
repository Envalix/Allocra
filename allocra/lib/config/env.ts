/**
 * Environment Configuration
 *
 * Centralized configuration management with type safety and validation.
 * All environment variables should be accessed through this module.
 */

// Server-side environment variables (never exposed to client)
export const serverEnv = {
  // Database
  databaseUrl: process.env.DATABASE_URL!,

  // Authentication (future)
  // nextAuthSecret: process.env.NEXTAUTH_SECRET,
  // nextAuthUrl: process.env.NEXTAUTH_URL,

  // Stock Data Provider
  stockDataProvider: process.env.STOCK_DATA_PROVIDER || 'mock',
  alphaVantageApiKey: process.env.ALPHA_VANTAGE_API_KEY,
  finnhubApiKey: process.env.FINNHUB_API_KEY,
  polygonApiKey: process.env.POLYGON_API_KEY,

  // Email Service
  emailProvider: process.env.EMAIL_PROVIDER || 'mock',
  brevoApiKey: process.env.BREVO_API_KEY,
  brevoSenderEmail: process.env.BREVO_SENDER_EMAIL,
  brevoSenderName: process.env.BREVO_SENDER_NAME,
  resendApiKey: process.env.RESEND_API_KEY,
  resendSenderEmail: process.env.RESEND_SENDER_EMAIL,

  // Cron Jobs
  cronSecret: process.env.CRON_SECRET,

  // Feature Flags
  enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
  enablePriceAlerts: process.env.ENABLE_PRICE_ALERTS !== 'false',
  enableTimeTriggers: process.env.ENABLE_TIME_TRIGGERS !== 'false',
};

// Client-side environment variables (prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Allocra',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

// Environment helpers
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

/**
 * Validate required environment variables
 * Call this on server startup to fail fast if config is missing
 */
export function validateEnv(): void {
  const required = ['DATABASE_URL'];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your .env file or environment configuration.'
    );
  }
}

export default { serverEnv, clientEnv };
