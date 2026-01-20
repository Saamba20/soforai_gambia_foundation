import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/02.jpg')" }}
      />

      {/* Art-directed center darkening */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25),rgba(0,0,0,0.75))]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block mb-6 text-sm font-semibold tracking-wide text-primary">
              SOFORAI GAMBIA FOUNDATION
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Empowering Lives <br />
              Through Education, <br />
              Healthcare & Hope
            </h1>

            <p className="text-lg text-zinc-300 mb-10 max-w-xl">
              We provide free education support, healthcare services, and
              socio-economic empowerment to vulnerable communities across
              The Gambia.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="#donate">
                  Donate Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-ring border-white/40 hover:bg-white/10 hover:text-white"
              >
                <Link href="#programs">Our Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
