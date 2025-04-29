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

export function NavigationMenu() {
  const [location] = useLocation();
  
  // Directly list routes for clearer render
  const dashboardRoute = { name: "Dashboard", path: "/" };
  const home2Route = { name: "Home 2", path: "/home2" };
  const home3Route = { name: "Home 3", path: "/home3" };
  const home4Route = { name: "Home 4", path: "/home4" };
  const home5Route = { name: "Home 5", path: "/home5" };
  
  const courseRoute = { name: "Course", path: "/course" };
  const parentingPlanRoute = { name: "Parenting Plan", path: "/parenting-plan" };
  const aiTestRoute = { name: "AI Test", path: "/ai-test" };
  
  return (
    <div className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-xl font-bold text-[#2e1a87] cursor-pointer">Resolve</span>
          </Link>
          
          <Link href="/home5">
            <Button variant="ghost" className="text-[#2e1a87] font-bold">
              Home 5
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <Home size={16} className="mr-1" />
                Home
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Home Versions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Link href={dashboardRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {dashboardRoute.name}
                  {location === dashboardRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home2Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {home2Route.name}
                  {location === home2Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home3Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {home3Route.name}
                  {location === home3Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home4Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {home4Route.name}
                  {location === home4Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={home5Route.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {home5Route.name}
                  {location === home5Route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Other Pages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Link href={courseRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {courseRoute.name}
                  {location === courseRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={parentingPlanRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {parentingPlanRoute.name}
                  {location === parentingPlanRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
              
              <Link href={aiTestRoute.path}>
                <DropdownMenuItem className="cursor-pointer">
                  {aiTestRoute.name}
                  {location === aiTestRoute.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                  )}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
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