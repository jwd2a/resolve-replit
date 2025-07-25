import { useState } from "react";
import { useLocation } from "wouter";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Calendar as CalendarIcon,
  Users,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Heart,
} from "lucide-react";

export default function DashboardSimplified() {
  const [, setLocation] = useLocation();

  const navigateToParentingPlan = () => {
    setLocation("/parenting-plan3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <NavigationMenu />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
              <Heart className="h-8 w-8 text-[#2e1a87]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to Resolve
              </h1>
              <p className="text-gray-600 mt-1">
                Your co-parenting support platform
              </p>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Parenting Plan Card */}
          <Card className="group hover:shadow-lg transition-all duration-200 border-purple-200 hover:border-purple-300 cursor-pointer" onClick={navigateToParentingPlan}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-700" />
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Ready</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2 group-hover:text-[#2e1a87] transition-colors">
                Parenting Partnership Agreement
              </CardTitle>
              <p className="text-gray-600 text-sm mb-4">
                Review and customize your comprehensive co-parenting agreement designed for your family's needs.
              </p>
              <div className="flex items-center text-[#2e1a87] text-sm font-medium group-hover:translate-x-1 transition-transform">
                View Document <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>

          {/* Course Card */}
          <Card className="border-purple-200 opacity-75">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-700" />
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="text-xs font-medium">Coming Soon</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2 text-gray-700">
                Co-Parenting Course
              </CardTitle>
              <p className="text-gray-500 text-sm mb-4">
                Learn effective co-parenting strategies and communication techniques.
              </p>
              <div className="text-gray-400 text-sm font-medium">
                Available Soon
              </div>
            </CardContent>
          </Card>

          {/* Schedule Card */}
          <Card className="border-purple-200 opacity-75">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-orange-700" />
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="text-xs font-medium">Coming Soon</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2 text-gray-700">
                Parenting Schedule
              </CardTitle>
              <p className="text-gray-500 text-sm mb-4">
                Manage and coordinate your custody schedule with your co-parent.
              </p>
              <div className="text-gray-400 text-sm font-medium">
                Available Soon
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={navigateToParentingPlan}
              className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Parenting Plan
            </Button>
            <Button variant="outline" disabled className="opacity-50">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" disabled className="opacity-50">
              <Users className="h-4 w-4 mr-2" />
              Message Co-Parent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}