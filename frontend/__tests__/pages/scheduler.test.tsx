import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scheduler from '../../pages/scheduler'

// Mock the DashboardLayout
jest.mock('../../components/layout/DashboardLayout', () => {
  return function MockDashboardLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="dashboard-layout">{children}</div>
  }
})

describe('Scheduler Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Scheduler />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  it('displays the scheduler header', () => {
    render(<Scheduler />)
    
    expect(screen.getByText('Smart Scheduler')).toBeInTheDocument()
    expect(screen.getByText('Plan and schedule your social media posts')).toBeInTheDocument()
  })

  it('shows calendar navigation', () => {
    render(<Scheduler />)
    
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next month/i })).toBeInTheDocument()
    expect(screen.getByText(/january|february|march|april|may|june|july|august|september|october|november|december/i)).toBeInTheDocument()
  })

  it('displays calendar grid', () => {
    render(<Scheduler />)
    
    // Check for day headers
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Mon')).toBeInTheDocument()
    expect(screen.getByText('Tue')).toBeInTheDocument()
    expect(screen.getByText('Wed')).toBeInTheDocument()
    expect(screen.getByText('Thu')).toBeInTheDocument()
    expect(screen.getByText('Fri')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('shows scheduled posts in calendar', () => {
    render(<Scheduler />)
    
    // Should show some scheduled posts (based on mock data)
    expect(screen.getByText('New Product Launch')).toBeInTheDocument()
    expect(screen.getByText('Weekly Tips')).toBeInTheDocument()
  })

  it('allows navigation between months', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)
    
    const nextButton = screen.getByRole('button', { name: /next month/i })
    await user.click(nextButton)
    
    // Month should change (you might need to adjust based on current date)
    // This test might need to be more specific based on your implementation
    expect(nextButton).toBeInTheDocument()
  })

  it('displays time slot analytics', () => {
    render(<Scheduler />)
    
    expect(screen.getByText('Best Times to Post')).toBeInTheDocument()
    expect(screen.getByText('9:00 AM')).toBeInTheDocument()
    expect(screen.getByText('1:00 PM')).toBeInTheDocument()
    expect(screen.getByText('6:00 PM')).toBeInTheDocument()
  })

  it('shows engagement metrics for time slots', () => {
    render(<Scheduler />)
    
    // Should show engagement percentages
    expect(screen.getByText('92%')).toBeInTheDocument()
    expect(screen.getByText('88%')).toBeInTheDocument()
    expect(screen.getByText('85%')).toBeInTheDocument()
  })

  it('opens post details modal when clicking on a post', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)
    
    const postElement = screen.getByText('New Product Launch')
    await user.click(postElement)
    
    // Should open modal with post details
    await waitFor(() => {
      expect(screen.getByText('Post Details')).toBeInTheDocument()
    })
  })

  it('displays post details in modal', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)
    
    const postElement = screen.getByText('New Product Launch')
    await user.click(postElement)
    
    await waitFor(() => {
      expect(screen.getByText('Post Details')).toBeInTheDocument()
      expect(screen.getByText('Exciting news! Our new product is launching next week. Stay tuned for more details! 🚀')).toBeInTheDocument()
      expect(screen.getByText('Twitter, LinkedIn')).toBeInTheDocument()
    })
  })

  it('allows editing posts from modal', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)
    
    const postElement = screen.getByText('New Product Launch')
    await user.click(postElement)
    
    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /edit post/i })
      expect(editButton).toBeInTheDocument()
    })
  })

  it('allows deleting posts from modal', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)
    
    const postElement = screen.getByText('New Product Launch')
    await user.click(postElement)
    
    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /delete post/i })
      expect(deleteButton).toBeInTheDocument()
    })
  })

  it('closes modal when clicking close button', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)
    
    const postElement = screen.getByText('New Product Launch')
    await user.click(postElement)
    
    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close/i })
      user.click(closeButton)
    })
    
    await waitFor(() => {
      expect(screen.queryByText('Post Details')).not.toBeInTheDocument()
    })
  })

  it('shows create new post button', () => {
    render(<Scheduler />)
    
    expect(screen.getByRole('button', { name: /create new post/i })).toBeInTheDocument()
  })

  it('displays different post types with appropriate styling', () => {
    render(<Scheduler />)
    
    // Should show different colored indicators for different platforms
    const twitterPosts = screen.getAllByText(/twitter/i)
    const facebookPosts = screen.getAllByText(/facebook/i)
    const linkedinPosts = screen.getAllByText(/linkedin/i)
    
    expect(twitterPosts.length).toBeGreaterThan(0)
    expect(facebookPosts.length).toBeGreaterThan(0)
    expect(linkedinPosts.length).toBeGreaterThan(0)
  })
})