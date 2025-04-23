import { FC } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  moduleName?: string;
  sectionName?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ 
  moduleName = "Course",
  sectionName = "Section"
}) => {
  return (
    <div className="bg-dark-300 px-6 py-2 border-b border-gray-700">
      <div className="flex items-center text-sm">
        <Link href="/" className="text-gray-400 hover:text-blue-500">
          Home
        </Link>
        <ChevronRight className="text-gray-600 mx-2 h-3 w-3" />
        <Link href="/course" className="text-gray-400 hover:text-blue-500">
          Courses
        </Link>
        <ChevronRight className="text-gray-600 mx-2 h-3 w-3" />
        <Link href={`/course`} className="text-gray-400 hover:text-blue-500">
          {moduleName}
        </Link>
        <ChevronRight className="text-gray-600 mx-2 h-3 w-3" />
        <span className="text-gray-200">{sectionName}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
