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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        modules={modules} 
        currentModuleId={currentModuleId} 
        isOpen={isOpen}
        onClose={closeMenu}
      />
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <Header 
          title={currentModule?.title || "Loading..."} 
          moduleNumber={currentModule?.order} 
          sectionNumber={currentSection?.order}
          sectionTitle={currentSection?.title}
          onMenuClick={openMenu}
        />
        
        <Breadcrumb 
          moduleName={currentModule?.title} 
          sectionName={currentSection?.title}
        />
        
        <SectionNavigation 
          sections={sections} 
          currentSectionSlug={currentSection?.slug}
        />
        
        <CourseContent 
          section={currentSection} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
