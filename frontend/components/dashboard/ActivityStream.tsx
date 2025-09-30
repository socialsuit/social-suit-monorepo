// ============================================================================
// Activity Stream Component
// ============================================================================

import { useState, useEffect } from 'react';
import { PlatformUtils } from '../../lib/oauth';
import { Platform } from '../../lib/types';

// ============================================================================
// Types
// ============================================================================

interface ActivityItem {
  id: string;
  type: 'post_published' | 'comment_received' | 'follower_gained' | 'mention_received' | 'post_scheduled' | 'engagement_milestone';
  platform: Platform;
  title: string;
  description: string;
  timestamp: Date;
  metadata?: {
    engagement?: number;
    followerCount?: number;
    postId?: string;
    username?: string;
  };
}

interface ActivityStreamProps {
  className?: string;
}

// ============================================================================
// Activity Stream Component
// ============================================================================

export const ActivityStream: React.FC<ActivityStreamProps> = ({ className = '' }) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Platform>('all');

  // ============================================================================
  // Mock Data Generation
  // ============================================================================

  useEffect(() => {
    const generateMockActivities = (): ActivityItem[] => {
      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'post_published',
          platform: 'twitter',
          title: 'Post published successfully',
          description: 'Your post about "Social media marketing tips" has been published on Twitter.',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          metadata: { postId: 'tweet_123' }
        },
        {
          id: '2',
          type: 'follower_gained',
          platform: 'instagram',
          title: 'New followers gained',
          description: 'You gained 15 new followers on Instagram in the last hour.',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          metadata: { followerCount: 15 }
        },
        {
          id: '3',
          type: 'comment_received',
          platform: 'facebook',
          title: 'New comment on your post',
          description: 'Sarah Johnson commented on your Facebook post: "Great insights! Thanks for sharing."',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          metadata: { username: 'Sarah Johnson' }
        },
        {
          id: '4',
          type: 'engagement_milestone',
          platform: 'linkedin',
          title: 'Engagement milestone reached',
          description: 'Your LinkedIn post reached 100 likes and 25 comments!',
          timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
          metadata: { engagement: 125 }
        },
        {
          id: '5',
          type: 'mention_received',
          platform: 'twitter',
          title: 'You were mentioned',
          description: '@marketingpro mentioned you in a tweet about social media automation.',
          timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
          metadata: { username: '@marketingpro' }
        },
        {
          id: '6',
          type: 'post_scheduled',
          platform: 'instagram',
          title: 'Post scheduled',
          description: 'Your Instagram post is scheduled to publish tomorrow at 2:00 PM.',
          timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
        },
        {
          id: '7',
          type: 'follower_gained',
          platform: 'twitter',
          title: 'Follower milestone',
          description: 'Congratulations! You just reached 1,000 followers on Twitter.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          metadata: { followerCount: 1000 }
        },
        {
          id: '8',
          type: 'post_published',
          platform: 'linkedin',
          title: 'Article published',
          description: 'Your LinkedIn article "The Future of Social Media Marketing" is now live.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        }
      ];

      return mockActivities;
    };

    // Simulate API call
    setTimeout(() => {
      setActivities(generateMockActivities());
      setLoading(false);
    }, 500);
  }, []);

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'post_published':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'comment_received':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'follower_gained':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'mention_received':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        );
      case 'post_scheduled':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'engagement_milestone':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'post_published':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'comment_received':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'follower_gained':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'mention_received':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'post_scheduled':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'engagement_milestone':
        return 'text-pink-600 bg-pink-50 border-pink-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.platform === filter);

  // ============================================================================
  // Loading State
  // ============================================================================

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Stream</h3>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start space-x-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                  <div className="w-full h-3 bg-gray-200 rounded mb-1" />
                  <div className="w-1/4 h-3 bg-gray-200 rounded" />
                </div>
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

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Activity Stream</h3>
          
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | Platform)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>

        {/* Activity List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
              </svg>
              <p className="text-gray-500">No activities found</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                {/* Activity Icon */}
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                      {/* Platform Icon */}
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: PlatformUtils.getColor(activity.platform) }}
                      >
                        {PlatformUtils.getIcon(activity.platform)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        {filteredActivities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View all activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};