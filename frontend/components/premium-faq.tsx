"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is SocialSuit and how does it work?",
    answer: "SocialSuit is an AI-powered social media management platform that helps businesses and creators streamline their social media presence. It combines intelligent automation, advanced analytics, and content optimization to maximize your social media impact across all major platforms."
  },
  {
    question: "Which social media platforms does SocialSuit support?",
    answer: "SocialSuit supports all major social media platforms including Facebook, Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Pinterest, and more. We continuously add support for new platforms as they emerge in the market."
  },
  {
    question: "What's the difference between Suit Manager and Suit Research?",
    answer: "Suit Manager is our comprehensive social media management tool that handles scheduling, posting, analytics, and team collaboration. Suit Research is our advanced market intelligence platform that provides deep insights into trends, competitor analysis, and audience behavior to inform your strategy."
  },
  {
    question: "Can I try SocialSuit before committing to a paid plan?",
    answer: "Absolutely! We offer a completely free plan with no time limit, plus all paid plans come with a 14-day free trial. No credit card required to get started. You can explore all features and see how SocialSuit transforms your social media workflow."
  },
  {
    question: "How does the AI content suggestion feature work?",
    answer: "Our AI analyzes your brand voice, audience engagement patterns, trending topics in your industry, and optimal posting times to suggest relevant content ideas, captions, and hashtags. It learns from your preferences and performance data to provide increasingly personalized recommendations."
  },
  {
    question: "Is my data secure with SocialSuit?",
    answer: "Security is our top priority. We use enterprise-grade encryption, comply with GDPR and CCPA regulations, and never share your data with third parties. All data is stored in secure, SOC 2 compliant data centers with regular security audits and monitoring."
  },
  {
    question: "Can I collaborate with my team on SocialSuit?",
    answer: "Yes! Our Pro and Enterprise plans include team collaboration features. You can invite team members, assign roles and permissions, create approval workflows, and maintain brand consistency across all your social media accounts."
  },
  {
    question: "What kind of analytics and reporting does SocialSuit provide?",
    answer: "SocialSuit offers comprehensive analytics including engagement metrics, audience demographics, growth tracking, competitor benchmarking, ROI analysis, and custom reporting. Our AI-powered insights help you understand what's working and optimize your strategy for better results."
  },
  {
    question: "How does billing work and can I change plans anytime?",
    answer: "We offer flexible monthly and annual billing options. You can upgrade, downgrade, or cancel your plan at any time. Annual plans come with a 20% discount. If you're not satisfied, we offer a 30-day money-back guarantee on all paid plans."
  },
  {
    question: "Do you offer customer support?",
    answer: "We provide 24/7 customer support through multiple channels. Free users get community support, Pro users receive priority email support, and Enterprise customers get dedicated account managers with phone support and SLA guarantees."
  }
];

export function PremiumFAQ() {
  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 dark:border-blue-800/50 mb-6">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Got Questions?
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to the most common questions about SocialSuit and how it can transform your social media strategy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our support team is here to help you get the most out of SocialSuit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 font-semibold rounded-lg transition-all duration-200"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}