"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with social media management",
    features: [
      "Up to 3 social accounts",
      "10 scheduled posts per month",
      "Basic analytics",
      "Community support",
      "Mobile app access",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
    icon: Star,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Ideal for growing businesses and content creators",
    features: [
      "Unlimited social accounts",
      "Unlimited scheduled posts",
      "Advanced analytics & insights",
      "AI content suggestions",
      "Priority support",
      "Team collaboration (up to 5 users)",
      "Custom branding",
      "Auto-posting optimization",
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const,
    popular: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "Advanced features for large teams and agencies",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "White-label solution",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Advanced security features",
      "Custom reporting",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
    icon: Crown,
  },
];

export function PremiumPricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 dark:border-blue-800/50 mb-6">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Simple, Transparent Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`relative h-full transition-all duration-300 ${
                  plan.popular 
                    ? "border-2 border-blue-200 dark:border-blue-800 shadow-xl shadow-blue-500/10 dark:shadow-blue-500/20" 
                    : "border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg"
                } bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm`}>
                  <CardHeader className="text-center pb-8">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 mx-auto ${
                      plan.popular 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        plan.popular ? "text-white" : "text-gray-600 dark:text-gray-400"
                      }`} />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: (index * 0.2) + (featureIndex * 0.1) }}
                          viewport={{ once: true }}
                          className="flex items-start"
                        >
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="px-6 pt-6">
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full py-3 font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                          : plan.buttonVariant === "outline"
                          ? "border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transform hover:scale-105"
                          : ""
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              24/7 support
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Money-back guarantee
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}