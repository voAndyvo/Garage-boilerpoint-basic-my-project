import { redirect } from 'next/navigation'
import { getServerSession } from '@/actions/auth.actions'
import { PageShell } from '@/components/layout/PageShell'

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  if (!session) redirect('/auth/signin')

  return <PageShell>{children}</PageShell>
}
