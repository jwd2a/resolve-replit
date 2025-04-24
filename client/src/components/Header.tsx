import { FC } from "react";
import { Menu, ChevronRight } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { Link, useLocation } from "wouter";
import ResolveLogo from "../assets/resolve-logo.png";

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
            <Link href="/dashboard">
              <span className={`cursor-pointer text-base font-medium ${location === '/dashboard' 
                ? 'text-white border-b-2 border-white pb-1' 
                : 'text-gray-300 hover:text-white'}`}>
                HOME
              </span>
            </Link>
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
