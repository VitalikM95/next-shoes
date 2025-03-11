'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'

const Breadcrumbs = () => {
  const pathname = usePathname()
  const segments = pathname
    .split('/')
    .filter((segment) => segment !== '' && segment !== 'collections')

  const DISPLAY_NAMES: Record<string, string> = {
    man: "Men's Shoes",
    woman: "Women's Shoes",
  }

  const getDisplayName = (segment: string) => {
    return DISPLAY_NAMES[segment] || segment
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <span className="px-2 hover:no-underline">/</span>

        {segments.map((segment, i) => {
          const href = `/${segments.slice(0, i + 1).join('/')}`
          const isLast = i === segments.length - 1
          const displayName = getDisplayName(segment)

          return (
            <BreadcrumbItem key={href}>
              {isLast ? (
                <span>{displayName}</span>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{displayName}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { Breadcrumbs }
