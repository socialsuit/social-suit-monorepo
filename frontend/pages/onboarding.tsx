// ============================================================================
// Onboarding Page - Premium SaaS Design
// ============================================================================

import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PlatformConnectButton } from '../components/auth/PlatformConnectButton';
import { PlatformUtils } from '../lib/oauth';
import { Platform } from '../lib/types';

// ============================================================================
// Types
// ============================================================================

interface OnboardingData {
  role: string;
  company: string;
  teamSize: string;
  goals: string[];
  platforms: Platform[];
}

// ============================================================================
// Onboarding Page Component
// ============================================================================

const OnboardingPage: NextPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    role: '',
    company: '',
    teamSize: '',
    goals: [],
    platforms: [],
  });

  const totalSteps = 4;

  // ============================================================================
  // Step Data
  // ============================================================================

  const roles = [
    { id: 'marketing-manager', label: 'Marketing Manager', icon: '📊' },
    { id: 'social-media-manager', label: 'Social Media Manager', icon: '📱' },
    { id: 'content-creator', label: 'Content Creator', icon: '✨' },
    { id: 'business-owner', label: 'Business Owner', icon: '🏢' },
    { id: 'agency-owner', label: 'Agency Owner', icon: '🎯' },
    { id: 'freelancer', label: 'Freelancer', icon: '💼' },
  ];

  const teamSizes = [
    { id: 'solo', label: 'Just me', description: 'Individual user' },
    { id: 'small', label: '2-10 people', description: 'Small team' },
    { id: 'medium', label: '11-50 people', description: 'Growing company' },
    { id: 'large', label: '51+ people', description: 'Enterprise' },
  ];

  const goals = [
    { id: 'increase-engagement', label: 'Increase engagement', icon: '❤️' },
    { id: 'grow-followers', label: 'Grow followers', icon: '📈' },
    { id: 'drive-traffic', label: 'Drive website traffic', icon: '🌐' },
    { id: 'generate-leads', label: 'Generate leads', icon: '🎯' },
    { id: 'boost-sales', label: 'Boost sales', icon: '💰' },
    { id: 'brand-awareness', label: 'Build brand awareness', icon: '🏆' },
    { id: 'save-time', label: 'Save time on posting', icon: '⏰' },
    { id: 'analytics', label: 'Better analytics', icon: '📊' },
  ];

  const platforms: Platform[] = ['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'];

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRoleSelect = (role: string) => {
    setData(prev => ({ ...prev, role }));
  };

  const handleTeamSizeSelect = (teamSize: string) => {
    setData(prev => ({ ...prev, teamSize }));
  };

  const handleGoalToggle = (goal: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handlePlatformConnect = (platform: Platform) => {
    setData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  // ============================================================================
  // Step Validation
  // ============================================================================

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.role !== '';
      case 2:
        return data.teamSize !== '';
      case 3:
        return data.goals.length > 0;
      case 4:
        return true; // Platform connection is optional
      default:
        return false;
    }
  };

  // ============================================================================
  // Render Steps
  // ============================================================================

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your role?</h2>
              <p className="text-gray-600">Help us personalize your experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    data.role === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{role.icon}</span>
                    <span className="font-medium text-gray-900">{role.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your team size?</h2>
              <p className="text-gray-600">This helps us recommend the right features</p>
            </div>
            
            <div className="space-y-3">
              {teamSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleTeamSizeSelect(size.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    data.teamSize === size.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{size.label}</div>
                      <div className="text-sm text-gray-600">{size.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      data.teamSize === size.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {data.teamSize === size.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your goals?</h2>
              <p className="text-gray-600">Select all that apply - we'll help you achieve them</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    data.goals.includes(goal.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-medium text-gray-900">{goal.label}</span>
                    {data.goals.includes(goal.id) && (
                      <svg className="w-5 h-5 text-blue-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect your platforms</h2>
              <p className="text-gray-600">Connect your social media accounts to get started</p>
            </div>
            
            <div className="space-y-4">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: PlatformUtils.getColor(platform) }}>
                      {PlatformUtils.getIcon(platform)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{PlatformUtils.getDisplayName(platform)}</div>
                      <div className="text-sm text-gray-600">
                        {data.platforms.includes(platform) ? 'Connected' : 'Not connected'}
                      </div>
                    </div>
                  </div>
                  
                  <PlatformConnectButton
                    platform={platform}
                    isConnected={data.platforms.includes(platform)}
                    onConnect={() => handlePlatformConnect(platform)}
                    size="sm"
                  />
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Don't worry!</h4>
                  <p className="text-sm text-blue-700">
                    You can connect more platforms later from your dashboard. 
                    We'll help you set up posting schedules and content strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ============================================================================
  // Render Component
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Social Suit</span>
            </div>
            
            <div className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === totalSteps ? 'Get Started' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      {/* Skip Option */}
      <div className="text-center pb-8">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
        >
          Skip onboarding and go to dashboard
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;