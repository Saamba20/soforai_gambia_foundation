import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Share2, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { programs } from "@/components/programs"
import { Button } from "@/components/ui/button"

interface ProgramPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params
  const program = programs.find((p) => p.slug === slug)

  if (!program) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div className="container relative z-10 px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground text-sm font-medium mb-6">
              <program.icon className="w-4 h-4" />
              Our Programs
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {program.title}
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-200 line-clamp-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {program.description}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-muted">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                The Gambia
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                Ongoing Support
              </div>
              <div className="ml-auto">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Story
                </Button>
              </div>
            </div>

            <article className="prose prose-lg prose-slate max-w-none dark:prose-invert">
              <p className="text-xl leading-relaxed text-foreground/90 font-medium mb-8">
                {program.description}
              </p>
              <div className="space-y-6 text-muted-foreground leading-extra-relaxed text-lg">
                {program.fullStory.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="mt-16 pt-8 border-t border-muted">
              <Link href="/#programs">
                <Button variant="ghost" className="gap-2 hover:gap-3 transition-all text-primary">
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Programs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Support this program</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Your contribution can help us expand our reach and make a bigger difference in {program.title.toLowerCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#donate">
                <Button size="lg" className="px-8 bg-primary hover:bg-primary/90">
                  Donate Now
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline" className="px-8">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
