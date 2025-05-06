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
  Users,
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
  const dashboardRoute = { name: "Dashboard", path: "/" }; // Now points to Home6
  const home2Route = { name: "Home 2", path: "/home2" };
  const home3Route = { name: "Home 3", path: "/home3" };
  const home4Route = { name: "Home 4", path: "/home4" };
  const home5Route = { name: "Home 5", path: "/home5" };
  const home6Route = { name: "Home 6", path: "/home6" }; // Same as root path now
  
  // Course related routes
  const courseRoute = { name: "Course", path: "/course" };
  const parentingPlanRoute = { name: "Parenting Plan", path: "/parenting-plan" };
  
  // Onboarding related routes
  const onboarding6stepRoute = { name: "6-Step Onboarding", path: "/onboarding6step" };
  const onboarding4stepRoute = { name: "4-Step Onboarding", path: "/onboarding" };
  const onboarding3stepRoute = { name: "3-Step Onboarding", path: "/onboarding-3step" };
  const onboarding2Route = { name: "Beta Test Onboarding", path: "/onboarding2" };
  const courseEntryCodeRoute = { name: "Course Entry Code", path: "/co-parent-verification" };
  const scheduleRoute = { name: "Co-Parenting Schedule", path: "/co-parenting-schedule" };
  const aiTestRoute = { name: "AI Test", path: "/ai-test" };
  
  // Check if current route is active
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <div className="bg-[#2e1a87] border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img src={resolveLogo} alt="Resolve Logo" className="h-14" />
            </div>
          </Link>
          
          {/* Main navigation items */}
          <div className="hidden md:flex items-center space-x-1">
            {/* HOME button - Direct link without dropdown */}
            <Link href={dashboardRoute.path}>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-1 font-medium px-4 py-2 h-10 ${
                  isActive(home6Route.path) || isActive(dashboardRoute.path)
                    ? "bg-[#3d2a9b] text-white" 
                    : "text-white hover:bg-[#3d2a9b]"
                }`}
              >
                <Home size={16} className="mr-1.5" />
                HOME
              </Button>
            </Link>
            
            {/* COURSE button */}
            <Link href="/course">
              <Button 
                variant="ghost" 
                className={`flex items-center gap-1 font-medium px-4 py-2 h-10 ${
                  isActive("/course") 
                    ? "bg-[#3d2a9b] text-white" 
                    : "text-white hover:bg-[#3d2a9b]"
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
                    ? "bg-[#3d2a9b] text-white" 
                    : "text-white hover:bg-[#3d2a9b]"
                }`}
              >
                <FileText size={16} className="mr-1.5" />
                PARENTING PLAN
              </Button>
            </Link>
          </div>
        </div>
        
        {/* User Profile and OTHER STUFF - positioned at the right */}
        <div className="flex items-center gap-3">
          {/* OTHER STUFF dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 font-medium px-3 py-2 h-9 text-white hover:bg-[#3d2a9b]"
              >
                <Settings size={14} className="mr-1" />
                OTHER STUFF
                <ChevronDown size={12} className="ml-1 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs font-semibold text-gray-500">ONBOARDING</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Link href={onboarding4stepRoute.path}>
                <DropdownMenuItem className="cursor-pointer py-2">
                  <Settings size={16} className="mr-2 text-[#6c54da]" />
                  <span>Onboarding (4-Step)</span>
                  {isActive(onboarding4stepRoute.path) && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={courseEntryCodeRoute.path}>
                <DropdownMenuItem className="cursor-pointer py-2">
                  <MessageSquare size={16} className="mr-2 text-[#6c54da]" />
                  <span>Course Verification</span>
                  {isActive(courseEntryCodeRoute.path) && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-semibold text-gray-500">OTHER</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
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
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-semibold text-gray-500">ADMIN</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Link href="/admin/families">
                <DropdownMenuItem className="cursor-pointer py-2">
                  <Users size={16} className="mr-2 text-[#6c54da]" />
                  <span>Families Overview</span>
                  {isActive("/admin/families") && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href="/admin/users-families">
                <DropdownMenuItem className="cursor-pointer py-2">
                  <User size={16} className="mr-2 text-[#6c54da]" />
                  <span>Users & Families Detail</span>
                  {isActive("/admin/users-families") && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User login/profile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full w-9 h-9 p-0 bg-white"
                >
                  <div className="flex items-center justify-center w-full h-full text-[#2e1a87] font-medium rounded-full">
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
                className="flex items-center gap-1 px-3 py-2 text-white border border-white hover:bg-[#3d2a9b]"
              >
                <User size={16} />
                <span className="ml-1.5 font-medium">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}