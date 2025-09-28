"use client"

import DashboardLayout from "@/components/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout defaultService="social-accounts" />
        >
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Welcome to Suit Manager
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your social media presence with powerful automation tools
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total Posts", value: "1,234", icon: BarChart3, change: "+12%" },
              { title: "Scheduled", value: "45", icon: Calendar, change: "+8%" },
              { title: "Followers", value: "12.5K", icon: Users, change: "+15%" },
              { title: "Engagement", value: "8.2%", icon: TrendingUp, change: "+3%" }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {stat.value}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content Scheduler */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Content Scheduler</span>
                  </CardTitle>
                  <CardDescription>
                    Schedule and manage your social media posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Next Post</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Today at 2:00 PM</p>
                      </div>
                      <Badge>Scheduled</Badge>
                    </div>
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule New Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analytics Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span>Analytics Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Track your social media performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">This Week</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">15% increase in engagement</p>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <Button variant="outline" className="w-full">
                      View Full Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}