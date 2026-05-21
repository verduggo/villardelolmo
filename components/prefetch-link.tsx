"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ComponentProps, type MouseEvent, useCallback, useTransition } from "react"

interface PrefetchLinkProps extends ComponentProps<typeof Link> {
  prefetch?: boolean
}

export function PrefetchLink({ 
  href, 
  children, 
  onClick,
  prefetch = true,
  ...props 
}: PrefetchLinkProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    onClick?.(e)
    
    // If default was prevented, don't do anything
    if (e.defaultPrevented) return
    
    // For internal links, use startTransition for smoother navigation
    const url = typeof href === "string" ? href : href.pathname || "/"
    
    if (url.startsWith("/") && !url.startsWith("//")) {
      e.preventDefault()
      startTransition(() => {
        router.push(url)
      })
    }
  }, [href, onClick, router])

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  )
}
