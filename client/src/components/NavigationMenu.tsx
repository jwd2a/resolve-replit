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
import { ChevronDown, Home, User } from "lucide-react";
import resolveLogo from "@assets/@Resolve Primary Logo - Main Color 02.png";

export function NavigationMenu() {
  const [location] = useLocation();
  
  // Define all routes
  const dashboardRoute = { name: "Dashboard", path: "/" };
  const home2Route = { name: "Home 2", path: "/home2" };
  const home3Route = { name: "Home 3", path: "/home3" };
  const home4Route = { name: "Home 4", path: "/home4" };
  const home5Route = { name: "Home 5", path: "/home5" };
  const courseEntryCodeRoute = { name: "Course Entry Code", path: "/co-parent-verification" };
  const scheduleRoute = { name: "Co-Parenting Schedule", path: "/co-parenting-schedule" };
  const courseRoute = { name: "Course", path: "/course" };
  const parentingPlanRoute = { name: "Parenting Plan", path: "/parenting-plan" };
  const aiTestRoute = { name: "AI Test", path: "/ai-test" };
  
  return (
    <div className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img src={resolveLogo} alt="Resolve Logo" className="h-8 mr-2" />
            </div>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-[#2e1a87] font-bold">
                HOME
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Home Screens</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Link href={dashboardRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  Dashboard (Main)
                  {location === dashboardRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home2Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  Home 2
                  {location === home2Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home3Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  Home 3
                  {location === home3Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home4Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  Home 4
                  {location === home4Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home5Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  Home 5
                  {location === home5Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Course Tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Link href={courseEntryCodeRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  Course Entry Code
                  {location === courseEntryCodeRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={scheduleRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  Co-Parenting Schedule
                  {location === scheduleRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={aiTestRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  AI Assistant
                  {location === aiTestRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/course">
            <Button variant="ghost" className="text-[#2e1a87] font-bold">
              COURSE
            </Button>
          </Link>
          
          <Link href="/parenting-plan">
            <Button variant="ghost" className="text-[#2e1a87] font-bold">
              PARENTING PLAN
            </Button>
          </Link>
        </div>
        
        <Link href="/auth">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <User size={16} />
            <span className="ml-1">Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}