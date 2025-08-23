"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketMetric {
  id: string
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ComponentType<any>
  description?: string
}

const marketMetrics: MarketMetric[] = [
  {
    id: "market-cap",
    title: "Total Market Cap",
    value: "$2.45T",
    change: "+2.34%",
    changeType: "positive",
    icon: DollarSign,
    description: "24h change"
  },
  {
    id: "fear-greed",
    title: "Fear & Greed Index",
    value: "72",
    change: "Greed",
    changeType: "positive",
    icon: Activity,
    description: "Market sentiment"
  },
  {
    id: "token-unlocks",
    title: "24h Token Unlocks",
    value: "$847M",
    change: "-12.5%",
    changeType: "negative",
    icon: Unlock,
    description: "vs yesterday"
  },
  {
    id: "altcoin-index",
    title: "Altcoin Index",
    value: "45.2",
    change: "+5.8%",
    changeType: "positive",
    icon: TrendingUp,
    description: "24h change"
  },
  {
    id: "btc-dominance",
    title: "Bitcoin Dominance",
    value: "54.7%",
    change: "-0.3%",
    changeType: "negative",
    icon: PieChart,
    description: "Market share"
  }
]

export default function ResearchMarketOverview() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Market Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Real-time cryptocurrency market data and sentiment
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          Live
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {marketMetrics.map((metric, index) => {
          const Icon = metric.icon
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "p-2 rounded-lg",
                      metric.changeType === "positive" 
                        ? "bg-green-100 dark:bg-green-900/20" 
                        : metric.changeType === "negative"
                        ? "bg-red-100 dark:bg-red-900/20"
                        : "bg-slate-100 dark:bg-slate-800"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5",
                        metric.changeType === "positive" 
                          ? "text-green-600 dark:text-green-400" 
                          : metric.changeType === "negative"
                          ? "text-red-600 dark:text-red-400"
                          : "text-slate-600 dark:text-slate-400"
                      )} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {metric.title}
                    </h3>
                    
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {metric.value}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        {metric.changeType === "positive" ? (
                          <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                        ) : metric.changeType === "negative" ? (
                          <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                        ) : null}
                        
                        <span className={cn(
                          "text-sm font-medium",
                          metric.changeType === "positive" 
                            ? "text-green-600 dark:text-green-400" 
                            : metric.changeType === "negative"
                            ? "text-red-600 dark:text-red-400"
                            : "text-slate-600 dark:text-slate-400"
                        )}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    
                    {metric.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        {metric.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}