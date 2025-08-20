"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Social Suit and how does it work?",
    answer:
      "Social Suit is an AI-powered social media management platform that helps you schedule posts, analyze performance, and engage with your audience across multiple platforms. Our AI technology suggests optimal posting times, content ideas, and even handles routine engagement for you.",
  },
  {
    question: "Which social media platforms does Social Suit support?",
    answer:
      "Social Suit supports all major social media platforms including Facebook, Instagram, Twitter, LinkedIn, TikTok, Pinterest, YouTube, and even Web3 platforms. We regularly add support for new platforms as they gain popularity.",
  },
  {
    question: "How does the AI content suggestion feature work?",
    answer:
      "Our AI analyzes your past content performance, audience engagement patterns, and current trends to suggest content ideas that are likely to resonate with your audience. It learns your brand voice over time to make increasingly relevant suggestions.",
  },
  {
    question: "Can I schedule posts in advance?",
    answer:
      "Yes! You can schedule posts days, weeks, or even months in advance. Our AI will suggest optimal posting times based on when your audience is most active, but you can always set custom scheduling if you prefer.",
  },
  {
    question: "What kind of analytics does Social Suit provide?",
    answer:
      "Social Suit provides comprehensive analytics including engagement rates, follower growth, post performance, audience demographics, and more. You can generate custom reports and export data for further analysis.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial of our Pro plan with no credit card required. You can also use our Free plan indefinitely with limited features.",
  },
]

export default function Faq() {
  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about Social Suit? Find answers to common questions below.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
