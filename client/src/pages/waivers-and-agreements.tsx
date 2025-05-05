import { useState, useRef, useEffect } from 'react';
import { NavigationMenu } from '@/components/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowDown, Check, Edit, PenTool, Keyboard } from 'lucide-react';
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

  const saveSignature = () => {
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
  };

  const saveInitials = () => {
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
  };

  const handleSubmit = () => {
    // Here you would typically send the signature and initials to your backend
    // For now, we'll just navigate back to the home page
    navigate('/home6');
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
            Watch: Waiver & Agreement Overview
          </h2>

          <div 
            ref={vimeoContainerRef} 
            className="w-full aspect-video bg-gray-100 rounded-md overflow-hidden mb-4"
          >
            {!iframeLoaded && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin h-8 w-8 border-4 border-[#2e1a87] border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm italic">
            Please watch this short video before signing the agreement below.
          </p>
        </div>

        {/* Agreement section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Resolve Co-Parenting Agreement
          </h2>

          <div className="relative">
            <div
              ref={agreementRef}
              onScroll={handleScroll}
              className="prose prose-slate h-80 overflow-y-auto border border-gray-200 rounded-md p-6 mb-4 font-serif"
            >
              <h3>TERMS AND CONDITIONS AGREEMENT</h3>
              
              <p>
                This Agreement (the "Agreement") is entered into between you, the user ("User"), and Resolve Co-Parenting Solutions, Inc. ("Resolve"), regarding your access to and use of the Resolve co-parenting platform (the "Platform").
              </p>
              
              <h4>1. ACCEPTANCE OF TERMS</h4>
              <p>
                By accessing or using the Platform, you agree to be bound by this Agreement and all applicable laws and regulations. If you do not agree with any part of this Agreement, you must not use the Platform.
              </p>
              
              <h4>2. PLATFORM DESCRIPTION</h4>
              <p>
                The Platform is designed to facilitate co-parenting arrangements and communication. Resolve does not provide legal advice, and the use of the Platform does not create an attorney-client relationship.
              </p>
              
              <h4>3. USER RESPONSIBILITIES</h4>
              <p>
                You agree to provide accurate information when using the Platform. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              
              <h4>4. PRIVACY POLICY</h4>
              <p>
                Your use of the Platform is also governed by our Privacy Policy, which is incorporated by reference into this Agreement. The Privacy Policy can be found on our website.
              </p>
              
              <h4>5. INTELLECTUAL PROPERTY</h4>
              <p>
                All content on the Platform, including but not limited to text, graphics, logos, and software, is the property of Resolve and is protected by intellectual property laws.
              </p>
              
              <h4>6. LIMITATION OF LIABILITY</h4>
              <p>
                To the maximum extent permitted by law, Resolve shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising out of or relating to your use of the Platform.
              </p>
              
              <h4>7. DISPUTE RESOLUTION</h4>
              <p>
                Any dispute arising from this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
              
              <h4>8. TERMINATION</h4>
              <p>
                Resolve reserves the right, at its sole discretion, to terminate your access to the Platform, without notice, for any reason or no reason.
              </p>
              
              <h4>9. GOVERNING LAW</h4>
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles.
              </p>
              
              <h4>10. AMENDMENTS</h4>
              <p>
                Resolve may amend this Agreement at any time by posting the amended terms on the Platform. Your continued use of the Platform following any amendments indicates your acceptance of the amended terms.
              </p>
              
              <h4>11. ENTIRE AGREEMENT</h4>
              <p>
                This Agreement constitutes the entire agreement between you and Resolve regarding your use of the Platform, superseding any prior agreements between you and Resolve.
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

        {/* Signature section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Set Up Your Signature & Initials
          </h2>

          <div className="border border-gray-200 rounded-lg p-6">
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
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearSignature}
                      >
                        Clear
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-[#2e1a87] hover:bg-[#25156d]"
                        onClick={saveSignature}
                      >
                        Save Signature
                      </Button>
                    </div>
                    
                    {signature && (
                      <div className="mt-4 pt-2">
                        <h4 className="text-sm font-medium text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Signature Saved
                        </h4>
                      </div>
                    )}
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
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearInitials}
                      >
                        Clear
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-[#2e1a87] hover:bg-[#25156d]"
                        onClick={saveInitials}
                      >
                        Save Initials
                      </Button>
                    </div>
                    
                    {initials && (
                      <div className="mt-4 pt-2">
                        <h4 className="text-sm font-medium text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Initials Saved
                        </h4>
                      </div>
                    )}
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
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-[#2e1a87] hover:bg-[#25156d]"
                        onClick={saveSignature}
                        disabled={!typedSignature.trim()}
                      >
                        Save Signature
                      </Button>
                    </div>
                    
                    {signature && (
                      <div className="mt-4 pt-2">
                        <h4 className="text-sm font-medium text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Signature Saved
                        </h4>
                      </div>
                    )}
                  </div>
                  
                  {/* Initials Typing Panel */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Your Initials</h3>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={typedInitials}
                        onChange={(e) => setTypedInitials(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Type your initials (e.g., JD)"
                        maxLength={3}
                      />
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
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-[#2e1a87] hover:bg-[#25156d]"
                        onClick={saveInitials}
                        disabled={!typedInitials.trim()}
                      >
                        Save Initials
                      </Button>
                    </div>
                    
                    {initials && (
                      <div className="mt-4 pt-2">
                        <h4 className="text-sm font-medium text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Initials Saved
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Preview Section */}
            {(signature || initials) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-4">Signature Preview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {signature && (
                    <div>
                      <h4 className="text-sm text-gray-600 mb-1">Your Signature</h4>
                      <div className="border border-gray-200 rounded-md p-3 bg-white min-h-16 flex items-center">
                        <img src={signature} alt="Your signature" className="max-h-16" />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-xs flex items-center text-blue-600"
                        onClick={() => setSignature(null)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Signature
                      </Button>
                    </div>
                  )}
                  
                  {initials && (
                    <div>
                      <h4 className="text-sm text-gray-600 mb-1">Your Initials</h4>
                      <div className="border border-gray-200 rounded-md p-3 bg-white min-h-16 flex items-center">
                        <img src={initials} alt="Your initials" className="max-h-12" />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-xs flex items-center text-blue-600"
                        onClick={() => setInitials(null)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Initials
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Button
            onClick={handleSubmit}
            className="w-full h-14 bg-gradient-to-r from-[#2e1a87] to-[#4936c2] hover:from-[#25156d] hover:to-[#3e2ea5] text-white font-medium text-lg shadow-md"
            disabled={!hasScrolledToBottom || !signature || !initials}
          >
            Sign & Continue
          </Button>
          
          {(!hasScrolledToBottom || !signature || !initials) && (
            <div className="mt-3 text-center">
              {!hasScrolledToBottom && (
                <p className="text-amber-600 text-sm">
                  Please read the entire agreement before signing
                </p>
              )}
              {hasScrolledToBottom && (!signature || !initials) && (
                <p className="text-amber-600 text-sm">
                  Please create both your signature and initials
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}