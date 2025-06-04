import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, X, ArrowRight, CheckCircle } from "lucide-react";
import { BlockedSignaturePanel } from "@/components/BlockedSignaturePanel";

interface IncompleteStep {
  id: string;
  moduleTitle: string;
  stepTitle?: string;
  stepNumber?: string;
}

interface BlockedSignatureStepProps {
  incompleteSteps: IncompleteStep[];
  onNavigateToStep: (stepId: string) => void;
}

function BlockedSignatureStep({ incompleteSteps, onNavigateToStep }: BlockedSignatureStepProps) {
  if (incompleteSteps.length === 0) {
    return null; // Don't render if all steps are complete
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                You're almost there!
              </h1>
              <p className="text-gray-600 text-lg">
                Before you can sign the Parenting Plan, please complete the missing section(s) below.
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Incomplete Steps List */}
            <div className="space-y-4">
              {incompleteSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <X className="h-6 w-6 text-red-500 mt-1" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {step.moduleTitle}
                      </h3>
                      {step.stepTitle && (
                        <p className="text-sm text-gray-600">
                          {step.stepNumber && `${step.stepNumber}: `}{step.stepTitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => onNavigateToStep(step.id)}
                    className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white flex items-center gap-2"
                  >
                    Complete this Section
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Reminder Message */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  Once all steps are complete, you'll return here automatically to finalize and sign together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Demo page to showcase the component
export default function IncompleteCourse() {
  const [demoMode, setDemoMode] = useState<'incomplete' | 'complete'>('incomplete');
  const [viewMode, setViewMode] = useState<'fullscreen' | 'panel'>('panel');

  // Sample incomplete steps data
  const incompleteSteps: IncompleteStep[] = [
    {
      id: "module-2-step-1",
      moduleTitle: "Module 2 – Parental Responsibility and Decision Making",
      stepTitle: "Educational Rights",
      stepNumber: "Step 1"
    },
    {
      id: "module-3-step-2",
      moduleTitle: "Module 3 – Timesharing Schedule",
      stepTitle: "Weekday Rotation",
      stepNumber: "Step 2"
    },
    {
      id: "module-4",
      moduleTitle: "Module 4 – Holiday and Special Occasions",
    }
  ];

  const handleNavigateToStep = (stepId: string) => {
    console.log(`Navigating to step: ${stepId}`);
    // In actual implementation, this would navigate to the specific step
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Blocked Signature Step Demo
              </h1>
              <p className="text-gray-600 mt-1">
                Course flow component that prevents signing when sections are incomplete
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('panel')}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      viewMode === 'panel'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sidebar Panel
                  </button>
                  <button
                    onClick={() => setViewMode('fullscreen')}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      viewMode === 'fullscreen'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Full Screen
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">State:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDemoMode('incomplete')}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      demoMode === 'incomplete'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Incomplete Steps
                  </button>
                  <button
                    onClick={() => setDemoMode('complete')}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      demoMode === 'complete'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Demo */}
      {viewMode === 'fullscreen' ? (
        demoMode === 'incomplete' ? (
          <BlockedSignatureStep
            incompleteSteps={incompleteSteps}
            onNavigateToStep={handleNavigateToStep}
          />
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="border-0 shadow-xl max-w-md text-center">
              <CardContent className="p-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  All Steps Complete!
                </h2>
                <p className="text-gray-600 mb-6">
                  This component only renders when there are incomplete steps. Since all steps are complete, you would now see the signature interface.
                </p>
                <Button className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white">
                  Proceed to Signature
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Sidebar Panel Demo - Course Layout Simulation
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left side - simulated course content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#2e1a87] text-white p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Final Considerations</h3>
                      <h2 className="text-3xl font-bold mb-4">FINALIZING AND SIGNING THE AGREEMENT</h2>
                      <div className="bg-black/20 rounded p-4 mb-4">
                        <div className="text-center text-sm opacity-75">Video Player Placeholder</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Things to keep in mind</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Signing is a commitment to cooperation.</li>
                        <li>• Recognize the work you've put in together.</li>
                        <li>• Stay focused on co-parenting positively.</li>
                        <li>• This document represents a shared promise to your child.</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right side - blocked signature panel */}
                  <div className="lg:col-span-1">
                    {demoMode === 'incomplete' ? (
                      <BlockedSignaturePanel
                        incompleteSteps={incompleteSteps}
                        onNavigateToStep={handleNavigateToStep}
                      />
                    ) : (
                      <Card className="border border-green-200 bg-green-50">
                        <CardContent className="p-6 text-center">
                          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-green-900 mb-2">
                            Ready to Sign!
                          </h3>
                          <p className="text-sm text-green-700 mb-4">
                            All required sections complete. The signature interface would appear here.
                          </p>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            Sign Agreement
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Implementation Notes */}
      <div className="bg-white border-t border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Component Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Conditional rendering based on incomplete steps</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Clear visual hierarchy with lock icon and warning colors</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Direct navigation buttons to incomplete sections</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Supportive messaging to reduce anxiety</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Flexible data structure for modules and substeps</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Implementation Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 text-xs font-mono overflow-x-auto">
                  <pre className="text-gray-800">{`// Usage in course flow
const incompleteSteps = getIncompleteSteps(userId);

return (
  <>
    {incompleteSteps.length > 0 ? (
      <BlockedSignatureStep
        incompleteSteps={incompleteSteps}
        onNavigateToStep={navigateToStep}
      />
    ) : (
      <SignatureInterface />
    )}
  </>
);`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}