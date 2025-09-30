// ============================================================================
// Upcoming Posts Component
// ============================================================================

import { useState, useEffect } from 'react';
import { PlatformUtils } from '../../lib/oauth';
import { Platform } from '../../lib/types';

// ============================================================================
// Types
// ============================================================================

interface ScheduledPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledTime: Date;
  status: 'scheduled' | 'publishing' | 'failed' | 'published';
  mediaCount?: number;
  mediaType?: 'image' | 'video' | 'carousel';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface UpcomingPostsProps {
  className?: string;
}

// ============================================================================
// Upcoming Posts Component
// ============================================================================

export const UpcomingPosts: React.FC<UpcomingPostsProps> = ({ className = '' }) => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  // ============================================================================
  // Mock Data Generation
  // ============================================================================

  useEffect(() => {
    const generateMockPosts = (): ScheduledPost[] => {
      const now = new Date();
      
      return [
        {
          id: '1',
          content: '🚀 Excited to share our latest product update! New features that will revolutionize your social media workflow. What do you think? #ProductUpdate #SocialMedia',
          platforms: ['twitter', 'linkedin'],
          scheduledTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
          status: 'scheduled',
          mediaCount: 2,
          mediaType: 'image'
        },
        {
          id: '2',
          content: 'Behind the scenes of our team brainstorming session 💡 Innovation happens when great minds collaborate! #TeamWork #Innovation',
          platforms: ['instagram', 'facebook'],
          scheduledTime: new Date(now.getTime() + 6 * 60 * 60 * 1000), // 6 hours from now
          status: 'scheduled',
          mediaCount: 1,
          mediaType: 'video'
        },
        {
          id: '3',
          content: 'Monday motivation: "Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill #MondayMotivation #Success',
          platforms: ['twitter', 'facebook', 'linkedin'],
          scheduledTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          status: 'scheduled'
        },
        {
          id: '4',
          content: 'Check out our latest blog post about social media trends for 2024! Link in bio 📖 #Blog #SocialMediaTrends #2024',
          platforms: ['instagram'],
          scheduledTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
          status: 'scheduled',
          mediaCount: 3,
          mediaType: 'carousel'
        },
        {
          id: '5',
          content: 'Thank you for 10K followers! 🎉 Your support means everything to us. Here\'s to the next milestone! #Milestone #ThankYou',
          platforms: ['twitter', 'instagram'],
          scheduledTime: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago (published)
          status: 'published',
          engagement: {
            likes: 245,
            comments: 18,
            shares: 32
          }
        },
        {
          id: '6',
          content: 'Weekend vibes! What are your plans for the weekend? Share in the comments below 👇 #WeekendVibes #Community',
          platforms: ['facebook', 'instagram'],
          scheduledTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          status: 'scheduled'
        }
      ];
    };

    // Simulate API call
    setTimeout(() => {
      setPosts(generateMockPosts());
      setLoading(false);
    }, 500);
  }, []);

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const formatScheduledTime = (scheduledTime: Date) => {
    const now = new Date();
    const diff = scheduledTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diff < 0) {
      // Past date (published)
      const pastHours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
      if (pastHours < 1) return 'Just published';
      if (pastHours < 24) return `Published ${pastHours}h ago`;
      return `Published ${Math.floor(pastHours / 24)}d ago`;
    }

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `In ${minutes}m`;
    }
    if (hours < 24) return `In ${hours}h`;
    if (days === 1) return 'Tomorrow';
    return `In ${days}d`;
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'publishing':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'published':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'publishing':
        return (
          <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'published':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getMediaIcon = (mediaType?: ScheduledPost['mediaType'], mediaCount?: number) => {
    if (!mediaType || !mediaCount) return null;

    switch (mediaType) {
      case 'image':
        return (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{mediaCount} image{mediaCount > 1 ? 's' : ''}</span>
          </div>
        );
      case 'video':
        return (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Video</span>
          </div>
        );
      case 'carousel':
        return (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>{mediaCount} slides</span>
          </div>
        );
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    
    const now = new Date();
    const postTime = post.scheduledTime;
    
    if (filter === 'today') {
      return postTime.toDateString() === now.toDateString();
    }
    
    if (filter === 'week') {
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return postTime >= now && postTime <= weekFromNow;
    }
    
    return true;
  });

  // ============================================================================
  // Loading State
  // ============================================================================

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="flex space-x-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-20 h-4 bg-gray-200 rounded" />
                  <div className="w-16 h-6 bg-gray-200 rounded" />
                </div>
                <div className="w-full h-4 bg-gray-200 rounded mb-2" />
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-3" />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-gray-200 rounded" />
                    ))}
                  </div>
                  <div className="w-12 h-4 bg-gray-200 rounded" />
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
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Posts</h3>
          
          {/* Filter Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'today', label: 'Today' },
              { key: 'week', label: 'This Week' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">No posts scheduled</p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Schedule your first post
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(post.status)}`}>
                      {getStatusIcon(post.status)}
                      <span className="ml-1 capitalize">{post.status}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatScheduledTime(post.scheduledTime)}
                    </span>
                  </div>
                  
                  {/* Action Menu */}
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-sm text-gray-900 mb-3 line-clamp-2">
                  {post.content}
                </p>

                {/* Post Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Platform Icons */}
                    <div className="flex items-center space-x-1">
                      {post.platforms.map((platform) => (
                        <div
                          key={platform}
                          className="w-6 h-6 rounded flex items-center justify-center text-white text-xs"
                          style={{ backgroundColor: PlatformUtils.getColor(platform) }}
                          title={platform}
                        >
                          {PlatformUtils.getIcon(platform)}
                        </div>
                      ))}
                    </div>

                    {/* Media Info */}
                    {getMediaIcon(post.mediaType, post.mediaCount)}
                  </div>

                  {/* Engagement Stats (for published posts) */}
                  {post.status === 'published' && post.engagement && (
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{post.engagement.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.engagement.comments}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>{post.engagement.shares}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              View Calendar
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              Schedule Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};