import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, Languages } from "lucide-react";

interface NavbarProps {
  labels: {
    features: string;
    login: string;
  };
  lang: 'tr' | 'en';
}

export default function Navbar({ labels, lang }: NavbarProps) {
  const targetLang = lang === 'tr' ? 'en' : 'tr';
  const targetLink = targetLang === 'tr' ? '/' : '/en';
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">Keepfind</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
             <a href={`/${lang === 'tr' ? '' : lang}#features`}>{labels.features}</a>
          </Button>
          <a href="https://keepfin.tariksogukpinar.dev/login">
            <Button>{labels.login}</Button>
          </a>
          <a href={targetLink} className="ml-2 p-2 hover:bg-accent rounded-md transition-colors" aria-label="Switch Language">
             <Languages className="h-5 w-5" />
             <span className="sr-only">{targetLang.toUpperCase()}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}