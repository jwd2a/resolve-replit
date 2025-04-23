import { FC } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationControlsProps {
  moduleId: number;
  sectionOrder: number;
  totalSections: number;
}

const NavigationControls: FC<NavigationControlsProps> = ({
  moduleId,
  sectionOrder,
  totalSections
}) => {
  const [, setLocation] = useLocation();
  
  const hasPrevious = sectionOrder > 1;
  const hasNext = sectionOrder < totalSections;
  
  const handlePrevious = () => {
    if (hasPrevious) {
      const prevSectionSlug = `${moduleId}.${sectionOrder - 2}`;
      setLocation(`/course?section=${prevSectionSlug}`);
    }
  };
  
  const handleNext = () => {
    if (hasNext) {
      const nextSectionSlug = `${moduleId}.${sectionOrder}`;
      setLocation(`/course?section=${nextSectionSlug}`);
    }
  };
  
  return (
    <div className="flex justify-between mt-10 border-t border-gray-700 pt-6">
      <button 
        className={`flex items-center px-4 py-2 rounded ${
          hasPrevious 
            ? "bg-dark-300 text-gray-300 hover:bg-dark-200" 
            : "bg-dark-400 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handlePrevious}
        disabled={!hasPrevious}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous Section
      </button>
      <button 
        className={`flex items-center px-4 py-2 rounded ${
          hasNext 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "bg-dark-400 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={!hasNext}
      >
        Next Section
        <ArrowRight className="h-4 w-4 ml-2" />
      </button>
    </div>
  );
};

export default NavigationControls;
