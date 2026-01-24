import React from 'react';
import { Wallet } from "lucide-react";

interface FooterProps {
  labels: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  }
}

export default function Footer({ labels }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Wallet className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {labels.copyright}
          </p>
        </div>
        <div className="flex gap-4">
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">{labels.privacy}</a>
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">{labels.terms}</a>
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">{labels.contact}</a>
        </div>
      </div>
    </footer>
  );
}