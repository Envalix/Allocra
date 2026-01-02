/**
 * Individual DCA Plan API
 *
 * Operations for a specific DCA plan by ID.
 *
 * GET    /api/dca/plans/[id]    - Get plan details
 * PUT    /api/dca/plans/[id]    - Update plan
 * DELETE /api/dca/plans/[id]    - Delete plan
 * PATCH  /api/dca/plans/[id]    - Partial update (e.g., status change)
 */

import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/dca/plans/[id]
// Get detailed information about a specific plan
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // TODO: Get authenticated user and verify ownership
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Fetch plan from database
    // const plan = await prisma.dcaPlan.findUnique({
    //   where: { id, userId: session.user.id },
    //   include: {
    //     stock: true,
    //     steps: {
    //       orderBy: { stepNumber: 'asc' },
    //       take: 50,
    //     },
    //     alertEvents: {
    //       orderBy: { createdAt: 'desc' },
    //       take: 10,
    //     },
    //   },
    // });
    //
    // if (!plan) {
    //   return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    // }

    // Placeholder response
    const mockPlan = {
      id,
      name: 'AAPL Monthly DCA',
      stockSymbol: 'AAPL',
      stockName: 'Apple Inc.',
      planType: 'MONTHLY',
      triggerType: 'TIME_BASED',
      status: 'ACTIVE',
      monthlyAmount: 500,
      frequency: 'monthly',
      dayOfMonth: 1,
      totalInvested: 2500,
      totalShares: 12.5,
      averagePrice: 200,
      startDate: '2024-01-01',
      emailNotifications: true,
      steps: [
        { stepNumber: 1, status: 'EXECUTED', amount: 500, shares: 2.5, price: 200 },
        { stepNumber: 2, status: 'EXECUTED', amount: 500, shares: 2.6, price: 192 },
        { stepNumber: 3, status: 'PENDING', amount: 500, scheduledDate: new Date().toISOString() },
      ],
    };

    return NextResponse.json({
      success: true,
      data: mockPlan,
    });
  } catch (error) {
    console.error('Get plan error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plan details' },
      { status: 500 }
    );
  }
}

// PUT /api/dca/plans/[id]
// Full update of a plan
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // TODO: Validate ownership and update plan
    // const plan = await prisma.dcaPlan.update({
    //   where: { id, userId: session.user.id },
    //   data: {
    //     name: body.name,
    //     monthlyAmount: body.monthlyAmount,
    //     totalAmount: body.totalAmount,
    //     frequency: body.frequency,
    //     dayOfMonth: body.dayOfMonth,
    //     priceDropPercent: body.priceDropPercent,
    //     emailNotifications: body.emailNotifications,
    //   },
    // });

    return NextResponse.json({
      success: true,
      data: { id, ...body, updatedAt: new Date().toISOString() },
      message: 'Plan updated successfully',
    });
  } catch (error) {
    console.error('Update plan error:', error);
    return NextResponse.json(
      { error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

// DELETE /api/dca/plans/[id]
// Delete a plan
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // TODO: Validate ownership and delete plan
    // await prisma.dcaPlan.delete({
    //   where: { id, userId: session.user.id },
    // });

    return NextResponse.json({
      success: true,
      message: 'Plan deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    console.error('Delete plan error:', error);
    return NextResponse.json(
      { error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}

// PATCH /api/dca/plans/[id]
// Partial update (useful for status changes)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Common PATCH operations
    const allowedFields = ['status', 'emailNotifications', 'notifyOnTrigger'];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // TODO: Update in database
    // const plan = await prisma.dcaPlan.update({
    //   where: { id, userId: session.user.id },
    //   data: updateData,
    // });

    return NextResponse.json({
      success: true,
      data: { id, ...updateData, updatedAt: new Date().toISOString() },
      message: 'Plan updated successfully',
    });
  } catch (error) {
    console.error('Patch plan error:', error);
    return NextResponse.json(
      { error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}
