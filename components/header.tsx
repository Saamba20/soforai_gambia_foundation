"use client"
import { useState, useEffect } from "react"
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
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Scroll Spy Logic
      const sections = navLinks.map(link => link.href.substring(1))
      const currentSection = sections.find(id => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(`#${currentSection}`)
      } else if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-card/90 backdrop-blur-md border-b border-border py-2 shadow-sm" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
              scrolled ? "bg-primary" : "bg-primary/20 backdrop-blur-md border border-primary/30"
            )}>
              <Heart className={cn(
                "w-5 h-5 transition-colors",
                scrolled ? "text-primary-foreground" : "text-primary"
              )} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-bold text-sm md:text-base leading-tight transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}>
                SOFORAI GAMBIA
              </span>
              <span className={cn(
                "text-xs leading-tight transition-colors",
                scrolled ? "text-muted-foreground" : "text-zinc-300/80"
              )}>
                FOUNDATION
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-all duration-200 relative py-1",
                  activeSection === link.href
                    ? "text-primary scale-105"
                    : scrolled ? "text-muted-foreground hover:text-primary" : "text-zinc-300 hover:text-white"
                )}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in zoom-in-50 duration-300" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild className={cn(
              "hidden sm:inline-flex transition-all duration-300",
              !scrolled && "bg-primary/90 hover:bg-primary border border-primary/20"
            )}>
              <Link href="#donate">Donate Now</Link>
            </Button>
            <button
              type="button"
              className={cn(
                "md:hidden p-2 transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium p-3 rounded-lg transition-colors",
                    activeSection === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="w-full mt-4">
                <Link href="#donate">Donate Now</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
