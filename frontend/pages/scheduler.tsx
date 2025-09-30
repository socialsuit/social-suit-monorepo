// ============================================================================
// Scheduler Page - Smart Content Scheduling with Analytics
// ============================================================================

import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PlatformUtils } from '../lib/oauth';
import { Platform } from '../lib/types';

// ============================================================================
// Types
// ============================================================================

interface ScheduledPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledTime: Date;
  status: 'scheduled' | 'published' | 'failed' | 'draft';
  mediaCount: number;
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: Date;
}

interface TimeSlotAnalytics {
  hour: number;
  day: number; // 0 = Sunday, 1 = Monday, etc.
  engagementRate: number;
  reachRate: number;
  clickRate: number;
  postCount: number;
}

interface CalendarView {
  currentDate: Date;
  selectedDate: Date | null;
  viewMode: 'month' | 'week' | 'day';
}

// ============================================================================
// Mock Data
// ============================================================================

const generateMockPosts = (): ScheduledPost[] => {
  const posts: ScheduledPost[] = [];
  const now = new Date();
  
  for (let i = 0; i < 25; i++) {
    const scheduledTime = new Date(now);
    scheduledTime.setDate(now.getDate() + Math.floor(Math.random() * 30) - 15);
    scheduledTime.setHours(Math.floor(Math.random() * 24));
    scheduledTime.setMinutes(Math.floor(Math.random() * 60));
    
    const platforms: Platform[] = [];
    const allPlatforms: Platform[] = ['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'];
    const numPlatforms = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < numPlatforms; j++) {
      const platform = allPlatforms[Math.floor(Math.random() * allPlatforms.length)];
      if (!platforms.includes(platform)) {
        platforms.push(platform);
      }
    }
    
    const status = scheduledTime < now 
      ? (Math.random() > 0.1 ? 'published' : 'failed')
      : 'scheduled';
    
    posts.push({
      id: `post-${i}`,
      content: [
        "🚀 Exciting product update coming soon! Stay tuned for more details. #ProductUpdate #Innovation",
        "Behind the scenes of our latest campaign. The team has been working incredibly hard! 💪",
        "Monday motivation: Success is not final, failure is not fatal. It's the courage to continue that counts.",
        "Just wrapped up an amazing client meeting. Grateful for the opportunity to work with such inspiring people! 🙏",
        "Weekend vibes: Sometimes the best ideas come when you're not actively looking for them. ✨",
        "Industry insight: The future of social media is all about authentic connections and meaningful engagement.",
        "Team spotlight: Celebrating our incredible marketing team for their outstanding work this quarter! 🎉",
        "Quick tip: Consistency beats perfection every time. Keep showing up and making progress! 📈"
      ][Math.floor(Math.random() * 8)],
      platforms,
      scheduledTime,
      status,
      mediaCount: Math.floor(Math.random() * 4),
      engagement: status === 'published' ? {
        likes: Math.floor(Math.random() * 500) + 10,
        shares: Math.floor(Math.random() * 100) + 2,
        comments: Math.floor(Math.random() * 50) + 1
      } : undefined,
      createdAt: new Date(scheduledTime.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    });
  }
  
  return posts.sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime());
};

const generateMockAnalytics = (): TimeSlotAnalytics[] => {
  const analytics: TimeSlotAnalytics[] = [];
  
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Simulate higher engagement during typical active hours
      let baseEngagement = 0.02;
      if ((hour >= 9 && hour <= 11) || (hour >= 15 && hour <= 17) || (hour >= 19 && hour <= 21)) {
        baseEngagement = 0.08;
      } else if ((hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 19)) {
        baseEngagement = 0.06;
      }
      
      // Weekend adjustments
      if (day === 0 || day === 6) {
        if (hour >= 10 && hour <= 14) {
          baseEngagement *= 1.3;
        }
      }
      
      analytics.push({
        hour,
        day,
        engagementRate: baseEngagement + (Math.random() * 0.02 - 0.01),
        reachRate: baseEngagement * 15 + (Math.random() * 0.1 - 0.05),
        clickRate: baseEngagement * 0.3 + (Math.random() * 0.005 - 0.0025),
        postCount: Math.floor(Math.random() * 10)
      });
    }
  }
  
  return analytics;
};

// ============================================================================
// Scheduler Page Component
// ============================================================================

const SchedulerPage: NextPage = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [analytics, setAnalytics] = useState<TimeSlotAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState<CalendarView>({
    currentDate: new Date(),
    selectedDate: null,
    viewMode: 'month'
  });
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // ============================================================================
  // Data Loading
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(generateMockPosts());
      setAnalytics(generateMockAnalytics());
      setLoading(false);
    };
    
    loadData();
  }, []);

  // ============================================================================
  // Calendar Helpers
  // ============================================================================

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduledTime);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const getBestTimeSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    const dayAnalytics = analytics.filter(a => a.day === dayOfWeek);
    
    return dayAnalytics
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 3);
  };

  // ============================================================================
  // Calendar Navigation
  // ============================================================================

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCalendar(prev => {
      const newDate = new Date(prev.currentDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return { ...prev, currentDate: newDate };
    });
  };

  const selectDate = (date: Date) => {
    setCalendar(prev => ({ ...prev, selectedDate: date }));
  };

  // ============================================================================
  // Post Management
  // ============================================================================

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this scheduled post?')) {
      return;
    }
    
    setPosts(prev => prev.filter(p => p.id !== postId));
    setSelectedPost(null);
  };

  const reschedulePost = async (postId: string, newTime: Date) => {
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, scheduledTime: newTime } : p
    ));
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(calendar.currentDate);
    const firstDay = getFirstDayOfMonth(calendar.currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(calendar.currentDate.getFullYear(), calendar.currentDate.getMonth(), day);
      const postsForDay = getPostsForDate(date);
      const isSelected = calendar.selectedDate?.toDateString() === date.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => selectDate(date)}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
            isSelected ? 'bg-blue-50 border-blue-300' : ''
          } ${isToday ? 'bg-yellow-50' : ''}`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {postsForDay.slice(0, 2).map((post) => (
              <div
                key={post.id}
                className={`text-xs px-1 py-0.5 rounded truncate ${getStatusColor(post.status)}`}
              >
                {formatTime(post.scheduledTime)}
              </div>
            ))}
            {postsForDay.length > 2 && (
              <div className="text-xs text-gray-500">
                +{postsForDay.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
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

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Scheduler</h1>
            <p className="mt-1 text-sm text-gray-600">
              Plan and schedule your content with AI-powered timing recommendations
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                showAnalytics 
                  ? 'bg-purple-600 text-white' 
                  : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {calendar.currentDate.toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCalendar(prev => ({ ...prev, currentDate: new Date() }))}
                      className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                  {/* Day Headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Days */}
                  {renderCalendarGrid()}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Info */}
            {calendar.selectedDate && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {formatDate(calendar.selectedDate)}
                  </h3>
                  
                  {/* Posts for Selected Date */}
                  <div className="space-y-3 mb-4">
                    {getPostsForDate(calendar.selectedDate).map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {formatTime(post.scheduledTime)}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                            {post.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-1">
                          {post.platforms.map((platform) => (
                            <div
                              key={platform}
                              className="w-5 h-5 rounded text-white text-xs flex items-center justify-center"
                              style={{ backgroundColor: PlatformUtils.getColor(platform) }}
                            >
                              {PlatformUtils.getIcon(platform)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {getPostsForDate(calendar.selectedDate).length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No posts scheduled for this date
                      </p>
                    )}
                  </div>

                  {/* Best Times */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Best Times to Post</h4>
                    <div className="space-y-2">
                      {getBestTimeSlots(calendar.selectedDate).map((slot, index) => (
                        <div key={`${slot.day}-${slot.hour}`} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {new Date(0, 0, 0, slot.hour).toLocaleTimeString('en-US', { 
                              hour: 'numeric',
                              hour12: true 
                            })}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${slot.engagementRate * 1000}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {(slot.engagementRate * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Panel */}
            {showAnalytics && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Heatmap</h3>
                  
                  {/* Heatmap */}
                  <div className="space-y-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, dayIndex) => (
                      <div key={day} className="flex items-center space-x-1">
                        <div className="w-8 text-xs text-gray-600">{day}</div>
                        <div className="flex space-x-0.5">
                          {Array.from({ length: 24 }, (_, hour) => {
                            const slot = analytics.find(a => a.day === dayIndex && a.hour === hour);
                            const intensity = slot ? Math.min(slot.engagementRate * 10, 1) : 0;
                            return (
                              <div
                                key={hour}
                                className="w-2 h-2 rounded-sm"
                                style={{
                                  backgroundColor: intensity > 0 
                                    ? `rgba(34, 197, 94, ${intensity})` 
                                    : '#f3f4f6'
                                }}
                                title={`${day} ${hour}:00 - ${(slot?.engagementRate || 0) * 100}% engagement`}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <div className="flex space-x-1">
                      {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
                        <div
                          key={opacity}
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: `rgba(34, 197, 94, ${opacity})` }}
                        ></div>
                      ))}
                    </div>
                    <span>High</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Scheduled Posts</span>
                    <span className="text-sm font-medium text-gray-900">
                      {posts.filter(p => p.status === 'scheduled').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Published Today</span>
                    <span className="text-sm font-medium text-gray-900">
                      {posts.filter(p => 
                        p.status === 'published' && 
                        p.scheduledTime.toDateString() === new Date().toDateString()
                      ).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="text-sm font-medium text-gray-900">
                      {posts.filter(p => {
                        const weekStart = new Date();
                        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                        return p.scheduledTime >= weekStart;
                      }).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-sm font-medium text-green-600">
                      {Math.round((posts.filter(p => p.status === 'published').length / 
                        posts.filter(p => p.status !== 'scheduled').length) * 100) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Post Details</h3>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedPost.content}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedPost.scheduledTime)} at {formatTime(selectedPost.scheduledTime)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPost.status)}`}>
                        {selectedPost.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
                    <div className="flex items-center space-x-2">
                      {selectedPost.platforms.map((platform) => (
                        <div
                          key={platform}
                          className="flex items-center space-x-2 px-3 py-1 rounded-lg text-white text-sm"
                          style={{ backgroundColor: PlatformUtils.getColor(platform) }}
                        >
                          <span>{PlatformUtils.getIcon(platform)}</span>
                          <span className="capitalize">{platform}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedPost.engagement && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Engagement</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{selectedPost.engagement.likes}</div>
                          <div className="text-xs text-gray-500">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{selectedPost.engagement.shares}</div>
                          <div className="text-xs text-gray-500">Shares</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{selectedPost.engagement.comments}</div>
                          <div className="text-xs text-gray-500">Comments</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => deletePost(selectedPost.id)}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SchedulerPage;