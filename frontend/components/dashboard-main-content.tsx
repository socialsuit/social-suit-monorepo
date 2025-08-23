"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Sparkles,
  TestTube,
  Palette,
  ImageIcon,
  Calendar,
  BarChart3,
  RotateCcw,
  Heart,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardMainContentProps {
  activeService: string
}

const serviceContent = {
  "social-accounts": {
    title: "Social Accounts",
    description: "Connect and manage all your social media platforms",
    icon: Users,
    cards: [
      {
        title: "Connected Platforms",
        description: "8 platforms connected",
        value: "8/10",
        trend: "+2 this month",
        color: "bg-blue-50 dark:bg-blue-950/50",
        iconColor: "text-blue-600"
      },
      {
        title: "Account Health",
        description: "All accounts active",
        value: "100%",
        trend: "Excellent",
        color: "bg-green-50 dark:bg-green-950/50",
        iconColor: "text-green-600"
      },
      {
        title: "Quick Connect",
        description: "Add new platform",
        value: "+ Add",
        trend: "2 available",
        color: "bg-purple-50 dark:bg-purple-950/50",
        iconColor: "text-purple-600"
      }
    ]
  },
  "ai-content": {
    title: "AI Content Generator",
    description: "Generate engaging content with artificial intelligence",
    icon: Sparkles,
    cards: [
      {
        title: "Content Generated",
        description: "This month",
        value: "247",
        trend: "+23% vs last month",
        color: "bg-yellow-50 dark:bg-yellow-950/50",
        iconColor: "text-yellow-600"
      },
      {
        title: "AI Models",
        description: "Available models",
        value: "5",
        trend: "GPT-4, Claude, Gemini",
        color: "bg-indigo-50 dark:bg-indigo-950/50",
        iconColor: "text-indigo-600"
      },
      {
        title: "Generate New",
        description: "Create content now",
        value: "Start",
        trend: "Ready to use",
        color: "bg-pink-50 dark:bg-pink-950/50",
        iconColor: "text-pink-600"
      }
    ]
  },
  "ab-testing": {
    title: "A/B Testing",
    description: "Test and optimize your content performance",
    icon: TestTube,
    cards: [
      {
        title: "Active Tests",
        description: "Currently running",
        value: "12",
        trend: "3 ending soon",
        color: "bg-orange-50 dark:bg-orange-950/50",
        iconColor: "text-orange-600"
      },
      {
        title: "Win Rate",
        description: "Test success rate",
        value: "78%",
        trend: "+5% improvement",
        color: "bg-emerald-50 dark:bg-emerald-950/50",
        iconColor: "text-emerald-600"
      },
      {
        title: "Create Test",
        description: "New A/B test",
        value: "+ New",
        trend: "Quick setup",
        color: "bg-cyan-50 dark:bg-cyan-950/50",
        iconColor: "text-cyan-600"
      }
    ]
  },
  "post-customizer": {
    title: "Post Customizer",
    description: "Customize posts for each platform",
    icon: Palette,
    cards: [
      {
        title: "Templates",
        description: "Available designs",
        value: "156",
        trend: "12 new this week",
        color: "bg-violet-50 dark:bg-violet-950/50",
        iconColor: "text-violet-600"
      },
      {
        title: "Customizations",
        description: "This month",
        value: "89",
        trend: "+34% vs last month",
        color: "bg-rose-50 dark:bg-rose-950/50",
        iconColor: "text-rose-600"
      },
      {
        title: "Customize Now",
        description: "Start designing",
        value: "Create",
        trend: "Drag & drop editor",
        color: "bg-teal-50 dark:bg-teal-950/50",
        iconColor: "text-teal-600"
      }
    ]
  },
  "image-generator": {
    title: "Image Generator",
    description: "Create stunning visuals with AI",
    icon: ImageIcon,
    cards: [
      {
        title: "Images Created",
        description: "This month",
        value: "342",
        trend: "+67% vs last month",
        color: "bg-blue-50 dark:bg-blue-950/50",
        iconColor: "text-blue-600"
      },
      {
        title: "AI Styles",
        description: "Available styles",
        value: "24",
        trend: "Photorealistic, Art, etc.",
        color: "bg-purple-50 dark:bg-purple-950/50",
        iconColor: "text-purple-600"
      },
      {
        title: "Generate Image",
        description: "Create new visual",
        value: "+ Create",
        trend: "HD quality",
        color: "bg-green-50 dark:bg-green-950/50",
        iconColor: "text-green-600"
      }
    ]
  },
  "smart-scheduler": {
    title: "Smart Scheduler",
    description: "Schedule posts at optimal times",
    icon: Calendar,
    cards: [
      {
        title: "Scheduled Posts",
        description: "Next 7 days",
        value: "28",
        trend: "Optimal timing",
        color: "bg-indigo-50 dark:bg-indigo-950/50",
        iconColor: "text-indigo-600"
      },
      {
        title: "Best Times",
        description: "Peak engagement",
        value: "3 PM",
        trend: "Weekdays average",
        color: "bg-yellow-50 dark:bg-yellow-950/50",
        iconColor: "text-yellow-600"
      },
      {
        title: "Schedule Post",
        description: "Add to queue",
        value: "+ Schedule",
        trend: "AI-powered timing",
        color: "bg-orange-50 dark:bg-orange-950/50",
        iconColor: "text-orange-600"
      }
    ]
  },
  "analytics": {
    title: "Analytics Dashboard",
    description: "Track performance across all platforms",
    icon: BarChart3,
    cards: [
      {
        title: "Total Reach",
        description: "Last 30 days",
        value: "2.4M",
        trend: "+18% vs last month",
        color: "bg-emerald-50 dark:bg-emerald-950/50",
        iconColor: "text-emerald-600"
      },
      {
        title: "Engagement Rate",
        description: "Average across platforms",
        value: "4.2%",
        trend: "+0.8% improvement",
        color: "bg-blue-50 dark:bg-blue-950/50",
        iconColor: "text-blue-600"
      },
      {
        title: "Top Performer",
        description: "Best performing post",
        value: "Instagram",
        trend: "125K interactions",
        color: "bg-pink-50 dark:bg-pink-950/50",
        iconColor: "text-pink-600"
      }
    ]
  },
  "post-recycle": {
    title: "Post Recycle",
    description: "Reuse your best performing content",
    icon: RotateCcw,
    cards: [
      {
        title: "Recycled Posts",
        description: "This month",
        value: "45",
        trend: "High performance",
        color: "bg-cyan-50 dark:bg-cyan-950/50",
        iconColor: "text-cyan-600"
      },
      {
        title: "Success Rate",
        description: "Recycled content",
        value: "92%",
        trend: "Excellent results",
        color: "bg-green-50 dark:bg-green-950/50",
        iconColor: "text-green-600"
      },
      {
        title: "Auto Recycle",
        description: "Set up automation",
        value: "Enable",
        trend: "Smart selection",
        color: "bg-violet-50 dark:bg-violet-950/50",
        iconColor: "text-violet-600"
      }
    ]
  },
  "engagement": {
    title: "Engagement Dashboard",
    description: "Monitor and boost audience engagement",
    icon: Heart,
    cards: [
      {
        title: "Total Engagement",
        description: "Last 30 days",
        value: "156K",
        trend: "+24% vs last month",
        color: "bg-red-50 dark:bg-red-950/50",
        iconColor: "text-red-600"
      },
      {
        title: "Response Time",
        description: "Average reply time",
        value: "12m",
        trend: "Faster than 89% of accounts",
        color: "bg-blue-50 dark:bg-blue-950/50",
        iconColor: "text-blue-600"
      },
      {
        title: "Auto Engage",
        description: "Smart interactions",
        value: "Active",
        trend: "AI-powered responses",
        color: "bg-purple-50 dark:bg-purple-950/50",
        iconColor: "text-purple-600"
      }
    ]
  }
}

export default function DashboardMainContent({ activeService }: DashboardMainContentProps) {
  const content = serviceContent[activeService as keyof typeof serviceContent]
  
  if (!content) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Service Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The selected service is not available.
          </p>
        </div>
      </div>
    )
  }

  const Icon = content.icon

  return (
    <motion.div
      key={activeService}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {content.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {content.description}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {content.cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  card.color
                )}>
                  <Icon className={cn("h-6 w-6", card.iconColor)} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {card.value}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {card.trend}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Get Started
        </Button>
        <Button variant="outline">
          <BarChart3 className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </motion.div>
  )
}

function Settings({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}