// ============================================================================
// Performance Chart Component
// ============================================================================

import { useState, useEffect } from 'react';
import { PlatformUtils } from '../../lib/oauth';
import { Platform } from '../../lib/types';

// ============================================================================
// Types
// ============================================================================

interface ChartDataPoint {
  date: string;
  value: number;
  platform?: Platform;
}

interface PerformanceData {
  engagement: ChartDataPoint[];
  reach: ChartDataPoint[];
  followers: ChartDataPoint[];
  posts: ChartDataPoint[];
}

interface PerformanceChartProps {
  timeRange: '7d' | '30d' | '90d';
  className?: string;
}

type MetricType = 'engagement' | 'reach' | 'followers' | 'posts';

// ============================================================================
// Performance Chart Component
// ============================================================================

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  timeRange, 
  className = '' 
}) => {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('engagement');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);

  // ============================================================================
  // Mock Data Generation
  // ============================================================================

  useEffect(() => {
    const generateMockData = (): PerformanceData => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const dates = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        return date.toISOString().split('T')[0];
      });

      const generateDataPoints = (baseValue: number, variance: number): ChartDataPoint[] => {
        return dates.map(date => ({
          date,
          value: Math.max(0, baseValue + (Math.random() - 0.5) * variance)
        }));
      };

      return {
        engagement: generateDataPoints(1200, 400),
        reach: generateDataPoints(8500, 2000),
        followers: generateDataPoints(150, 50),
        posts: generateDataPoints(3, 2)
      };
    };

    // Simulate API call
    setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 500);
  }, [timeRange]);

  // ============================================================================
  // Chart Rendering Functions
  // ============================================================================

  const getMetricConfig = (metric: MetricType) => {
    switch (metric) {
      case 'engagement':
        return {
          label: 'Engagement',
          color: '#3B82F6',
          gradient: 'from-blue-500/20 to-transparent',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )
        };
      case 'reach':
        return {
          label: 'Reach',
          color: '#10B981',
          gradient: 'from-green-500/20 to-transparent',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )
        };
      case 'followers':
        return {
          label: 'New Followers',
          color: '#8B5CF6',
          gradient: 'from-purple-500/20 to-transparent',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        };
      case 'posts':
        return {
          label: 'Posts Published',
          color: '#F59E0B',
          gradient: 'from-yellow-500/20 to-transparent',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )
        };
    }
  };

  const formatValue = (value: number, metric: MetricType) => {
    if (metric === 'posts') {
      return Math.round(value).toString();
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return Math.round(value).toString();
  };

  const renderChart = () => {
    if (!data) return null;

    const chartData = data[selectedMetric];
    const config = getMetricConfig(selectedMetric);
    
    const maxValue = Math.max(...chartData.map(d => d.value));
    const minValue = Math.min(...chartData.map(d => d.value));
    const valueRange = maxValue - minValue;
    
    const chartWidth = 600;
    const chartHeight = 200;
    const padding = 40;
    
    const xStep = (chartWidth - padding * 2) / (chartData.length - 1);
    
    // Generate path for the line
    const pathData = chartData.map((point, index) => {
      const x = padding + index * xStep;
      const y = chartHeight - padding - ((point.value - minValue) / valueRange) * (chartHeight - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    // Generate path for the area fill
    const areaData = `${pathData} L ${padding + (chartData.length - 1) * xStep} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`;

    return (
      <div className="relative">
        <svg 
          width="100%" 
          height={chartHeight} 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
            <linearGradient id={`gradient-${selectedMetric}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={config.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Area fill */}
          <path
            d={areaData}
            fill={`url(#gradient-${selectedMetric})`}
            className="transition-all duration-300"
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={config.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
          
          {/* Data points */}
          {chartData.map((point, index) => {
            const x = padding + index * xStep;
            const y = chartHeight - padding - ((point.value - minValue) / valueRange) * (chartHeight - padding * 2);
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={config.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:r-6 transition-all duration-200"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>
        
        {/* Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
            <div className="text-sm font-medium text-gray-900">
              {formatValue(hoveredPoint.value, selectedMetric)} {config.label}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(hoveredPoint.date).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // Loading State
  // ============================================================================

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="flex space-x-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="w-full h-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // ============================================================================
  // Render Component
  // ============================================================================

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          
          {/* Metric Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['engagement', 'reach', 'followers', 'posts'] as MetricType[]).map((metric) => {
              const config = getMetricConfig(metric);
              const isSelected = selectedMetric === metric;
              
              return (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span style={{ color: isSelected ? config.color : undefined }}>
                    {config.icon}
                  </span>
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <div className="mb-4">
          {renderChart()}
        </div>

        {/* Summary Stats */}
        {data && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatValue(
                  data[selectedMetric].reduce((sum, point) => sum + point.value, 0) / data[selectedMetric].length,
                  selectedMetric
                )}
              </div>
              <div className="text-sm text-gray-500">Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatValue(Math.max(...data[selectedMetric].map(d => d.value)), selectedMetric)}
              </div>
              <div className="text-sm text-gray-500">Peak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatValue(
                  data[selectedMetric].reduce((sum, point) => sum + point.value, 0),
                  selectedMetric
                )}
              </div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};