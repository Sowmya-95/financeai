"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Lightbulb, TrendingUp, Calculator, HelpCircle } from "lucide-react";

export function AIChatPreview() {
  const [inputValue, setInputValue] = useState("");

  // If LibreChat is running separately (Docker: port 3080), redirect directly
  const handleFocus = () => {
    window.location.href = "http://localhost:3080"; // ← Change this to your deployed URL if needed
  };

  const suggestedQuestions = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      question: "What's a good first investment for €500?",
      category: "Investment"
    },
    {
      icon: <Calculator className="w-4 h-4" />,
      question: "How much should I invest monthly?",
      category: "Planning"
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      question: "What's the difference between ETFs and stocks?",
      category: "Learning"
    },
    {
      icon: <Lightbulb className="w-4 h-4" />,
      question: "Which German broker is best for beginners?",
      category: "Platform"
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            AI Investment Assistant
          </h2>
          <Badge variant="default" className="text-xs">
            24/7 Available
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Get personalized investment advice in simple terms
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Chat Input */}
        <div 
          onClick={handleFocus}
          className="cursor-pointer border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-primary/50 hover:bg-gray-50/50 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Ask me anything about investing..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleFocus}
                className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                readOnly
              />
            </div>
            <Button size="sm" className="px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Click to open full chat interface
          </p>
        </div>

        {/* Popular Questions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Popular Questions:
          </h4>
          <div className="space-y-2">
            {suggestedQuestions.map((item, index) => (
              <button
                key={index}
                onClick={handleFocus}
                className="w-full text-left p-3 rounded-lg border hover:shadow-sm hover:border-primary/50 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {item.question}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="pt-3 border-t space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            What I can help with:
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Investment Planning
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Risk Assessment
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Portfolio Review
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Market Explanation
            </Badge>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={handleFocus}
          className="w-full" 
          variant="outline"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Start Chatting Now
        </Button>
      </CardContent>
    </Card>
  );
}