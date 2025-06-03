import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExitConfirmationModal } from "@/components/ExitConfirmationModal";
import { Play, Eye } from "lucide-react";

export default function ExitConfirmationDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmExit = () => {
    setIsModalOpen(false);
    // In actual implementation, this would handle the navigation
    console.log("User confirmed exit - would navigate away");
  };

  const handleCancelExit = () => {
    setIsModalOpen(false);
    console.log("User cancelled exit - staying in course");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2e1a87] mb-4">
            Exit Confirmation Modal Demo
          </h1>
          <p className="text-gray-600 text-lg">
            This modal prevents accidental exits from the Resolve course
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Demo Controls */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-[#2e1a87]" />
                Demo Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Click the button below to see the exit confirmation modal in action.
              </p>
              
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#2e1a87] hover:bg-[#3d2a9b] text-white"
              >
                Trigger Exit Modal
              </Button>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Use Cases:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• User clicks navigation menu items</li>
                  <li>• User attempts to close browser tab</li>
                  <li>• User clicks back button</li>
                  <li>• User navigates to different routes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Design Specifications */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#2e1a87]" />
                Design Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">Visual Elements</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Centered modal with dimmed background</li>
                    <li>• Warning icon in amber color</li>
                    <li>• Clear typography hierarchy</li>
                    <li>• Resolve brand colors (#2e1a87)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Copy</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• <strong>Headline:</strong> "Are you sure you want to leave the course?"</li>
                    <li>• <strong>Body:</strong> Explains co-parent registration requirement</li>
                    <li>• <strong>Buttons:</strong> "Stay in Course" (primary), "Leave Anyway" (secondary)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Functionality</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Prevents default navigation</li>
                    <li>• Reusable component with props</li>
                    <li>• Easy integration with route guards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Example */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle>Implementation Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
              <pre className="text-gray-800">{`// Usage in course component
const [showExitModal, setShowExitModal] = useState(false);

// Route guard function
const handleNavigation = (e) => {
  e.preventDefault();
  setShowExitModal(true);
};

// In JSX
<ExitConfirmationModal
  isOpen={showExitModal}
  onConfirm={() => {
    setShowExitModal(false);
    // Navigate away
  }}
  onCancel={() => setShowExitModal(false)}
/>`}</pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The actual modal component */}
      <ExitConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </div>
  );
}