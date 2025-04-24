import { FC } from "react";
import { Menu, ChevronRight } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { Link } from "wouter";

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
      <header className="bg-[#2e1a87] py-3 px-4 flex items-center justify-between w-full">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-4 text-white"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img src="/resolve-logo.png" alt="Resolve Logo" className="h-8 mr-3" />
              <h1 className="text-lg font-semibold text-white">Resolve</h1>
            </div>
          </Link>
          
          <div className="flex mx-8 space-x-6">
            <Link href="/course">
              <span className="text-white cursor-pointer font-medium">Resolve Course</span>
            </Link>
            <Link href="/parenting-plan">
              <span className="text-white cursor-pointer font-medium">Parenting Plan</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="h-8 w-8 bg-[#e94caf] rounded-full flex items-center justify-center text-white font-bold">
            E
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
