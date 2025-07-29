// app/api/stock/route.ts
import { NextResponse } from "next/server";

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol parameter" }, { status: 400 });
  }

  try {
    const [quoteRes, profileRes, metricsRes] = await Promise.all([
      fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
      fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
      fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`),
    ]);

    const [quote, profile, metrics] = await Promise.all([
      quoteRes.json(),
      profileRes.json(),
      metricsRes.json(),
    ]);

    return NextResponse.json({
      symbol,
      quote,
      profile,
      metrics: metrics.metric || {},
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 502 });
  }
}
