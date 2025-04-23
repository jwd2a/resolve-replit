import { FC } from "react";
import { Menu, ChevronRight } from "lucide-react";

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
    <header className="bg-app py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 text-white"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-3">
            <span className="text-white font-bold">R</span>
          </div>
          <h1 className="text-lg font-semibold text-white">Resolve</h1>
        </div>
        
        <div className="hidden md:flex ml-6 items-center">
          <span className="text-white font-medium">{title}</span>
          <ChevronRight className="text-white mx-2 h-4 w-4"/>
          <span className="text-white">{sectionTitle}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-primary font-bold">
          E
        </div>
      </div>
    </header>
  );
};

export default Header;
