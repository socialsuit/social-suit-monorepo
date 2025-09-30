// ============================================================================
// Landing Page - Premium SaaS Design
// ============================================================================

import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Platform } from '../lib/types';
import { PlatformUtils } from '../lib/oauth';

// ============================================================================
// Landing Page Component
// ============================================================================

const LandingPage: NextPage = () => {
  const [email, setEmail] = useState('');

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle early access signup
    console.log('Early access signup:', email);
  };

  // ============================================================================
  // Feature Data
  // ============================================================================

  const features = [
    {
      icon: '🚀',
      title: 'AI-Powered Content Generation',
      description: 'Create engaging posts with our advanced AI that understands your brand voice and audience preferences.',
    },
    {
      icon: '📊',
      title: 'Smart Analytics Dashboard',
      description: 'Track performance across all platforms with detailed insights and actionable recommendations.',
    },
    {
      icon: '⏰',
      title: 'Intelligent Scheduling',
      description: 'Optimize posting times with AI-driven scheduling that maximizes engagement and reach.',
    },
    {
      icon: '🔄',
      title: 'Content Recycling',
      description: 'Automatically adapt your best-performing content for different platforms and audiences.',
    },
    {
      icon: '🎯',
      title: 'A/B Testing Suite',
      description: 'Test different versions of your content to find what resonates best with your audience.',
    },
    {
      icon: '💬',
      title: 'Auto-Engagement',
      description: 'AI-powered responses and engagement strategies to build stronger community connections.',
    },
  ];

  const platforms = [
    Platform.TWITTER,
    Platform.FACEBOOK,
    Platform.INSTAGRAM,
    Platform.LINKEDIN,
    Platform.TIKTOK,
    Platform.YOUTUBE,
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechFlow Inc.',
      avatar: '👩‍💼',
      quote: 'Social Suit transformed our social media strategy. We\'ve seen 300% increase in engagement across all platforms.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Content Creator',
      company: 'Independent',
      avatar: '👨‍🎨',
      quote: 'The AI content generation is incredible. It saves me 10+ hours per week while improving my content quality.',
    },
    {
      name: 'Emily Watson',
      role: 'Brand Manager',
      company: 'StyleCorp',
      avatar: '👩‍💻',
      quote: 'The analytics insights helped us understand our audience better and double our conversion rates.',
    },
  ];

  // ============================================================================
  // Render Component
  // ============================================================================

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Social Suit</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Supercharge Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Social Media</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              AI-powered social media management that creates, schedules, and optimizes your content 
              across all platforms. Grow your audience while saving 10+ hours per week.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                Start Free Trial
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 transition-colors">
                Watch Demo
              </button>
            </div>

            {/* Platform Icons */}
            <div className="flex justify-center items-center space-x-6 mb-16">
              <span className="text-gray-500 text-sm font-medium">Works with:</span>
              {platforms.map((platform) => (
                <div
                  key={platform}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: PlatformUtils.getColor(platform) }}
                >
                  <span className="text-white font-semibold text-sm">
                    {PlatformUtils.getDisplayName(platform)[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Preview</h3>
                    <p className="text-gray-600">Interactive demo coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to dominate social media
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From content creation to performance analytics, Social Suit provides all the tools 
              you need to build a powerful social media presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-blue-100">Posts Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">300%</div>
              <div className="text-blue-100">Avg. Engagement Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10hrs</div>
              <div className="text-blue-100">Saved Per Week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by creators and marketers worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about Social Suit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your social media?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of creators and businesses who are already growing with Social Suit.
          </p>
          
          <form onSubmit={handleEarlyAccess} className="max-w-md mx-auto mb-8">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Get Started
              </button>
            </div>
          </form>
          
          <p className="text-sm text-gray-500">
            Start your 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SS</span>
                </div>
                <span className="text-xl font-bold">Social Suit</span>
              </div>
              <p className="text-gray-400">
                AI-powered social media management for the modern creator.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Social Suit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;