"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Social Suit has transformed our social media strategy. The AI suggestions are spot-on, and we've seen a 40% increase in engagement since switching from Hootsuite.",
  },
  {
    name: "Michael Chen",
    role: "Social Media Manager, StartupX",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The auto-reply feature is a game-changer. It feels like having an extra team member who works 24/7. Our response time has decreased from hours to minutes.",
  },
  {
    name: "Emma Rodriguez",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "As a solo creator, Social Suit gives me the power of a full marketing team. The content suggestions and scheduling tools have helped me grow my following by 10k in just 3 months.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Social Media Professionals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what our customers are saying about how Social Suit has transformed their social media management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-6 w-6 text-primary/40 mb-2"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p>{testimonial.content}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
