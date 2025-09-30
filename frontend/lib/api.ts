// ============================================================================
// API Client - Typed HTTP Client with React Query Integration
// ============================================================================

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  User, 
  LoginRequest, 
  SignupRequest, 
  AuthResponse,
  Platform,
  PlatformConnection,
  ConnectPlatformRequest,
  ContentGenerationRequest,
  ContentGenerationResponse,
  ScheduledPostRequest,
  ScheduledPost,
  ScheduledPostsFilters,
  AnalyticsOverview,
  AnalyticsRequest,
  PlatformAnalytics,
  ABTestRequest,
  ABTest,
  ABTestResults,
  MediaUploadResponse,
  EngagementRequest,
  EngagementResponse,
  SmartScheduleRequest,
  SmartScheduleResponse,
  ContentRecycleRequest,
  ContentRecycleResponse,
  DashboardStats,
  ApiResponse,
  PaginatedResponse,
  ApiError
} from './types';

// ============================================================================
// API Configuration
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1/social-suit';

// ============================================================================
// Auth Token Management
// ============================================================================

class AuthManager {
  private static readonly TOKEN_KEY = 'social_suit_token';
  private static readonly USER_KEY = 'social_suit_user';

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

// ============================================================================
// HTTP Client Setup
// ============================================================================

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = AuthManager.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          AuthManager.removeToken();
          // Redirect to login if needed
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  private handleApiError(error: any): ApiError {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
    };

    if (error.response) {
      // Server responded with error status
      apiError.message = error.response.data?.message || error.response.statusText;
      apiError.code = error.response.status.toString();
      apiError.details = error.response.data;
    } else if (error.request) {
      // Network error
      apiError.message = 'Network error - please check your connection';
      apiError.code = 'NETWORK_ERROR';
    } else {
      // Other error
      apiError.message = error.message;
      apiError.code = 'UNKNOWN_ERROR';
    }

    return apiError;
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.request(config);
    return response.data.data || response.data;
  }

  // ============================================================================
  // Authentication Endpoints
  // ============================================================================

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', credentials);
    const authData = response.data;
    
    // Store auth data
    AuthManager.setToken(authData.access_token);
    AuthManager.setUser(authData.user);
    
    return authData;
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/register', userData);
    const authData = response.data;
    
    // Store auth data
    AuthManager.setToken(authData.access_token);
    AuthManager.setUser(authData.user);
    
    return authData;
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } finally {
      AuthManager.removeToken();
    }
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>({ method: 'GET', url: '/auth/me' });
  }

  // ============================================================================
  // Platform Connection Endpoints
  // ============================================================================

  async connectPlatform(request: ConnectPlatformRequest): Promise<{ authorization_url: string }> {
    return this.request({
      method: 'POST',
      url: '/connect/initiate',
      data: request,
    });
  }

  async getPlatformConnections(): Promise<PlatformConnection[]> {
    return this.request<PlatformConnection[]>({
      method: 'GET',
      url: '/connect/platforms',
    });
  }

  async disconnectPlatform(platform: Platform): Promise<void> {
    return this.request({
      method: 'DELETE',
      url: `/connect/${platform}`,
    });
  }

  // ============================================================================
  // Content Generation Endpoints
  // ============================================================================

  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    return this.request({
      method: 'GET',
      url: '/content/generate',
      params: request,
    });
  }

  // ============================================================================
  // Scheduled Posts Endpoints
  // ============================================================================

  async createScheduledPost(post: ScheduledPostRequest): Promise<ScheduledPost> {
    return this.request({
      method: 'POST',
      url: '/scheduled-posts',
      data: post,
    });
  }

  async getScheduledPosts(filters?: ScheduledPostsFilters): Promise<PaginatedResponse<ScheduledPost>> {
    return this.request({
      method: 'GET',
      url: '/scheduled-posts',
      params: filters,
    });
  }

  async getScheduledPost(id: string): Promise<ScheduledPost> {
    return this.request({
      method: 'GET',
      url: `/scheduled-posts/${id}`,
    });
  }

  async updateScheduledPost(id: string, updates: Partial<ScheduledPostRequest>): Promise<ScheduledPost> {
    return this.request({
      method: 'PUT',
      url: `/scheduled-posts/${id}`,
      data: updates,
    });
  }

  async deleteScheduledPost(id: string): Promise<void> {
    return this.request({
      method: 'DELETE',
      url: `/scheduled-posts/${id}`,
    });
  }

  // ============================================================================
  // Analytics Endpoints
  // ============================================================================

  async getAnalyticsOverview(userId: string): Promise<AnalyticsOverview> {
    return this.request({
      method: 'GET',
      url: `/analytics/overview/${userId}`,
    });
  }

  async collectAnalytics(request: AnalyticsRequest): Promise<void> {
    return this.request({
      method: 'POST',
      url: `/analytics/collect/${request.user_id}`,
      data: request,
    });
  }

  async getPlatformAnalytics(userId: string, platform?: Platform): Promise<PlatformAnalytics[]> {
    return this.request({
      method: 'GET',
      url: `/analytics/platforms/${userId}`,
      params: platform ? { platform } : undefined,
    });
  }

  // ============================================================================
  // A/B Testing Endpoints
  // ============================================================================

  async createABTest(test: ABTestRequest): Promise<ABTest> {
    return this.request({
      method: 'POST',
      url: '/ab-testing/create',
      data: test,
    });
  }

  async getABTest(testId: string): Promise<ABTest> {
    return this.request({
      method: 'GET',
      url: `/ab-testing/tests/${testId}`,
    });
  }

  async getABTests(): Promise<ABTest[]> {
    return this.request({
      method: 'GET',
      url: '/ab-testing/tests',
    });
  }

  async updateABTestMetrics(testId: string, metrics: any): Promise<void> {
    return this.request({
      method: 'POST',
      url: `/ab-testing/tests/${testId}/metrics`,
      data: metrics,
    });
  }

  // ============================================================================
  // Media Upload Endpoints
  // ============================================================================

  async uploadMedia(file: File): Promise<MediaUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request({
      method: 'POST',
      url: '/media/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // ============================================================================
  // Auto-Engagement Endpoints
  // ============================================================================

  async generateReply(request: EngagementRequest): Promise<EngagementResponse> {
    return this.request({
      method: 'POST',
      url: '/engage/reply',
      data: request,
    });
  }

  // ============================================================================
  // Smart Scheduling Endpoints
  // ============================================================================

  async getSmartSchedule(request: SmartScheduleRequest): Promise<SmartScheduleResponse> {
    return this.request({
      method: 'POST',
      url: '/schedule/optimize',
      data: request,
    });
  }

  // ============================================================================
  // Content Recycling Endpoints
  // ============================================================================

  async recycleContent(request: ContentRecycleRequest): Promise<ContentRecycleResponse> {
    return this.request({
      method: 'POST',
      url: '/recycle/adapt',
      data: request,
    });
  }

  // ============================================================================
  // Dashboard Endpoints
  // ============================================================================

  async getDashboardStats(): Promise<DashboardStats> {
    return this.request({
      method: 'GET',
      url: '/analytics/dashboard',
    });
  }
}

// ============================================================================
// Export API Client Instance
// ============================================================================

export const apiClient = new ApiClient();
export { AuthManager };

// Export types for convenience
export type * from './types';