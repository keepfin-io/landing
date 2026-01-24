import React from 'react';
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Wallet className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Keepfind. Tüm hakları saklıdır.
          </p>
        </div>
        <div className="flex gap-4">
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">Gizlilik</a>
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">Kullanım Şartları</a>
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">İletişim</a>
        </div>
      </div>
    </footer>
  );
}