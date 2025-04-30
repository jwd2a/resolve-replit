import { Link } from "wouter";
import { useLocation } from "wouter";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  User, 
  Home, 
  BookOpen, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getInitials } from "@/lib/utils";
import resolveLogo from "@assets/@Resolve Primary Logo - Main Color 02.png";

export function NavigationMenu() {
  const [location] = useLocation();
  const { user } = useAuth();
  
  // Define all routes
  const dashboardRoute = { name: "Dashboard", path: "/" };
  const home5Route = { name: "Home 5", path: "/home5" };
  const courseEntryCodeRoute = { name: "Course Entry Code", path: "/co-parent-verification" };
  const scheduleRoute = { name: "Co-Parenting Schedule", path: "/co-parenting-schedule" };
  const courseRoute = { name: "Course", path: "/course" };
  const parentingPlanRoute = { name: "Parenting Plan", path: "/parenting-plan" };
  const aiTestRoute = { name: "AI Test", path: "/ai-test" };
  const onboardingRoute = { name: "Onboarding", path: "/onboarding6step" };
  
  // Check if current route is active
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img src={resolveLogo} alt="Resolve Logo" className="h-9" />
            </div>
          </Link>
          
          {/* Main navigation items */}
          <div className="hidden md:flex items-center space-x-1">
            {/* HOME dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-1 font-medium px-4 py-2 h-10 ${
                    isActive(dashboardRoute.path) || isActive(home5Route.path) 
                      ? "bg-[#f5f0ff] text-[#2e1a87]" 
                      : "text-[#2e1a87] hover:bg-[#f5f0ff] hover:text-[#2e1a87]"
                  }`}
                >
                  <Home size={16} className="mr-1.5" />
                  HOME
                  <ChevronDown size={14} className="ml-1 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-xs font-semibold text-gray-500">HOME PAGES</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <Link href={dashboardRoute.path}>
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <Home size={16} className="mr-2 text-[#6c54da]" />
                    <span>Dashboard</span>
                    {isActive(dashboardRoute.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
                
                <Link href={home5Route.path}>
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <Home size={16} className="mr-2 text-[#6c54da]" />
                    <span>Course Home</span>
                    {isActive(home5Route.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-semibold text-gray-500">TOOLS</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <Link href={courseEntryCodeRoute.path}>
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <MessageSquare size={16} className="mr-2 text-[#6c54da]" />
                    <span>Course Verification</span>
                    {isActive(courseEntryCodeRoute.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
                
                <Link href={scheduleRoute.path}>
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <Calendar size={16} className="mr-2 text-[#6c54da]" />
                    <span>Co-Parenting Schedule</span>
                    {isActive(scheduleRoute.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
                
                <Link href={aiTestRoute.path}>
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <HelpCircle size={16} className="mr-2 text-[#6c54da]" />
                    <span>AI Assistant</span>
                    {isActive(aiTestRoute.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
                
                <Link href={onboardingRoute.path}>
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <Settings size={16} className="mr-2 text-[#6c54da]" />
                    <span>Onboarding</span>
                    {isActive(onboardingRoute.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* COURSE button */}
            <Link href="/course">
              <Button 
                variant="ghost" 
                className={`flex items-center gap-1 font-medium px-4 py-2 h-10 ${
                  isActive(courseRoute.path) 
                    ? "bg-[#f5f0ff] text-[#2e1a87]" 
                    : "text-[#2e1a87] hover:bg-[#f5f0ff] hover:text-[#2e1a87]"
                }`}
              >
                <BookOpen size={16} className="mr-1.5" />
                COURSE
              </Button>
            </Link>
            
            {/* PARENTING PLAN button */}
            <Link href="/parenting-plan">
              <Button 
                variant="ghost" 
                className={`flex items-center gap-1 font-medium px-4 py-2 h-10 ${
                  isActive(parentingPlanRoute.path) 
                    ? "bg-[#f5f0ff] text-[#2e1a87]" 
                    : "text-[#2e1a87] hover:bg-[#f5f0ff] hover:text-[#2e1a87]"
                }`}
              >
                <FileText size={16} className="mr-1.5" />
                PARENTING PLAN
              </Button>
            </Link>
          </div>
        </div>
        
        {/* User Profile */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full w-9 h-9 p-0 ml-2"
              >
                <div className="flex items-center justify-center w-full h-full bg-[#f5f0ff] text-[#2e1a87] font-medium rounded-full">
                  {getInitials(user.displayName || "User Name")}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.displayName}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User size={16} className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/auth">
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 px-3 py-2 text-[#2e1a87] hover:bg-[#f5f0ff]"
            >
              <User size={16} />
              <span className="ml-1.5 font-medium">Login</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}