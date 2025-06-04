import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, X, ArrowRight } from "lucide-react";

interface IncompleteStep {
  id: string;
  moduleTitle: string;
  stepTitle?: string;
  stepNumber?: string;
}

interface BlockedSignaturePanelProps {
  incompleteSteps: IncompleteStep[];
  onNavigateToStep: (stepId: string) => void;
}

export function BlockedSignaturePanel({ incompleteSteps, onNavigateToStep }: BlockedSignaturePanelProps) {
  if (incompleteSteps.length === 0) {
    return null; // Don't render if all steps are complete
  }

  return (
    <Card className="w-full max-w-sm border border-red-200 bg-red-50">
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-red-600" />
          <CardTitle className="text-sm font-semibold text-red-900">
            Complete Required Steps
          </CardTitle>
        </div>
        <p className="text-xs text-red-700 leading-tight">
          Please complete the missing sections before signing.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-2 px-3 pb-3">
        {incompleteSteps.map((step) => (
          <div
            key={step.id}
            className="p-2 bg-white border border-red-200 rounded"
          >
            <div className="flex items-start justify-between mb-1">
              <X className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
            </div>
            <div className="space-y-1 mb-2">
              <h4 className="font-medium text-xs text-gray-900 leading-tight">
                {step.moduleTitle}
              </h4>
              {step.stepTitle && (
                <p className="text-xs text-gray-600 leading-tight">
                  {step.stepNumber && `${step.stepNumber}: `}{step.stepTitle}
                </p>
              )}
            </div>
            <Button
              onClick={() => onNavigateToStep(step.id)}
              size="sm"
              className="w-full h-7 bg-[#2e1a87] hover:bg-[#3d2a9b] text-white text-xs px-2"
            >
              Complete Section
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        ))}
        
        <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
          <p className="text-xs text-blue-800 leading-tight">
            Once complete, you'll return here to sign together.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}