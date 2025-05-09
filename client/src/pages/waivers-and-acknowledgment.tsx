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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Check, 
  Download, 
  Edit, 
  PenTool, 
  Keyboard, 
  Play, 
  LockIcon,
  CheckCircle
} from 'lucide-react';
import michaelLundyVideo from '@/assets/michael_lundy_video.jpg';
import { useLocation } from 'wouter';
import Player from '@vimeo/player';
import SignatureCanvas from 'react-signature-canvas';

export default function WaiversAndAcknowledgment() {
  const [location, navigate] = useLocation();
  const [signature, setSignature] = useState<string | null>(null);
  const [initials, setInitials] = useState<string | null>(null);
  const [signatureMethod, setSignatureMethod] = useState<'draw' | 'type'>('draw');
  const [initialsMethod, setInitialsMethod] = useState<'draw' | 'type'>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [typedInitials, setTypedInitials] = useState('');
  const [signatureFont, setSignatureFont] = useState('Dancing Script');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [signSetupModalOpen, setSignSetupModalOpen] = useState(false);
  const [activeInitialPoint, setActiveInitialPoint] = useState<number | null>(null);
  const [signedParagraphs, setSignedParagraphs] = useState<number[]>([]);
  const [isDocumentComplete, setIsDocumentComplete] = useState(false);
  const [isSignatureSetup, setIsSignatureSetup] = useState(false);
  
  // Safety screening questions - default to "no"
  const [safetyQuestion1, setSafetyQuestion1] = useState<string>("no");
  const [safetyQuestion2, setSafetyQuestion2] = useState<string>("no");
  const [safetyQuestion3, setSafetyQuestion3] = useState<string>("no");
  const [showQuestionsWarning, setShowQuestionsWarning] = useState(false);
  
  // Generate initials from full name - more immediate response
  const generateInitialsFromName = (name: string) => {
    const nameParts = name.trim().split(' ').filter(part => part.length > 0);
    if (nameParts.length >= 2) {
      // Get first letter of first name and first letter of last name
      const firstInitial = nameParts[0][0] || '';
      const lastInitial = nameParts[nameParts.length - 1][0] || '';
      return firstInitial + lastInitial;
    } else if (nameParts.length === 1 && nameParts[0].length > 0) {
      // If only one word, use first letter
      return nameParts[0][0] || '';
    }
    return '';
  };
  
  // Auto-update initials when name is typed
  useEffect(() => {
    if (signatureMethod === 'type' && typedSignature) {
      setTypedInitials(generateInitialsFromName(typedSignature));
    }
  }, [signatureMethod, typedSignature]);
  
  const vimeoContainerRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<any>(null);
  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const initialsCanvasRef = useRef<SignatureCanvas>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Waiver introduction and paragraphs
  const introduction = "Resolve is an educational course designed to support cooperative co-parenting and assist in reaching agreements between co-parents. However, participation in the course does not guarantee any specific outcome, including reaching full agreement on all parenting matters.";
  
  // Paragraphs that require initials
  const paragraphs = [
    "I understand that my co-parent and I may not reach a complete agreement through this course, and that additional support from legal, therapeutic, or other professionals may be necessary.",
    "I acknowledge that any agreement my co-parent and I reach through Resolve does not guarantee the current or future health, safety, or well-being of our child(ren). As parents, we remain solely responsible for the care and upbringing of our child(ren), regardless of the contents of any co-parenting agreement we develop.",
    "I understand that Resolve does not provide legal advice, and that no communication or material provided through Resolve—whether by its platform, representatives, or employees—should be construed as legal advice. I acknowledge that if I require legal counsel, I am solely responsible for consulting a licensed attorney in my jurisdiction.",
    "I understand that any agreement my co-parent and I reach may require modifications to comply with applicable state and local laws. I acknowledge that it is my responsibility to ensure the agreement conforms to the laws in my jurisdiction and that legal consultation may be necessary to confirm its enforceability."
  ];

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
    let validSignature = false;
    let validInitials = false;
    
    // First validate and save signature
    if (signatureMethod === 'draw') {
      if (signatureCanvasRef.current && !signatureCanvasRef.current.isEmpty()) {
        // If this is the signature setup mode or signature field, set the signature
        if (activeInitialPoint === -1 || activeInitialPoint === null) {
          setSignature(signatureCanvasRef.current.toDataURL());
        }
        
        // Always mark the signature as valid regardless - for signature field (-1) 
        // we need to capture and validate it, but for initial fields we just need to 
        // know there's a valid signature somewhere
        validSignature = true;
      }
    } else if (signatureMethod === 'type') {
      // Validate typed signature
      if (typedSignature.trim() !== '') {
        // Create a canvas to convert the typed signature to an image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 100;
        
        if (ctx) {
          ctx.font = `30px ${signatureFont}`;
          ctx.fillStyle = '#000';
          ctx.fillText(typedSignature, 10, 50);
          
          // If this is the signature setup mode or signature field, set the signature
          if (activeInitialPoint === -1 || activeInitialPoint === null) {
            setSignature(canvas.toDataURL());
          }
          
          // Always mark the signature as valid regardless - for signature field (-1) 
          // we need to capture and validate it, but for initial fields we just need to 
          // know there's a valid signature somewhere
          validSignature = true;
        }
      }
    }
    
    // Then validate and save initials
    if (initialsMethod === 'draw') {
      if (initialsCanvasRef.current && !initialsCanvasRef.current.isEmpty()) {
        setInitials(initialsCanvasRef.current.toDataURL());
        validInitials = true;
      }
    } else if (initialsMethod === 'type') {
      // For type method, we generate initials automatically from full name
      // So if there's a full name, there should be valid initials
      if (typedSignature.trim() !== '') {
        // Use the auto-generated initials (from first letter of first and last name)
        const autoInitials = generateInitialsFromName(typedSignature);
        setTypedInitials(autoInitials);
        
        // Create a canvas to convert the typed initials to an image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 60;
        
        if (ctx) {
          ctx.font = `36px ${signatureFont}`;
          ctx.fillStyle = '#000';
          // Measure text width to center it
          const textWidth = ctx.measureText(autoInitials).width;
          const xPos = (canvas.width - textWidth) / 2;
          ctx.fillText(autoInitials, xPos, 40);
          setInitials(canvas.toDataURL());
          validInitials = true;
        }
      }
    }
    
    // Determine what we need based on what the user is trying to do
    let isValid = false;
    
    // For first-time setup or final signature, require both signature and initials
    if (activeInitialPoint === null || activeInitialPoint === -1) {
      isValid = validSignature && validInitials;
    } 
    // For initializing a paragraph, we only need initials to be valid
    else if (activeInitialPoint >= 0) {
      isValid = validInitials;
    }
    
    if (isValid) {
      setIsSignatureSetup(true);
      
      // Apply only to the clicked paragraph if it's a paragraph initial
      if (activeInitialPoint !== null && activeInitialPoint >= 0) {
        setSignedParagraphs(prev => {
          if (!prev.includes(activeInitialPoint)) {
            return [...prev, activeInitialPoint];
          }
          return prev;
        });
        
        // Scroll to the paragraph that was just signed
        paragraphRefs.current[activeInitialPoint]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Close the modal
      setSignSetupModalOpen(false);
      setActiveInitialPoint(null);
    } else {
      // Show appropriate validation error
      if (activeInitialPoint === null || activeInitialPoint === -1) {
        if (!validSignature && !validInitials) {
          alert('Please provide both a signature and initials before saving.');
        } else if (!validSignature) {
          alert('Please provide a signature before saving.');
        } else if (!validInitials) {
          alert('Please provide initials before saving.');
        }
      } else {
        // For paragraph initials, we only need to check initials
        if (!validInitials) {
          alert('Please provide initials before saving.');
        }
      }
    }
  };

  const handleInitialOrSignatureTag = (paragraphIndex: number) => {
    // If signature/initials are not setup yet, open the setup modal
    if (!isSignatureSetup) {
      setActiveInitialPoint(paragraphIndex);
      // Ensure we're starting with the type tab selected
      setSignatureMethod('type');
      setInitialsMethod('type');
      // If there's any existing typed signature text, regenerate the initials
      if (typedSignature) {
        setTypedInitials(generateInitialsFromName(typedSignature));
      }
      // Open the modal
      setSignSetupModalOpen(true);
    } else {
      // If already setup, apply the saved signature/initials to this field
      setSignedParagraphs(prev => {
        if (!prev.includes(paragraphIndex)) {
          return [...prev, paragraphIndex];
        }
        return prev;
      });
      // Scroll to show result
      paragraphRefs.current[paragraphIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSafetyQuestionToggle = () => {
    // Questions are already pre-answered to "no" so this is just for warning visibility
    setShowQuestionsWarning(false);
  };

  const isReadyToSign = () => {
    // Check if all paragraphs have been initialed and signature is added
    return (
      signedParagraphs.length === paragraphs.length && 
      signature !== null
    );
  };

  const handleSubmit = () => {
    // Save the waiver status to localStorage
    localStorage.setItem('waiverCompleted', 'true');
    setIsDocumentComplete(true);
  };
  
  const handleDownloadPDF = () => {
    // Mock function for downloading PDF - would be implemented with actual PDF generation
    alert('PDF Download functionality would be implemented here');
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
          <h1 className="text-3xl font-bold text-[#2e1a87]">Waivers & Acknowledgment</h1>
          <p className="mt-2 text-gray-600">
            Review and sign the required legal acknowledgment to continue with the co-parenting process.
          </p>
        </div>

        {/* Video section - DO NOT MODIFY THIS SECTION */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Watch: Resolve Acknowledgment Overview
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
            Please watch this short video before signing the acknowledgment below.
          </p>
        </div>

        {/* DocuSign-style Agreement section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Resolve Waiver and Acknowledgment</h2>
            {isDocumentComplete && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                <LockIcon className="h-3.5 w-3.5" />
                <span>Signed & Completed</span>
              </Badge>
            )}
          </div>
          
          {/* Document with yellow "Initial Here" tags */}
          <div className={`relative border border-gray-200 rounded-md p-6 mb-6 font-serif ${isDocumentComplete ? 'bg-gray-50' : 'bg-white'}`}>
            {/* Introduction paragraph - no initials required */}
            <div className="mb-8">
              <p className="text-gray-800 leading-relaxed">
                {introduction}
              </p>
            </div>
            
            {/* Paragraphs that require initials */}
            {paragraphs.map((paragraph, index) => (
              <div 
                key={index} 
                className="mb-8 grid grid-cols-[85%_15%] items-center" 
                ref={el => paragraphRefs.current[index] = el}
              >
                <div className="text-gray-800 leading-relaxed pr-4">
                  {paragraph}
                </div>
                
                <div className="flex justify-end">
                  {/* Yellow "Initial Here" tag */}
                  {!isDocumentComplete ? (
                    <div 
                      className={`
                      ${signedParagraphs.includes(index) 
                        ? 'bg-amber-100 cursor-default' 
                        : 'bg-amber-300 hover:bg-amber-400 cursor-pointer'} 
                      px-2 py-1 rounded-md shadow-sm transition-colors z-10`}
                      onClick={() => !signedParagraphs.includes(index) && handleInitialOrSignatureTag(index)}
                    >
                      {signedParagraphs.includes(index) ? (
                        <div className="flex items-center justify-center w-full h-full">
                          {initials && (
                            <img src={initials} alt="Your initials" className="h-8 w-auto" />
                          )}
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-amber-800 whitespace-nowrap">Initial Here</span>
                      )}
                    </div>
                  ) : (
                    // Read-only version (document completed)
                    <div className="bg-amber-100 px-2 py-1 rounded-md shadow-sm z-10">
                      <div className="flex items-center justify-center w-full h-full">
                        {initials && <img src={initials} alt="Your initials" className="h-8 w-auto" />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Safety Screening Questions Section */}
          <div className={`border border-gray-200 rounded-md p-6 mb-6 ${isDocumentComplete ? 'bg-gray-50' : 'bg-white'}`}>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Safety Screening Questions</h3>
            
            {showQuestionsWarning && (
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-amber-600 text-sm flex items-center">
                  Please answer all questions before proceeding.
                </p>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Question 1 - Horizontal layout */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <Label className="text-sm font-medium text-gray-700 md:w-3/4">
                    Are you concerned that your child(ren) will not be safe while with the other parent?
                  </Label>
                  <RadioGroup 
                    value={safetyQuestion1}
                    onValueChange={(value) => setSafetyQuestion1(value)}
                    disabled={isDocumentComplete}
                    className="flex gap-2 mt-2 md:mt-0"
                  >
                    <div className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 ${safetyQuestion1 === 'yes' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}>
                      <RadioGroupItem value="yes" id="q1-yes" />
                      <Label htmlFor="q1-yes" className={safetyQuestion1 === 'yes' ? 'font-medium text-blue-600' : ''}>Yes</Label>
                    </div>
                    <div className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 ${safetyQuestion1 === 'no' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}>
                      <RadioGroupItem value="no" id="q1-no" />
                      <Label htmlFor="q1-no" className={safetyQuestion1 === 'no' ? 'font-medium text-blue-600' : ''}>No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              {/* Question 2 - Horizontal layout */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <Label className="text-sm font-medium text-gray-700 md:w-3/4">
                    Do you believe the other parent has an untreated substance/alcohol abuse problem?
                  </Label>
                  <RadioGroup 
                    value={safetyQuestion2}
                    onValueChange={(value) => setSafetyQuestion2(value)}
                    disabled={isDocumentComplete}
                    className="flex gap-2 mt-2 md:mt-0"
                  >
                    <div className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 ${safetyQuestion2 === 'yes' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}>
                      <RadioGroupItem value="yes" id="q2-yes" />
                      <Label htmlFor="q2-yes" className={safetyQuestion2 === 'yes' ? 'font-medium text-blue-600' : ''}>Yes</Label>
                    </div>
                    <div className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 ${safetyQuestion2 === 'no' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}>
                      <RadioGroupItem value="no" id="q2-no" />
                      <Label htmlFor="q2-no" className={safetyQuestion2 === 'no' ? 'font-medium text-blue-600' : ''}>No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              {/* Question 3 - Horizontal layout */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <Label className="text-sm font-medium text-gray-700 md:w-3/4">
                    Has the other parent been diagnosed with a mental health disorder for which he/she is not being properly treated?
                  </Label>
                  <RadioGroup 
                    value={safetyQuestion3}
                    onValueChange={(value) => setSafetyQuestion3(value)}
                    disabled={isDocumentComplete}
                    className="flex gap-2 mt-2 md:mt-0"
                  >
                    <div className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 ${safetyQuestion3 === 'yes' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}>
                      <RadioGroupItem value="yes" id="q3-yes" />
                      <Label htmlFor="q3-yes" className={safetyQuestion3 === 'yes' ? 'font-medium text-blue-600' : ''}>Yes</Label>
                    </div>
                    <div className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 ${safetyQuestion3 === 'no' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}>
                      <RadioGroupItem value="no" id="q3-no" />
                      <Label htmlFor="q3-no" className={safetyQuestion3 === 'no' ? 'font-medium text-blue-600' : ''}>No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          
          {/* Final Signature Section */}
          {!isDocumentComplete ? (
            <div className="border border-gray-200 rounded-md p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Sign to Complete</h3>
              
              <div className="relative mb-6">
                {signature ? (
                  <div className="border border-gray-200 rounded-md p-4 bg-white">
                    <div className="flex items-center justify-center py-3">
                      <img src={signature} alt="Your signature" className="max-h-20" />
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-md p-4 bg-white relative">
                    <div className="h-20 flex flex-col items-center justify-center">
                      <div 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-amber-300 hover:bg-amber-400 px-3 py-1.5 rounded-md shadow-sm cursor-pointer transition-colors"
                        onClick={() => {
                          // Set activeInitialPoint to -1 to indicate we're in signature mode (not initials)
                          setActiveInitialPoint(-1);
                          
                          // Ensure we're starting with the type tab selected
                          setSignatureMethod('type');
                          setInitialsMethod('type');
                          
                          // If there's any existing typed signature text, regenerate the initials
                          if (typedSignature) {
                            setTypedInitials(generateInitialsFromName(typedSignature));
                          }
                          
                          setSignSetupModalOpen(true);
                        }}
                      >
                        <span className="text-sm font-medium text-amber-800">Sign Here</span>
                      </div>
                      <div className="text-gray-400 text-sm">Click "Sign Here" to add your signature</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button
                  disabled={!isReadyToSign()}
                  className="bg-[#2e1a87] hover:bg-[#25156d]"
                  onClick={handleSubmit}
                  onMouseOver={handleSafetyQuestionToggle}
                >
                  {signature ? 'Complete & Continue' : 'Sign & Complete'}
                </Button>
              </div>
            </div>
          ) : (
            // Document is completed - show download and continue buttons
            <div className="border border-green-100 rounded-md p-6 bg-green-50">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-green-800">Document Successfully Signed</h3>
              </div>
              
              <p className="text-sm text-green-700 mb-6">
                Thank you for completing the Resolve Waiver and Acknowledgment. You can now download a copy or continue with the co-parenting process.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  Download PDF
                </Button>
                
                <Button
                  className="bg-[#2e1a87] hover:bg-[#25156d]"
                  onClick={() => navigate('/home6')}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Signature & Initials Setup Modal */}
        <Dialog
          open={signSetupModalOpen}
          onOpenChange={(isOpen) => !isOpen && setSignSetupModalOpen(false)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set Up Your Signature & Initials</DialogTitle>
              <DialogDescription>
                Create your signature and initials once to use throughout the document.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="type" className="w-full py-4">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="type" onClick={() => {
                  setSignatureMethod('type'); 
                  setInitialsMethod('type');
                  // If there's already a typed signature, regenerate the initials
                  if (typedSignature) {
                    setTypedInitials(generateInitialsFromName(typedSignature));
                  }
                }}>
                  <div className="flex items-center">
                    <Keyboard className="mr-1.5 h-4 w-4" />
                    Type
                  </div>
                </TabsTrigger>
                <TabsTrigger value="draw" onClick={() => {setSignatureMethod('draw'); setInitialsMethod('draw');}}>
                  <div className="flex items-center">
                    <PenTool className="mr-1.5 h-4 w-4" />
                    Draw
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="draw" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Signature</h3>
                    <div className="border border-gray-300 rounded-md p-2 bg-white">
                      <SignatureCanvas
                        ref={signatureCanvasRef}
                        penColor="black"
                        canvasProps={{
                          className: 'w-full h-32 border rounded-md cursor-crosshair',
                        }}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={clearSignature}
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Initials</h3>
                    <div className="border border-gray-300 rounded-md p-2 bg-white">
                      <SignatureCanvas
                        ref={initialsCanvasRef}
                        penColor="black"
                        canvasProps={{
                          className: 'w-full h-24 border rounded-md cursor-crosshair',
                        }}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={clearInitials}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="type" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Type Your Full Name</h3>
                    <input
                      type="text"
                      value={typedSignature}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTypedSignature(newValue);
                        // Immediately generate and update initials
                        const generatedInitials = generateInitialsFromName(newValue);
                        setTypedInitials(generatedInitials);
                      }}
                      placeholder="John Doe"
                      className="w-full border border-gray-300 rounded-md p-3"
                    />
                    
                    <div className="mt-3">
                      <h4 className="text-xs font-medium mb-1">Select Style</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {fonts.map((font) => (
                          <button
                            key={font.name}
                            type="button"
                            onClick={() => setSignatureFont(font.name)}
                            className={`border ${signatureFont === font.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-md p-2 text-sm`}
                          >
                            <span style={{ fontFamily: font.name }}>
                              {font.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {typedSignature && (
                      <div className="mt-4 border border-gray-200 rounded-md p-3 flex items-center justify-center min-h-16">
                        <span 
                          style={{ fontFamily: signatureFont }} 
                          className="text-2xl text-gray-800"
                        >
                          {typedSignature}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Your Initials</h3>
                    <div className="border border-gray-200 rounded-md p-3 flex items-center justify-center h-16 w-16">
                      <span 
                        style={{ fontFamily: signatureFont }} 
                        className="text-3xl text-gray-800"
                      >
                        {typedInitials}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">
                        Generated from your full name
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button 
                variant="ghost" 
                onClick={() => setSignSetupModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#2e1a87] hover:bg-[#25156d]"
                onClick={saveSignatureAndInitials}
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