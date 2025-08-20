"use client"

import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Calendar,
  BarChart2,
  Settings,
  MessageSquare,
  Users,
  ImageIcon,
  Bell,
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardPreview() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Dashboard at Your Fingertips
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get a glimpse of our intuitive dashboard designed to give you complete control over your social media
            presence.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative rounded-xl border border-gray-200 bg-white/90 shadow-xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90 overflow-hidden">
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden md:flex w-16 lg:w-64 flex-col bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
                <div className="flex h-14 items-center border-b border-gray-200 px-4 dark:border-gray-800 lg:h-16">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                        <path d="M7 7h.01" />
                      </svg>
                    </div>
                    <span className="hidden text-lg font-bold text-gray-900 dark:text-white lg:inline-block">
                      Social Suit
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-2">
                  <button className="flex items-center gap-2 rounded-md bg-primary/10 px-2 py-2 text-primary lg:px-3">
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="hidden lg:inline-block">Dashboard</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:px-3">
                    <Calendar className="h-5 w-5" />
                    <span className="hidden lg:inline-block">Scheduler</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:px-3">
                    <MessageSquare className="h-5 w-5" />
                    <span className="hidden lg:inline-block">Posts</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:px-3">
                    <BarChart2 className="h-5 w-5" />
                    <span className="hidden lg:inline-block">Analytics</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:px-3">
                    <Users className="h-5 w-5" />
                    <span className="hidden lg:inline-block">Audience</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:px-3">
                    <Settings className="h-5 w-5" />
                    <span className="hidden lg:inline-block">Settings</span>
                  </button>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1">
                <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 lg:h-16">
                  <div className="flex items-center gap-2">
                    <button className="md:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                      </svg>
                    </button>
                    <div className="relative hidden md:flex items-center">
                      <Search className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search..."
                        className="rounded-md border border-gray-200 bg-white pl-8 pr-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="rounded-full bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      <Bell className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block">
                        <div className="text-sm font-medium">John Doe</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </header>

                <main className="p-4 lg:p-6">
                  <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                      <p className="text-gray-500 dark:text-gray-400">Welcome back, here's what's happening today.</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4" /> Create Post
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Followers</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24.5K</h3>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Users className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <span className="flex items-center text-green-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1 h-4 w-4"
                            >
                              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                              <polyline points="16 7 22 7 22 13" />
                            </svg>
                            12.5%
                          </span>
                          <span className="ml-2 text-gray-500 dark:text-gray-400">vs last month</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Engagement Rate</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5.2%</h3>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <BarChart2 className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <span className="flex items-center text-green-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1 h-4 w-4"
                            >
                              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                              <polyline points="16 7 22 7 22 13" />
                            </svg>
                            0.8%
                          </span>
                          <span className="ml-2 text-gray-500 dark:text-gray-400">vs last month</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled Posts</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">18</h3>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Calendar className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Next post in 2 hours</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Content Suggestions</h3>
                          <Button variant="ghost" size="sm">
                            <Zap className="mr-2 h-4 w-4" /> Generate More
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  <ImageIcon className="h-4 w-4" />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">Image Post</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Plus className="mr-2 h-4 w-4" /> Use
                              </Button>
                            </div>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              "5 ways our new feature can boost your productivity #productivity #tech"
                            </p>
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  <MessageSquare className="h-4 w-4" />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">Text Post</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Plus className="mr-2 h-4 w-4" /> Use
                              </Button>
                            </div>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              "We're excited to announce our upcoming webinar on social media strategy. Save your spot
                              now!"
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Posts</h3>
                          <Button variant="ghost" size="sm">
                            View All
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 dark:text-white">Product Launch Announcement</p>
                                <button>
                                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Instagram</span>
                                <span>•</span>
                                <span>2 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <MessageSquare className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 dark:text-white">Customer Testimonial</p>
                                <button>
                                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Twitter</span>
                                <span>•</span>
                                <span>Yesterday</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
