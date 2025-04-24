import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBookOpen, FaFileAlt, FaUsers, FaCalendarAlt, FaComments } from "react-icons/fa";
import logoSrc from "@assets/@Resolve Primary Logo - Main Color 02.png";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  // If user is not logged in, redirect to auth page
  if (!user) {
    return <Redirect to="/auth" />;
  }

  // If user hasn't completed onboarding, redirect to onboarding
  if (user && !user.onboardingComplete) {
    return <Redirect to="/onboarding" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2e1a87] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src={logoSrc}
                alt="Resolve Logo"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center">
              <span className="mr-4">{user.displayName}</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-white hover:bg-white/10"
                onClick={() => logout()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome section */}
          <div className="bg-white shadow rounded-lg mb-8 overflow-hidden">
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#2e1a87] to-[#6c54da] text-white">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user.displayName.split(' ')[0]}!</h1>
              <p className="mb-4">
                You're making great progress on your co-parenting journey. Here's what you can do next:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button className="bg-white text-[#2e1a87] hover:bg-gray-100">
                  Continue Your Course
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  View Your Parenting Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FaBookOpen className="mr-2 text-[#2e1a87]" /> Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Module 3: Communication Skills</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#2e1a87] h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  You've completed 3 of 5 modules in your co-parenting course.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FaFileAlt className="mr-2 text-[#2e1a87]" /> Parenting Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Your parenting plan is 75% complete. Complete the remaining sections to finalize your agreement.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Parenting Plan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FaUsers className="mr-2 text-[#2e1a87]" /> Co-Parent Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Your co-parent has received your invitation but hasn't joined yet.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Resend Invitation
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FaCalendarAlt className="mr-2 text-[#2e1a87]" /> Upcoming Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 mr-3">
                      15
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Custody Exchange</h4>
                      <p className="text-xs text-gray-500">3:00 PM - Your place</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full text-purple-600 mr-3">
                      18
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Sarah's Dentist Appointment</h4>
                      <p className="text-xs text-gray-500">10:00 AM - Dr. Johnson</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-600 mr-3">
                      22
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">School Conference</h4>
                      <p className="text-xs text-gray-500">4:30 PM - Lincoln Elementary</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FaComments className="mr-2 text-[#2e1a87]" /> Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Jessica (Co-parent)</h4>
                      <span className="text-xs text-gray-500">Today</span>
                    </div>
                    <p className="text-sm mt-1">
                      I've reviewed the holiday schedule and it looks good to me.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Mediator John</h4>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p className="text-sm mt-1">
                      Let's schedule our follow-up session for next week.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}