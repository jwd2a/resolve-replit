import { FC } from "react";
import { Menu, LifeBuoy } from "lucide-react";

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
    <header className="bg-dark-400 border-b border-gray-700 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 text-gray-400 hover:text-white"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="flex items-center text-sm text-gray-400">
            {moduleNumber && <span>Module {moduleNumber}</span>}
            {moduleNumber && sectionNumber && <span className="mx-2">•</span>}
            {sectionNumber && <span>Section {moduleNumber}.{sectionNumber - 1}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden sm:flex items-center mr-4">
          <div className="w-32 h-2 bg-dark-900 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
          </div>
          <span className="ml-2 text-sm">75% Complete</span>
        </div>
        <button className="bg-dark-300 hover:bg-dark-200 text-gray-300 px-3 py-1.5 rounded text-sm font-medium flex items-center">
          <LifeBuoy className="h-4 w-4 mr-1.5" />
          Help
        </button>
      </div>
    </header>
  );
};

export default Header;
