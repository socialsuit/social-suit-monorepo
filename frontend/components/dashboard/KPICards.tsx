// ============================================================================
// KPI Cards Component
// ============================================================================

import { useEffect, useState } from 'react';

// ============================================================================
// Types
// ============================================================================

interface KPICardsProps {
  timeRange: string;
}

interface KPIData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: string;
}

// ============================================================================
// KPI Cards Component
// ============================================================================

export const KPICards: React.FC<KPICardsProps> = ({ timeRange }) => {
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================================================================
  // Mock Data Generation
  // ============================================================================

  useEffect(() => {
    // Simulate API call
    const fetchKPIData = async () => {
      setLoading(true);
      
      // Mock data based on time range
      const mockData: KPIData[] = [
        {
          label: 'Total Followers',
          value: timeRange === '24h' ? '12.4K' : timeRange === '7d' ? '12.8K' : '15.2K',
          change: timeRange === '24h' ? 2.1 : timeRange === '7d' ? 5.4 : 12.3,
          changeLabel: `vs last ${timeRange}`,
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          color: 'blue',
        },
        {
          label: 'Engagement Rate',
          value: timeRange === '24h' ? '4.2%' : timeRange === '7d' ? '4.8%' : '5.1%',
          change: timeRange === '24h' ? 0.3 : timeRange === '7d' ? 1.2 : 2.1,
          changeLabel: `vs last ${timeRange}`,
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ),
          color: 'green',
        },
        {
          label: 'Posts Published',
          value: timeRange === '24h' ? '3' : timeRange === '7d' ? '18' : '72',
          change: timeRange === '24h' ? -1 : timeRange === '7d' ? 2 : 8,
          changeLabel: `vs last ${timeRange}`,
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          color: 'purple',
        },
        {
          label: 'Reach',
          value: timeRange === '24h' ? '8.2K' : timeRange === '7d' ? '45.6K' : '156.8K',
          change: timeRange === '24h' ? 15.2 : timeRange === '7d' ? 23.1 : 18.7,
          changeLabel: `vs last ${timeRange}`,
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ),
          color: 'orange',
        },
      ];

      // Simulate loading delay
      setTimeout(() => {
        setKpiData(mockData);
        setLoading(false);
      }, 500);
    };

    fetchKPIData();
  }, [timeRange]);

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-200',
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        border: 'border-green-200',
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        border: 'border-purple-200',
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        border: 'border-orange-200',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  // ============================================================================
  // Loading State
  // ============================================================================

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="w-16 h-4 bg-gray-200 rounded" />
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded mb-2" />
              <div className="w-24 h-4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ============================================================================
  // Render Component
  // ============================================================================

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => {
        const colors = getColorClasses(kpi.color);
        const isPositive = kpi.change >= 0;
        
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${colors.bg} ${colors.border} border rounded-lg flex items-center justify-center`}>
                <div className={colors.icon}>
                  {kpi.icon}
                </div>
              </div>
              
              <div className={`flex items-center space-x-1 text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
                <span className="font-medium">
                  {Math.abs(kpi.change)}%
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {kpi.value}
              </div>
              <div className="text-sm text-gray-600">
                {kpi.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {kpi.changeLabel}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};