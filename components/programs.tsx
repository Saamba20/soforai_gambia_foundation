import { BookOpen, Stethoscope, Briefcase, Home, Utensils, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const programs = [
  {
    icon: BookOpen,
    title: "Education Support",
    description: "Providing scholarships, school supplies, and educational resources to children from underprivileged families.",
    features: ["Scholarship programs", "School supplies distribution", "Tutoring services", "Library access"],
  },
  {
    icon: Stethoscope,
    title: "Healthcare Services",
    description: "Offering free medical consultations, health screenings, and essential medications to communities in need.",
    features: ["Free medical camps", "Health screenings", "Medicine distribution", "Health education"],
  },
  {
    icon: Briefcase,
    title: "Skills Training",
    description: "Empowering youth and adults with vocational skills to enhance their employment opportunities.",
    features: ["Vocational training", "Entrepreneurship workshops", "Digital literacy", "Job placement support"],
  },
  {
    icon: Home,
    title: "Community Development",
    description: "Building infrastructure and improving living conditions in underserved communities across The Gambia.",
    features: ["Water well construction", "Sanitation projects", "Community centers", "Environmental initiatives"],
  },
  {
    icon: Utensils,
    title: "Food Security",
    description: "Addressing hunger through food distribution programs and sustainable agriculture initiatives.",
    features: ["Food packages", "School feeding programs", "Agricultural support", "Nutrition education"],
  },
  {
    icon: GraduationCap,
    title: "Women Empowerment",
    description: "Supporting women through education, skills training, and micro-finance opportunities.",
    features: ["Women's education", "Micro-loans", "Business training", "Support groups"],
  },
]

export function Programs() {
  return (
    <section id="programs" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How We Make a Difference
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive programs address the most pressing needs of Gambian communities, 
            creating lasting positive change in the lives of thousands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((program) => (
            <Card key={program.title} className="group hover:shadow-lg transition-all hover:border-primary/30">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <program.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
