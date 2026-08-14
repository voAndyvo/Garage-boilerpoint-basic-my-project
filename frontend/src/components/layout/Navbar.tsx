'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/auth/signin')
    router.refresh()
  }

  return (
    <header className="flex h-16 items-center justify-end bg-[#663ec7] px-4">
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center justify-center rounded-3xl font-bold pt-2 pb-2 pl-5 pr-5 border-3 text-lg transition-colors hover:bg-zinc-100 hover:text-zinc-600 bg-white text-black"
          aria-label="Sign out"
        >
          Log out
        </button>
      </div>
    </header>
  )
}
