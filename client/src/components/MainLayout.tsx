import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import SectionNavigation from "@/components/SectionNavigation";
import CourseContent from "@/components/CourseContent";
import { Module, Section } from "@shared/schema";
import { useMobileMenu } from "@/hooks/useMobileMenu";

interface MainLayoutProps {
  modules: Module[];
  currentModuleId?: number;
  isLoading: boolean;
  currentSection?: Section;
  currentModule?: Module;
  sections: Section[];
}

export default function MainLayout({
  modules,
  currentModuleId,
  isLoading,
  currentSection,
  currentModule,
  sections
}: MainLayoutProps) {
  const { isOpen, openMenu, closeMenu } = useMobileMenu();
  
  return (
    <div className="min-h-screen bg-app flex flex-col w-full overflow-x-hidden">
      {/* Header - now full width */}
      <Header 
        title="Resolve Course" 
        sectionTitle="Parenting Plan"
        onMenuClick={openMenu}
      />
      
      {/* Content area with sidebar and main content */}
      <div className="flex flex-1 w-full">
        {/* Sidebar - now appears below header */}
        <div className="w-64 bg-white shadow-md hidden md:block shrink-0">
          <div className="p-4 border-b border-gray-200">
            <button className="flex items-center text-dark font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
          
          <div className="p-3">
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-dark">Module 1</h3>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="mt-1">
                <button className="w-full text-left py-2 text-sm bg-primary-light rounded-md text-primary font-medium px-3">
                  Welcome to Resolve
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-dark">Module 2</h3>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
              </div>
              <div className="mt-1 ml-3 border-l-2 border-primary pl-3">
                <div className="mb-2 text-sm font-medium text-primary">
                  Parental Responsibility and Decision Making
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-2">1</div>
                    <span className="text-sm text-gray-700">Family Information and Jurisdiction</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-white mr-2">2</div>
                    <span className="text-sm font-medium text-primary">Shared Decision-Making</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-dark">Shared Decision-Making</h2>
              
              {/* Video container */}
              <div className="bg-section rounded-lg overflow-hidden mb-6">
                <div className="video-container">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-lg font-medium mb-2">MAKING DECISIONS TOGETHER</h3>
                      <h2 className="text-3xl font-bold">MAJOR DECISIONS</h2>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content section */}
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Things to keep in mind</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Recognize that you are equal partners in raising your children.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Define what major decisions require joint input.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Show unity in decision-making to avoid manipulation by children.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Establish a respectful process for discussing major issues.</span>
                  </li>
                </ul>
              </div>
              
              {/* Checkboxes */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Decision-Making Areas</h3>
                <div className="space-y-4">
                  <label className="custom-checkbox">
                    <input type="checkbox" defaultChecked={true} onChange={() => {}} />
                    <div className="checkmark"></div>
                    <div>
                      <div className="font-medium">Education (choice of schools, tutoring, etc)</div>
                      <div className="text-xs text-gray-500">Most parents include education decisions</div>
                    </div>
                  </label>
                  
                  <label className="custom-checkbox">
                    <input type="checkbox" defaultChecked={true} onChange={() => {}} />
                    <div className="checkmark"></div>
                    <div>
                      <div className="font-medium">Healthcare (non-emergency medical)</div>
                    </div>
                  </label>
                  
                  <label className="custom-checkbox">
                    <input type="checkbox" defaultChecked={true} onChange={() => {}} />
                    <div className="checkmark"></div>
                    <div>
                      <div className="font-medium">Religious upbringing</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}