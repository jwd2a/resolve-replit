import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Navigation, Shield, Users } from "lucide-react";
import { Link, useLocation } from "wouter";
import ResolveLogo from "../assets/resolve-logo.svg";
import FamilyIllustration from "../assets/family-illustration.svg";

export default function LandingPage() {
  const [location, navigate] = useLocation();

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4FA]">
      {/* Navigation */}
      <nav className="bg-white py-4 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={ResolveLogo} alt="Resolve" className="h-8" />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-[#2D1582] font-medium hover:text-[#5F3DC4] transition"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('why-resolve')}
              className="text-[#2D1582] font-medium hover:text-[#5F3DC4] transition"
            >
              Why Resolve
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-[#2D1582] font-medium hover:text-[#5F3DC4] transition"
            >
              Stories
            </button>
          </div>
          <div>
            <Button 
              className="bg-[#5F3DC4] hover:bg-[#4F3294] transition-colors"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2D1582] leading-tight mb-6">
            Your Family Deserves a Better Way to Move Forward
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto">
            Resolve helps parents build thoughtful co-parenting plans—together, without court battles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-[#5F3DC4] hover:bg-[#4F3294] text-white px-8 py-6 rounded-full text-lg font-medium transition-transform hover:scale-105"
              onClick={() => navigate('/auth')}
            >
              Start Your Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-[#A59CFF] text-[#2D1582] hover:bg-[#A59CFF]/10 px-8 py-6 rounded-full text-lg font-medium"
              onClick={() => scrollToSection('how-it-works')}
            >
              How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="none">
          <path fill="white" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D1582] mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="bg-[#F5F4FA] rounded-xl p-8 text-center relative hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#A59CFF] rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D1582" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2D1582] mb-4">Learn Together</h3>
              <p className="text-gray-700">
                Take a guided video course, built by family law experts to understand the essentials of co-parenting.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-[#F5F4FA] rounded-xl p-8 text-center relative hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#A59CFF] rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D1582" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2D1582] mb-4">Build Your Plan</h3>
              <p className="text-gray-700">
                Create a legally sound co-parenting plan tailored to your family's unique needs and circumstances.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-[#F5F4FA] rounded-xl p-8 text-center relative hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#A59CFF] rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D1582" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2D1582] mb-4">Move Forward With Confidence</h3>
              <p className="text-gray-700">
                Use tools and resources to stay aligned over time, allowing your family to thrive in its new chapter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Resolve Section */}
      <section id="why-resolve" className="py-20 px-4 bg-gradient-to-b from-white to-[#F5F4FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D1582] mb-16">Why Resolve</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-[#5F3DC4]/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-[#5F3DC4]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D1582] mb-2">Child-Centered Approach</h3>
                  <p className="text-gray-700">
                    Our platform focuses on what's best for your children, helping parents make decisions that prioritize their well-being.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-[#5F3DC4]/10 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#5F3DC4]">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D1582] mb-2">Save Time and Money</h3>
                  <p className="text-gray-700">
                    Avoid costly legal battles and lengthy court processes by collaborating directly with your co-parent.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-[#5F3DC4]/10 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#5F3DC4]">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D1582] mb-2">Avoid Conflict and Court</h3>
                  <p className="text-gray-700">
                    Our structured approach helps reduce tension and promotes healthy communication between co-parents.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-[#5F3DC4]/10 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-[#5F3DC4]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D1582] mb-2">Built by Experts</h3>
                  <p className="text-gray-700">
                    Developed with input from family law experts, mental health professionals, and experienced co-parents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-[#F5F4FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D1582] mb-16">Parents Share Their Experience</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="italic text-gray-700 mb-6">
                "Resolve helped us focus on our daughter instead of our differences. The structured approach made all the difference in creating a plan that works for everyone."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#A59CFF] rounded-full mr-3 flex items-center justify-center text-white font-medium">
                  M
                </div>
                <div>
                  <p className="font-medium text-[#2D1582]">Michael W.</p>
                  <p className="text-sm text-gray-600">Co-parent of one</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="italic text-gray-700 mb-6">
                "After months of tension, we finally found common ground through Resolve. The guided process helped us communicate better and create a plan that puts our kids first."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#A59CFF] rounded-full mr-3 flex items-center justify-center text-white font-medium">
                  S
                </div>
                <div>
                  <p className="font-medium text-[#2D1582]">Sarah L.</p>
                  <p className="text-sm text-gray-600">Co-parent of two</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="italic text-gray-700 mb-6">
                "The resources and guidance from Resolve have been invaluable. We avoided court entirely and created a thoughtful plan that respects both of our roles as parents."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#A59CFF] rounded-full mr-3 flex items-center justify-center text-white font-medium">
                  J
                </div>
                <div>
                  <p className="font-medium text-[#2D1582]">James T.</p>
                  <p className="text-sm text-gray-600">Co-parent of three</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#2D1582]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start building your co-parenting plan today—your kids will thank you for it.
          </h2>
          <p className="text-xl text-[#A59CFF]/90 mb-10 max-w-3xl mx-auto">
            Join thousands of parents who have chosen a better path forward for their families.
          </p>
          <Button 
            size="lg"
            className="bg-white hover:bg-[#F5F4FA] text-[#2D1582] px-8 py-6 rounded-full text-lg font-medium"
            onClick={() => navigate('/auth')}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F5F4FA] py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2D1582] flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#A59CFF] flex items-center justify-center">
                    <span className="text-[#2D1582] font-bold text-xs">R</span>
                  </div>
                </div>
                <span className="text-[#2D1582] font-bold text-xl">Resolve</span>
              </div>
              <p className="text-gray-600 max-w-xs text-center md:text-left">
                Helping parents build thoughtful co-parenting plans together.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium text-[#2D1582] mb-4">Explore</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => scrollToSection('how-it-works')}
                      className="text-gray-600 hover:text-[#5F3DC4]"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('why-resolve')}
                      className="text-gray-600 hover:text-[#5F3DC4]"
                    >
                      Why Resolve
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('testimonials')}
                      className="text-gray-600 hover:text-[#5F3DC4]"
                    >
                      Stories
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-[#2D1582] mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#5F3DC4]">Blog</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#5F3DC4]">Help Center</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#5F3DC4]">FAQ</a>
                  </li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-medium text-[#2D1582] mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:support@resolve.co" className="text-gray-600 hover:text-[#5F3DC4]">support@resolve.co</a>
                  </li>
                  <li>
                    <a href="tel:+1-800-555-0123" className="text-gray-600 hover:text-[#5F3DC4]">(800) 555-0123</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center md:text-left text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Resolve. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}