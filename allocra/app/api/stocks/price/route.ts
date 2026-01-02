/**
 * Stock Price API
 *
 * Endpoints for fetching stock prices and searching stocks.
 *
 * GET /api/stocks/price?symbol=AAPL
 * Returns current stock price and quote data
 *
 * GET /api/stocks/price?search=apple
 * Returns matching stocks for search query
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStockQuote, searchStocks } from '@/lib/services/stock-provider';

// GET /api/stocks/price
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const search = searchParams.get('search');

    // Handle stock search
    if (search) {
      if (search.length < 1) {
        return NextResponse.json(
          { error: 'Search query must be at least 1 character' },
          { status: 400 }
        );
      }

      const results = await searchStocks(search);

      return NextResponse.json({
        success: true,
        data: results,
        meta: {
          query: search,
          count: results.length,
        },
      });
    }

    // Handle single stock quote
    if (symbol) {
      const quote = await getStockQuote(symbol.toUpperCase());

      return NextResponse.json({
        success: true,
        data: quote,
      });
    }

    // No parameters provided
    return NextResponse.json(
      {
        error: 'Missing required parameter: symbol or search',
        usage: {
          getQuote: '/api/stocks/price?symbol=AAPL',
          search: '/api/stocks/price?search=apple',
        },
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Stock price API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch stock data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// TODO: Implement batch quote endpoint
// POST /api/stocks/price
// Body: { symbols: ['AAPL', 'GOOGL', 'MSFT'] }
// Returns quotes for multiple symbols in a single request
