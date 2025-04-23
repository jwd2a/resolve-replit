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
  Cog,
  Home,
  BookOpen,
  LucideIcon,
  CheckCircle2,
  BarChart4,
  Calendar,
  ClipboardList,
  Settings,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  modules: Module[];
  currentModuleId?: number;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  badge?: string | number;
  completed?: boolean;
}

const NavItem: FC<NavItemProps> = ({ 
  label, 
  icon: Icon, 
  active, 
  onClick, 
  badge, 
  completed 
}) => {
  return (
    <li className="mb-1">
      <button 
        onClick={onClick}
        className={`flex items-center px-3 py-2.5 rounded-lg transition-colors w-full text-left 
          ${active 
            ? "bg-primary-light text-primary font-medium" 
            : "text-medium hover:bg-gray-100"
          }`}
      >
        <Icon className={`h-5 w-5 mr-3 ${active ? "text-primary" : "text-medium"}`} />
        <span className="text-sm">{label}</span>
        
        {completed && (
          <CheckCircle2 className="ml-auto h-4 w-4 text-success" />
        )}
        
        {badge && (
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full 
            ${active ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}>
            {badge}
          </span>
        )}
        
        {active && !completed && !badge && (
          <ChevronRight className="ml-auto h-4 w-4 text-primary" />
        )}
      </button>
    </li>
  );
};

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
      } w-64 bg-sidebar h-full overflow-y-auto transition-all border-r border-gray-200`}
    >
      {/* Logo and brand */}
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-9 w-9 flex items-center justify-center bg-primary text-white rounded-lg">
            <span className="font-bold text-lg">R</span>
          </div>
          <h1 className="ml-3 text-lg font-semibold text-dark">Resolve</h1>
        </div>
        <button 
          className="md:hidden text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="px-3 mt-2">
        <div className="bg-white-card rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-dark">John Doe</p>
              <p className="text-xs text-light">Parent</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 pb-6">
        <ul className="mb-6">
          <NavItem label="Dashboard" icon={Home} />
          <NavItem label="Course Library" icon={BookOpen} />
          <NavItem 
            label="Parenting Plan Course" 
            icon={BookOpen} 
            active={true} 
            badge="In Progress"
          />
        </ul>
        
        <h3 className="text-xs font-semibold uppercase tracking-wider text-light px-3 mb-2">
          Course Modules
        </h3>
        
        <ul className="mb-6 pl-3">
          {modules.map((module) => (
            <NavItem 
              key={module.id}
              label={module.title}
              icon={ClipboardList}
              active={module.id === currentModuleId}
              completed={module.id < (currentModuleId || 1)}
              onClick={() => navigateToModule(module.id)}
            />
          ))}
        </ul>
        
        <h3 className="text-xs font-semibold uppercase tracking-wider text-light px-3 mb-2">
          Account
        </h3>
        
        <ul>
          <NavItem label="Progress Report" icon={BarChart4} />
          <NavItem label="Calendar" icon={Calendar} />
          <NavItem label="Settings" icon={Settings} />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
