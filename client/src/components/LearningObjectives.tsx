import { FC } from "react";
import { CheckCircle } from "lucide-react";

interface LearningObjectivesProps {
  objectives: string[];
}

const LearningObjectives: FC<LearningObjectivesProps> = ({ objectives }) => {
  return (
    <div className="bg-dark-300 rounded-lg p-5 mb-8">
      <h2 className="text-lg font-semibold mb-3">Learning Objectives</h2>
      <ul className="space-y-2">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start">
            <div className="mt-0.5 text-blue-500 mr-2">
              <CheckCircle className="h-4 w-4" />
            </div>
            <span>{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningObjectives;
