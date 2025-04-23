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
    <div className="flex min-h-screen bg-app">
      {/* Sidebar - Restructured to match the left nav in the image */}
      <div className="w-64 bg-white shadow-md hidden md:block">
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
                {sections.slice(0, 5).map((section, index) => (
                  <li key={section.id} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-2">{index + 3}</div>
                    <span className="text-sm text-gray-700">{section.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {modules.slice(3).map((module) => (
            <div key={module.id} className="mb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-dark">Module {module.order}</h3>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="mt-1">
                <button className="w-full text-left py-2 text-sm text-gray-700 px-3">
                  {module.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <Header 
          title="Resolve Course" 
          sectionTitle="Parenting Plan"
          onMenuClick={openMenu}
        />
        
        <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg my-4 shadow">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <h2 className="text-xl font-semibold mb-4 text-dark">Shared Decision-Making</h2>
              
              <div className="bg-section rounded-lg overflow-hidden mb-6">
                <div className="video-container">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="mb-2 text-lg tracking-wider">MAKING DECISIONS TOGETHER</h3>
                      <h2 className="text-3xl font-bold">MAJOR DECISIONS</h2>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
                    <button className="text-white bg-black bg-opacity-50 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </button>
                    <div className="bg-gray-800 h-1 flex-1 mx-3 rounded-full overflow-hidden">
                      <div className="bg-white h-full w-1/3"></div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 007.072 0m-9.9-2.828a9 9 0 0112.728 0" />
                        </svg>
                      </button>
                      <button className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
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
            </div>
            
            <div className="lg:w-1/3">
              <h2 className="text-xl font-semibold mb-4 text-dark">Shared Decision-Making</h2>
              <div className="bg-white rounded-lg p-4">
                <p className="mb-4 text-sm text-gray-700">
                  Keep all boxes checked for shared decision-making. If an area is unchecked, a selection will appear to designate one parent as the decision-maker.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="custom-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={true} 
                        onChange={(e) => console.log('Education checkbox changed:', e.target.checked)} 
                      />
                      <div className="checkmark"></div>
                      <div>
                        <div className="font-medium">Education (choice of schools, tutoring, special educational needs)</div>
                        <div className="text-xs text-gray-500">Most parents include education decisions as they significantly impact a child's future</div>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="custom-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        onChange={(e) => console.log('Elizabeth decision making changed:', e.target.checked)}
                      />
                      <div className="checkmark"></div>
                      <div>
                        <div className="font-medium">Elizabeth Maria Elliot has ultimate decision making in regards to education</div>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="custom-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={false}
                        onChange={(e) => console.log('Chris Frazer changed:', e.target.checked)}
                      />
                      <div className="checkmark"></div>
                      <div>
                        <div className="font-medium">Chris Frazer</div>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="custom-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        onChange={(e) => console.log('Healthcare checkbox changed:', e.target.checked)}
                      />
                      <div className="checkmark"></div>
                      <div>
                        <div className="font-medium">Healthcare (non-emergency medical treatment, choice of providers)</div>
                        <div className="text-xs text-gray-500">Healthcare decisions typically include choice of providers and non-emergency care</div>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="custom-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        onChange={(e) => console.log('Religious upbringing changed:', e.target.checked)}
                      />
                      <div className="checkmark"></div>
                      <div>
                        <div className="font-medium">Religious upbringing</div>
                        <div className="text-xs text-gray-500">Consider whether religious practices and education should be jointly decided</div>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="custom-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        onChange={(e) => console.log('Extracurricular activities changed:', e.target.checked)}
                      />
                      <div className="checkmark"></div>
                      <div>
                        <div className="font-medium">Significant extracurricular activities</div>
                        <div className="text-xs text-gray-500">Activities that require substantial time, cost, or commitment</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <p className="mt-6 text-sm text-gray-700">
                  Michelle will have decision making authority for equestrian related decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
