import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  // Together.ai OpenAI-compatible endpoint
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
      // you can add stream: true if you want streaming (extra work)
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error }, { status: response.status });
  }

  const data = await response.json();

  // Together.ai’s response format follows OpenAI Chat Completion schema:
  // data.choices[0].message.content contains the AI text
  return NextResponse.json({ reply: data.choices[0].message });
}
