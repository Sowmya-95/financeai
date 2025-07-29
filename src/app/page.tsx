"use client";
import { MarketInsights } from "@/components/custom/MarketInsights";
import { AIChatPreview } from "@/components/custom/AIChatPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TrendingUp, Shield, BookOpen, MessageCircle, Globe, Calculator, PiggyBank, Target } from "lucide-react";


export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Welcome */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">📈 FinanceAI</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Smart, simple investing for beginners. Get stock and ETF recommendations backed by real data — no jargon.
        </p>
        <Link href="/learningpaths">
          <Button>Start Learning</Button>
        </Link>
      </section>

      {/* Top Picks */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">🟢 Beginner-Friendly Picks</h2>
          <p className="text-muted-foreground">
            These are simple, low-cost investments perfect for people just starting out
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopPick 
            symbol="ISF.L" 
            friendlyName="FTSE All-World ETF"
            explanation="Invest in companies from both developed and emerging markets worldwide. A simple way to own a broad slice of the global economy."
            riskLevel="Low"
            minInvestment="£25"
            beginner={true}
          />
          <TopPick 
            symbol="EUNL.DE" 
            friendlyName="MSCI World ETF"
            explanation="Invest in 1,600+ companies across developed countries. A simple way to diversify globally."
            riskLevel="Low"
            minInvestment="€25"
            beginner={true}
          />
          <TopPick 
            symbol="VOO" 
            friendlyName="S&P 500 ETF"
            explanation="Track the 500 biggest US companies. Like owning a slice of the American economy."
            riskLevel="Low"
            minInvestment="$50"
            beginner={true}
          />
        </div>
      </section>

      {/* Market Snapshot + AI Assistant */}
      <section className="grid md:grid-cols-2 gap-8">
        <MarketInsights />
        <AIChatPreview />
      </section>
    </main>
  );
}



// ...existing code...

function TopPick({ 
  symbol, 
  friendlyName, 
  explanation, 
  riskLevel, 
  minInvestment, 
  beginner 
}: { 
  symbol: string; 
  friendlyName: string; 
  explanation: string; 
  riskLevel: string; 
  minInvestment: string; 
  beginner: boolean; 
}) {
  const riskColor = riskLevel === "Low" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
  
  // Convert all currencies to EUR for consistency
  const convertToEur = (amount: string) => {
    if (amount.includes('£')) {
      const num = parseInt(amount.replace('£', ''));
      return `€${Math.round(num * 1.15)}`;
    }
    if (amount.includes('$')) {
      const num = parseInt(amount.replace('$', ''));
      return `€${Math.round(num * 0.92)}`;
    }
    return amount; // Already in EUR
  };

// ...existing code...

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    const query = `Tell me about ${friendlyName} (${symbol}). Is this a good investment for a beginner? What are the pros and cons?`;
    
    // Open in new tab and try to send message
    const chatWindow = window.open('http://localhost:3080', '_blank');
    
    // Wait for the chat interface to load, then try to send the message
    setTimeout(() => {
      if (chatWindow) {
        chatWindow.postMessage({
          type: 'PREFILL_MESSAGE',
          message: query,
          autoSend: true
        }, 'http://localhost:3080');
      }
    }, 2000);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">{friendlyName}</CardTitle>
            <p className="text-sm text-muted-foreground font-mono">{symbol}</p>
          </div>
          {beginner && <Badge variant="secondary">Beginner</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm leading-relaxed flex-1">{explanation}</p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Risk:</span>
            <Badge variant="outline" className={riskColor}>
              {riskLevel}
            </Badge>
          </div>
          <div className="text-muted-foreground">
            From {convertToEur(minInvestment)}
          </div>
        </div>
        
        <button
          onClick={handleViewDetails}
          className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors w-full justify-center p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          <MessageCircle className="w-4 h-4" />
          Ask AI About This
        </button>
      </CardContent>
    </Card>
  );
}