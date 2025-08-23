"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ResearchNavbar from "@/components/research-navbar"
import ResearchMarketOverview from "@/components/research-market-overview"
import ResearchAllCoinsTable from "@/components/research-all-coins-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Calendar, Gift, Building2, ArrowUpDown, Target } from "lucide-react"

interface ResearchLayoutProps {
  defaultTab?: string
}

const tabComponents = {
  coins: {
    title: "All Coins",
    component: ResearchAllCoinsTable
  },
  fundraising: {
    title: "Fundraising",
    component: () => <PlaceholderSection title="Fundraising" description="Recent funding rounds and investment data" icon={TrendingUp} />
  },
  "ido-ico": {
    title: "IDO/ICO",
    component: () => <PlaceholderSection title="IDO/ICO" description="Initial DEX and coin offerings" icon={Calendar} />
  },
  exchanges: {
    title: "Exchanges",
    component: () => <PlaceholderSection title="Exchanges" description="Cryptocurrency exchange data" icon={Building2} />
  },
  "token-unlocks": {
    title: "Token Unlocks",
    component: () => <PlaceholderSection title="Token Unlocks" description="Upcoming token unlock schedules" icon={ArrowUpDown} />
  },
  airdrops: {
    title: "Airdrops",
    component: () => <PlaceholderSection title="Airdrops" description="Active and upcoming airdrops" icon={Gift} />
  }
}

function PlaceholderSection({ title, description, icon: Icon }: { title: string; description: string; icon: any }) {
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
      <CardContent className="p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
            <Icon className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {description}
            </p>
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Coming Soon
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AdditionalTables() {
  const tables = [
    { id: "ath", title: "All-Time High", description: "Coins near their ATH" },
    { id: "gainers", title: "Top Gainers", description: "24h price gainers" },
    { id: "losers", title: "Top Losers", description: "24h price losers" },
    { id: "ido-roi", title: "IDO/ICO ROI", description: "Investment returns" },
    { id: "categories", title: "Categories", description: "Sector performance" },
    { id: "ecosystems", title: "Ecosystems", description: "Blockchain ecosystems" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Market Tables
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive market analysis and performance data
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table, index) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {table.title}
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {table.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    Coming Soon
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FundingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Funding & IDO
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Investment rounds and token launch data
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Funding Rounds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Latest investment and funding data
              </p>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Coming Soon
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Upcoming IDO/ICO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Scheduled token launches and offerings
              </p>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Coming Soon
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AirdropsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Airdrops
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Active, ended, and confirmed airdrop opportunities
        </p>
      </div>
      
      <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
        <CardContent className="p-12 text-center">
          <Gift className="h-16 w-16 text-slate-400 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Airdrop Tracker
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Track active airdrops, eligibility requirements, and claim status
          </p>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Coming Soon
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

function TrendingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Trending Coins
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Most searched and discussed cryptocurrencies
        </p>
      </div>
      
      <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
        <CardContent className="p-12 text-center">
          <Target className="h-16 w-16 text-slate-400 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Trending Analysis
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Real-time trending coins with social sentiment and price data
          </p>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Coming Soon
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResearchLayout({ defaultTab = "coins" }: ResearchLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const ActiveComponent = tabComponents[activeTab as keyof typeof tabComponents]?.component || ResearchAllCoinsTable

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ResearchNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Market Overview - Always visible */}
        <ResearchMarketOverview />
        
        {/* Active Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveComponent />
        </motion.div>
        
        {/* Additional Sections - Only show on coins tab */}
        {activeTab === "coins" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-12"
          >
            <AdditionalTables />
            <FundingSection />
            <AirdropsSection />
            <TrendingSection />
          </motion.div>
        )}
      </main>
    </div>
  )
}