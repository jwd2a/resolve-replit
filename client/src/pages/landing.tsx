import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import ResolveLogo from "../assets/resolve-logo.svg";
import FamilyIllustration from "../assets/family-illustration.svg";

export default function LandingPage() {
  const [location, navigate] = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4FA] to-white flex flex-col">
      {/* Minimal Navigation */}
      <nav className="py-6 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <img src={ResolveLogo} alt="Resolve" className="h-8" />
        </div>
      </nav>

      {/* Centered Hero Section */}
      <div className="flex-grow flex items-center justify-center px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D1582] leading-tight mb-6">
                A better way to co-parent
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                Create thoughtful parenting plans together, without the conflict and cost of court.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row md:items-center">
                <Button 
                  size="lg"
                  className="bg-[#2D1582] hover:bg-[#231061] text-white px-8 py-6 rounded-md text-lg"
                  onClick={() => navigate('/auth')}
                >
                  Join Beta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-[#A59CFF] text-[#2D1582] hover:bg-[#A59CFF]/10 px-8 py-6 rounded-md text-lg"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <img 
                src={FamilyIllustration} 
                alt="Family illustration" 
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="py-6 px-6 md:px-10 text-center md:text-left">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Resolve. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="mailto:support@resolve.co" className="text-[#2D1582] hover:text-[#A59CFF]">
                support@resolve.co
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}