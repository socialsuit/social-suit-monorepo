# Social Suit Monorepo

A comprehensive social media management platform built with Next.js frontend and FastAPI backend, designed to streamline content creation, scheduling, and analytics across multiple social platforms.

## 🚀 Features

- **Multi-Platform Publishing**: Support for Twitter, Facebook, Instagram, LinkedIn, YouTube, and TikTok
- **AI-Powered Content Creation**: Intelligent caption generation and content optimization
- **Advanced Scheduler**: Visual calendar interface with optimal posting time recommendations
- **Real-Time Analytics**: Comprehensive performance tracking and engagement metrics
- **Team Collaboration**: Multi-user support with role-based permissions
- **Content Library**: Centralized media management and asset organization
- **A/B Testing**: Built-in testing capabilities for content optimization

## 📁 Project Structure

```
social-suit-monorepo/
├── frontend/                 # Next.js React application
│   ├── app/                 # App router pages and layouts
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities, hooks, and configurations
│   ├── public/              # Static assets and hero graphics
│   └── __tests__/           # Unit and integration tests
├── backend/                 # FastAPI Python application
│   ├── routers/             # API route handlers
│   ├── models/              # Database models and schemas
│   ├── services/            # Business logic and external integrations
│   └── utils/               # Helper functions and utilities
└── docs/                    # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives
- **State Management**: React Query + Zustand
- **Testing**: Jest + React Testing Library
- **Animation**: Framer Motion

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL (primary), MongoDB (analytics), Redis (caching)
- **Authentication**: JWT with OAuth2 integration
- **API Documentation**: OpenAPI/Swagger
- **Testing**: Pytest
- **Task Queue**: Celery with Redis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.11+
- PostgreSQL 14+
- Redis 6+
- MongoDB 5+ (optional, for analytics)

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start development server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   API documentation at `http://localhost:8000/docs`

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCKS=false
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# OAuth Configuration
NEXT_PUBLIC_TWITTER_CLIENT_ID=your_twitter_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_linkedin_client_id

# Analytics & Monitoring
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

#### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/socialsuit
MONGODB_URL=mongodb://localhost:27017/socialsuit_analytics
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Social Platform APIs
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

### Backend Tests
```bash
cd backend
pytest                     # Run all tests
pytest --cov=.            # Run tests with coverage
pytest -v                 # Run tests with verbose output
```

## 📊 API Documentation

The backend API is fully documented using OpenAPI/Swagger. When running the backend server, visit:
- **Interactive Documentation**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

### Key API Endpoints

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/refresh`
- **Content Management**: `/content/posts`, `/content/drafts`, `/content/media`
- **Scheduling**: `/schedule/posts`, `/schedule/calendar`
- **Analytics**: `/analytics/overview`, `/analytics/engagement`
- **Platform Connections**: `/connections/platforms`, `/connections/oauth`

## 🎨 Design System

The project uses a comprehensive design token system located in `frontend/lib/design-tokens.ts`. This includes:

- **Colors**: Primary, secondary, success, warning, error palettes
- **Typography**: Font families, sizes, weights, and spacing
- **Layout**: Breakpoints, spacing scale, and grid system
- **Components**: Button variants, card styles, input designs
- **Platform Branding**: Social media platform color schemes

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Docker)
```bash
# Build Docker image
docker build -t socialsuit-backend .

# Run container
docker run -p 8000:8000 socialsuit-backend
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feat/amazing-feature`
3. **Make your changes** and add tests
4. **Run tests**: `npm test` (frontend) and `pytest` (backend)
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feat/amazing-feature`
7. **Open a Pull Request**

### Code Style Guidelines

- **Frontend**: ESLint + Prettier configuration
- **Backend**: Black + isort + flake8 configuration
- **Commits**: Follow conventional commit format
- **Testing**: Maintain >80% code coverage

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` directory for detailed guides
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes and releases.

---

**Built with ❤️ by the Social Suit Team**