"use client";

import { PremiumNavigation } from "@/components/premium-navigation";
import { PremiumHero } from "@/components/premium-hero";
import { PremiumPricing } from "@/components/premium-pricing";
import { PremiumFAQ } from "@/components/premium-faq";
import { PremiumFooter } from "@/components/premium-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Premium Navigation */}
      <PremiumNavigation />
      
      {/* Main Content */}
      <main className="pt-16"> {/* Add padding-top to account for fixed navigation */}
        {/* Hero Section */}
        <PremiumHero />
        
        {/* Pricing Section */}
        <PremiumPricing />
        
        {/* FAQ Section */}
        <PremiumFAQ />
      </main>
      
      {/* Premium Footer */}
      <PremiumFooter />
    </div>
  );
}


