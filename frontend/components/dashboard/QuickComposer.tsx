// ============================================================================
// Quick Composer Component
// ============================================================================

import { useState } from 'react';
import { PlatformUtils } from '../../lib/oauth';
import { Platform } from '../../lib/types';

// ============================================================================
// Types
// ============================================================================

interface QuickComposerProps {
  className?: string;
}

// ============================================================================
// Quick Composer Component
// ============================================================================

export const QuickComposer: React.FC<QuickComposerProps> = ({ className = '' }) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['twitter']);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // Mock connected platforms
  const connectedPlatforms: Platform[] = ['twitter', 'facebook', 'instagram', 'linkedin'];

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePost = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    setIsPosting(true);
    
    // Simulate API call
    setTimeout(() => {
      setContent('');
      setSelectedPlatforms(['twitter']);
      setIsExpanded(false);
      setIsPosting(false);
      
      // Show success message (you could use a toast library here)
      console.log('Post published successfully!');
    }, 2000);
  };

  const handleAIGenerate = () => {
    // Mock AI generation
    const aiSuggestions = [
      "🚀 Excited to share our latest product update! What feature would you like to see next? #ProductUpdate #Innovation",
      "💡 Pro tip: Consistency is key in social media marketing. Plan your content calendar and stick to it! #MarketingTips",
      "🎯 Just wrapped up an amazing team meeting. Great ideas are brewing! What's inspiring your team today? #Teamwork",
      "📈 Data-driven decisions lead to better results. Always measure, analyze, and optimize your strategy! #Analytics",
    ];
    
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setContent(randomSuggestion);
  };

  const getCharacterLimit = (platform: Platform) => {
    return PlatformUtils.getCharacterLimit(platform);
  };

  const getRemainingCharacters = () => {
    if (selectedPlatforms.length === 0) return 0;
    const limits = selectedPlatforms.map(platform => getCharacterLimit(platform));
    return Math.min(...limits) - content.length;
  };

  // ============================================================================
  // Render Component
  // ============================================================================

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Composer</h3>
          <button
            onClick={handleAIGenerate}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>AI Generate</span>
          </button>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's on your mind? Share it with your audience..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            rows={isExpanded ? 4 : 2}
          />
          
          {/* Character Count */}
          {content && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              <span className={getRemainingCharacters() < 0 ? 'text-red-500' : 'text-gray-500'}>
                {getRemainingCharacters()} characters remaining
              </span>
            </div>
          )}
        </div>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Platforms
              </label>
              <div className="flex flex-wrap gap-2">
                {connectedPlatforms.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform);
                  const platformColor = PlatformUtils.getColor(platform);
                  
                  return (
                    <button
                      key={platform}
                      onClick={() => handlePlatformToggle(platform)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: platformColor }}
                      >
                        {PlatformUtils.getIcon(platform)}
                      </div>
                      <span className="text-sm font-medium">
                        {PlatformUtils.getDisplayName(platform)}
                      </span>
                      {isSelected && (
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Upload */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Add Image</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Add Video</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Schedule</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setContent('');
                  setSelectedPlatforms(['twitter']);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePost}
                  disabled={!content.trim() || selectedPlatforms.length === 0 || getRemainingCharacters() < 0 || isPosting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPosting ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    'Publish Now'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed State */}
        {!isExpanded && content && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
            </div>
            <button
              onClick={handlePost}
              disabled={!content.trim() || selectedPlatforms.length === 0 || getRemainingCharacters() < 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};