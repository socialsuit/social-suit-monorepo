"use client"

import { motion } from "framer-motion"
import { Calendar, MessageCircle, BarChart2, Zap, Globe, Repeat } from "lucide-react"

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Smart Post Scheduler",
    description:
      "AI-powered scheduling that analyzes your audience to determine the best times to post for maximum engagement.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Auto-Replies & AI Engagement",
    description: "Let AI handle routine interactions while you focus on meaningful conversations with your audience.",
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "A/B Testing & Post Recycling",
    description: "Test different content variations and automatically recycle your best-performing posts.",
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Deep Analytics Dashboard",
    description: "Comprehensive insights into your social media performance with actionable recommendations.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "10+ Platform Integrations",
    description:
      "Connect with all major social platforms including Twitter, Instagram, LinkedIn, Facebook, TikTok, and Web3.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "AI Content Generation",
    description: "Generate engaging social media content with our advanced AI that matches your brand voice.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Modern Social Media Management
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage, analyze, and grow your social media presence with the power of AI.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
