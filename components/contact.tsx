"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send, Users, CheckCircle, AlertTriangle } from "lucide-react"

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Serrekunda, The Gambia" },
  { icon: Phone, label: "Phone", value: "+31 681539982 / +220 7291881" },
  { icon: Mail, label: "Email", value: "info@soforaigambia.org" },
]

type FormErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    volunteer: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const validate = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = "Your name is required."
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address."
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required."
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)
    setSuccess(false)

    if (!validate()) return

    try {
      setLoading(true)

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Failed to send message.")
      }

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        volunteer: false,
      })
    } catch (err) {
      setServerError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact Us or Volunteer
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions, want to volunteer, or partner with us?
            We’d love to hear from you.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-primary-foreground rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5" />
                <h3 className="text-lg font-bold">Become a Volunteer</h3>
              </div>
              <p className="text-sm opacity-90">
                Join our volunteers helping transform lives across The Gambia.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card border rounded-2xl p-6 md:p-8"
              noValidate
            >
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

              {success && (
                <div
                  role="status"
                  className="mb-6 flex items-center gap-2 text-green-600 bg-green-500/10 p-3 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5" />
                  Message sent successfully. We’ll get back to you soon.
                </div>
              )}

              {serverError && (
                <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-500/10 p-3 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                  {serverError}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
              </div>

              <div className="mb-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
              </div>

              <div className="mb-6 flex items-center gap-2">
                <input
                  id="volunteer"
                  type="checkbox"
                  checked={formData.volunteer}
                  onChange={(e) =>
                    setFormData({ ...formData, volunteer: e.target.checked })
                  }
                />
                <Label htmlFor="volunteer" className="text-sm text-muted-foreground">
                  I am interested in volunteering
                </Label>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Sending..." : <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
