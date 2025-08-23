"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

// Social platform icons (using Lucide icons as placeholders)
const socialPlatforms = [
  { name: "X", icon: "𝕏", color: "text-black dark:text-white" },
  { name: "Instagram", icon: "📷", color: "text-pink-500" },
  { name: "Facebook", icon: "📘", color: "text-blue-600" },
  { name: "LinkedIn", icon: "💼", color: "text-blue-700" },
  { name: "Telegram", icon: "✈️", color: "text-blue-500" },
  { name: "TikTok", icon: "🎵", color: "text-black dark:text-white" },
  { name: "YouTube", icon: "📺", color: "text-red-600" },
  { name: "Farcaster", icon: "🟣", color: "text-purple-600" }
]

const services = [
  {
    id: "social-accounts",
    name: "Social Accounts",
    icon: Users,
    description: "Connect your social platforms",
    badge: "8 platforms"
  },
  {
    id: "ai-content",
    name: "AI Content Generator",
    icon: Sparkles,
    description: "Generate engaging content with AI",
    badge: "New"
  },
  {
    id: "ab-testing",
    name: "A/B Testing",
    icon: TestTube,
    description: "Test and optimize your posts",
    badge: "Pro"
  },
  {
    id: "post-customizer",
    name: "Post Customizer",
    icon: Palette,
    description: "Customize posts per platform",
    badge: null
  },
  {
    id: "image-generator",
    name: "Image Generator",
    icon: ImageIcon,
    description: "Create stunning visuals",
    badge: "AI"
  },
  {
    id: "smart-scheduler",
    name: "Smart Scheduler",
    icon: Calendar,
    description: "Schedule posts intelligently",
    badge: "Smart"
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    icon: BarChart3,
    description: "Track performance metrics",
    badge: null
  },
  {
    id: "post-recycle",
    name: "Post Recycle",
    icon: RotateCcw,
    description: "Reuse your best content",
    badge: "Auto"
  },
  {
    id: "engagement",
    name: "Engagement Dashboard",
    icon: Heart,
    description: "Monitor audience engagement",
    badge: "Live"
  }
]

interface DashboardSidebarProps {
  activeService: string
  onServiceChange: (serviceId: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export default function DashboardSidebar({
  activeService,
  onServiceChange,
  collapsed = false,
  onToggleCollapse
}: DashboardSidebarProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-72"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Suit Manager
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Social Media Management
              </p>
            </motion.div>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Social Platforms */}
      {!collapsed && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Connected Platforms
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {socialPlatforms.map((platform) => (
              <motion.div
                key={platform.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                title={platform.name}
              >
                <span className={cn("text-lg", platform.color)}>
                  {platform.icon}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Services */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {services.map((service) => {
            const Icon = service.icon
            const isActive = activeService === service.id
            
            return (
              <motion.div
                key={service.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-3 transition-all duration-200",
                    collapsed ? "px-2" : "px-3",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  )}
                  onClick={() => onServiceChange(service.id)}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    collapsed ? "" : "mr-3",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                  )} />
                  {!collapsed && (
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{service.name}</span>
                        {service.badge && (
                          <Badge
                            variant={isActive ? "default" : "secondary"}
                            className="text-xs h-5 px-2"
                          >
                            {service.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  )}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        {!collapsed ? (
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SocialSuit Pro
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              v2.1.0
            </p>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto" />
        )}
      </div>
    </motion.div>
  )
}