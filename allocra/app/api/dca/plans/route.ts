/**
 * DCA Plans API
 *
 * CRUD operations for DCA plans.
 *
 * GET    /api/dca/plans         - List all plans for authenticated user
 * POST   /api/dca/plans         - Create a new DCA plan
 *
 * Note: Individual plan operations (GET, PUT, DELETE by ID)
 * are handled in /api/dca/plans/[id]/route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db/prisma';
// import { validatePlanParams } from '@/lib/services/dca-calculator';

// GET /api/dca/plans
// List all DCA plans for the authenticated user
export async function GET(_request: NextRequest) {
  try {
    // TODO: Get authenticated user from session
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Fetch plans from database
    // const plans = await prisma.dcaPlan.findMany({
    //   where: { userId: session.user.id },
    //   include: {
    //     stock: true,
    //     _count: { select: { steps: true } },
    //   },
    //   orderBy: { createdAt: 'desc' },
    // });

    // Placeholder response
    const mockPlans = [
      {
        id: 'plan_1',
        name: 'AAPL Monthly DCA',
        stockSymbol: 'AAPL',
        stockName: 'Apple Inc.',
        planType: 'MONTHLY',
        status: 'ACTIVE',
        monthlyAmount: 500,
        totalInvested: 2500,
        totalShares: 12.5,
        averagePrice: 200,
        nextTriggerDate: new Date().toISOString(),
      },
      {
        id: 'plan_2',
        name: 'GOOGL Total Investment',
        stockSymbol: 'GOOGL',
        stockName: 'Alphabet Inc.',
        planType: 'TOTAL_INVESTMENT',
        status: 'ACTIVE',
        totalAmount: 10000,
        totalInvested: 4000,
        totalShares: 25,
        averagePrice: 160,
        nextTriggerDate: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockPlans,
      meta: {
        total: mockPlans.length,
      },
    });
  } catch (error) {
    console.error('List plans error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch DCA plans' },
      { status: 500 }
    );
  }
}

// POST /api/dca/plans
// Create a new DCA plan
export async function POST(request: NextRequest) {
  try {
    // TODO: Get authenticated user from session
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();

    // Validate required fields
    const { name, stockSymbol, planType } = body;

    if (!name || !stockSymbol || !planType) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['name', 'stockSymbol', 'planType'],
        },
        { status: 400 }
      );
    }

    // Validate plan type
    if (!['TOTAL_INVESTMENT', 'MONTHLY'].includes(planType)) {
      return NextResponse.json(
        {
          error: 'Invalid planType',
          allowed: ['TOTAL_INVESTMENT', 'MONTHLY'],
        },
        { status: 400 }
      );
    }

    // Validate amounts based on plan type
    if (planType === 'TOTAL_INVESTMENT' && !body.totalAmount) {
      return NextResponse.json(
        { error: 'totalAmount is required for TOTAL_INVESTMENT plans' },
        { status: 400 }
      );
    }

    if (planType === 'MONTHLY' && !body.monthlyAmount) {
      return NextResponse.json(
        { error: 'monthlyAmount is required for MONTHLY plans' },
        { status: 400 }
      );
    }

    // TODO: Create plan in database
    // const plan = await prisma.dcaPlan.create({
    //   data: {
    //     userId: session.user.id,
    //     stockId: stockId,
    //     name,
    //     planType,
    //     triggerType: body.triggerType || 'TIME_BASED',
    //     status: 'DRAFT',
    //     totalAmount: body.totalAmount,
    //     monthlyAmount: body.monthlyAmount,
    //     frequency: body.frequency,
    //     dayOfMonth: body.dayOfMonth,
    //     priceDropPercent: body.priceDropPercent,
    //     emailNotifications: body.emailNotifications ?? true,
    //   },
    //   include: { stock: true },
    // });

    // Placeholder response
    const mockPlan = {
      id: `plan_${Date.now()}`,
      name,
      stockSymbol,
      planType,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      ...body,
    };

    return NextResponse.json(
      {
        success: true,
        data: mockPlan,
        message: 'DCA plan created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create plan error:', error);
    return NextResponse.json(
      { error: 'Failed to create DCA plan' },
      { status: 500 }
    );
  }
}
