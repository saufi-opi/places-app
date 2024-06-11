import { FlipWords } from '@/components/animations/flip-words'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <MaxWidthWrapper className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 px-4 md:grid-cols-[1fr_400px] md:gap-12 md:px-6 lg:grid-cols-[1fr_600px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl xl:text-6xl/none">
              <FlipWords words={['Discover', 'Share']} duration={2000} /> the Best Places to Visit
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 md:text-xl">
              Explore a curated selection of the top destinations nearby. Plan your next adventure with our platform.
            </p>
          </div>
          <div>
            <Link href="/explore">
              <Button>Discover Places</Button>
            </Link>
          </div>
        </div>
        <Image alt="Hero" className="aspect-auto h-full w-full" height="600" src="/home.png" width="600" />
      </div>
    </MaxWidthWrapper>
  )
}
