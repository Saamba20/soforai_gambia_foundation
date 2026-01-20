import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, BookOpen, Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/02.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Heart className="w-4 h-4 text-primary" />
            <span>Serving Communities Across The Gambia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight text-balance animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Empowering Lives Through
            <span className="text-primary block md:inline mt-2 md:mt-0"> Education, Health</span> & 
            <span className="text-secondary"> Hope</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            SOFORAI GAMBIA FOUNDATION is dedicated to providing free services to the needy in education, 
            health, and socio-economic initiatives across all corners of The Gambia.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button size="lg" asChild className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Link href="#donate">
                Make a Donation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg h-14 px-8 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
              <Link href="#programs">Explore Our Programs</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          {[
            { icon: BookOpen, title: "Education", desc: "Scholarships & school supplies", color: "text-blue-400" },
            { icon: Stethoscope, title: "Healthcare", desc: "Free medical services", color: "text-emerald-400" },
            { icon: Heart, title: "Community", desc: "Socio-economic support", color: "text-rose-400" },
          ].map((item) => (
            <div
              key={item.title}
              className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10 backdrop-blur-md"
            >
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <item.icon className={cn("w-7 h-7", item.color)} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
