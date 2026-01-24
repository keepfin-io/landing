import React from 'react';
import { LineChart, Globe, Wallet, ShieldCheck } from "lucide-react";

interface FeaturesProps {
  labels: {
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
  }
}

export default function Features({ labels }: FeaturesProps) {
  const features = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: labels.f1Title,
      description: labels.f1Desc
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: labels.f2Title,
      description: labels.f2Desc
    },
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: labels.f3Title,
      description: labels.f3Desc
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: labels.f4Title,
      description: labels.f4Desc
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {labels.title}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {labels.subtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}