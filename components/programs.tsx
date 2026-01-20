import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Stethoscope, Briefcase, Home, Utensils, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const programs = [
  {
    slug: "education",
    icon: BookOpen,
    title: "Education Support",
    description: "Providing scholarships, school supplies, and educational resources to children from underprivileged families.",
    image: "/01.jpg",
    href: "/programs/education",
    fullStory: "Our Education Support program is dedicated to breaking the cycle of poverty through quality education. We provide comprehensive support to underprivileged students, including merit-based scholarships that cover tuition and fees. Beyond financial aid, we distribute essential school supplies such as textbooks, stationery, and uniforms to ensure every child is equipped for success. Our tutoring services provide additional academic support, while our community library initiatives offer a safe space for learning and exploration. We belief that education is the most powerful tool to change the world, and we are committed to making it accessible to every Gambian child."
  },
  {
    slug: "healthcare",
    icon: Stethoscope,
    title: "Healthcare Services",
    description: "Offering free medical consultations, health screenings, and essential medications to communities in need.",
    image: "/02.jpg",
    href: "/programs/healthcare",
    fullStory: "The Healthcare Services initiative brings vital medical care directly to the heart of underserved communities. Through our free medical camps, we provide consultations with qualified healthcare professionals who offer diagnosis and treatment for common ailments. Our health screening programs focus on early detection of chronic conditions like hypertension and diabetes. We also maintain a medicine distribution network to provide essential prescriptions to those who cannot afford them. A key component of our program is health education, empowering individuals with the knowledge to maintain their well-being and prevent disease through improved hygiene and nutrition."
  },
  {
    slug: "skills",
    icon: Briefcase,
    title: "Skills Training",
    description: "Empowering youth and adults with vocational skills to enhance their employment opportunities.",
    image: "/01.jpg",
    href: "/programs/skills",
    fullStory: "Our Skills Training program is designed to bridge the gap between education and employment. We offer hands-on vocational training in high-demand fields such as tailoring, carpentry, and electrical work. For aspiring business owners, our entrepreneurship workshops provide essential knowledge in financial management, marketing, and business planning. In an increasingly digital world, we provide digital literacy courses to ensure our participants can navigate the modern workplace. Our job placement support connects graduates with local employers, providing a pathway to financial independence and community contribution."
  },
  {
    slug: "community",
    icon: Home,
    title: "Community Development",
    description: "Building infrastructure and improving living conditions in underserved communities across The Gambia.",
    image: "/education.jpg",
    href: "/programs/community",
    fullStory: "Community Development at Soforai Gambia Foundation focuses on building the foundations for a better life. We work closely with local leaders to identify and address critical infrastructure needs. Our water well construction projects provide clean, safe drinking water, reducing the incidence of waterborne diseases. We implement sanitation projects to improve public health and build community centers that serve as hubs for education and social gathering. Our environmental initiatives promote sustainable practices and community-led conservation efforts, ensuring that development today does not compromise the resources of tomorrow."
  },
  {
    slug: "food-security",
    icon: Utensils,
    title: "Food Security",
    description: "Addressing hunger through food distribution programs and sustainable agriculture initiatives.",
    image: "/health.jpg",
    href: "/programs/food-security",
    fullStory: "Our Food Security program takes a dual approach to combating hunger: immediate relief and long-term sustainability. We conduct regular food package distributions to families facing acute shortages, ensuring no one in our focus communities goes bed hungry. Our school feeding programs provide nutritious meals to students, improving their health and academic focus. To build lasting resilience, we provide agricultural support to local farmers, including quality seeds, tools, and training in sustainable farming techniques. Nutrition education workshops help families make the best use of available resources to maintain a healthy diet."
  },
  {
    slug: "women-empowerment",
    icon: GraduationCap,
    title: "Women Empowerment",
    description: "Supporting women through education, skills training, and micro-finance opportunities.",
    image: "/01.jpg",
    href: "/programs/women-empowerment",
    fullStory: "The Women Empowerment program recognizes that empowering women is key to transforming whole communities. We support women's education through literacy programs and specialized vocational training tailored to their needs and market opportunities. Our micro-loan program provides the capital necessary for women to start or expand small businesses, fostering financial independence. We accompany these loans with business training in bookkeeping and management. Perhaps most importantly, we facilitate support groups where women can share experiences, build networks, and advocate for their rights within their communities."
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
            <Link href={program.href} key={program.title} className="block group">
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all hover:border-primary/30 border-muted">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center z-10">
                    <program.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    READ MORE
                    <ArrowRight className="w-4 h-4 ml-1 opacity-100 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
