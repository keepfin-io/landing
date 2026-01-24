import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-24 md:py-32 space-y-10 text-center flex flex-col items-center">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Yatırımlarınızı Profesyonelce <br className="hidden sm:inline" />
          <span className="text-primary">Yönetin</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Keepfind ile hisse senetlerinizi, kripto varlıklarınızı ve nakit akışınızı tek bir yerden takip edin. 
          Bilinçli kararlar alın, servetinizi büyütün.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button size="lg" className="h-12 px-8 text-base">
          Hemen Başla <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" className="h-12 px-8 text-base">
          Daha Fazla Bilgi
        </Button>
      </div>
      
      {/* Trust Badges / Mini Features */}
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium">Anlık İşlem Takibi</span>
        </div>
        <div className="flex items-center justify-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm font-medium">Detaylı Analizler</span>
        </div>
      </div>
    </section>
  );
}