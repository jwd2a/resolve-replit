import { FC } from "react";
import { Link, useLocation } from "wouter";
import { Section } from "@shared/schema";

interface SectionNavigationProps {
  sections: Section[];
  currentSectionSlug?: string;
}

const SectionNavigation: FC<SectionNavigationProps> = ({ 
  sections, 
  currentSectionSlug
}) => {
  const [, setLocation] = useLocation();
  
  const formatSectionNumber = (moduleId: number, order: number) => {
    return `${moduleId}.${order - 1}`;
  };
  
  return (
    <div className="bg-dark-300 px-6 py-3 border-b border-gray-700 overflow-x-auto">
      <div className="flex space-x-2 min-w-max">
        {sections.map((section) => {
          const isActive = section.slug === currentSectionSlug;
          const sectionNumber = formatSectionNumber(section.moduleId, section.order);
          
          return (
            <button 
              key={section.id}
              onClick={() => setLocation(`/course?section=${section.slug}`)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                isActive 
                ? "bg-blue-600 text-white" 
                : "bg-dark-200 text-gray-300 hover:bg-dark-100"
              }`}
            >
              {sectionNumber} {section.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionNavigation;
