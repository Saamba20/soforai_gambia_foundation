import { Target, Eye, Users, MapPin } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Who We Are
          </h2>
          <p className="text-muted-foreground text-lg">
            SOFORAI GAMBIA FOUNDATION is a charitable organization principally established to render 
            free services to the needy in The Gambia. We believe in creating sustainable change through 
            education, healthcare, and community development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide accessible, quality services in education, health, and socio-economic 
              development to underserved communities across The Gambia, empowering individuals 
              and families to build better futures.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              A Gambia where every person, regardless of their economic background, has access 
              to quality education, healthcare, and opportunities for socio-economic advancement, 
              creating thriving communities nationwide.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Values</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Compassion and empathy for all
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Transparency and accountability
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Community-driven solutions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Sustainable impact
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Reach</h3>
            <p className="text-muted-foreground leading-relaxed">
              We operate across all regions of The Gambia, from urban Banjul to remote rural villages. 
              Our network of volunteers and partners ensures that help reaches those who need it most, 
              no matter where they are.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
