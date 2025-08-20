"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Perfect for individuals just getting started",
    price: { monthly: 0, annual: 0 },
    features: ["3 social accounts", "Basic scheduling", "Content calendar", "Basic analytics", "Mobile app access"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing businesses and content creators",
    price: { monthly: 29, annual: 24 },
    features: [
      "10 social accounts",
      "Advanced AI scheduling",
      "Auto-replies & engagement",
      "A/B testing",
      "Advanced analytics",
      "Content suggestions",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    price: { monthly: 99, annual: 84 },
    features: [
      "Unlimited social accounts",
      "All Pro features",
      "Custom AI training",
      "Team collaboration",
      "API access",
      "White-label reports",
      "Dedicated account manager",
      "SSO & advanced security",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the plan that's right for you and start optimizing your social media presence today.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!annual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Monthly
            </span>
            <Switch checked={annual} onCheckedChange={setAnnual} className="data-[state=checked]:bg-primary" />
            <span
              className={`text-sm font-medium ${annual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Annual <span className="text-xs text-primary">Save 15%</span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary py-1 text-center text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <Card className={`h-full ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${annual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        per month, {annual ? "billed annually" : "billed monthly"}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}>
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
