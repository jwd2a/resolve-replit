import { FC } from "react";
import { Section } from "@shared/schema";
import LearningObjectives from "@/components/LearningObjectives";
import ContentSection from "@/components/ContentSection";
import InteractiveElement from "@/components/InteractiveElement";
import CodeExample from "@/components/CodeExample";
import NavigationControls from "@/components/NavigationControls";
import { Clock, Code, Laptop } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseContentProps {
  section?: Section;
  isLoading: boolean;
}

const CourseContent: FC<CourseContentProps> = ({ section, isLoading }) => {
  if (isLoading || !section) {
    return (
      <main className="py-8 px-6 max-w-4xl mx-auto">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
      </main>
    );
  }
  
  const content = section.content as any;
  
  return (
    <main className="py-8 px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
        <p className="text-gray-300 mb-4">{content.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {content.timeEstimate && (
            <span className="inline-flex items-center px-3 py-1 bg-dark-300 rounded-full text-sm">
              <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{content.timeEstimate} minutes</span>
            </span>
          )}
          
          {content.difficulty && (
            <span className="inline-flex items-center px-3 py-1 bg-dark-300 rounded-full text-sm">
              <Code className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{content.difficulty}</span>
            </span>
          )}
          
          {content.type && (
            <span className="inline-flex items-center px-3 py-1 bg-dark-300 rounded-full text-sm">
              <Laptop className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{content.type}</span>
            </span>
          )}
        </div>
      </div>
      
      {content.objectives && (
        <LearningObjectives objectives={content.objectives} />
      )}
      
      {content.sections && content.sections.map((section: any, index: number) => (
        <ContentSection 
          key={index}
          title={section.title}
          content={section.content}
          processList={section.processList}
          considerations={section.considerations}
        />
      ))}
      
      {content.exercises && content.exercises.map((exercise: any, index: number) => (
        <InteractiveElement 
          key={index}
          title={exercise.title}
          description={exercise.description}
          questions={exercise.questions}
        />
      ))}
      
      {content.codeExamples && content.codeExamples.map((example: any, index: number) => (
        <CodeExample 
          key={index}
          title={example.title}
          description={example.description}
          filename={example.filename}
          code={example.code}
        />
      ))}
      
      <NavigationControls 
        moduleId={section.moduleId}
        sectionOrder={section.order}
        totalSections={5} // TODO: Get this dynamically
      />
    </main>
  );
};

export default CourseContent;
