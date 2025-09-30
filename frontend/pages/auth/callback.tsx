// ============================================================================
// OAuth Callback Page - Handle Platform Authentication
// ============================================================================

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { 
  OAuthFlowManager, 
  OAuthErrorHandler, 
  PlatformUtils 
} from '../../lib/oauth';
import { useConnectPlatform } from '../../lib/hooks/api';
import { Platform } from '../../lib/types';

// ============================================================================
// Callback Page Component
// ============================================================================

const AuthCallbackPage: NextPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Processing authentication...');
  const [platform, setPlatform] = useState<Platform | null>(null);

  const connectPlatform = useConnectPlatform({
    onSuccess: () => {
      setStatus('success');
      setMessage('Platform connected successfully!');
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard/connections');
      }, 2000);
    },
    onError: (error) => {
      setStatus('error');
      setMessage(error.message || 'Failed to connect platform');
    },
  });

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check for OAuth errors first
        const oauthError = OAuthErrorHandler.parseError(urlParams);
        if (oauthError) {
          setStatus('error');
          setMessage(OAuthErrorHandler.getErrorMessage(oauthError));
          return;
        }

        // Get authorization code and state
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (!code || !state) {
          setStatus('error');
          setMessage('Missing authorization code or state parameter');
          return;
        }

        // Validate callback
        const callbackResult = OAuthFlowManager.handleCallback(code, state);
        
        if (!callbackResult.success) {
          setStatus('error');
          setMessage(callbackResult.error || 'Authentication failed');
          return;
        }

        if (!callbackResult.platform) {
          setStatus('error');
          setMessage('Platform information not found');
          return;
        }

        setPlatform(callbackResult.platform);
        setMessage(`Connecting ${PlatformUtils.getDisplayName(callbackResult.platform)}...`);

        // Connect the platform via API
        await connectPlatform.mutateAsync({
          platform: callbackResult.platform,
          authorization_code: code,
          redirect_uri: `${window.location.origin}/auth/callback`,
        });

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred during authentication');
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      handleCallback();
    }
  }, [connectPlatform]);

  // ============================================================================
  // Render Loading/Success/Error States
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Status Icon */}
        <div className="mb-6">
          {status === 'loading' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              <svg 
                className="animate-spin w-8 h-8 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
          
          {status === 'success' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          )}
          
          {status === 'error' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>
          )}
        </div>

        {/* Platform Info */}
        {platform && (
          <div className="mb-4">
            <div 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2"
              style={{ backgroundColor: PlatformUtils.getColor(platform) }}
            >
              <span className="text-white font-semibold text-lg">
                {PlatformUtils.getDisplayName(platform)[0]}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {PlatformUtils.getDisplayName(platform)}
            </h2>
          </div>
        )}

        {/* Status Message */}
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* Action Buttons */}
        {status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard/connections')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Connections
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="text-sm text-gray-500">
            Redirecting to connections page...
          </div>
        )}

        {status === 'loading' && connectPlatform.isLoading && (
          <div className="text-sm text-gray-500">
            This may take a few moments...
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackPage;