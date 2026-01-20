import { BookOpen, Stethoscope, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProgramHighlights() {
  return (
    <section
      id="highlights"
      className="py-16 md:py-24 bg-muted/50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Core Focus Areas
          </h2>
          <p className="text-muted-foreground">
            We focus on sustainable programs that uplift lives and strengthen
            communities across The Gambia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            // ... (keep the same items)
            {
              icon: BookOpen,
              title: "Education",
              desc: "Scholarships, school materials, and educational support.",
              color: "text-blue-500",
            },
            {
              icon: Stethoscope,
              title: "Healthcare",
              desc: "Free medical services and health outreach programs.",
              color: "text-emerald-500",
            },
            {
              icon: Heart,
              title: "Community",
              desc: "Socio-economic empowerment and humanitarian support.",
              color: "text-rose-500",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm flex gap-4 items-start"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className={cn("w-6 h-6", item.color)} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
