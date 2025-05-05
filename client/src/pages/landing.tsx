import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import ResolveLogo from "../assets/resolve-logo.svg";
import MomChildren from "../assets/mom-children.svg";
import "../assets/cursive-font.css";

export default function LandingPage() {
  const [location, navigate] = useLocation();
  
  return (
    <div className="min-h-screen bg-[#F7F2EA] flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src={ResolveLogo} alt="Resolve" className="h-8" />
        </div>
        <div>
          <Button 
            className="bg-[#FFC341] hover:bg-[#F5B730] text-black font-semibold rounded-full"
            onClick={() => navigate('/auth')}
          >
            GET THE COURSE!
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-7xl mx-auto rounded-3xl p-8 md:p-12 shadow-sm flex-grow">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1582] leading-tight mb-6">
                Stop the Custody Battle Before It Starts
              </h1>
              
              <p className="text-gray-700 mb-4">
                Every year, thousands of parents spend tens of thousands of dollars on 
                devastating custody battles that tear families apart.
              </p>
              
              <p className="text-gray-700 mb-8">
                What if you could <span className="text-[#2D1582] font-medium">protect your children</span> from the trauma... in just one day?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[#FFC341] hover:bg-[#F5B730] text-black font-semibold rounded-full"
                  onClick={() => navigate('/auth')}
                >
                  GET THE COURSE TODAY!
                </Button>
                <Button 
                  className="bg-[#5F78FF] hover:bg-[#4A5FD9] text-white border-0 rounded-full"
                  onClick={() => navigate('/auth')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="absolute top-6 right-16 text-gray-500 text-sm max-w-[180px]">
                <p className="cursive-text text-base">It's not about winning. It's about what's best for them.</p>
                <svg className="w-12 h-12 transform rotate-45 ml-8 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <div className="text-center text-gray-500">
                <p className="text-sm">Image placeholder</p>
                <p className="text-xs">Please add a photo of a mother with two children here</p>
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                <p>iStock</p>
                <p>Credit: LightFieldStudios</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}