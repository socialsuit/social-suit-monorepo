import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Dashboard from '../../pages/dashboard'

// Mock the dashboard components
jest.mock('../../components/dashboard/KPICards', () => {
  return function MockKPICards() {
    return <div data-testid="kpi-cards">KPI Cards</div>
  }
})

jest.mock('../../components/dashboard/PerformanceChart', () => {
  return function MockPerformanceChart() {
    return <div data-testid="performance-chart">Performance Chart</div>
  }
})

jest.mock('../../components/dashboard/ActivityStream', () => {
  return function MockActivityStream() {
    return <div data-testid="activity-stream">Activity Stream</div>
  }
})

jest.mock('../../components/dashboard/ConnectedPlatforms', () => {
  return function MockConnectedPlatforms() {
    return <div data-testid="connected-platforms">Connected Platforms</div>
  }
})

jest.mock('../../components/dashboard/UpcomingPosts', () => {
  return function MockUpcomingPosts() {
    return <div data-testid="upcoming-posts">Upcoming Posts</div>
  }
})

jest.mock('../../components/dashboard/QuickComposer', () => {
  return function MockQuickComposer() {
    return <div data-testid="quick-composer">Quick Composer</div>
  }
})

jest.mock('../../components/layout/DashboardLayout', () => {
  return function MockDashboardLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="dashboard-layout">{children}</div>
  }
})

describe('Dashboard Page', () => {
  it('renders without crashing', () => {
    render(<Dashboard />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  it('displays all dashboard components', () => {
    render(<Dashboard />)
    
    expect(screen.getByTestId('kpi-cards')).toBeInTheDocument()
    expect(screen.getByTestId('performance-chart')).toBeInTheDocument()
    expect(screen.getByTestId('activity-stream')).toBeInTheDocument()
    expect(screen.getByTestId('connected-platforms')).toBeInTheDocument()
    expect(screen.getByTestId('upcoming-posts')).toBeInTheDocument()
    expect(screen.getByTestId('quick-composer')).toBeInTheDocument()
  })

  it('has proper page title', () => {
    render(<Dashboard />)
    expect(document.title).toBe('Dashboard - Social Suit')
  })

  it('displays welcome message', () => {
    render(<Dashboard />)
    expect(screen.getByText('Welcome back!')).toBeInTheDocument()
    expect(screen.getByText("Here's what's happening with your social media accounts")).toBeInTheDocument()
  })

  it('renders grid layout correctly', () => {
    render(<Dashboard />)
    const gridContainer = screen.getByTestId('dashboard-layout').querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
  })
})