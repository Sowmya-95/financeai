// app/api/summary/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const now = Math.floor(Date.now() / 1000);
  const oneWeekAgo = now - 7 * 24 * 60 * 60;

  const res = await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=^GDAXI&resolution=D&from=${oneWeekAgo}&to=${now}&token=${process.env.FINNHUB_API_KEY}`
  );
  const data = await res.json();

  if (data.s !== "ok") {
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }

  const result = {
    labels: data.t.map((ts: number) => new Date(ts * 1000).toLocaleDateString("en-US", { weekday: "short" })),
    values: data.c,
  };

  return NextResponse.json(result);
}
