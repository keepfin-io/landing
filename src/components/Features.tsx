import React from 'react';
import { LineChart, Globe, Wallet, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Çoklu Varlık Yönetimi",
    description: "Hisse senetleri, ETF'ler, Kripto paralar ve Nakit. Tüm varlık sınıflarını tek bir portföyde birleştirin."
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: "Derinlemesine Analiz",
    description: "Portföy performansınızı, sektörel dağılımınızı ve risk analizinizi detaylı grafiklerle inceleyin."
  },
  {
    icon: <Wallet className="h-10 w-10 text-primary" />,
    title: "Net Değer Takibi",
    description: "Varlıklarınız ve borçlarınız arasındaki dengeyi kurun. Kişisel net değerinizin zamanla büyümesini izleyin."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Gizlilik Odaklı",
    description: "Verileriniz sizin kontrolünüzde. Anonim mod ve yerel şifreleme ile finansal gizliliğinizi koruyun."
  }
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Neden Keepfind?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Paranızı yönetmenin en kolay ve güvenli yolu.
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