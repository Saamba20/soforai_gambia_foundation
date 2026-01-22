"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, CreditCard, Building, Smartphone, CheckCircle2, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [submittedAmount, setSubmittedAmount] = useState(0)

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const amount = selectedAmount || Number.parseInt(customAmount) || 0
    
    if (amount <= 0) {
      toast.error("Please enter a valid donation amount")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount,
          paymentMethod,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit donation intent")
      }

      setSubmittedAmount(amount)
      setShowSuccessDialog(true)
      toast.success("Donation intent submitted successfully!")
      
      // Reset form
      setFormData({ name: "", email: "", message: "" })
      setSelectedAmount(100)
      setCustomAmount("")
    } catch (error) {
      console.error("Donation Error:", error)
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
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
                  min="1"
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

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </div>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Donate ${selectedAmount || customAmount || 0} Now
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Your donation is secure and tax-deductible. You will receive a receipt via email.
            </p>
          </form>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-primary animate-in zoom-in duration-300" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold">Thank You!</DialogTitle>
            <DialogDescription className="text-center text-base">
              We've received your intent to donate <span className="font-bold text-foreground">${submittedAmount}</span>. 
              Please follow the instructions below to complete your payment.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {paymentMethod === "card" && (
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-center">
                <p className="text-sm text-foreground font-medium mb-2">Card Payment Follow-up</p>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you at <strong>{formData.email}</strong> with a secure link to complete your card transaction.
                </p>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Building className="w-4 h-4" /> Bank Account Details
                </p>
                <div className="bg-background border border-border rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Bank Name:</span>
                    <span className="font-medium">GTBank Gambia</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-medium uppercase">Soforai Gambia Foundation</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold">204 266 250 110</span>
                      <button onClick={() => copyToClipboard("204 266 250 110", "Account Number")} className="text-primary hover:text-primary/80">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "mobile" && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Mobile Money Details
                </p>
                <div className="bg-background border border-border rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Provider:</span>
                    <span className="font-medium">QMoney / Africell</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Phone Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold">+220 333 4444</span>
                      <button onClick={() => copyToClipboard("+220 333 4444", "Phone Number")} className="text-primary hover:text-primary/80">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
