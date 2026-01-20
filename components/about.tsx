import Image from "next/image"
import { Target, Eye, Users, MapPin, CheckCircle2 } from "lucide-react"

const aboutSections = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To provide accessible, quality services in education, health, and socio-economic development to underserved communities across The Gambia, empowering individuals and families to build better futures.",
    image: "/01.jpg",
    color: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "A Gambia where every person, regardless of their economic background, has access to quality education, healthcare, and opportunities for socio-economic advancement, creating thriving communities nationwide.",
    image: "/02.jpg",
    color: "bg-secondary/50",
    iconColor: "text-accent"
  },
  {
    icon: Users,
    title: "Our Values",
    description: "We are guided by principles that ensure our impact is sustainable and our services are delivered with the utmost integrity.",
    points: [
      "Compassion and empathy for all",
      "Transparency and accountability",
      "Community-driven solutions",
      "Sustainable impact"
    ],
    image: "/education.jpg",
    color: "bg-accent/20",
    iconColor: "text-accent"
  },
  {
    icon: MapPin,
    title: "Our Reach",
    description: "We operate across all regions of The Gambia, from urban Banjul to remote rural villages. Our network of volunteers and partners ensures that help reaches those who need it most, no matter where they are.",
    image: "/volunteer.jpg",
    color: "bg-primary/10",
    iconColor: "text-primary"
  }
]

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Who We Are
          </h2>
          <p className="text-muted-foreground text-lg italic">
            &quot;SOFORAI GAMBIA FOUNDATION is a charitable organization principally established 
            to render free services to the needy in The Gambia.&quot;
          </p>
        </div>

        <div className="space-y-24 max-w-6xl mx-auto">
          {aboutSections.map((section, index) => (
            <div 
              key={section.title}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image Column */}
              <div className="w-full md:w-1/2 relative group">
                <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Decorative element */}
                <div className={`absolute -bottom-6 -right-6 w-32 h-32 ${section.color} rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700`} />
              </div>

              {/* Text Column */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className={`w-16 h-16 rounded-2xl ${section.color} flex items-center justify-center shadow-sm`}>
                  <section.icon className={`w-8 h-8 ${section.iconColor}`} />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{section.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed text-balance">
                  {section.description}
                </p>
                {section.points && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 group/item">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 transition-transform group-hover/item:scale-110" />
                        <span className="text-muted-foreground font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
