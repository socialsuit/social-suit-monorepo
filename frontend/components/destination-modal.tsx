"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Search, Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

interface DestinationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DestinationModal({ isOpen, onClose }: DestinationModalProps) {
  const [selectedDestination, setSelectedDestination] = useState<'suit-manager' | 'suit-research' | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleDestinationSelect = async (destination: 'suit-manager' | 'suit-research') => {
    setSelectedDestination(destination)
    setIsNavigating(true)
    
    // Simulate navigation delay for smooth UX
    setTimeout(() => {
      if (destination === 'suit-manager') {
        router.push('/dashboard')
      } else {
        router.push('/research')
      }
      onClose()
    }, 1000)
  }

  const destinations = [
    {
      id: 'suit-manager' as const,
      title: 'Suit Manager',
      description: 'Manage your social media presence with powerful automation tools',
      features: ['Content Scheduling', 'Analytics Dashboard', 'Team Collaboration', 'Auto-Engagement'],
      icon: BarChart3,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      badge: 'Most Popular'
    },
    {
      id: 'suit-research' as const,
      title: 'Suit Research',
      description: 'Discover trends, analyze competitors, and find viral content opportunities',
      features: ['Trend Analysis', 'Competitor Insights', 'Content Discovery', 'Market Research'],
      icon: Search,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
      badge: 'New'
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Where do you want to go?
          </DialogTitle>
          <DialogDescription className="text-lg text-slate-600 dark:text-slate-400 mt-2">
            Choose your destination to get started with SocialSuit
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {destinations.map((destination) => {
            const Icon = destination.icon
            const isSelected = selectedDestination === destination.id
            const isLoading = isNavigating && isSelected

            return (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: destination.id === 'suit-manager' ? 0 : 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all duration-300 border-2 hover:shadow-xl ${
                    isSelected 
                      ? 'border-blue-500 dark:border-blue-400 shadow-lg' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  } ${destination.bgGradient}`}
                  onClick={() => !isNavigating && handleDestinationSelect(destination.id)}
                >
                  {destination.badge && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <Badge className={`bg-gradient-to-r ${destination.gradient} text-white border-0 shadow-lg`}>
                        {destination.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${destination.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          {destination.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {destination.description}
                    </CardDescription>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Features:</h4>
                      <ul className="space-y-1">
                        {destination.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className={`w-full mt-4 bg-gradient-to-r ${destination.gradient} hover:opacity-90 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl`}
                      disabled={isNavigating}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Loading...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Go to {destination.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You can always switch between these tools from your dashboard
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}