import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Composer from '../../pages/composer'

// Mock the DashboardLayout
jest.mock('../../components/layout/DashboardLayout', () => {
  return function MockDashboardLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="dashboard-layout">{children}</div>
  }
})

describe('Composer Page', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Composer />)
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
  })

  it('displays the composer form', () => {
    render(<Composer />)
    
    expect(screen.getByText('Create Post')).toBeInTheDocument()
    expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument()
    expect(screen.getByText('Select Platforms')).toBeInTheDocument()
  })

  it('allows text input in the content textarea', async () => {
    const user = userEvent.setup()
    render(<Composer />)
    
    const textarea = screen.getByPlaceholderText("What's on your mind?")
    await user.type(textarea, 'Test post content')
    
    expect(textarea).toHaveValue('Test post content')
  })

  it('displays platform selection options', () => {
    render(<Composer />)
    
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('TikTok')).toBeInTheDocument()
  })

  it('allows platform selection', async () => {
    const user = userEvent.setup()
    render(<Composer />)
    
    const twitterButton = screen.getByRole('button', { name: /twitter/i })
    await user.click(twitterButton)
    
    // Check if the button state changes (you might need to adjust based on your implementation)
    expect(twitterButton).toHaveClass('bg-blue-500')
  })

  it('shows character count for different platforms', async () => {
    const user = userEvent.setup()
    render(<Composer />)
    
    // Select Twitter platform
    const twitterButton = screen.getByRole('button', { name: /twitter/i })
    await user.click(twitterButton)
    
    // Type some content
    const textarea = screen.getByPlaceholderText("What's on your mind?")
    await user.type(textarea, 'Test content')
    
    // Should show character count (Twitter has 280 char limit)
    expect(screen.getByText(/268/)).toBeInTheDocument() // 280 - 12 characters
  })

  it('displays AI caption generation section', () => {
    render(<Composer />)
    
    expect(screen.getByText('AI Caption Generation')).toBeInTheDocument()
    expect(screen.getByText('Generate with AI')).toBeInTheDocument()
  })

  it('shows media upload section', () => {
    render(<Composer />)
    
    expect(screen.getByText('Media')).toBeInTheDocument()
    expect(screen.getByText('Upload Images/Videos')).toBeInTheDocument()
  })

  it('displays scheduling options', () => {
    render(<Composer />)
    
    expect(screen.getByText('Schedule')).toBeInTheDocument()
    expect(screen.getByText('Post Now')).toBeInTheDocument()
    expect(screen.getByText('Schedule for Later')).toBeInTheDocument()
  })

  it('shows publish and save draft buttons', () => {
    render(<Composer />)
    
    expect(screen.getByRole('button', { name: /publish now/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save draft/i })).toBeInTheDocument()
  })

  it('generates AI content when AI button is clicked', async () => {
    const user = userEvent.setup()
    render(<Composer />)
    
    const aiButton = screen.getByText('Generate with AI')
    await user.click(aiButton)
    
    // Wait for AI generation (mocked)
    await waitFor(() => {
      const textarea = screen.getByPlaceholderText("What's on your mind?")
      expect(textarea).toHaveValue(expect.stringContaining('🚀'))
    })
  })

  it('handles file upload', async () => {
    const user = userEvent.setup()
    render(<Composer />)
    
    const fileInput = screen.getByLabelText(/upload images\/videos/i)
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    await user.upload(fileInput, file)
    
    // Should show uploaded file
    await waitFor(() => {
      expect(screen.getByText('test.jpg')).toBeInTheDocument()
    })
  })

  it('validates required fields before publishing', async () => {
    const user = userEvent.setup()
    render(<Composer />)
    
    const publishButton = screen.getByRole('button', { name: /publish now/i })
    await user.click(publishButton)
    
    // Should show validation message (adjust based on your implementation)
    expect(screen.getByText(/please add content/i)).toBeInTheDocument()
  })
})