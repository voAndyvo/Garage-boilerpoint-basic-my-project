import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInPage from '@/app/(auth)/auth/signin/page'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

// Mock functions used to check navigation side effects during test
const mockReplace = vi.fn()
const mockRefresh = vi.fn()
// Auth actions mock functions that replace real firebase calls in this unit test
const mockSignInWithEmail = vi.fn<(email: string, password: string) => Promise<void>>()


// Use these mock implementations for import calls instead of using the real libraries
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
}))

// replace auth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

// replace toast API 
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('SignInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks() // start each test with clean slate

    mockSignInWithEmail.mockResolvedValue() // configure what mock promise returns

    // Tell useAuth() what to return when the component renders
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      profile: null,
      loading: false,
      signInWithEmail: mockSignInWithEmail,
      signUpWithEmail: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
    })
  })

  it('completes the happy path email login flow', async () => {
    const user = userEvent.setup() // init a user-event instance to simulate user inputs

    render(<SignInPage />) // Render the React component to test

    // Find elements on the screen and interact with them
    await user.type(screen.getByLabelText(/email/i), 'test@test.com')
    await user.type(screen.getByLabelText(/password/i), 'Test123!')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // wait for async operations to finish then check assertions
    await waitFor(() => {
      expect(mockSignInWithEmail).toHaveBeenCalledWith('test@test.com', 'Test123!')
      expect(toast.success).toHaveBeenCalledWith('Signed in successfully')
      expect(mockReplace).toHaveBeenCalledWith('/team-page')
      expect(mockRefresh).toHaveBeenCalled()
    })
  })
})
