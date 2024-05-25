import { cn } from '@/lib/utils'

function MaxWidthWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto max-w-screen-xl px-5 xl:px-0 ', className)}>{children}</div>
}

export default MaxWidthWrapper
