"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#about", label: "About Us" },
  { href: "#programs", label: "Programs" },
  { href: "#impact", label: "Our Impact" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  /* Sticky background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Scroll-spy (stable) */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    )

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.substring(1))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm">SOFORAI GAMBIA</div>
              <div className="text-xs text-muted-foreground">FOUNDATION</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex gap-8"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  activeSection === link.href ? "page" : undefined
                }
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-full bg-primary transition-transform duration-300 origin-left",
                    activeSection === link.href
                      ? "scale-x-100"
                      : "scale-x-0"
                  )}
                />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex">
              <Link href="#donate">Donate</Link>
            </Button>

            <button
              className="md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            role="menu"
            className="md:hidden py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                role="menuitem"
                aria-current={
                  activeSection === link.href ? "page" : undefined
                }
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-md px-4 py-2 text-sm transition-colors",
                  activeSection === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
