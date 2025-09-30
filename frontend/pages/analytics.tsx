// ============================================================================
// Analytics Page - Comprehensive Performance Dashboard
// ============================================================================

import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PlatformUtils } from '../lib/oauth';
import { Platform } from '../lib/types';

// ============================================================================
// Types
// ============================================================================

interface AnalyticsData {
  platform: Platform;
  metrics: {
    followers: number;
    engagement: number;
    reach: number;
    impressions: number;
    clicks: number;
    shares: number;
    comments: number;
    likes: number;
  };
  growth: {
    followers: number;
    engagement: number;
    reach: number;
  };
  topPosts: {
    id: string;
    content: string;
    engagement: number;
    reach: number;
    publishedAt: Date;
  }[];
}

interface TimeSeriesData {
  date: Date;
  engagement: number;
  reach: number;
  followers: number;
  clicks: number;
}

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  variants: {
    id: string;
    name: string;
    content: string;
    metrics: {
      impressions: number;
      clicks: number;
      engagement: number;
      conversions: number;
    };
  }[];
  startDate: Date;
  endDate?: Date;
  platform: Platform;
}

interface CompetitorData {
  name: string;
  platform: Platform;
  followers: number;
  engagement: number;
  postsPerWeek: number;
  avgLikes: number;
}

// ============================================================================
// Mock Data Generation
// ============================================================================

const generateMockAnalytics = (): AnalyticsData[] => {
  const platforms: Platform[] = ['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'];
  
  return platforms.map(platform => ({
    platform,
    metrics: {
      followers: Math.floor(Math.random() * 50000) + 1000,
      engagement: Math.random() * 8 + 2,
      reach: Math.floor(Math.random() * 100000) + 5000,
      impressions: Math.floor(Math.random() * 200000) + 10000,
      clicks: Math.floor(Math.random() * 5000) + 100,
      shares: Math.floor(Math.random() * 1000) + 50,
      comments: Math.floor(Math.random() * 500) + 25,
      likes: Math.floor(Math.random() * 2000) + 100
    },
    growth: {
      followers: (Math.random() - 0.5) * 20,
      engagement: (Math.random() - 0.5) * 15,
      reach: (Math.random() - 0.5) * 25
    },
    topPosts: Array.from({ length: 3 }, (_, i) => ({
      id: `post-${platform}-${i}`,
      content: [
        "🚀 Exciting product update! Our latest feature is now live and ready to transform your workflow.",
        "Behind the scenes: Here's how our team approaches creative problem-solving in the digital age.",
        "Industry insight: The future of social media marketing is all about authentic storytelling.",
        "Team spotlight: Celebrating our incredible marketing team for their outstanding work this quarter!",
        "Quick tip: Consistency beats perfection every time. Keep showing up and making progress!"
      ][Math.floor(Math.random() * 5)],
      engagement: Math.random() * 10 + 2,
      reach: Math.floor(Math.random() * 50000) + 1000,
      publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    }))
  }));
};

const generateTimeSeriesData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date,
      engagement: Math.random() * 8 + 2,
      reach: Math.floor(Math.random() * 10000) + 5000,
      followers: Math.floor(Math.random() * 100) + 1000,
      clicks: Math.floor(Math.random() * 500) + 50
    });
  }
  
  return data;
};

const generateABTests = (): ABTest[] => {
  return [
    {
      id: 'test-1',
      name: 'CTA Button Color Test',
      status: 'running',
      platform: 'facebook',
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      variants: [
        {
          id: 'variant-a',
          name: 'Blue CTA',
          content: 'Join thousands of satisfied customers! Click the blue button to get started today.',
          metrics: { impressions: 12500, clicks: 875, engagement: 7.2, conversions: 45 }
        },
        {
          id: 'variant-b',
          name: 'Orange CTA',
          content: 'Join thousands of satisfied customers! Click the orange button to get started today.',
          metrics: { impressions: 12800, clicks: 1024, engagement: 8.1, conversions: 62 }
        }
      ]
    },
    {
      id: 'test-2',
      name: 'Post Timing Experiment',
      status: 'completed',
      platform: 'instagram',
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      variants: [
        {
          id: 'variant-c',
          name: 'Morning Posts (9 AM)',
          content: 'Good morning! Start your day with inspiration and motivation.',
          metrics: { impressions: 8500, clicks: 425, engagement: 5.2, conversions: 28 }
        },
        {
          id: 'variant-d',
          name: 'Evening Posts (7 PM)',
          content: 'Evening reflection: What made your day special?',
          metrics: { impressions: 9200, clicks: 552, engagement: 6.8, conversions: 35 }
        }
      ]
    }
  ];
};

const generateCompetitorData = (): CompetitorData[] => {
  return [
    { name: 'Competitor A', platform: 'instagram', followers: 45000, engagement: 6.2, postsPerWeek: 5, avgLikes: 2800 },
    { name: 'Competitor B', platform: 'twitter', followers: 32000, engagement: 4.8, postsPerWeek: 12, avgLikes: 1540 },
    { name: 'Competitor C', platform: 'linkedin', followers: 28000, engagement: 7.1, postsPerWeek: 3, avgLikes: 1980 },
    { name: 'Competitor D', platform: 'facebook', followers: 52000, engagement: 5.5, postsPerWeek: 4, avgLikes: 2860 }
  ];
};

// ============================================================================
// Analytics Page Component
// ============================================================================

const AnalyticsPage: NextPage = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [abTests, setABTests] = useState<ABTest[]>([]);
  const [competitorData, setCompetitorData] = useState<CompetitorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'audience' | 'competitors' | 'ab-tests'>('overview');

  // ============================================================================
  // Data Loading
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData(generateMockAnalytics());
      setTimeSeriesData(generateTimeSeriesData());
      setABTests(generateABTests());
      setCompetitorData(generateCompetitorData());
      setLoading(false);
    };
    
    loadData();
  }, [dateRange]);

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getFilteredData = () => {
    if (selectedPlatform === 'all') {
      return analyticsData;
    }
    return analyticsData.filter(data => data.platform === selectedPlatform);
  };

  const getTotalMetrics = () => {
    const filtered = getFilteredData();
    return filtered.reduce((acc, data) => ({
      followers: acc.followers + data.metrics.followers,
      engagement: acc.engagement + data.metrics.engagement,
      reach: acc.reach + data.metrics.reach,
      impressions: acc.impressions + data.metrics.impressions
    }), { followers: 0, engagement: 0, reach: 0, impressions: 0 });
  };

  // ============================================================================
  // Chart Components
  // ============================================================================

  const renderLineChart = (data: TimeSeriesData[], metric: keyof TimeSeriesData) => {
    const maxValue = Math.max(...data.map(d => d[metric] as number));
    const minValue = Math.min(...data.map(d => d[metric] as number));
    const range = maxValue - minValue;
    
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 300;
      const y = 100 - (((d[metric] as number) - minValue) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-24" viewBox="0 0 300 100">
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points={points}
        />
        <defs>
          <linearGradient id={`gradient-${metric}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon
          fill={`url(#gradient-${metric})`}
          points={`0,100 ${points} 300,100`}
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const totalMetrics = getTotalMetrics();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Track performance, analyze trends, and optimize your social media strategy
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Platforms</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '90d')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'posts', name: 'Top Posts', icon: '📝' },
              { id: 'audience', name: 'Audience', icon: '👥' },
              { id: 'competitors', name: 'Competitors', icon: '🎯' },
              { id: 'ab-tests', name: 'A/B Tests', icon: '🧪' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Followers</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(totalMetrics.followers)}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  {renderLineChart(timeSeriesData, 'followers')}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                    <p className="text-2xl font-bold text-gray-900">{(totalMetrics.engagement / getFilteredData().length).toFixed(1)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  {renderLineChart(timeSeriesData, 'engagement')}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(totalMetrics.reach)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  {renderLineChart(timeSeriesData, 'reach')}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(totalMetrics.impressions)}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  {renderLineChart(timeSeriesData, 'clicks')}
                </div>
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h3>
                <div className="space-y-4">
                  {getFilteredData().map((data) => (
                    <div key={data.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: PlatformUtils.getColor(data.platform) }}
                        >
                          {PlatformUtils.getIcon(data.platform)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{data.platform}</h4>
                          <p className="text-sm text-gray-600">{formatNumber(data.metrics.followers)} followers</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Engagement</p>
                          <p className="font-semibold text-gray-900">{data.metrics.engagement.toFixed(1)}%</p>
                          <p className={`text-xs ${getGrowthColor(data.growth.engagement)}`}>
                            {formatPercentage(data.growth.engagement)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Reach</p>
                          <p className="font-semibold text-gray-900">{formatNumber(data.metrics.reach)}</p>
                          <p className={`text-xs ${getGrowthColor(data.growth.reach)}`}>
                            {formatPercentage(data.growth.reach)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Clicks</p>
                          <p className="font-semibold text-gray-900">{formatNumber(data.metrics.clicks)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Posts Tab */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Posts</h3>
              <div className="space-y-4">
                {getFilteredData().flatMap(data => 
                  data.topPosts.map(post => ({ ...post, platform: data.platform }))
                ).sort((a, b) => b.engagement - a.engagement).slice(0, 10).map((post) => (
                  <div key={post.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: PlatformUtils.getColor(post.platform) }}
                    >
                      {PlatformUtils.getIcon(post.platform)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 line-clamp-2 mb-2">{post.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{post.publishedAt.toLocaleDateString()}</span>
                        <span>{post.engagement.toFixed(1)}% engagement</span>
                        <span>{formatNumber(post.reach)} reach</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{post.engagement.toFixed(1)}%</div>
                      <div className="text-xs text-gray-500">engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Competitors Tab */}
        {activeTab === 'competitors' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Competitor Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Competitor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Platform
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Followers
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Engagement
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posts/Week
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Likes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {competitorData.map((competitor, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {competitor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-6 h-6 rounded text-white text-xs flex items-center justify-center"
                              style={{ backgroundColor: PlatformUtils.getColor(competitor.platform) }}
                            >
                              {PlatformUtils.getIcon(competitor.platform)}
                            </div>
                            <span className="text-sm text-gray-900 capitalize">{competitor.platform}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatNumber(competitor.followers)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {competitor.engagement.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {competitor.postsPerWeek}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatNumber(competitor.avgLikes)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* A/B Tests Tab */}
        {activeTab === 'ab-tests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">A/B Tests</h3>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Create New Test
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {abTests.map((test) => (
                <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{test.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        test.status === 'running' ? 'bg-green-100 text-green-800' :
                        test.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div
                        className="w-6 h-6 rounded text-white text-xs flex items-center justify-center"
                        style={{ backgroundColor: PlatformUtils.getColor(test.platform) }}
                      >
                        {PlatformUtils.getIcon(test.platform)}
                      </div>
                      <span className="text-sm text-gray-600 capitalize">{test.platform}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {test.startDate.toLocaleDateString()}
                        {test.endDate && ` - ${test.endDate.toLocaleDateString()}`}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {test.variants.map((variant) => (
                        <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{variant.name}</h5>
                            <div className="text-sm text-gray-600">
                              CTR: {((variant.metrics.clicks / variant.metrics.impressions) * 100).toFixed(2)}%
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{variant.content}</p>
                          <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{formatNumber(variant.metrics.impressions)}</div>
                              <div className="text-xs text-gray-500">Impressions</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{formatNumber(variant.metrics.clicks)}</div>
                              <div className="text-xs text-gray-500">Clicks</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{variant.metrics.engagement.toFixed(1)}%</div>
                              <div className="text-xs text-gray-500">Engagement</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{variant.metrics.conversions}</div>
                              <div className="text-xs text-gray-500">Conversions</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {test.status === 'completed' && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-green-800">
                            Winner: {test.variants.reduce((winner, variant) => 
                              variant.metrics.conversions > winner.metrics.conversions ? variant : winner
                            ).name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;