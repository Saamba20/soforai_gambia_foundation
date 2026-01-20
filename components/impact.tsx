"use client"

import { useEffect, useState, useRef } from "react"
import { Users, GraduationCap, Stethoscope, MapPin } from "lucide-react"

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "People Helped", description: "Lives touched through our programs" },
  { icon: GraduationCap, value: 1200, suffix: "+", label: "Students Supported", description: "Children receiving education support" },
  { icon: Stethoscope, value: 3500, suffix: "+", label: "Medical Consultations", description: "Free healthcare services provided" },
  { icon: MapPin, value: 45, suffix: "+", label: "Communities Reached", description: "Villages and towns across The Gambia" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export function Impact() {
  return (
    <section id="impact" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Making Real Change in The Gambia
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Every number represents a life changed, a community strengthened, and hope restored. 
            Together, we are building a better future for The Gambia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-lg font-semibold mt-2">{stat.label}</div>
              <div className="text-sm text-primary-foreground/70 mt-1">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-8 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl italic text-primary-foreground/90 mb-4">
              &quot;Thanks to SOFORAI GAMBIA FOUNDATION, my children can now go to school with proper 
              uniforms and books. This has changed our family&apos;s future forever.&quot;
            </p>
            <footer className="text-primary-foreground/70">
              <cite className="not-italic font-semibold">Fatou Jallow</cite>
              <span className="mx-2">-</span>
              <span>Mother of three, Brikama</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
