// ============================================================================
// OAuth Utilities - Social Platform Authentication Flow
// ============================================================================

import { Platform } from './types';

// ============================================================================
// OAuth Configuration
// ============================================================================

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string[];
  state?: string;
}

export interface OAuthPlatformConfig {
  [Platform.TWITTER]: {
    authUrl: string;
    scope: string[];
  };
  [Platform.FACEBOOK]: {
    authUrl: string;
    scope: string[];
  };
  [Platform.INSTAGRAM]: {
    authUrl: string;
    scope: string[];
  };
  [Platform.LINKEDIN]: {
    authUrl: string;
    scope: string[];
  };
  [Platform.TIKTOK]: {
    authUrl: string;
    scope: string[];
  };
  [Platform.YOUTUBE]: {
    authUrl: string;
    scope: string[];
  };
}

// Platform-specific OAuth configurations
export const OAUTH_CONFIGS: OAuthPlatformConfig = {
  [Platform.TWITTER]: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
  },
  [Platform.FACEBOOK]: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scope: ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list', 'publish_to_groups'],
  },
  [Platform.INSTAGRAM]: {
    authUrl: 'https://api.instagram.com/oauth/authorize',
    scope: ['user_profile', 'user_media', 'instagram_basic', 'instagram_content_publish'],
  },
  [Platform.LINKEDIN]: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social', 'rw_organization_admin'],
  },
  [Platform.TIKTOK]: {
    authUrl: 'https://www.tiktok.com/auth/authorize/',
    scope: ['user.info.basic', 'video.list', 'video.upload'],
  },
  [Platform.YOUTUBE]: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'],
  },
};

// ============================================================================
// OAuth State Management
// ============================================================================

export class OAuthStateManager {
  private static readonly STATE_KEY = 'oauth_state';
  private static readonly PLATFORM_KEY = 'oauth_platform';
  private static readonly REDIRECT_KEY = 'oauth_redirect';

  static generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  static saveState(platform: Platform, state: string, redirectTo?: string): void {
    if (typeof window === 'undefined') return;
    
    sessionStorage.setItem(this.STATE_KEY, state);
    sessionStorage.setItem(this.PLATFORM_KEY, platform);
    if (redirectTo) {
      sessionStorage.setItem(this.REDIRECT_KEY, redirectTo);
    }
  }

  static validateState(receivedState: string): { isValid: boolean; platform?: Platform; redirectTo?: string } {
    if (typeof window === 'undefined') return { isValid: false };
    
    const savedState = sessionStorage.getItem(this.STATE_KEY);
    const platform = sessionStorage.getItem(this.PLATFORM_KEY) as Platform;
    const redirectTo = sessionStorage.getItem(this.REDIRECT_KEY);

    const isValid = savedState === receivedState;

    if (isValid) {
      // Clean up after validation
      this.clearState();
    }

    return { isValid, platform, redirectTo };
  }

  static clearState(): void {
    if (typeof window === 'undefined') return;
    
    sessionStorage.removeItem(this.STATE_KEY);
    sessionStorage.removeItem(this.PLATFORM_KEY);
    sessionStorage.removeItem(this.REDIRECT_KEY);
  }
}

// ============================================================================
// OAuth URL Builder
// ============================================================================

export class OAuthUrlBuilder {
  static buildAuthUrl(platform: Platform, config: OAuthConfig): string {
    const platformConfig = OAUTH_CONFIGS[platform];
    if (!platformConfig) {
      throw new Error(`OAuth configuration not found for platform: ${platform}`);
    }

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope.join(' '),
      response_type: 'code',
      state: config.state || OAuthStateManager.generateState(),
    });

    // Platform-specific parameters
    switch (platform) {
      case Platform.TWITTER:
        params.append('code_challenge_method', 'S256');
        params.append('code_challenge', this.generateCodeChallenge());
        break;
      case Platform.FACEBOOK:
      case Platform.INSTAGRAM:
        params.append('display', 'popup');
        break;
      case Platform.LINKEDIN:
        // LinkedIn uses default parameters
        break;
      case Platform.TIKTOK:
        params.append('response_type', 'code');
        break;
      case Platform.YOUTUBE:
        params.append('access_type', 'offline');
        params.append('prompt', 'consent');
        break;
    }

    return `${platformConfig.authUrl}?${params.toString()}`;
  }

  private static generateCodeChallenge(): string {
    // For Twitter OAuth 2.0 PKCE
    // In a real implementation, you'd generate a proper code challenge
    // This is a simplified version
    return btoa(Math.random().toString(36).substring(2, 15)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
}

// ============================================================================
// OAuth Flow Manager
// ============================================================================

export class OAuthFlowManager {
  static async initiateFlow(platform: Platform, redirectTo?: string): Promise<void> {
    const state = OAuthStateManager.generateState();
    const redirectUri = `${window.location.origin}/auth/callback`;
    
    // Save state for validation
    OAuthStateManager.saveState(platform, state, redirectTo);

    // Get platform-specific configuration
    const platformConfig = OAUTH_CONFIGS[platform];
    if (!platformConfig) {
      throw new Error(`OAuth configuration not found for platform: ${platform}`);
    }

    // Build OAuth URL
    const authUrl = OAuthUrlBuilder.buildAuthUrl(platform, {
      clientId: this.getClientId(platform),
      redirectUri,
      scope: platformConfig.scope,
      state,
    });

    // Redirect to OAuth provider
    window.location.href = authUrl;
  }

  static handleCallback(code: string, state: string): { 
    success: boolean; 
    platform?: Platform; 
    redirectTo?: string; 
    error?: string 
  } {
    // Validate state
    const validation = OAuthStateManager.validateState(state);
    
    if (!validation.isValid) {
      return { 
        success: false, 
        error: 'Invalid OAuth state. This may be a security issue.' 
      };
    }

    if (!code) {
      return { 
        success: false, 
        error: 'Authorization code not received from OAuth provider.' 
      };
    }

    return {
      success: true,
      platform: validation.platform,
      redirectTo: validation.redirectTo,
    };
  }

  private static getClientId(platform: Platform): string {
    // Get client IDs from environment variables
    const clientIds = {
      [Platform.TWITTER]: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
      [Platform.FACEBOOK]: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      [Platform.INSTAGRAM]: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
      [Platform.LINKEDIN]: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
      [Platform.TIKTOK]: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID,
      [Platform.YOUTUBE]: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID,
    };

    const clientId = clientIds[platform];
    if (!clientId) {
      throw new Error(`Client ID not configured for platform: ${platform}`);
    }

    return clientId;
  }
}

// ============================================================================
// OAuth Error Handling
// ============================================================================

export interface OAuthError {
  error: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
}

export class OAuthErrorHandler {
  static parseError(searchParams: URLSearchParams): OAuthError | null {
    const error = searchParams.get('error');
    if (!error) return null;

    return {
      error,
      error_description: searchParams.get('error_description') || undefined,
      error_uri: searchParams.get('error_uri') || undefined,
      state: searchParams.get('state') || undefined,
    };
  }

  static getErrorMessage(error: OAuthError): string {
    const errorMessages: Record<string, string> = {
      'access_denied': 'You denied access to your account. Please try again if you want to connect this platform.',
      'invalid_request': 'There was an error with the authorization request. Please try again.',
      'unauthorized_client': 'The application is not authorized to request access tokens.',
      'unsupported_response_type': 'The authorization server does not support this response type.',
      'invalid_scope': 'The requested scope is invalid or unknown.',
      'server_error': 'The authorization server encountered an error. Please try again later.',
      'temporarily_unavailable': 'The authorization server is temporarily unavailable. Please try again later.',
    };

    return errorMessages[error.error] || 
           error.error_description || 
           'An unknown error occurred during authorization.';
  }
}

// ============================================================================
// Platform-Specific Utilities
// ============================================================================

export const PlatformUtils = {
  getDisplayName(platform: Platform): string {
    const names = {
      [Platform.TWITTER]: 'Twitter',
      [Platform.FACEBOOK]: 'Facebook',
      [Platform.INSTAGRAM]: 'Instagram',
      [Platform.LINKEDIN]: 'LinkedIn',
      [Platform.TIKTOK]: 'TikTok',
      [Platform.YOUTUBE]: 'YouTube',
    };
    return names[platform] || platform;
  },

  getIcon(platform: Platform): string {
    // Return icon class names or SVG paths
    const icons = {
      [Platform.TWITTER]: 'twitter',
      [Platform.FACEBOOK]: 'facebook',
      [Platform.INSTAGRAM]: 'instagram',
      [Platform.LINKEDIN]: 'linkedin',
      [Platform.TIKTOK]: 'tiktok',
      [Platform.YOUTUBE]: 'youtube',
    };
    return icons[platform] || 'default';
  },

  getColor(platform: Platform): string {
    const colors = {
      [Platform.TWITTER]: '#1DA1F2',
      [Platform.FACEBOOK]: '#1877F2',
      [Platform.INSTAGRAM]: '#E4405F',
      [Platform.LINKEDIN]: '#0A66C2',
      [Platform.TIKTOK]: '#000000',
      [Platform.YOUTUBE]: '#FF0000',
    };
    return colors[platform] || '#6B7280';
  },

  getCharacterLimit(platform: Platform): number {
    const limits = {
      [Platform.TWITTER]: 280,
      [Platform.FACEBOOK]: 63206,
      [Platform.INSTAGRAM]: 2200,
      [Platform.LINKEDIN]: 3000,
      [Platform.TIKTOK]: 2200,
      [Platform.YOUTUBE]: 5000, // For video descriptions
    };
    return limits[platform] || 280;
  },
};

// ============================================================================
// Export all utilities
// ============================================================================

export {
  OAuthStateManager,
  OAuthUrlBuilder,
  OAuthFlowManager,
  OAuthErrorHandler,
};