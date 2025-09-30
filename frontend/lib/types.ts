// ============================================================================
// API Types - Based on Backend Analysis
// ============================================================================

// Base Types
export interface User {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  tier?: 'free' | 'premium' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  status: 'success' | 'error';
  errors?: string[];
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name?: string;
  username?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Platform Connection Types
export type Platform = 'meta' | 'linkedin' | 'twitter' | 'youtube' | 'tiktok';

export interface PlatformConnection {
  id: string;
  platform: Platform;
  platform_user_id: string;
  username: string;
  avatar_url?: string;
  is_active: boolean;
  connected_at: string;
  last_sync: string;
}

export interface ConnectPlatformRequest {
  platform: Platform;
  redirect_uri: string;
}

// Content Generation Types
export interface ContentGenerationRequest {
  prompt: string;
  style: 'casual' | 'formal' | 'funny';
  hashtags: number; // 0-10
}

export interface ContentGenerationResponse {
  caption: string;
  hashtags: string[];
  style: string;
  generated_at: string;
}

// Scheduled Posts Types
export interface ScheduledPostRequest {
  content: string;
  platforms: Platform[];
  scheduled_time: string;
  media_urls?: string[];
  hashtags?: string[];
  status?: 'draft' | 'scheduled' | 'published' | 'failed';
}

export interface ScheduledPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduled_time: string;
  published_time?: string;
  media_urls: string[];
  hashtags: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduledPostsFilters {
  platform?: Platform;
  status?: 'draft' | 'scheduled' | 'published' | 'failed';
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

// Analytics Types
export interface AnalyticsOverview {
  total_posts: number;
  total_engagement: number;
  total_reach: number;
  total_impressions: number;
  engagement_rate: number;
  top_performing_platform: Platform;
  period: string;
}

export interface AnalyticsRequest {
  user_id: string;
  platforms?: Platform[];
  start_date?: string;
  end_date?: string;
  metrics?: string[];
}

export interface PlatformAnalytics {
  platform: Platform;
  posts_count: number;
  total_engagement: number;
  total_reach: number;
  total_impressions: number;
  engagement_rate: number;
  top_post_id?: string;
}

// A/B Testing Types
export interface ABTestRequest {
  name: string;
  description?: string;
  content_a: string;
  content_b: string;
  platforms: Platform[];
  target_audience?: any;
  duration_hours: number;
}

export interface ABTest {
  id: string;
  name: string;
  description?: string;
  content_a: string;
  content_b: string;
  platforms: Platform[];
  status: 'draft' | 'running' | 'completed' | 'paused';
  start_time?: string;
  end_time?: string;
  results?: ABTestResults;
  created_at: string;
  updated_at: string;
}

export interface ABTestResults {
  variant_a_performance: {
    impressions: number;
    engagement: number;
    clicks: number;
    conversion_rate: number;
  };
  variant_b_performance: {
    impressions: number;
    engagement: number;
    clicks: number;
    conversion_rate: number;
  };
  winner?: 'a' | 'b' | 'tie';
  confidence_level: number;
}

// Media Upload Types
export interface MediaUploadResponse {
  url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

// Auto-Engagement Types
export interface EngagementRequest {
  message: string;
  platform: Platform;
  context?: any;
}

export interface EngagementResponse {
  reply: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  intent: string;
  confidence: number;
  generated_at: string;
}

// Smart Scheduling Types
export interface SmartScheduleRequest {
  content: string;
  platforms: Platform[];
  timezone?: string;
  audience_location?: string;
}

export interface SmartScheduleResponse {
  recommended_times: Array<{
    datetime: string;
    platform: Platform;
    score: number;
    reason: string;
  }>;
  optimal_time: string;
  engagement_prediction: number;
}

// Content Recycling Types
export interface ContentRecycleRequest {
  original_post_id: string;
  target_platforms: Platform[];
  adaptation_style?: 'rewrite' | 'summarize' | 'expand';
}

export interface ContentRecycleResponse {
  recycled_content: string;
  adaptations: Array<{
    platform: Platform;
    content: string;
    hashtags: string[];
  }>;
  original_performance?: any;
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Dashboard Types
export interface DashboardStats {
  total_posts: number;
  scheduled_posts: number;
  published_today: number;
  total_engagement: number;
  engagement_rate: number;
  top_platform: Platform;
  recent_activity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'post_published' | 'post_scheduled' | 'platform_connected' | 'ab_test_completed';
  title: string;
  description: string;
  timestamp: string;
  platform?: Platform;
  status?: string;
}

// Form Types
export interface PostComposerForm {
  content: string;
  platforms: Platform[];
  scheduled_time?: string;
  media_files?: File[];
  hashtags: string[];
  is_draft: boolean;
}

export interface AnalyticsFilters {
  platforms: Platform[];
  date_range: {
    start: string;
    end: string;
  };
  metrics: string[];
}