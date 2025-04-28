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
  
  const homeRoutes = [
    { name: "Dashboard", path: "/" },
    { name: "Home 2", path: "/home2" },
    { name: "Home 3", path: "/home3" },
    { name: "Home 4", path: "/home4" },
  ];
  
  const otherRoutes = [
    { name: "Course", path: "/course" },
    { name: "Parenting Plan", path: "/parenting-plan" },
    { name: "AI Test", path: "/ai-test" },
  ];
  
  return (
    <div className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-xl font-bold text-[#2e1a87] cursor-pointer">Resolve</span>
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
              {homeRoutes.map((route) => (
                <Link key={route.path} href={route.path}>
                  <DropdownMenuItem className="cursor-pointer">
                    {route.name}
                    {location === route.path && (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Other Pages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {otherRoutes.map((route) => (
                <Link key={route.path} href={route.path}>
                  <DropdownMenuItem className="cursor-pointer">
                    {route.name}
                    {location === route.path && (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#2e1a87]" />
                    )}
                  </DropdownMenuItem>
                </Link>
              ))}
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