"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";

type Summary = {
  symbol: string;
  friendlyName: string;
  price: number;
  change: number;
  percent: number;
  currency: string;
  type: "ETF" | "Stock";
  description: string;
};

// Predefined European/German investment symbols
const europeanSymbols = [
  {
    symbol: "EUNL.DE",
    friendlyName: "World Stocks Bundle",
    type: "ETF" as const,
    description: "Invests in 1,600+ companies worldwide",
  },
  {
    symbol: "VWRL.AS",
    friendlyName: "Global Investment Mix",
    type: "ETF" as const,
    description: "Broad global market exposure",
  },
  {
    symbol: "SAP.DE",
    friendlyName: "SAP (German Tech)",
    type: "Stock" as const,
    description: "Europe's largest software company",
  },
  {
    symbol: "ASML.AS",
    friendlyName: "ASML (Dutch Tech)",
    type: "Stock" as const,
    description: "Leading semiconductor equipment maker",
  },
  {
    symbol: "NESN.SW",
    friendlyName: "Nestlé (Swiss Food)",
    type: "Stock" as const,
    description: "World's largest food company",
  },
];

export function MarketInsights() {
  const [data, setData] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const responses = await Promise.all(
          europeanSymbols.map(async (item) => {
            try {
              const res = await fetch(`/api/stock?symbol=${encodeURIComponent(item.symbol)}`);
              if (!res.ok) {
                console.error(`Error fetching ${item.symbol}: HTTP ${res.status}`);
                return null;
              }
              const data = await res.json();
              return { ...data, symbolInfo: item };
            } catch (err) {
              console.error(`Error fetching ${item.symbol}:`, err);
              return null;
            }
          })
        );

        const summaries = responses
        .filter(Boolean)
        .map((res) => {
          // Safely extract quote and profile data
          const quote = res.quote || {};
          const profile = res.profile || {};
          const symbolInfo = res.symbolInfo;

          const price = quote.c || 0;
          const prevClose = quote.pc || 0;

          // Calculate change and percent if possible
          const change = typeof quote.change === "number" ? quote.change : price - prevClose;
          const percent = quote.changesPercentage || (prevClose ? ((change / prevClose) * 100) : 0);

          return {
            symbol: symbolInfo.symbol,
            friendlyName: symbolInfo.friendlyName,
            price,
            change,
            percent,
            currency: profile.currency || "EUR",
            type: symbolInfo.type,
            description: symbolInfo.description,
          };
        });


        setData(summaries);
      } catch (err) {
        setError("Failed to load market data");
        console.error("MarketInsights error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold flex items-center gap-2">🇪🇺 European Market Today</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded animate-pulse">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🇪🇺 European Market Today
          <Badge variant="outline" className="text-xs">
            Live Prices
          </Badge>
        </h2>
        <p className="text-sm text-muted-foreground">Popular investments for European investors</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item) => {
          const isPositive = item.change >= 0;
          // Format price with currency symbol
          const formattedPrice =
            item.currency === "USD"
              ? `$${item.price?.toFixed(2)}`
              : `€${item.price?.toFixed(2)}`; // fallback to Euro for others

          return (
            <Link
              href={`/stocks/${item.symbol}`}
              key={item.symbol}
              className="block p-3 border rounded-lg hover:shadow-md transition-all duration-200 hover:border-primary/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{item.friendlyName}</span>
                    <Badge variant={item.type === "ETF" ? "default" : "secondary"} className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">{item.symbol}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
                </div>

                <div className="text-right space-y-1 flex-shrink-0 ml-4">
                  <div className="font-semibold text-sm">{formattedPrice}</div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isPositive ? "+" : ""}
                    {item.change.toFixed(2)} ({item.percent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        <div className="pt-3 border-t">
          <Link href="/market-overview" className="text-xs text-primary hover:underline">
            View full European market overview →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
