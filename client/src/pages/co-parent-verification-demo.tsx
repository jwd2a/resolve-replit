import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/NavigationMenu";
import CoParentVerification from "@/pages/co-parent-verification";

export default function CoParentVerificationDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Co-Parent Verification Demo
          </h1>
          <p className="text-gray-600 mb-8">
            Click the button below to open the co-parent verification modal.
          </p>
          
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white px-8 py-3"
          >
            Open Co-Parent Verification
          </Button>
        </div>
      </main>

      <CoParentVerification 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}