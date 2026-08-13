'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignUpPage() {
  const router = useRouter()
  const { user, loading, signUpWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (!loading && !isSubmitting && user) {
      router.replace('/team-page')
    }
  }, [loading, isSubmitting, user, router])

  if (loading) return <FullPageSpinner />

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team-page')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const onSubmit = async (data: SignupInput) => {
    try {
      await signUpWithEmail(data.email, data.password, data.displayName)
      router.push('/auth/signin?verification=sent')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    }
  }

  return (
    <div className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">

      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Create Account!</h1>
          <p className="text-base text-zinc-700 sm:text-lg">Get started for free</p>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-none border border-zinc-500 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-300" />
          </div>
          <div className="relative flex justify-center text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-zinc-600">
            <span className="bg-[#f6f1ff] px-3">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="displayName"
              className="block text-xs font-semibold uppercase tracking-[0.32em] text-zinc-900"
            >
              Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="displayName"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.displayName}
                aria-describedby={errors.displayName ? 'display-name-error' : undefined}
                className="h-14 w-full rounded-none border border-zinc-500 bg-white pl-11 pr-3 text-sm text-zinc-950 shadow-sm placeholder:text-zinc-400 focus:border-[#6d3ed3] focus:ring-1 focus:ring-[#6d3ed3] focus:outline-none aria-invalid:border-red-500"
                placeholder="Enter Your Name"
                {...register('displayName')}
              />
            </div>
            {errors.displayName && (
              <p id="display-name-error" className="text-xs text-red-500" role="alert">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-[0.32em] text-zinc-900"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="h-14 w-full rounded-none border border-zinc-500 bg-white pl-11 pr-3 text-sm text-zinc-950 shadow-sm placeholder:text-zinc-400 focus:border-[#6d3ed3] focus:ring-1 focus:ring-[#6d3ed3] focus:outline-none aria-invalid:border-red-500"
                placeholder="Enter Your Email"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-[0.32em] text-zinc-900"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="h-14 w-full rounded-none border border-zinc-500 bg-white pl-11 pr-3 text-sm text-zinc-950 shadow-sm placeholder:text-zinc-400 focus:border-[#6d3ed3] focus:ring-1 focus:ring-[#6d3ed3] focus:outline-none aria-invalid:border-red-500"
                placeholder="Create a Password"
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold uppercase tracking-[0.32em] text-zinc-900"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                className="h-14 w-full rounded-none border border-zinc-500 bg-white pl-11 pr-3 text-sm text-zinc-950 shadow-sm placeholder:text-zinc-400 focus:border-[#6d3ed3] focus:ring-1 focus:ring-[#6d3ed3] focus:outline-none aria-invalid:border-red-500"
                placeholder="Confirm Your Password"
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-xs text-red-500" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto flex min-w-48 items-center justify-center gap-2 rounded-none bg-[#6d3ed3] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(109,62,211,0.28)] transition-colors hover:bg-[#5f32c7] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-700">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-zinc-900 underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
