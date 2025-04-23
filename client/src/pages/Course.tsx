import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import MainLayout from "@/components/MainLayout";
import { Section } from "@shared/schema";

export default function Course() {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sectionSlug = params.get("section") || "3.0";
  
  // Fetch all modules
  const { 
    data: modulesData, 
    isLoading: modulesLoading 
  } = useQuery<{ modules: any[] }>({ 
    queryKey: ["/api/modules"]
  });
  
  // Fetch all sections
  const { 
    data: sectionsData, 
    isLoading: sectionsLoading 
  } = useQuery<{ sections: any[] }>({ 
    queryKey: ["/api/sections"]
  });
  
  // Fetch current section
  const { 
    data: sectionData, 
    isLoading: sectionLoading
  } = useQuery<{ section: Section }>({ 
    queryKey: [`/api/sections/slug/${sectionSlug}`]
  });
  
  // Handle route change when section changes
  useEffect(() => {
    if (!params.get("section")) {
      setLocation(`/course?section=${sectionSlug}`, { replace: true });
    }
  }, [sectionSlug, params, setLocation]);
  
  const currentSection = sectionData?.section;
  const modules = modulesData?.modules || [];
  const sections = sectionsData?.sections || [];
  
  const currentModuleId = currentSection?.moduleId;
  const currentModule = modules.find(m => m.id === currentModuleId);
  
  const isLoading = modulesLoading || sectionsLoading || sectionLoading;
  
  return (
    <MainLayout 
      modules={modules}
      currentModuleId={currentModuleId}
      isLoading={isLoading}
      currentSection={currentSection}
      currentModule={currentModule}
      sections={sections.filter(s => s.moduleId === currentModuleId)}
    />
  );
}
