"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import DashboardMainContent from "@/components/dashboard-main-content"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children?: React.ReactNode
  defaultService?: string
}

export default function DashboardLayout({ children, defaultService = "social-accounts" }: DashboardLayoutProps) {
  const [activeService, setActiveService] = useState(defaultService)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleServiceChange = (serviceId: string) => {
    setActiveService(serviceId)
    // Close mobile menu when service is selected
    setMobileMenuOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
          activeService={activeService}
          onServiceChange={handleServiceChange}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full z-50 lg:hidden"
            >
              <DashboardSidebar
                activeService={activeService}
                onServiceChange={handleServiceChange}
                collapsed={false}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader
          onMenuToggle={toggleMobileMenu}
          showMenuButton={true}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children || (
            <DashboardMainContent activeService={activeService} />
          )}
        </main>
      </div>
    </div>
  )
}