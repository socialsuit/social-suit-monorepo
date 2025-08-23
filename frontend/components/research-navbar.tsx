"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Calendar, Coins, Building2, Gift, ArrowUpDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ResearchNavbarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const navigationTabs = [
  { id: "coins", label: "Coins", icon: Coins },
  { id: "fundraising", label: "Fundraising", icon: TrendingUp },
  { id: "ido-ico", label: "IDO/ICO", icon: Calendar },
  { id: "exchanges", label: "Exchanges", icon: Building2 },
  { id: "token-unlocks", label: "Token Unlocks", icon: ArrowUpDown },
  { id: "airdrops", label: "Airdrops", icon: Gift },
]

export default function ResearchNavbar({ activeTab = "coins", onTabChange }: ResearchNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50"
    >
      {/* Top Header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/research" className="flex items-center space-x-3">
            <Image
              src="/mylogo.jpg"
              alt="SocialSuit Logo"
              width={32}
              height={32}
              className="rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialSuit
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                Research
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search coins, projects, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors h-10"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                Dashboard
              </Button>
            </Link>
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hidden sm:flex">
              Live Data
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search coins, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors h-9"
          />
        </div>
      </div>
    </motion.nav>
  )
}