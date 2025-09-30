# Social Suit API Endpoint Summary

## Frontend-Backend Integration Map

### 🏠 Dashboard Page (`/dashboard`)
**Backend Endpoints:**
- `GET /api/v1/social-suit/analytics/overview/{user_id}` - Dashboard overview metrics
- `GET /api/v1/social-suit/analytics/chart/engagement/{user_id}` - Performance charts
- `GET /api/v1/social-suit/scheduled-posts/upcoming/{user_id}` - Upcoming posts
- `GET /api/v1/social-suit/auth/me` - User profile information

### ✍️ Composer Page (`/composer`)
**Backend Endpoints:**
- `POST /api/v1/social-suit/scheduled-posts/create` - Create/schedule posts
- `POST /api/v1/social-suit/media/upload` - Upload media files
- `POST /api/v1/social-suit/customize/platform` - Platform-specific content optimization
- `GET /api/v1/social-suit/schedule/best-times` - Optimal posting times
- `POST /api/v1/social-suit/content/generate` - AI content generation

### 📅 Scheduler Page (`/scheduler`)
**Backend Endpoints:**
- `GET /api/v1/social-suit/scheduled-posts/calendar/{user_id}` - Calendar view of posts
- `GET /api/v1/social-suit/scheduled-posts/{post_id}` - Individual post details
- `PUT /api/v1/social-suit/scheduled-posts/{post_id}` - Update scheduled posts
- `DELETE /api/v1/social-suit/scheduled-posts/{post_id}` - Delete scheduled posts
- `GET /api/v1/social-suit/schedule/best-times` - Analytics for optimal times

### 📊 Analytics Page (`/analytics`)
**Backend Endpoints:**
- `GET /api/v1/social-suit/analytics/overview/{user_id}` - Performance overview
- `GET /api/v1/social-suit/analytics/platforms/{user_id}/{platform}` - Platform-specific metrics
- `GET /api/v1/social-suit/analytics/chart/{chart_type}/{user_id}` - Various chart data
- `GET /api/v1/social-suit/analytics/recommendations/{user_id}` - AI recommendations
- `GET /api/v1/social-suit/analytics/comparative/{user_id}` - Comparative analysis

### 🔐 Authentication (`/login`, `/signup`)
**Backend Endpoints:**
- `POST /api/v1/social-suit/register/email` - Email registration
- `POST /api/v1/social-suit/login/email` - Email login
- `POST /api/v1/social-suit/register/wallet` - Wallet registration
- `POST /api/v1/social-suit/login/wallet` - Wallet login
- `POST /api/v1/social-suit/refresh` - Token refresh
- `POST /api/v1/social-suit/logout` - User logout

### 🔗 Platform Connections (`/onboarding`)
**Backend Endpoints:**
- `GET /api/v1/social-suit/connect/meta` - Connect Facebook/Instagram
- `GET /api/v1/social-suit/connect/twitter` - Connect Twitter/X
- `GET /api/v1/social-suit/connect/linkedin` - Connect LinkedIn
- `GET /api/v1/social-suit/connect/youtube` - Connect YouTube
- `GET /api/v1/social-suit/connect/tiktok` - Connect TikTok
- `GET /api/v1/social-suit/callback/{platform}` - OAuth callbacks

## 🔧 Additional API Features

### Media Management
- `POST /api/v1/social-suit/media/upload` - Upload images/videos
- `DELETE /api/v1/social-suit/media/{media_id}` - Delete media
- `GET /api/v1/social-suit/media/library/{user_id}` - Media library
- `POST /api/v1/social-suit/thumbnail/generate-thumbnail` - Generate thumbnails

### Content Operations
- `POST /api/v1/social-suit/recycle/post` - Recycle existing posts
- `POST /api/v1/social-suit/engage/auto-engage` - Auto-engagement features
- `POST /api/v1/social-suit/ab-test/create` - A/B testing
- `GET /api/v1/social-suit/ab-test/results/{test_id}` - Test results

### System Health
- `GET /health` - Basic health check
- `GET /healthz` - Detailed health status
- `GET /ping` - Service ping

## 🎯 Frontend Implementation Strategy

### State Management
- **Redux Toolkit** for global state (user, auth, posts)
- **React Query** for server state and caching
- **Local Storage** for user preferences

### API Integration
- **Axios** with interceptors for authentication
- **Error boundaries** for graceful error handling
- **Loading states** for all async operations

### Real-time Features
- **WebSocket** connections for live updates (planned)
- **Polling** for scheduled post status updates
- **Push notifications** for engagement alerts

## 🚨 Mock Implementations

The following features are mocked in the frontend due to backend limitations:

1. **Real-time Analytics** - Using static data with periodic updates
2. **AI Content Generation** - Simulated responses with predefined templates
3. **Platform-specific Previews** - Client-side rendering based on platform rules
4. **Advanced Scheduling** - Basic scheduling with enhanced UI features

## 🔒 Security Considerations

- **JWT Authentication** with refresh tokens
- **Rate limiting** on all API endpoints
- **Input sanitization** middleware
- **CORS** configuration for frontend domains
- **Environment variables** for sensitive configuration

---

*This document serves as the definitive mapping between frontend components and backend API endpoints for the Social Suit application.*