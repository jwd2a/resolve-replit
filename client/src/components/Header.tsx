import { FC } from "react";
import { Menu, ChevronRight } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { Link } from "wouter";
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
            <Link href="/course">
              <span className="text-white cursor-pointer text-base">Resolve Course</span>
            </Link>
            <Link href="/parenting-plan">
              <span className="text-white cursor-pointer text-base">Parenting Plan</span>
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
