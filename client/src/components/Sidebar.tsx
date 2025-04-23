import { FC } from "react";
import { useLocation } from "wouter";
import { Separator } from "@/components/ui/separator";
import { Module } from "@shared/schema";
import { 
  FileText, 
  Video, 
  MessageSquare, 
  X,
  Search,
  Cog
} from "lucide-react";

interface SidebarProps {
  modules: Module[];
  currentModuleId?: number;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ 
  modules, 
  currentModuleId,
  isOpen,
  onClose
}) => {
  const [, setLocation] = useLocation();
  
  const navigateToModule = (moduleId: number) => {
    setLocation(`/course?section=${moduleId}.0`);
  };
  
  return (
    <div 
      className={`${
        isOpen 
          ? "fixed inset-0 z-50" 
          : "hidden md:flex md:flex-col"
      } w-64 bg-sidebar h-full overflow-y-auto transition-all`}
    >
      {/* Logo and brand */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <span className="font-bold">R</span>
          </div>
          <h1 className="ml-3 text-xl font-semibold">Resolve</h1>
        </div>
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full py-1.5 pl-8 pr-3 rounded bg-dark-400 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <div className="absolute left-2.5 top-2 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Modules</h2>
        <ul>
          {modules.map((module) => (
            <li key={module.id} className="mb-1">
              <button 
                onClick={() => navigateToModule(module.id)}
                className={`flex items-center px-2 py-1.5 rounded transition-colors w-full text-left ${
                  module.id === currentModuleId 
                    ? "bg-dark-400" 
                    : "hover:bg-dark-400"
                }`}
              >
                <span className={`text-sm font-medium ${
                  module.id === currentModuleId 
                    ? "text-blue-500" 
                    : "text-gray-300"
                }`}>
                  {module.title}
                </span>
                {module.id === currentModuleId && (
                  <div className="ml-auto flex items-center">
                    <span className="text-xs bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                      {module.order}
                    </span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
        
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-6 mb-3">Resources</h2>
        <ul>
          <li className="mb-1">
            <a href="#" className="flex items-center px-2 py-1.5 rounded transition-colors hover:bg-dark-400">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-300 ml-2">Documentation</span>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="flex items-center px-2 py-1.5 rounded transition-colors hover:bg-dark-400">
              <Video className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-300 ml-2">Video Tutorials</span>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="flex items-center px-2 py-1.5 rounded transition-colors hover:bg-dark-400">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-300 ml-2">Community Forum</span>
            </a>
          </li>
        </ul>
      </nav>
      
      {/* User profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Student</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-white">
            <Cog className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
