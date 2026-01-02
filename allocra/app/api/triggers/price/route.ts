/**
 * DCA Trigger Engine - Price-Based Triggers
 *
 * Cron job endpoint for checking price-based DCA triggers.
 * Should be called periodically (e.g., every hour during market hours).
 *
 * POST /api/triggers/price
 *
 * This endpoint:
 * 1. Fetches all active plans with price-based triggers
 * 2. Checks current prices against trigger conditions
 * 3. Creates alert events for triggered plans
 * 4. Sends email notifications
 *
 * Security: Requires CRON_SECRET in request header
 */

import { NextRequest, NextResponse } from 'next/server';
import { serverEnv } from '@/lib/config/env';
// import { prisma } from '@/lib/db/prisma';
// import { getStockQuote } from '@/lib/services/stock-provider';
// import { sendDcaTriggerAlert } from '@/lib/services/notification';

// POST /api/triggers/price
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = authHeader?.replace('Bearer ', '');

    if (!serverEnv.cronSecret || cronSecret !== serverEnv.cronSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if price alerts are enabled
    if (!serverEnv.enablePriceAlerts) {
      return NextResponse.json({
        success: true,
        message: 'Price alerts are disabled',
        processed: 0,
      });
    }

    // TODO: Implement price trigger logic
    //
    // 1. Fetch active plans with price-based triggers
    // const plans = await prisma.dcaPlan.findMany({
    //   where: {
    //     status: 'ACTIVE',
    //     triggerType: { in: ['PRICE_BASED', 'HYBRID'] },
    //   },
    //   include: { stock: true, user: true },
    // });
    //
    // 2. Check each plan
    // const triggered = [];
    // for (const plan of plans) {
    //   const quote = await getStockQuote(plan.stock.symbol);
    //
    //   // Check price drop condition
    //   if (plan.priceDropPercent && plan.averagePrice) {
    //     const dropPercent = ((plan.averagePrice - quote.price) / plan.averagePrice) * 100;
    //     if (dropPercent >= plan.priceDropPercent) {
    //       triggered.push({ plan, quote, reason: 'price_drop' });
    //     }
    //   }
    //
    //   // Check price target conditions
    //   if (plan.priceTargetLow && quote.price <= plan.priceTargetLow) {
    //     triggered.push({ plan, quote, reason: 'target_low' });
    //   }
    // }
    //
    // 3. Create alert events and send notifications
    // for (const { plan, quote, reason } of triggered) {
    //   await prisma.alertEvent.create({...});
    //   await sendDcaTriggerAlert(plan.user.email, {...});
    // }

    // Placeholder response
    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      processed: 0,
      triggered: 0,
      notifications: 0,
      message: 'Price trigger check completed (placeholder)',
    };

    console.log('Price trigger job executed:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Price trigger error:', error);
    return NextResponse.json(
      {
        error: 'Price trigger job failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET for health check
export async function GET() {
  return NextResponse.json({
    service: 'price-triggers',
    status: 'healthy',
    enabled: serverEnv.enablePriceAlerts,
    timestamp: new Date().toISOString(),
  });
}
