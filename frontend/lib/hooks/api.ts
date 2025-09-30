// ============================================================================
// React Query Hooks - Data Fetching & State Management
// ============================================================================

import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import { apiClient } from '../api';
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
  MediaUploadResponse,
  EngagementRequest,
  EngagementResponse,
  SmartScheduleRequest,
  SmartScheduleResponse,
  ContentRecycleRequest,
  ContentRecycleResponse,
  DashboardStats,
  PaginatedResponse,
  ApiError
} from '../types';

// ============================================================================
// Query Keys Factory
// ============================================================================

export const queryKeys = {
  // Auth
  currentUser: ['auth', 'currentUser'] as const,
  
  // Platform Connections
  platformConnections: ['platforms', 'connections'] as const,
  
  // Scheduled Posts
  scheduledPosts: (filters?: ScheduledPostsFilters) => 
    ['scheduledPosts', filters] as const,
  scheduledPost: (id: string) => ['scheduledPosts', id] as const,
  
  // Analytics
  analyticsOverview: (userId: string) => ['analytics', 'overview', userId] as const,
  platformAnalytics: (userId: string, platform?: Platform) => 
    ['analytics', 'platforms', userId, platform] as const,
  dashboardStats: ['analytics', 'dashboard'] as const,
  
  // A/B Testing
  abTests: ['abTests'] as const,
  abTest: (testId: string) => ['abTests', testId] as const,
} as const;

// ============================================================================
// Authentication Hooks
// ============================================================================

export const useLogin = (
  options?: UseMutationOptions<AuthResponse, ApiError, LoginRequest>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => apiClient.login(credentials),
    onSuccess: (data) => {
      // Update current user cache
      queryClient.setQueryData(queryKeys.currentUser, data.user);
      // Invalidate all queries to refresh with new auth
      queryClient.invalidateQueries();
    },
    ...options,
  });
};

export const useSignup = (
  options?: UseMutationOptions<AuthResponse, ApiError, SignupRequest>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: SignupRequest) => apiClient.signup(userData),
    onSuccess: (data) => {
      // Update current user cache
      queryClient.setQueryData(queryKeys.currentUser, data.user);
      // Invalidate all queries to refresh with new auth
      queryClient.invalidateQueries();
    },
    ...options,
  });
};

export const useLogout = (
  options?: UseMutationOptions<void, ApiError, void>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiClient.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
    ...options,
  });
};

export const useCurrentUser = (
  options?: UseQueryOptions<User, ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => apiClient.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// ============================================================================
// Platform Connection Hooks
// ============================================================================

export const usePlatformConnections = (
  options?: UseQueryOptions<PlatformConnection[], ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.platformConnections,
    queryFn: () => apiClient.getPlatformConnections(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useConnectPlatform = (
  options?: UseMutationOptions<{ authorization_url: string }, ApiError, ConnectPlatformRequest>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: ConnectPlatformRequest) => apiClient.connectPlatform(request),
    onSuccess: () => {
      // Invalidate platform connections to refresh the list
      queryClient.invalidateQueries({ queryKey: queryKeys.platformConnections });
    },
    ...options,
  });
};

export const useDisconnectPlatform = (
  options?: UseMutationOptions<void, ApiError, Platform>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (platform: Platform) => apiClient.disconnectPlatform(platform),
    onSuccess: () => {
      // Invalidate platform connections to refresh the list
      queryClient.invalidateQueries({ queryKey: queryKeys.platformConnections });
    },
    ...options,
  });
};

// ============================================================================
// Content Generation Hooks
// ============================================================================

export const useGenerateContent = (
  options?: UseMutationOptions<ContentGenerationResponse, ApiError, ContentGenerationRequest>
) => {
  return useMutation({
    mutationFn: (request: ContentGenerationRequest) => apiClient.generateContent(request),
    ...options,
  });
};

// ============================================================================
// Scheduled Posts Hooks
// ============================================================================

export const useScheduledPosts = (
  filters?: ScheduledPostsFilters,
  options?: UseQueryOptions<PaginatedResponse<ScheduledPost>, ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.scheduledPosts(filters),
    queryFn: () => apiClient.getScheduledPosts(filters),
    staleTime: 30 * 1000, // 30 seconds
    ...options,
  });
};

export const useScheduledPost = (
  id: string,
  options?: UseQueryOptions<ScheduledPost, ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.scheduledPost(id),
    queryFn: () => apiClient.getScheduledPost(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateScheduledPost = (
  options?: UseMutationOptions<ScheduledPost, ApiError, ScheduledPostRequest>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (post: ScheduledPostRequest) => apiClient.createScheduledPost(post),
    onSuccess: () => {
      // Invalidate scheduled posts list
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
      // Invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
    },
    ...options,
  });
};

export const useUpdateScheduledPost = (
  options?: UseMutationOptions<ScheduledPost, ApiError, { id: string; updates: Partial<ScheduledPostRequest> }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }) => apiClient.updateScheduledPost(id, updates),
    onSuccess: (data, variables) => {
      // Update the specific post in cache
      queryClient.setQueryData(queryKeys.scheduledPost(variables.id), data);
      // Invalidate scheduled posts list
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
    },
    ...options,
  });
};

export const useDeleteScheduledPost = (
  options?: UseMutationOptions<void, ApiError, string>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteScheduledPost(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.scheduledPost(id) });
      // Invalidate scheduled posts list
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
      // Invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
    },
    ...options,
  });
};

// ============================================================================
// Analytics Hooks
// ============================================================================

export const useAnalyticsOverview = (
  userId: string,
  options?: UseQueryOptions<AnalyticsOverview, ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.analyticsOverview(userId),
    queryFn: () => apiClient.getAnalyticsOverview(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const usePlatformAnalytics = (
  userId: string,
  platform?: Platform,
  options?: UseQueryOptions<PlatformAnalytics[], ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.platformAnalytics(userId, platform),
    queryFn: () => apiClient.getPlatformAnalytics(userId, platform),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useCollectAnalytics = (
  options?: UseMutationOptions<void, ApiError, AnalyticsRequest>
) => {
  return useMutation({
    mutationFn: (request: AnalyticsRequest) => apiClient.collectAnalytics(request),
    ...options,
  });
};

export const useDashboardStats = (
  options?: UseQueryOptions<DashboardStats, ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: () => apiClient.getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    ...options,
  });
};

// ============================================================================
// A/B Testing Hooks
// ============================================================================

export const useABTests = (
  options?: UseQueryOptions<ABTest[], ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.abTests,
    queryFn: () => apiClient.getABTests(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useABTest = (
  testId: string,
  options?: UseQueryOptions<ABTest, ApiError>
) => {
  return useQuery({
    queryKey: queryKeys.abTest(testId),
    queryFn: () => apiClient.getABTest(testId),
    enabled: !!testId,
    ...options,
  });
};

export const useCreateABTest = (
  options?: UseMutationOptions<ABTest, ApiError, ABTestRequest>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (test: ABTestRequest) => apiClient.createABTest(test),
    onSuccess: () => {
      // Invalidate A/B tests list
      queryClient.invalidateQueries({ queryKey: queryKeys.abTests });
    },
    ...options,
  });
};

export const useUpdateABTestMetrics = (
  options?: UseMutationOptions<void, ApiError, { testId: string; metrics: any }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ testId, metrics }) => apiClient.updateABTestMetrics(testId, metrics),
    onSuccess: (_, variables) => {
      // Invalidate the specific test to refresh its data
      queryClient.invalidateQueries({ queryKey: queryKeys.abTest(variables.testId) });
      // Invalidate tests list
      queryClient.invalidateQueries({ queryKey: queryKeys.abTests });
    },
    ...options,
  });
};

// ============================================================================
// Media Upload Hooks
// ============================================================================

export const useUploadMedia = (
  options?: UseMutationOptions<MediaUploadResponse, ApiError, File>
) => {
  return useMutation({
    mutationFn: (file: File) => apiClient.uploadMedia(file),
    ...options,
  });
};

// ============================================================================
// Auto-Engagement Hooks
// ============================================================================

export const useGenerateReply = (
  options?: UseMutationOptions<EngagementResponse, ApiError, EngagementRequest>
) => {
  return useMutation({
    mutationFn: (request: EngagementRequest) => apiClient.generateReply(request),
    ...options,
  });
};

// ============================================================================
// Smart Scheduling Hooks
// ============================================================================

export const useSmartSchedule = (
  options?: UseMutationOptions<SmartScheduleResponse, ApiError, SmartScheduleRequest>
) => {
  return useMutation({
    mutationFn: (request: SmartScheduleRequest) => apiClient.getSmartSchedule(request),
    ...options,
  });
};

// ============================================================================
// Content Recycling Hooks
// ============================================================================

export const useRecycleContent = (
  options?: UseMutationOptions<ContentRecycleResponse, ApiError, ContentRecycleRequest>
) => {
  return useMutation({
    mutationFn: (request: ContentRecycleRequest) => apiClient.recycleContent(request),
    ...options,
  });
};

// ============================================================================
// Custom Hooks for Complex Operations
// ============================================================================

// Hook for optimistic updates when creating posts
export const useOptimisticScheduledPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (post: ScheduledPostRequest) => apiClient.createScheduledPost(post),
    onMutate: async (newPost) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['scheduledPosts'] });
      
      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(['scheduledPosts']);
      
      // Optimistically update
      const optimisticPost: ScheduledPost = {
        id: `temp-${Date.now()}`,
        ...newPost,
        status: 'scheduled',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      queryClient.setQueryData(['scheduledPosts'], (old: any) => {
        if (!old) return { data: [optimisticPost], total: 1, page: 1, limit: 10 };
        return {
          ...old,
          data: [optimisticPost, ...old.data],
          total: old.total + 1,
        };
      });
      
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['scheduledPosts'], context.previousPosts);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
    },
  });
};

// Hook for batch operations
export const useBatchDeleteScheduledPosts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map(id => apiClient.deleteScheduledPost(id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
    },
  });
};