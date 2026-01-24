import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3 } from "lucide-react";

interface HeroProps {
  labels: {
    title1: string;
    title2: string;
    desc: string;
    cta: string;
    more: string;
    badgeInstant: string;
    badgeAnalysis: string;
  }
}

export default function Hero({ labels }: HeroProps) {
  return (
    <section className="container mx-auto px-4 md:px-6 py-24 md:py-32 space-y-10 text-center flex flex-col items-center">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl leading-tight pb-4">
          {labels.title1} <br className="hidden sm:inline" />
          <span className="text-primary">{labels.title2}</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          {labels.desc}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button size="lg" className="h-12 px-8 text-base">
          {labels.cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" className="h-12 px-8 text-base">
          {labels.more}
        </Button>
      </div>
      
      {/* Trust Badges / Mini Features */}
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium">{labels.badgeInstant}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm font-medium">{labels.badgeAnalysis}</span>
        </div>
      </div>
    </section>
  );
}