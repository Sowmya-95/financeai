'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Play, Globe } from "lucide-react";

const topics = [
  {
    slug: "money",
    title: "What is Money?",
    description: "Understand the basics of money and its role in the economy. Learn about different types of money, how it evolved, and why it's essential for modern economies.",
    chapters: 8,
    color: "bg-blue-500",
    difficulty: "Beginner",
    estimatedTime: "2 hours"
  },
  {
    slug: "banks",
    title: "How Do Banks Work?",
    description: "Learn about banks, loans, and how they handle money.",
    chapters: 8,
    color: "bg-green-500",
    difficulty: "Beginner", 
    estimatedTime: "2.5 hours"
  },
  {
    slug: "stocks",
    title: "Stocks and ETFs",
    description: "Understand company shares, ETFs, and how they help you invest.",
    chapters: 8,
    color: "bg-purple-500",
    difficulty: "Intermediate",
    estimatedTime: "3 hours"
  },
  {
    slug: "risk",
    title: "Understanding Risk",
    description: "How risk affects your investments and financial choices.",
    chapters: 8,
    color: "bg-orange-500",
    difficulty: "Intermediate",
    estimatedTime: "2.5 hours"
  },
];

const handleTopicClick = (slug: string) => {
  window.location.href = `/learningpaths/${slug}`;
};

export default function LearningPathsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Learning Modules</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Master finance fundamentals through our structured learning paths. 
          Start with the basics and progress to advanced concepts.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {topics.map((topic, index) => (
          <Card key={topic.slug} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Number indicator */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${topic.color}`}>
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {topic.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {topic.chapters} chapters
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {topic.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {topic.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleTopicClick(topic.slug)}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Start Learning
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Watch Videos
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Deutsch
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Section */}
      <div className="border-t pt-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Ready to start your journey?</h2>
          <p className="text-muted-foreground">
            Begin with "What is Money?" and build your financial knowledge step by step.
          </p>
          <Button size="lg" onClick={() => handleTopicClick('money')}>
            Start Your First Module
          </Button>
        </div>
      </div>
    </div>
  );
}