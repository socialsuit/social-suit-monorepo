// ============================================================================
// Composer Page - Multi-Platform Content Creation
// ============================================================================

import { useState, useRef, useCallback } from 'react';
import { NextPage } from 'next';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PlatformUtils } from '../lib/oauth';
import { Platform } from '../lib/types';

// ============================================================================
// Types
// ============================================================================

interface MediaFile {
  id: string;
  file: File;
  url: string;
  type: 'image' | 'video';
  size: number;
  dimensions?: { width: number; height: number };
}

interface PostContent {
  text: string;
  platforms: Platform[];
  media: MediaFile[];
  scheduledTime?: Date;
  tags: string[];
}

interface AIGenerationOptions {
  tone: 'professional' | 'casual' | 'friendly' | 'humorous' | 'inspirational';
  length: 'short' | 'medium' | 'long';
  includeHashtags: boolean;
  includeEmojis: boolean;
  topic?: string;
}

// ============================================================================
// Composer Page Component
// ============================================================================

const ComposerPage: NextPage = () => {
  const [content, setContent] = useState<PostContent>({
    text: '',
    platforms: [],
    media: [],
    tags: []
  });
  
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [aiOptions, setAIOptions] = useState<AIGenerationOptions>({
    tone: 'professional',
    length: 'medium',
    includeHashtags: true,
    includeEmojis: false
  });
  
  const [isScheduling, setIsScheduling] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ============================================================================
  // Platform Management
  // ============================================================================

  const togglePlatform = (platform: Platform) => {
    setContent(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const getCharacterLimit = (platform: Platform) => {
    switch (platform) {
      case 'twitter': return 280;
      case 'facebook': return 63206;
      case 'instagram': return 2200;
      case 'linkedin': return 3000;
      case 'tiktok': return 2200;
      case 'youtube': return 5000;
      default: return 280;
    }
  };

  const getMinCharacterLimit = () => {
    if (content.platforms.length === 0) return 280;
    return Math.min(...content.platforms.map(getCharacterLimit));
  };

  // ============================================================================
  // Media Management
  // ============================================================================

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert(`File ${file.name} is too large. Maximum size is 50MB.`);
        return;
      }

      const mediaFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video/') ? 'video' : 'image',
        size: file.size
      };

      // Get image dimensions for images
      if (mediaFile.type === 'image') {
        const img = new Image();
        img.onload = () => {
          mediaFile.dimensions = { width: img.width, height: img.height };
          setContent(prev => ({
            ...prev,
            media: [...prev.media, mediaFile]
          }));
        };
        img.src = mediaFile.url;
      } else {
        setContent(prev => ({
          ...prev,
          media: [...prev.media, mediaFile]
        }));
      }
    });

    // Reset input
    if (event.target) {
      event.target.value = '';
    }
  }, []);

  const removeMedia = (mediaId: string) => {
    setContent(prev => ({
      ...prev,
      media: prev.media.filter(m => m.id !== mediaId)
    }));
  };

  // ============================================================================
  // AI Content Generation
  // ============================================================================

  const generateAIContent = async () => {
    setIsGeneratingAI(true);
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleContent = [
        "🚀 Excited to share our latest innovation! This breakthrough will transform how you approach social media management. What are your thoughts? #Innovation #SocialMedia #TechUpdate",
        "Behind the scenes of our creative process ✨ Sometimes the best ideas come from unexpected moments. How do you find inspiration? #Creativity #BehindTheScenes #Inspiration",
        "Monday motivation: Success isn't just about reaching your destination, it's about enjoying the journey and learning from every step along the way. 💪 #MondayMotivation #Success #Growth",
        "Just launched our new feature and the response has been incredible! Thank you to our amazing community for your continued support. 🙏 #ProductLaunch #Community #Grateful"
      ];
      
      const randomContent = sampleContent[Math.floor(Math.random() * sampleContent.length)];
      
      setContent(prev => ({
        ...prev,
        text: randomContent
      }));
      
      setShowAIOptions(false);
    } catch (error) {
      console.error('AI generation failed:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // ============================================================================
  // Publishing & Scheduling
  // ============================================================================

  const handlePublish = async () => {
    if (content.platforms.length === 0) {
      alert('Please select at least one platform.');
      return;
    }
    
    if (!content.text.trim()) {
      alert('Please enter some content.');
      return;
    }

    setIsPublishing(true);
    
    try {
      // Simulate publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Post published successfully!');
      
      // Reset form
      setContent({
        text: '',
        platforms: [],
        media: [],
        tags: []
      });
    } catch (error) {
      console.error('Publishing failed:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSchedule = async () => {
    if (!content.scheduledTime) {
      alert('Please select a scheduled time.');
      return;
    }

    setIsScheduling(true);
    
    try {
      // Simulate scheduling
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Post scheduled successfully!');
      
      // Reset form
      setContent({
        text: '',
        platforms: [],
        media: [],
        tags: []
      });
      setShowScheduler(false);
    } catch (error) {
      console.error('Scheduling failed:', error);
      alert('Failed to schedule post. Please try again.');
    } finally {
      setIsScheduling(false);
    }
  };

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const characterLimit = getMinCharacterLimit();
  const remainingChars = characterLimit - content.text.length;
  const isOverLimit = remainingChars < 0;

  // ============================================================================
  // Render Component
  // ============================================================================

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Post</h1>
            <p className="mt-1 text-sm text-gray-600">
              Compose and schedule content across multiple platforms
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowScheduler(!showScheduler)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Schedule
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || content.platforms.length === 0 || !content.text.trim()}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isPublishing ? (
                <>
                  <svg className="w-4 h-4 inline mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Publishing...
                </>
              ) : (
                'Publish Now'
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Composer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Content</h3>
                  <button
                    onClick={() => setShowAIOptions(!showAIOptions)}
                    className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>AI Generate</span>
                  </button>
                </div>

                {/* AI Options Panel */}
                {showAIOptions && (
                  <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-gray-900 mb-3">AI Generation Options</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                        <select
                          value={aiOptions.tone}
                          onChange={(e) => setAIOptions(prev => ({ ...prev, tone: e.target.value as any }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="professional">Professional</option>
                          <option value="casual">Casual</option>
                          <option value="friendly">Friendly</option>
                          <option value="humorous">Humorous</option>
                          <option value="inspirational">Inspirational</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                        <select
                          value={aiOptions.length}
                          onChange={(e) => setAIOptions(prev => ({ ...prev, length: e.target.value as any }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="short">Short</option>
                          <option value="medium">Medium</option>
                          <option value="long">Long</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={aiOptions.includeHashtags}
                          onChange={(e) => setAIOptions(prev => ({ ...prev, includeHashtags: e.target.checked }))}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Include hashtags</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={aiOptions.includeEmojis}
                          onChange={(e) => setAIOptions(prev => ({ ...prev, includeEmojis: e.target.checked }))}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Include emojis</span>
                      </label>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Topic (optional)</label>
                      <input
                        type="text"
                        value={aiOptions.topic || ''}
                        onChange={(e) => setAIOptions(prev => ({ ...prev, topic: e.target.value }))}
                        placeholder="e.g., product launch, team update, industry news"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <button
                      onClick={generateAIContent}
                      disabled={isGeneratingAI}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      {isGeneratingAI ? (
                        <>
                          <svg className="w-4 h-4 inline mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Generating...
                        </>
                      ) : (
                        'Generate Content'
                      )}
                    </button>
                  </div>
                )}

                {/* Text Area */}
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={content.text}
                    onChange={(e) => setContent(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="What's on your mind?"
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className={`absolute bottom-3 right-3 text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                    {remainingChars} characters remaining
                  </div>
                </div>

                {/* Character Limit Warning */}
                {isOverLimit && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">
                      Content exceeds the character limit for selected platforms. Consider shortening your message.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Media</h3>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Media</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Media Grid */}
                {content.media.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {content.media.map((media) => (
                      <div key={media.id} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {media.type === 'image' ? (
                            <img
                              src={media.url}
                              alt="Upload preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video
                              src={media.url}
                              className="w-full h-full object-cover"
                              controls={false}
                            />
                          )}
                        </div>
                        <button
                          onClick={() => removeMedia(media.id)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="mt-2 text-xs text-gray-500">
                          {media.type} • {formatFileSize(media.size)}
                          {media.dimensions && (
                            <span> • {media.dimensions.width}×{media.dimensions.height}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 cursor-pointer transition-colors"
                  >
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600 mb-2">Click to upload media</p>
                    <p className="text-sm text-gray-500">Support images and videos up to 50MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platforms</h3>
                <div className="space-y-3">
                  {(['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'] as Platform[]).map((platform) => (
                    <label key={platform} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={content.platforms.includes(platform)}
                        onChange={() => togglePlatform(platform)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: PlatformUtils.getColor(platform) }}
                      >
                        {PlatformUtils.getIcon(platform)}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 capitalize">{platform}</span>
                        <div className="text-xs text-gray-500">
                          {getCharacterLimit(platform)} characters max
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Scheduler */}
            {showScheduler && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Post</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                      <input
                        type="datetime-local"
                        value={content.scheduledTime ? content.scheduledTime.toISOString().slice(0, 16) : ''}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          scheduledTime: e.target.value ? new Date(e.target.value) : undefined
                        }))}
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={handleSchedule}
                      disabled={isScheduling || !content.scheduledTime || content.platforms.length === 0 || !content.text.trim()}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      {isScheduling ? (
                        <>
                          <svg className="w-4 h-4 inline mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Scheduling...
                        </>
                      ) : (
                        'Schedule Post'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Post Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                {content.text || content.media.length > 0 ? (
                  <div className="space-y-3">
                    {content.text && (
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{content.text}</p>
                    )}
                    {content.media.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {content.media.slice(0, 4).map((media) => (
                          <div key={media.id} className="aspect-square bg-gray-100 rounded overflow-hidden">
                            {media.type === 'image' ? (
                              <img src={media.url} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <video src={media.url} className="w-full h-full object-cover" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                      <span>Preview</span>
                      <span>{content.platforms.length} platform{content.platforms.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <p className="text-gray-500">Preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComposerPage;