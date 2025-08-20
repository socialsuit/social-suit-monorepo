"use client";

import Hero from "@/components/hero";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import DashboardPreview from "@/components/dashboard-preview";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
          >
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
            <path d="M7 7h.01" />
          </svg>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Social Suit
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            Features
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            Testimonials
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            Pricing
          </a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            FAQ
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            Blog
          </a>
        </nav>

        {/* CTA + Sign in */}
        <div className="flex items-center gap-3">
          <span
            onClick={() => router.push("/login")}
            className="hidden md:inline-flex text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary cursor-pointer"
          >
            Sign in
          </span>
          <a
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white dark:text-black shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Main sections */}
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}


