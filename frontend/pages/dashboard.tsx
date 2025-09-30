// ============================================================================
// Dashboard Page - Premium SaaS Design
// ============================================================================

import { useState } from 'react';
import { NextPage } from 'next';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { KPICards } from '../components/dashboard/KPICards';
import { QuickComposer } from '../components/dashboard/QuickComposer';
import { ActivityStream } from '../components/dashboard/ActivityStream';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { ConnectedPlatforms } from '../components/dashboard/ConnectedPlatforms';
import { UpcomingPosts } from '../components/dashboard/UpcomingPosts';

// ============================================================================
// Dashboard Page Component
// ============================================================================

const DashboardPage: NextPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // ============================================================================
  // Render Component
  // ============================================================================

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back! Here's what's happening with your social media.
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <KPICards timeRange={selectedTimeRange} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Composer */}
            <QuickComposer />
            
            {/* Performance Chart */}
            <PerformanceChart timeRange={selectedTimeRange} />
            
            {/* Activity Stream */}
            <ActivityStream />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Connected Platforms */}
            <ConnectedPlatforms />
            
            {/* Upcoming Posts */}
            <UpcomingPosts />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;