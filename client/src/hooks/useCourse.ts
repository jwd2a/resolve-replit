import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useSearch, useLocation } from "wouter";

export function useCourse() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const currentSectionSlug = params.get("section") || "3.0";
  
  // Get all modules
  const { data: modulesData, isLoading: modulesLoading } = useQuery({
    queryKey: ["/api/modules"],
  });
  
  // Get sections for the current module
  const { data: sectionData, isLoading: sectionLoading } = useQuery({
    queryKey: [`/api/sections/slug/${currentSectionSlug}`],
  });
  
  // Get all sections for navigation
  const { data: sectionsData, isLoading: sectionsLoading } = useQuery({
    queryKey: ["/api/sections"],
  });
  
  const modules = modulesData?.modules || [];
  const currentSection = sectionData?.section;
  const sections = sectionsData?.sections || [];
  
  // Filter sections by module ID
  const moduleId = currentSection?.moduleId;
  const moduleSections = sections.filter(s => s.moduleId === moduleId);
  
  // Navigate to a specific section
  const navigateToSection = (sectionSlug: string) => {
    setLocation(`/course?section=${sectionSlug}`);
  };
  
  // Find next and previous sections
  const currentIndex = moduleSections.findIndex(s => s.slug === currentSectionSlug);
  const nextSection = currentIndex < moduleSections.length - 1 ? moduleSections[currentIndex + 1] : null;
  const prevSection = currentIndex > 0 ? moduleSections[currentIndex - 1] : null;
  
  return {
    modules,
    sections,
    currentSection,
    moduleSections,
    nextSection,
    prevSection,
    navigateToSection,
    isLoading: modulesLoading || sectionLoading || sectionsLoading
  };
}
