// app/api/market/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const indexes = [
    { name: "S&P 500", symbol: "^GSPC" },
    { name: "NASDAQ", symbol: "^IXIC" },
    { name: "Dow Jones", symbol: "^DJI" },
  ];

  const results = await Promise.all(
    indexes.map(async (i) => {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${i.symbol}&token=${process.env.FINNHUB_API_KEY}`);
      const data = await res.json();
      return {
        label: i.name,
        value: data.c?.toFixed(2) ?? "N/A",
        change: data.dp ? `${data.dp.toFixed(2)}%` : "N/A",
      };
    })
  );

  return NextResponse.json(results);
}
