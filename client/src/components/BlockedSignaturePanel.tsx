import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle, ChevronRight } from "lucide-react";

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
    <Card className="w-full max-w-sm border border-amber-200 bg-amber-50">
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-amber-600" />
          <CardTitle className="text-sm font-medium text-amber-900">
            Signature Blocked
          </CardTitle>
        </div>
        <p className="text-xs text-amber-700 mt-1">
          Complete these steps to unlock signing
        </p>
      </CardHeader>
      
      <CardContent className="px-3 pb-3">
        <div className="space-y-1">
          {incompleteSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => onNavigateToStep(step.id)}
              className="w-full p-2 bg-white border border-amber-200 rounded hover:bg-amber-50 hover:border-amber-300 transition-colors text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-2 flex-1">
                  <AlertCircle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 leading-tight truncate">
                      {step.moduleTitle}
                    </p>
                    {step.stepTitle && (
                      <p className="text-xs text-gray-600 leading-tight truncate">
                        {step.stepNumber && `${step.stepNumber}: `}{step.stepTitle}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-3 px-2 py-1.5 bg-blue-50 rounded text-center">
          <p className="text-xs text-blue-700 leading-tight">
            Auto-unlock when complete
          </p>
        </div>
      </CardContent>
    </Card>
  );
}