// ============================================================================
// Connected Platforms Component
// ============================================================================

import { useState, useEffect } from 'react';
import { PlatformUtils } from '../../lib/oauth';
import { Platform } from '../../lib/types';

// ============================================================================
// Types
// ============================================================================

interface PlatformStatus {
  platform: Platform;
  connected: boolean;
  lastSync: Date | null;
  followerCount?: number;
  postsThisWeek?: number;
  engagementRate?: number;
  status: 'active' | 'warning' | 'error';
  statusMessage?: string;
}

interface ConnectedPlatformsProps {
  className?: string;
}

// ============================================================================
// Connected Platforms Component
// ============================================================================

export const ConnectedPlatforms: React.FC<ConnectedPlatformsProps> = ({ className = '' }) => {
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================================================================
  // Mock Data Generation
  // ============================================================================

  useEffect(() => {
    const generateMockPlatforms = (): PlatformStatus[] => {
      return [
        {
          platform: 'twitter',
          connected: true,
          lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          followerCount: 12500,
          postsThisWeek: 8,
          engagementRate: 4.2,
          status: 'active'
        },
        {
          platform: 'instagram',
          connected: true,
          lastSync: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          followerCount: 8900,
          postsThisWeek: 5,
          engagementRate: 6.8,
          status: 'active'
        },
        {
          platform: 'facebook',
          connected: true,
          lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          followerCount: 3200,
          postsThisWeek: 3,
          engagementRate: 2.1,
          status: 'warning',
          statusMessage: 'Sync delayed'
        },
        {
          platform: 'linkedin',
          connected: true,
          lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          followerCount: 1800,
          postsThisWeek: 4,
          engagementRate: 8.5,
          status: 'active'
        },
        {
          platform: 'tiktok',
          connected: false,
          lastSync: null,
          status: 'error',
          statusMessage: 'Not connected'
        },
        {
          platform: 'youtube',
          connected: false,
          lastSync: null,
          status: 'error',
          statusMessage: 'Not connected'
        }
      ];
    };

    // Simulate API call
    setTimeout(() => {
      setPlatforms(generateMockPlatforms());
      setLoading(false);
    }, 500);
  }, []);

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatLastSync = (lastSync: Date | null) => {
    if (!lastSync) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - lastSync.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const getStatusColor = (status: PlatformStatus['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: PlatformStatus['status']) => {
    switch (status) {
      case 'active':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // ============================================================================
  // Loading State
  // ============================================================================

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Platforms</h3>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                  <div>
                    <div className="w-20 h-4 bg-gray-200 rounded mb-1" />
                    <div className="w-16 h-3 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // Render Component
  // ============================================================================

  const connectedPlatforms = platforms.filter(p => p.connected);
  const disconnectedPlatforms = platforms.filter(p => !p.connected);

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Connected Platforms</h3>
          <span className="text-sm text-gray-500">
            {connectedPlatforms.length} of {platforms.length} connected
          </span>
        </div>

        {/* Connected Platforms */}
        <div className="space-y-3 mb-6">
          {connectedPlatforms.map((platform) => (
            <div
              key={platform.platform}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {/* Platform Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: PlatformUtils.getColor(platform.platform) }}
                >
                  <span className="text-lg">
                    {PlatformUtils.getIcon(platform.platform)}
                  </span>
                </div>

                {/* Platform Info */}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 capitalize">
                      {platform.platform}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(platform.status)}`}>
                      {getStatusIcon(platform.status)}
                      <span className="ml-1">
                        {platform.status === 'active' ? 'Active' : platform.statusMessage}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Last sync: {formatLastSync(platform.lastSync)}
                  </p>
                </div>
              </div>

              {/* Platform Stats */}
              <div className="text-right">
                {platform.followerCount && (
                  <div className="text-sm font-medium text-gray-900">
                    {formatNumber(platform.followerCount)} followers
                  </div>
                )}
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  {platform.postsThisWeek && (
                    <span>{platform.postsThisWeek} posts this week</span>
                  )}
                  {platform.engagementRate && (
                    <span>{platform.engagementRate}% engagement</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disconnected Platforms */}
        {disconnectedPlatforms.length > 0 && (
          <>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Available Platforms</h4>
            </div>
            <div className="space-y-2">
              {disconnectedPlatforms.map((platform) => (
                <div
                  key={platform.platform}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {/* Platform Icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white opacity-60"
                      style={{ backgroundColor: PlatformUtils.getColor(platform.platform) }}
                    >
                      <span className="text-sm">
                        {PlatformUtils.getIcon(platform.platform)}
                      </span>
                    </div>

                    {/* Platform Info */}
                    <div>
                      <h4 className="font-medium text-gray-700 capitalize">
                        {platform.platform}
                      </h4>
                      <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                  </div>

                  {/* Connect Button */}
                  <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Sync All
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              Manage Connections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};