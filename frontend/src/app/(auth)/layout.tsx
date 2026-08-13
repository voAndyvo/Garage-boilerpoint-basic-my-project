import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#efe7ff] px-4 py-10 text-zinc-900 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-20 bg-[#6d3ed3] sm:h-24" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center py-8 sm:min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </div>
  )
}
