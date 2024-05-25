import { GithubIcon, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'

function Footer() {
  return (
    <MaxWidthWrapper className="flex justify-between text-zinc-400">
      <p className="text-xs md:text-sm">@2024. All rights reserved.</p>
      <div className="flex items-center gap-3">
        <Link href="https://github.com/saufi-opi" target="_blank">
          <GithubIcon className="h-5 w-5 transition-all duration-300 hover:scale-105 hover:text-primary md:h-7 md:w-7" />
        </Link>
        <Link href="https://www.linkedin.com/in/ahmad-saufi-074a08237/" target="_blank">
          <LinkedinIcon className="h-5 w-5 transition-all duration-300 hover:scale-105 hover:text-primary md:h-7 md:w-7" />
        </Link>
      </div>
    </MaxWidthWrapper>
  )
}

export default Footer
