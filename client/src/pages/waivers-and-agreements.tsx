import { useState, useRef, useEffect } from 'react';
import { NavigationMenu } from '@/components/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowDown, Check, Edit, PenTool, Keyboard, FilePenLine, Play } from 'lucide-react';
import michaelLundyVideo from '@/assets/michael_lundy_video.jpg';
import { useLocation } from 'wouter';
import Player from '@vimeo/player';
import SignatureCanvas from 'react-signature-canvas';

export default function WaiversAndAgreements() {
  const [location, navigate] = useLocation();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [initials, setInitials] = useState<string | null>(null);
  const [signatureMethod, setSignatureMethod] = useState<'draw' | 'type'>('draw');
  const [initialsMethod, setInitialsMethod] = useState<'draw' | 'type'>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [typedInitials, setTypedInitials] = useState('');
  const [signatureFont, setSignatureFont] = useState('Dancing Script');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  
  // Generate initials from full name
  useEffect(() => {
    if (signatureMethod === 'type' && typedSignature) {
      const nameParts = typedSignature.trim().split(' ').filter(part => part.length > 0);
      if (nameParts.length >= 2) {
        // Get first letter of first name and first letter of last name
        const firstInitial = nameParts[0][0] || '';
        const lastInitial = nameParts[nameParts.length - 1][0] || '';
        setTypedInitials(firstInitial + lastInitial);
      } else if (nameParts.length === 1 && nameParts[0].length > 0) {
        // If only one word, use first letter
        setTypedInitials(nameParts[0][0] || '');
      }
    }
  }, [signatureMethod, typedSignature]);
  
  const agreementRef = useRef<HTMLDivElement>(null);
  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const initialsCanvasRef = useRef<SignatureCanvas>(null);
  const vimeoContainerRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<any>(null);

  // Initialize Vimeo player
  useEffect(() => {
    if (vimeoContainerRef.current && !vimeoPlayerRef.current) {
      // Replace with your actual Vimeo video ID
      const videoId = '824804226'; 
      
      const options = {
        id: videoId,
        width: vimeoContainerRef.current.offsetWidth,
        responsive: true
      };
      
      vimeoPlayerRef.current = new Player(vimeoContainerRef.current, options);
      vimeoPlayerRef.current.on('loaded', () => {
        setIframeLoaded(true);
      });
    }

    return () => {
      if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.destroy();
      }
    };
  }, []);

  // Check if user has scrolled to the bottom of the agreement
  const handleScroll = () => {
    if (agreementRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = agreementRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      
      if (isAtBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true);
      }
    }
  };

  // Clear and save signature functions
  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
      setSignature(null);
    }
  };

  const clearInitials = () => {
    if (initialsCanvasRef.current) {
      initialsCanvasRef.current.clear();
      setInitials(null);
    }
  };

  const saveSignatureAndInitials = () => {
    // Save signature
    if (signatureMethod === 'draw' && signatureCanvasRef.current) {
      if (!signatureCanvasRef.current.isEmpty()) {
        setSignature(signatureCanvasRef.current.toDataURL());
      }
    } else if (signatureMethod === 'type' && typedSignature.trim() !== '') {
      // Create a canvas to convert the typed signature to an image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 100;
      
      if (ctx) {
        ctx.font = `30px ${signatureFont}`;
        ctx.fillStyle = '#000';
        ctx.fillText(typedSignature, 10, 50);
        setSignature(canvas.toDataURL());
      }
    }
    
    // Save initials
    if (initialsMethod === 'draw' && initialsCanvasRef.current) {
      if (!initialsCanvasRef.current.isEmpty()) {
        setInitials(initialsCanvasRef.current.toDataURL());
      }
    } else if (initialsMethod === 'type' && typedInitials.trim() !== '') {
      // Create a canvas to convert the typed initials to an image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 60;
      
      if (ctx) {
        ctx.font = `28px ${signatureFont}`;
        ctx.fillStyle = '#000';
        ctx.fillText(typedInitials, 10, 35);
        setInitials(canvas.toDataURL());
      }
    }
    
    // Close the modal
    if ((signatureMethod === 'draw' && signatureCanvasRef.current && !signatureCanvasRef.current.isEmpty() && 
         initialsCanvasRef.current && !initialsCanvasRef.current.isEmpty()) ||
        (signatureMethod === 'type' && typedSignature.trim() !== '' && typedInitials.trim() !== '')) {
      setSignatureModalOpen(false);
    }
  };

  const handleSubmit = () => {
    // Save the waiver status to localStorage
    localStorage.setItem('waiverCompleted', 'true');
    
    // Here you would typically send the signature and initials to your backend
    // For now, we'll just navigate back to the home page
    navigate('/home6');
  };
  
  const handleSignButtonClick = () => {
    if (hasScrolledToBottom) {
      if (!signature || !initials) {
        setSignatureModalOpen(true);
      } else {
        handleSubmit();
      }
    }
  };
  
  // No longer needed as saveSignatureAndInitials does this
  const completeSignatureSetup = () => {
    saveSignatureAndInitials();
  };

  const fonts = [
    { name: 'Dancing Script', label: 'Handwritten 1' },
    { name: 'Pacifico', label: 'Handwritten 2' },
    { name: 'Caveat', label: 'Casual' },
    { name: 'Homemade Apple', label: 'Elegant' }
  ];

  // Load fonts
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&family=Caveat&family=Homemade+Apple&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/home6')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Page title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#2e1a87]">Waivers & Agreements</h1>
          <p className="mt-2 text-gray-600">
            Review and sign the required legal agreements to continue with the co-parenting process.
          </p>
        </div>

        {/* Video section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Watch: Resolve Legal Disclaimer
          </h2>

          <div 
            ref={vimeoContainerRef} 
            className="w-full aspect-video bg-gray-100 rounded-md overflow-hidden mb-4"
          >
            {!iframeLoaded && (
              <div className="flex items-center justify-center h-full relative">
                <img 
                  src={michaelLundyVideo} 
                  alt="Michael Lundy - Resolve Co-Founder" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Play className="h-7 w-7 text-white fill-white" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm italic">
            Please watch this short video before signing the agreement below.
          </p>
        </div>

        {/* Agreement section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <div
              ref={agreementRef}
              onScroll={handleScroll}
              className="prose prose-slate h-96 overflow-y-auto border border-gray-200 rounded-md p-6 mb-4 font-serif max-w-none"
            >
              <h3>Resolve Waiver and Acknowledgment</h3>
              
              <p>
                Resolve is an educational course designed to support cooperative co-parenting and assist in reaching agreements between co-parents. However, participation in the course does not guarantee any specific outcome, including reaching full agreement on all parenting matters.
              </p>
              
              <p>
                I understand that my co-parent and I may not reach a complete agreement through this course, and that additional support from legal, therapeutic, or other professionals may be necessary.
              </p>
              
              <p>
                I acknowledge that any agreement my co-parent and I reach through Resolve does not guarantee the current or future health, safety, or well-being of our child(ren). As parents, we remain solely responsible for the care and upbringing of our child(ren), regardless of the contents of any co-parenting agreement we develop.
              </p>
              
              <p>
                I understand that Resolve does not provide legal advice, and that no communication or material provided through Resolve—whether by its platform, representatives, or employees—should be construed as legal advice. I acknowledge that if I require legal counsel, I am solely responsible for consulting a licensed attorney in my jurisdiction.
              </p>
              
              <p>
                I understand that any agreement my co-parent and I reach may require modifications to comply with applicable state and local laws. I acknowledge that it is my responsibility to ensure the agreement conforms to the laws in my jurisdiction and that legal consultation may be necessary to confirm its enforceability.
              </p>
            </div>

            {/* Sticky scroll indicator */}
            {!hasScrolledToBottom && (
              <div className="sticky bottom-0 w-full text-center py-2 bg-gradient-to-t from-white via-white to-transparent">
                <p className="text-sm text-[#2e1a87] font-medium flex items-center justify-center">
                  Scroll to bottom to sign <ArrowDown className="ml-1 h-4 w-4 animate-bounce" />
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Signature & Submit section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign Agreement</h2>
          
          {!hasScrolledToBottom && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-amber-600 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Please read the entire agreement before signing
              </p>
            </div>
          )}
          
          <div className="mb-6 border border-gray-200 rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Document Acceptance</h3>
              {signature && initials && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Signed
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              By clicking "Sign" you acknowledge that you have read and agree to the terms outlined in the Resolve Waiver and Acknowledgment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Signature Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Signature</h4>
                  <span className="text-xs text-red-500">Required</span>
                </div>
                
                {signature ? (
                  <div 
                    className="border border-gray-200 rounded-md p-3 bg-white min-h-20 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSignatureModalOpen(true)}
                  >
                    <img src={signature} alt="Your signature" className="max-h-16" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => hasScrolledToBottom && setSignatureModalOpen(true)}
                    disabled={!hasScrolledToBottom}
                    className={`w-full border ${hasScrolledToBottom ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' : 'border-gray-200 bg-gray-100'} 
                      rounded-md min-h-20 flex flex-col items-center justify-center cursor-pointer transition-colors`}
                  >
                    <FilePenLine className={`h-6 w-6 mb-1 ${hasScrolledToBottom ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${hasScrolledToBottom ? 'text-blue-600' : 'text-gray-400'}`}>Click to sign</span>
                  </button>
                )}
              </div>
              
              {/* Initials Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Initials</h4>
                  <span className="text-xs text-red-500">Required</span>
                </div>
                
                {initials ? (
                  <div 
                    className="border border-gray-200 rounded-md p-3 bg-white min-h-20 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSignatureModalOpen(true)}
                  >
                    <img src={initials} alt="Your initials" className="max-h-12" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => hasScrolledToBottom && setSignatureModalOpen(true)}
                    disabled={!hasScrolledToBottom}
                    className={`w-full border ${hasScrolledToBottom ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' : 'border-gray-200 bg-gray-100'} 
                      rounded-md min-h-20 flex flex-col items-center justify-center cursor-pointer transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mb-1 ${hasScrolledToBottom ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span className={`text-sm ${hasScrolledToBottom ? 'text-blue-600' : 'text-gray-400'}`}>Add initials</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-12 mt-4 bg-gradient-to-r from-[#2e1a87] to-[#4936c2] hover:from-[#25156d] hover:to-[#3e2ea5] text-white font-medium text-base shadow-md"
              disabled={!signature || !initials}
            >
              {signature && initials ? "Complete Signing" : "Signature Required"}
            </Button>
          </div>
          
          {/* Completion Status Info */}
          <div className="text-xs text-gray-500 flex items-center justify-between px-1">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>This document is legally binding when completed</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
        
        {/* Signature Modal */}
        <Dialog open={signatureModalOpen} onOpenChange={setSignatureModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Set Up Your Signature & Initials</DialogTitle>
              <p className="text-sm text-gray-500 mt-2">
                Your signature and initials will be used to sign this agreement and future documents.
              </p>
            </DialogHeader>
            
            <div className="mt-4">
              <Tabs defaultValue="draw" onValueChange={(value) => {
                setSignatureMethod(value as 'draw' | 'type');
                setInitialsMethod(value as 'draw' | 'type');
              }}>
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="grid grid-cols-2 w-48">
                    <TabsTrigger value="draw" className="flex items-center justify-center">
                      <PenTool className="mr-2 h-4 w-4" />
                      Draw
                    </TabsTrigger>
                    <TabsTrigger value="type" className="flex items-center justify-center">
                      <Keyboard className="mr-2 h-4 w-4" />
                      Type
                    </TabsTrigger>
                  </TabsList>
                  
                  {signatureMethod === 'type' && (
                    <div className="flex items-center space-x-3">
                      <label className="text-sm text-gray-600 whitespace-nowrap">Font Style:</label>
                      <select
                        value={signatureFont}
                        onChange={(e) => setSignatureFont(e.target.value)}
                        className="p-1 border border-gray-300 rounded-md text-sm"
                      >
                        {fonts.map((font) => (
                          <option key={font.name} value={font.name}>
                            {font.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                
                <TabsContent value="draw" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Signature Drawing Panel */}
                    <div className="md:col-span-2">
                      <h3 className="font-medium text-gray-700 mb-2">Your Signature</h3>
                      <div className="border border-gray-200 rounded-md bg-gray-50 mb-3">
                        <SignatureCanvas
                          ref={signatureCanvasRef}
                          canvasProps={{
                            width: 300,
                            height: 150,
                            className: 'signature-canvas w-full',
                          }}
                          backgroundColor="rgba(247, 248, 249, 1)"
                        />
                      </div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={clearSignature}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                    
                    {/* Initials Drawing Panel */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Your Initials</h3>
                      <div className="border border-gray-200 rounded-md bg-gray-50 mb-3">
                        <SignatureCanvas
                          ref={initialsCanvasRef}
                          canvasProps={{
                            width: 150,
                            height: 80,
                            className: 'signature-canvas w-full',
                          }}
                          backgroundColor="rgba(247, 248, 249, 1)"
                        />
                      </div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={clearInitials}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="type" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Signature Typing Panel */}
                    <div className="md:col-span-2">
                      <h3 className="font-medium text-gray-700 mb-2">Your Signature</h3>
                      <div className="mb-3">
                        <input
                          type="text"
                          value={typedSignature}
                          onChange={(e) => setTypedSignature(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Type your full name"
                        />
                      </div>
                      
                      <div className="border border-gray-200 rounded-md p-4 bg-gray-50 mb-3 h-24 flex items-center justify-center">
                        <p 
                          style={{ 
                            fontFamily: signatureFont, 
                            fontSize: '28px',
                            lineHeight: 1.2 
                          }}
                        >
                          {typedSignature || 'Your signature will appear here'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Initials Typing Panel */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Your Initials</h3>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Initials (auto-generated from name)</p>
                        <div className="w-full p-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700">
                          {typedInitials || 'Enter your full name above'}
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-md p-4 bg-gray-50 mb-3 h-24 flex items-center justify-center">
                        <p 
                          style={{ 
                            fontFamily: signatureFont, 
                            fontSize: '32px',
                            lineHeight: 1.2 
                          }}
                        >
                          {typedInitials || 'JD'}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setSignatureModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={saveSignatureAndInitials}
                className="bg-[#2e1a87] hover:bg-[#25156d]"
              >
                Save and Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}