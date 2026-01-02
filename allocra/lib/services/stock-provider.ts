/**
 * Stock Data Provider Service
 *
 * Abstraction layer for fetching stock prices from various data providers.
 * Supports multiple providers: Alpha Vantage, Finnhub, Polygon, and Mock.
 *
 * Usage:
 *   import { getStockPrice, getStockQuote } from '@/lib/services/stock-provider';
 *   const price = await getStockPrice('AAPL');
 */

import { serverEnv } from '@/lib/config/env';

// ============================================
// Types
// ============================================

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

export interface StockSearchResult {
  symbol: string;
  name: string;
  exchange?: string;
  currency?: string;
}

export interface StockProviderError {
  code: string;
  message: string;
  provider: string;
}

// ============================================
// Provider Interface
// ============================================

interface StockDataProvider {
  getQuote(symbol: string): Promise<StockQuote>;
  searchStock(query: string): Promise<StockSearchResult[]>;
  getBatchQuotes?(symbols: string[]): Promise<StockQuote[]>;
}

// ============================================
// Mock Provider (Development/Testing)
// ============================================

const mockProvider: StockDataProvider = {
  async getQuote(symbol: string): Promise<StockQuote> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Generate mock price based on symbol hash for consistency
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const basePrice = 50 + (hash % 200);
    const variance = (Math.random() - 0.5) * 10;

    return {
      symbol: symbol.toUpperCase(),
      price: basePrice + variance,
      open: basePrice - 1,
      high: basePrice + 5,
      low: basePrice - 3,
      previousClose: basePrice,
      volume: Math.floor(Math.random() * 10000000),
      change: variance,
      changePercent: (variance / basePrice) * 100,
      timestamp: new Date(),
    };
  },

  async searchStock(query: string): Promise<StockSearchResult[]> {
    // Mock search results
    const mockStocks: StockSearchResult[] = [
      { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', currency: 'USD' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', currency: 'USD' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', currency: 'USD' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', currency: 'USD' },
      { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', currency: 'USD' },
      { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', currency: 'USD' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', currency: 'USD' },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', currency: 'USD' },
    ];

    const lowerQuery = query.toLowerCase();
    return mockStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(lowerQuery) ||
        stock.name.toLowerCase().includes(lowerQuery)
    );
  },
};

// ============================================
// Alpha Vantage Provider (Placeholder)
// ============================================

const alphaVantageProvider: StockDataProvider = {
  async getQuote(symbol: string): Promise<StockQuote> {
    // TODO: Implement Alpha Vantage API integration
    // API Docs: https://www.alphavantage.co/documentation/
    //
    // Example implementation:
    // const response = await fetch(
    //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${serverEnv.alphaVantageApiKey}`
    // );
    // const data = await response.json();
    // return parseAlphaVantageQuote(data);

    console.warn('Alpha Vantage provider not implemented, using mock data');
    return mockProvider.getQuote(symbol);
  },

  async searchStock(query: string): Promise<StockSearchResult[]> {
    // TODO: Implement Alpha Vantage search
    console.warn('Alpha Vantage search not implemented, using mock data');
    return mockProvider.searchStock(query);
  },
};

// ============================================
// Finnhub Provider (Placeholder)
// ============================================

const finnhubProvider: StockDataProvider = {
  async getQuote(symbol: string): Promise<StockQuote> {
    // TODO: Implement Finnhub API integration
    // API Docs: https://finnhub.io/docs/api
    //
    // Example implementation:
    // const response = await fetch(
    //   `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${serverEnv.finnhubApiKey}`
    // );
    // const data = await response.json();
    // return parseFinnhubQuote(data);

    console.warn('Finnhub provider not implemented, using mock data');
    return mockProvider.getQuote(symbol);
  },

  async searchStock(query: string): Promise<StockSearchResult[]> {
    // TODO: Implement Finnhub search
    console.warn('Finnhub search not implemented, using mock data');
    return mockProvider.searchStock(query);
  },
};

// ============================================
// Polygon Provider (Placeholder)
// ============================================

const polygonProvider: StockDataProvider = {
  async getQuote(symbol: string): Promise<StockQuote> {
    // TODO: Implement Polygon.io API integration
    // API Docs: https://polygon.io/docs/stocks/
    //
    // Example implementation:
    // const response = await fetch(
    //   `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${serverEnv.polygonApiKey}`
    // );
    // const data = await response.json();
    // return parsePolygonQuote(data);

    console.warn('Polygon provider not implemented, using mock data');
    return mockProvider.getQuote(symbol);
  },

  async searchStock(query: string): Promise<StockSearchResult[]> {
    // TODO: Implement Polygon search
    console.warn('Polygon search not implemented, using mock data');
    return mockProvider.searchStock(query);
  },
};

// ============================================
// Provider Factory
// ============================================

function getProvider(): StockDataProvider {
  switch (serverEnv.stockDataProvider) {
    case 'alphavantage':
      return alphaVantageProvider;
    case 'finnhub':
      return finnhubProvider;
    case 'polygon':
      return polygonProvider;
    case 'mock':
    default:
      return mockProvider;
  }
}

// ============================================
// Public API
// ============================================

/**
 * Get current stock quote for a symbol
 */
export async function getStockQuote(symbol: string): Promise<StockQuote> {
  const provider = getProvider();
  return provider.getQuote(symbol);
}

/**
 * Get current stock price (simplified)
 */
export async function getStockPrice(symbol: string): Promise<number> {
  const quote = await getStockQuote(symbol);
  return quote.price;
}

/**
 * Search for stocks by name or symbol
 */
export async function searchStocks(query: string): Promise<StockSearchResult[]> {
  const provider = getProvider();
  return provider.searchStock(query);
}

/**
 * Get quotes for multiple symbols
 */
export async function getBatchQuotes(symbols: string[]): Promise<StockQuote[]> {
  const provider = getProvider();

  // Use batch API if available, otherwise fetch individually
  if (provider.getBatchQuotes) {
    return provider.getBatchQuotes(symbols);
  }

  return Promise.all(symbols.map((symbol) => provider.getQuote(symbol)));
}

export default {
  getStockQuote,
  getStockPrice,
  searchStocks,
  getBatchQuotes,
};
