"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, BarChart3, Zap } from "lucide-react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>New AI Features Released</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              AI-Powered Social Media Automation. <span className="text-primary">Smarter, Faster, Better.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
              Manage all your social media accounts in one place with AI-powered insights, scheduling, and engagement
              tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Try Free
              </Button>
              <Button size="lg" variant="outline">
                Book Demo
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4 text-primary"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4 text-primary"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                14-day free trial
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-primary/30 blur-3xl dark:bg-primary/20" />
              <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-secondary/30 blur-3xl dark:bg-secondary/20" />
              <div className="relative rounded-xl border border-gray-200 bg-white/80 p-4 shadow-xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Content Calendar</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">AI Optimized</span>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 py-4">
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-md text-sm ${
                        [3, 7, 12, 18, 24, 29].includes(i)
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      } ${i === 15 ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-950" : ""}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-3">
                  <div className="flex items-center gap-3 rounded-md border border-gray-100 p-3 dark:border-gray-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Auto-Replies</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">AI responds to comments</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border border-gray-100 p-3 dark:border-gray-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Analytics</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">+27% engagement this week</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border border-gray-100 p-3 dark:border-gray-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">AI Suggestions</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">3 new content ideas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
