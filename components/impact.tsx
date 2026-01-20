"use client"

import { useEffect, useState, useRef } from "react"
import { Users, GraduationCap, Stethoscope, MapPin, Quote } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "People Helped", description: "Lives touched through our programs" },
  { icon: GraduationCap, value: 1200, suffix: "+", label: "Students Supported", description: "Children receiving education support" },
  { icon: Stethoscope, value: 3500, suffix: "+", label: "Medical Consultations", description: "Free healthcare services provided" },
  { icon: MapPin, value: 45, suffix: "+", label: "Communities Reached", description: "Villages and towns across The Gambia" },
]

const testimonials = [
  {
    quote: "Thanks to SOFORAI GAMBIA FOUNDATION, my children can now go to school with proper uniforms and books. This has changed our family's future forever.",
    author: "Fatou Jallow",
    role: "Mother of three",
    location: "Brikama"
  },
  {
    quote: "The free medical camp provided me with the medicine I couldn't afford. I am now back to work and able to support my family. Truly a blessing.",
    author: "Ebrima Sarr",
    role: "Farmer",
    location: "Gunjur"
  },
  {
    quote: "The vocational training I received gave me the skills to start my own tailoring business. I am now independent and甚至 helping others in my village.",
    author: "Mariama Kamara",
    role: "Entrepreneur",
    location: "Serrekunda"
  },
  {
    quote: "Clean water was a distant dream for us. Now, with the new well in our community, our children are healthier and spend more time in school instead of fetching water.",
    author: "Pa Modou",
    role: "Community Elder",
    location: "Jarra West"
  },
  {
    quote: "The education scholarship has given me the opportunity to pursue my dreams of becoming a nurse. I hope to give back to my community just like they gave to me.",
    author: "Isatou Bah",
    role: "Student",
    location: "Banjul"
  }
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
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
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
              className="group text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-transparent hover:border-primary-foreground/30 shadow-lg hover:shadow-primary-foreground/5"
            >
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-foreground/30 transition-colors duration-300">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-lg font-semibold mt-2">{stat.label}</div>
              <div className="text-sm text-primary-foreground/70 mt-1">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-16 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10">
                    <Quote className="w-8 h-8 text-primary-foreground/20 mb-4 mx-auto" />
                    <blockquote className="text-center">
                      <p className="text-lg md:text-xl italic text-primary-foreground/90 mb-4 leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <footer className="text-primary-foreground/70">
                        <cite className="not-italic font-bold text-base text-primary-foreground">{testimonial.author}</cite>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <span className="text-xs">{testimonial.role}</span>
                          <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                          <span className="text-xs">{testimonial.location}</span>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-[-4rem] bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground" />
              <CarouselNext className="right-[-4rem] bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

