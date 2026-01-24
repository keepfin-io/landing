import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">Keepfind</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Özellikler</Button>
          <a href="https://keepfin.tariksogukpinar.dev/login">
            <Button>Giriş Yap</Button>
          </a>
        </div>
      </div>
    </nav>
  );
}