import { FC } from "react";
import { Menu, ChevronRight, ChevronDown, Home } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { Link, useLocation } from "wouter";
import ResolveLogo from "../assets/resolve-logo.png";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
  moduleNumber?: number;
  sectionNumber?: number;
  sectionTitle?: string;
  onMenuClick: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  moduleNumber,
  sectionNumber,
  sectionTitle,
  onMenuClick
}) => {
  const [location] = useLocation();
  
  return (
    <div className="sticky top-0 z-10 w-full">
      <header className="bg-[#2e1a87] py-0 px-0 flex items-center justify-between w-full" style={{ height: '70px' }}>
        <div className="flex items-center pl-4">
          <button 
            className="md:hidden mr-4 text-white"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img src={ResolveLogo} alt="Resolve Logo" className="h-28" />
            </div>
          </Link>
          
          <div className="flex ml-10 space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center focus:outline-none">
                <span className={`cursor-pointer text-base font-medium flex items-center ${
                  location === '/' || 
                  location === '/home2' || 
                  location === '/home3' || 
                  location === '/home4' ||
                  location === '/home5'
                    ? 'text-white border-b-2 border-white pb-1' 
                    : 'text-gray-300 hover:text-white'}`}>
                  HOME
                  <ChevronDown className="ml-1 h-4 w-4" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <Link href="/">
                  <DropdownMenuItem className="cursor-pointer">
                    Dashboard {location === '/' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
                <Link href="/home2">
                  <DropdownMenuItem className="cursor-pointer">
                    Home 2 {location === '/home2' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
                <Link href="/home3">
                  <DropdownMenuItem className="cursor-pointer">
                    Home 3 {location === '/home3' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
                <Link href="/home4">
                  <DropdownMenuItem className="cursor-pointer">
                    Home 4 {location === '/home4' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
                <Link href="/home5">
                  <DropdownMenuItem className="cursor-pointer">
                    Home 5 {location === '/home5' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/course">
              <span className={`cursor-pointer text-base font-medium ${location.startsWith('/course') 
                ? 'text-white border-b-2 border-white pb-1' 
                : 'text-gray-300 hover:text-white'}`}>
                COURSE
              </span>
            </Link>
            <Link href="/parenting-plan">
              <span className={`cursor-pointer text-base font-medium ${location.startsWith('/parenting-plan') 
                ? 'text-white border-b-2 border-white pb-1' 
                : 'text-gray-300 hover:text-white'}`}>
                PARENTING PLAN
              </span>
            </Link>
            <Link href="/ai-test">
              <span className={`cursor-pointer text-base font-medium ${location.startsWith('/ai-test') 
                ? 'text-white border-b-2 border-white pb-1' 
                : 'text-gray-300 hover:text-white'}`}>
                AI TEST
              </span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center focus:outline-none">
                <span className={`cursor-pointer text-base font-medium flex items-center ${
                  location.startsWith('/onboarding') 
                    ? 'text-white border-b-2 border-white pb-1' 
                    : 'text-gray-300 hover:text-white'}`}>
                  ONBOARDING
                  <ChevronDown className="ml-1 h-4 w-4" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <Link href="/onboarding">
                  <DropdownMenuItem className="cursor-pointer">
                    Standard Onboarding (4-step) {location === '/onboarding' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
                <Link href="/onboarding-3step">
                  <DropdownMenuItem className="cursor-pointer">
                    3-Step Onboarding {location === '/onboarding-3step' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
                <Link href="/onboarding2">
                  <DropdownMenuItem className="cursor-pointer">
                    Beta Test Onboarding {location === '/onboarding2' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
                <Link href="/onboarding6step">
                  <DropdownMenuItem className="cursor-pointer">
                    6-Step Onboarding {location === '/onboarding6step' && <span className="ml-2 h-2 w-2 rounded-full bg-[#2e1a87]" />}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center pr-4">
          <div className="h-10 w-10 bg-[#e94caf] rounded-full flex items-center justify-center text-white font-bold">
            E
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
