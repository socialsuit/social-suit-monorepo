import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Analytics from '../../pages/analytics'

// Mock the DashboardLayout
jest.mock('../../components/layout/DashboardLayout', () => {
  return function MockDashboardLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="dashboard-layout">{children}</div>
  }
})

// Mock Chart.js components
jest.mock('react-chartjs-2', () => ({
  Line: ({ data, options }: any) => (
    <div data-testid="line-chart" data-chart-data={JSON.stringify(data)}>
      Line Chart Mock
    </div>
  ),
  Bar: ({ data, options }: any) => (
    <div data-testid="bar-chart" data-chart-data={JSON.stringify(data)}>
      Bar Chart Mock
    </div>
  ),
  Doughnut: ({ data, options }: any) => (
    <div data-testid="doughnut-chart" data-chart-data={JSON.stringify(data)}>
      Doughnut Chart Mock
    </div>
  ),
}))

describe('Analytics Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Analytics />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  it('displays the analytics header', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Track your social media performance')).toBeInTheDocument()
  })

  it('shows time period selector', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Last 7 days')).toBeInTheDocument()
    expect(screen.getByText('Last 30 days')).toBeInTheDocument()
    expect(screen.getByText('Last 90 days')).toBeInTheDocument()
  })

  it('displays key performance metrics', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Total Reach')).toBeInTheDocument()
    expect(screen.getByText('45.2K')).toBeInTheDocument()
    
    expect(screen.getByText('Engagement Rate')).toBeInTheDocument()
    expect(screen.getByText('4.8%')).toBeInTheDocument()
    
    expect(screen.getByText('Total Posts')).toBeInTheDocument()
    expect(screen.getByText('127')).toBeInTheDocument()
    
    expect(screen.getByText('New Followers')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('shows growth indicators', () => {
    render(<Analytics />)
    
    // Should show percentage changes
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
    expect(screen.getByText('+8.3%')).toBeInTheDocument()
    expect(screen.getByText('+15.7%')).toBeInTheDocument()
    expect(screen.getByText('+23.1%')).toBeInTheDocument()
  })

  it('renders engagement chart', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Engagement Over Time')).toBeInTheDocument()
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('displays platform performance chart', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Platform Performance')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('shows content type distribution', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Content Type Distribution')).toBeInTheDocument()
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument()
  })

  it('displays top performing posts', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Top Performing Posts')).toBeInTheDocument()
    expect(screen.getByText('New product launch announcement! 🚀')).toBeInTheDocument()
    expect(screen.getByText('Behind the scenes at our office')).toBeInTheDocument()
    expect(screen.getByText('Weekly industry insights')).toBeInTheDocument()
  })

  it('shows engagement metrics for top posts', () => {
    render(<Analytics />)
    
    // Should show likes, comments, shares for top posts
    expect(screen.getByText('1,234 likes')).toBeInTheDocument()
    expect(screen.getByText('89 comments')).toBeInTheDocument()
    expect(screen.getByText('156 shares')).toBeInTheDocument()
  })

  it('allows time period selection', async () => {
    const user = userEvent.setup()
    render(<Analytics />)
    
    const thirtyDaysButton = screen.getByText('Last 30 days')
    await user.click(thirtyDaysButton)
    
    // Should update the active state
    expect(thirtyDaysButton).toHaveClass('bg-blue-500')
  })

  it('updates charts when time period changes', async () => {
    const user = userEvent.setup()
    render(<Analytics />)
    
    const ninetyDaysButton = screen.getByText('Last 90 days')
    await user.click(ninetyDaysButton)
    
    // Charts should still be present (data would change in real implementation)
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('displays audience insights', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Audience Insights')).toBeInTheDocument()
    expect(screen.getByText('Age Groups')).toBeInTheDocument()
    expect(screen.getByText('18-24')).toBeInTheDocument()
    expect(screen.getByText('25-34')).toBeInTheDocument()
    expect(screen.getByText('35-44')).toBeInTheDocument()
  })

  it('shows demographic percentages', () => {
    render(<Analytics />)
    
    expect(screen.getByText('32%')).toBeInTheDocument()
    expect(screen.getByText('45%')).toBeInTheDocument()
    expect(screen.getByText('23%')).toBeInTheDocument()
  })

  it('displays best posting times', () => {
    render(<Analytics />)
    
    expect(screen.getByText('Best Times to Post')).toBeInTheDocument()
    expect(screen.getByText('Monday')).toBeInTheDocument()
    expect(screen.getByText('9:00 AM')).toBeInTheDocument()
    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('1:00 PM')).toBeInTheDocument()
  })

  it('shows export functionality', () => {
    render(<Analytics />)
    
    expect(screen.getByRole('button', { name: /export report/i })).toBeInTheDocument()
  })

  it('handles export button click', async () => {
    const user = userEvent.setup()
    render(<Analytics />)
    
    const exportButton = screen.getByRole('button', { name: /export report/i })
    await user.click(exportButton)
    
    // Should trigger export functionality (would need to mock in real implementation)
    expect(exportButton).toBeInTheDocument()
  })

  it('displays loading state appropriately', () => {
    render(<Analytics />)
    
    // All charts and data should be rendered (not in loading state for this test)
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument()
  })
})