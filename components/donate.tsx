"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, CreditCard, Building, Smartphone } from "lucide-react"

const donationAmounts = [25, 50, 100, 250, 500]

const paymentMethods = [
  { id: "card", icon: CreditCard, label: "Card" },
  { id: "bank", icon: Building, label: "Bank Transfer" },
  { id: "mobile", icon: Smartphone, label: "Mobile Money" },
]

export function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = selectedAmount || Number.parseInt(customAmount) || 0
    alert(`Thank you for your generous donation of $${amount}! We will process your ${paymentMethod} payment shortly.`)
  }

  return (
    <section id="donate" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-4">
            Support Our Cause
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Make a Donation Today
          </h2>
          <p className="text-muted-foreground text-lg">
            Your generosity can transform lives. Every donation, no matter the size, 
            helps us reach more communities and create lasting change in The Gambia.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="mb-8">
              <Label className="text-base font-semibold text-foreground mb-4 block">
                Select Donation Amount (USD)
              </Label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                      selectedAmount === amount
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="mb-8">
              <Label className="text-base font-semibold text-foreground mb-4 block">
                Payment Method
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    <method.icon className="w-5 h-5" />
                    <span className="text-sm">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Input
                  id="message"
                  placeholder="Leave a message of support"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Heart className="w-5 h-5 mr-2" />
              Donate ${selectedAmount || customAmount || 0} Now
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Your donation is secure and tax-deductible. You will receive a receipt via email.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
