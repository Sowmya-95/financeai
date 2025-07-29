"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  symbol: string;
};

export function MarketDetails({ symbol }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStock() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/stock?symbol=${symbol}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Error fetching stock data");
        setData(json);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    }

    fetchStock();
  }, [symbol]);

  if (loading) {
    return (
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md w-full border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive text-sm">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const { profile, quote, metrics } = data;
  const currency = profile?.currency || "USD";
  const isPositive = quote?.d >= 0;

  return (
    <Card className="max-w-md w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          {profile?.logo && (
            <div className="flex-shrink-0">
              <img 
                src={profile.logo} 
                alt={`${symbol} logo`} 
                className="w-12 h-12 object-contain rounded-lg border bg-white p-1" 
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold leading-tight">
                  {profile?.name || symbol}
                </h3>
                <Badge variant="secondary" className="mt-1">
                  {symbol}
                </Badge>
              </div>
            </div>
            {profile?.weburl && (
              <a
                href={profile.weburl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-2 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Visit website
              </a>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {currency} {quote?.c?.toFixed(2)}
            </span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {quote?.d?.toFixed(2)} ({quote?.dp?.toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-medium">
              {profile?.marketCapitalization
                ? `${currency} ${(profile.marketCapitalization / 1000).toFixed(1)}B`
                : "N/A"}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground">P/E Ratio</p>
            <p className="font-medium">
              {metrics?.peNormalized ? metrics.peNormalized.toFixed(2) : "N/A"}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground">Dividend Yield</p>
            <p className="font-medium">
              {metrics?.dividendYield
                ? `${(metrics.dividendYield * 100).toFixed(2)}%`
                : "N/A"}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground">Exchange</p>
            <p className="font-medium">{profile?.exchange || "N/A"}</p>
          </div>
        </div>

        {/* Industry Badge */}
        {profile?.finnhubIndustry && (
          <div className="pt-2 border-t">
            <Badge variant="outline" className="text-xs">
              {profile.finnhubIndustry}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}