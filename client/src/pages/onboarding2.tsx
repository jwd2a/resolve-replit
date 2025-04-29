import { useState, useEffect } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Check, X, Mail, Users, ArrowDown, ArrowRight } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FaCheck, FaChild, FaHome, FaUserFriends, FaGavel } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import logoSrc from "@assets/@Resolve Primary Logo - Main Color 02.png";

// US states for jurisdiction picker
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia", "Puerto Rico", "U.S. Virgin Islands"
];

// Form validation schemas for each step
const personalInfoSchema = z.object({
  displayName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  address: z.string().min(5, { message: "Please enter your address" }).optional(),
});

const coParentSchema = z.object({
  fullName: z.string().min(3, { message: "Co-parent's name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  relationship: z.string().optional(),
});

const childSchema = z.object({
  children: z.array(
    z.object({
      fullName: z.string().min(3, { message: "Child's name must be at least 3 characters" }),
      dateOfBirth: z.string().min(1, { message: "Please enter child's date of birth" }),
      gender: z.string().optional(),
    })
  ).min(1, { message: "Please add at least one child" }),
});

const jurisdictionSchema = z.object({
  jurisdiction: z.string().min(1, { message: "Please select a jurisdiction" }),
});

// Combined form type
type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
type CoParentFormValues = z.infer<typeof coParentSchema>;
type ChildFormValues = z.infer<typeof childSchema>;
type JurisdictionFormValues = z.infer<typeof jurisdictionSchema>;

// Direct inline styles for maximum visibility
const noteStyle = "font-handwritten";
const arrowStyle = "absolute text-red-500 w-10 h-10 stroke-2";
const mainInstructionStyle = "font-handwritten text-2xl font-bold my-6 bg-yellow-200 border-4 border-pink-500 shadow-lg p-6 max-w-xl mx-auto";

export default function Onboarding2() {
  const { user, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const { toast } = useToast();
  
  // Auto-redirect after completion - for beta testing we'll show a success message instead
  useEffect(() => {
    if (completed) {
      // For beta testing, we'll just show a success message and not redirect
      toast({
        title: "Beta Testing Complete!",
        description: "Thank you for testing the onboarding flow! In the actual app, you would be redirected to the dashboard.",
      });
      // Commented out for beta testing:
      // window.location.href = "/";
    }
  }, [completed, toast]);
  
  // Initial form for children
  const emptyChild = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
  };
  
  // Form setup for each step
  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      phone: "",
      address: "",
    },
  });
  
  const coParentForm = useForm<CoParentFormValues>({
    resolver: zodResolver(coParentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      relationship: "",
    },
  });
  
  const childForm = useForm<ChildFormValues>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      children: [emptyChild],
    },
  });
  
  const jurisdictionForm = useForm<JurisdictionFormValues>({
    resolver: zodResolver(jurisdictionSchema),
    defaultValues: {
      jurisdiction: "",
    },
  });

  // Child form utilities
  const { fields, append, remove } = useFieldArray({
    control: childForm.control,
    name: "children",
  });

  // For beta testing, we're not requiring login
  // Comment out redirects to make the beta test version accessible without login
  
  // if (!user) {
  //   return <Redirect to="/auth" />;
  // }
  
  // if (user?.onboardingComplete && !completed) {
  //   return <Redirect to="/" />;
  // }
  
  // Handle step completion
  const nextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  
  // Submit handlers for each step
  const onPersonalInfoSubmit = (data: PersonalInfoFormValues) => {
    console.log("Personal info submitted:", data);
    nextStep();
  };
  
  const onCoParentSubmit = (data: CoParentFormValues) => {
    console.log("Co-parent info submitted:", data);
    nextStep();
  };
  
  const onChildSubmit = (data: ChildFormValues) => {
    console.log("Child info submitted:", data);
    nextStep();
  };
  
  // Handle inviting co-parent
  const handleInviteCoParent = async () => {
    const coParentEmail = coParentForm.getValues("email");
    const coParentName = coParentForm.getValues("fullName");
    
    if (!coParentEmail) {
      toast({
        title: "Email required",
        description: "Please enter your co-parent's email address to send an invitation.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSendingInvite(true);
    
    // Simulate invitation being sent (would be replaced with actual API call)
    setTimeout(() => {
      setIsSendingInvite(false);
      setIsInviteSent(true);
      
      toast({
        title: "Invitation sent!",
        description: `An invitation email has been sent to ${coParentName || "your co-parent"}.`,
      });
    }, 1500);
  };

  const onJurisdictionSubmit = (data: JurisdictionFormValues) => {
    console.log("Jurisdiction info submitted:", data);
    // In a real app, this would save all the collected data
    
    // Update the user's onboarding status
    if (user) {
      user.onboardingComplete = true;
    }
    
    setCompleted(true);
  };

  // Beta tester instruction banners
  const BetaInstructions = ({ stage }: { stage: number }) => {
    switch(stage) {
      case 1:
        return (
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backgroundColor: '#FFEB3B',
            color: '#0D47A1',
            border: '3px solid #E91E63',
            borderRadius: '8px',
            boxShadow: '5px 5px 0 rgba(233, 30, 99, 0.3)',
            padding: '15px',
            margin: '15px 0',
            position: 'relative',
            zIndex: 10,
            transform: 'rotate(-2deg)'
          }}>
            <div>👋 Hi Beta Tester! Here's where you'll enter your personal information. 
            Fill in your name, address, and contact details.</div>
            <ArrowDown style={{
              position: 'absolute', 
              right: '50px', 
              top: '70px', 
              width: '40px', 
              height: '40px', 
              color: '#E91E63',
              strokeWidth: 3
            }} />
          </div>
        );
      case 2:
        return (
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backgroundColor: '#FFEB3B',
            color: '#0D47A1',
            border: '3px solid #E91E63',
            borderRadius: '8px',
            boxShadow: '5px 5px 0 rgba(233, 30, 99, 0.3)',
            padding: '15px',
            margin: '15px 0',
            position: 'relative',
            zIndex: 10,
            transform: 'rotate(-2deg)'
          }}>
            <div>🤝 This section is about your co-parent. Their details will be used to create their account 
            and link it to yours. Try sending the invitation!</div>
            <ArrowDown style={{
              position: 'absolute', 
              right: '50px', 
              top: '70px', 
              width: '40px', 
              height: '40px', 
              color: '#E91E63',
              strokeWidth: 3
            }} />
          </div>
        );
      case 3:
        return (
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backgroundColor: '#FFEB3B',
            color: '#0D47A1',
            border: '3px solid #E91E63',
            borderRadius: '8px',
            boxShadow: '5px 5px 0 rgba(233, 30, 99, 0.3)',
            padding: '15px',
            margin: '15px 0',
            position: 'relative',
            zIndex: 10,
            transform: 'rotate(-2deg)'
          }}>
            <div>👶 Children info helps customize your parenting plan for their specific needs.
            Test adding multiple children to see how it works!</div>
            <ArrowDown style={{
              position: 'absolute', 
              right: '50px', 
              top: '70px', 
              width: '40px', 
              height: '40px', 
              color: '#E91E63',
              strokeWidth: 3
            }} />
          </div>
        );
      case 4:
        return (
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backgroundColor: '#FFEB3B',
            color: '#0D47A1',
            border: '3px solid #E91E63',
            borderRadius: '8px',
            boxShadow: '5px 5px 0 rgba(233, 30, 99, 0.3)',
            padding: '15px',
            margin: '15px 0',
            position: 'relative',
            zIndex: 10,
            transform: 'rotate(-2deg)'
          }}>
            <div>⚖️ Jurisdiction matters for legal aspects of your parenting plan.
            We'd love feedback on which states have special requirements!</div>
            <ArrowDown style={{
              position: 'absolute', 
              right: '50px', 
              top: '70px', 
              width: '40px', 
              height: '40px', 
              color: '#E91E63',
              strokeWidth: 3
            }} />
          </div>
        );
      default:
        return null;
    }
  };

  // Dynamic notes based on current step
  const StepSpecificNotes = ({ step }: { step: number }) => {
    switch(step) {
      case 1:
        return (
          <>
            {/* Bottom left note - specific to personal info */}
            <div style={{
              position: 'absolute',
              bottom: '250px',
              left: '40px',
              maxWidth: '250px',
              fontFamily: 'Caveat, cursive',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              transform: 'rotate(-3deg)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              zIndex: 20
            }}>
              ✍️ Personal info helps tailor the process to your specific situation
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ 
                position: 'absolute', 
                right: '-30px', 
                bottom: '-30px', 
                transform: 'rotate(45deg)'
              }}>
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Bottom left note - specific to co-parent */}
            <div style={{
              position: 'absolute',
              bottom: '220px',
              left: '30px',
              maxWidth: '250px',
              fontFamily: 'Caveat, cursive',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              transform: 'rotate(-3deg)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              zIndex: 20
            }}>
              🔍 Test sending the invitation email feature!
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ 
                position: 'absolute', 
                right: '-20px', 
                bottom: '-40px', 
                transform: 'rotate(30deg)'
              }}>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/* Bottom left note - specific to children */}
            <div style={{
              position: 'absolute',
              bottom: '150px',
              left: '40px',
              maxWidth: '270px',
              fontFamily: 'Caveat, cursive',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              transform: 'rotate(-3deg)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              zIndex: 20
            }}>
              👶 Try adding multiple children to test how it adapts the form!
            </div>
          </>
        );
      case 4:
        return (
          <>
            {/* Bottom left note - specific to jurisdiction */}
            <div style={{
              position: 'absolute',
              bottom: '200px',
              left: '35px',
              maxWidth: '250px',
              fontFamily: 'Caveat, cursive',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              transform: 'rotate(-3deg)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              zIndex: 20
            }}>
              ⚖️ The legal requirements vary by state - does this explain that clearly?
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e1a87] to-[#4730b8] relative">
      {/* Left side beta tester note - always visible */}
      <div style={{
        position: 'absolute',
        top: '120px',
        left: '50px',
        maxWidth: '300px',
        fontFamily: 'Caveat, cursive',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: 'white',
        transform: 'rotate(-5deg)',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        zIndex: 20
      }}>
        Thanks for taking the time to help us with beta testing.
      </div>
      
      {/* Right side beta tester note - always visible */}
      <div style={{
        position: 'absolute',
        top: '220px',
        right: '50px',
        maxWidth: '300px',
        fontFamily: 'Caveat, cursive',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: 'white',
        transform: 'rotate(3deg)',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        zIndex: 20
      }}>
        Please go through the setup just as a couple would. One parent starts the process and invites the other.
      </div>
      
      {/* Step-specific notes that change with each step */}
      <StepSpecificNotes step={currentStep} />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-3xl mx-auto shadow-xl relative">
          {/* Beta Testing Banner */}
          <div className="absolute top-0 left-0 right-0 bg-yellow-300 text-center p-2 text-yellow-800 font-bold rounded-t-lg z-10">
            BETA TESTING MODE - Please provide feedback on your experience
          </div>
          
          <CardHeader className="text-center pb-3 mt-8">
            <CardTitle className="text-lg font-bold">Complete Your Profile</CardTitle>
            <CardDescription className="text-sm">
              A few more details to create your parenting plan
            </CardDescription>

            {/* Beta testing instructions moved outside the card */}
            
            {/* Step indicators */}
            <div className="flex justify-center mt-3">
              <div className="flex items-center w-full max-w-md">
                <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-[#2e1a87]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > 1 ? "bg-[#2e1a87] text-white" : currentStep === 1 ? "border-2 border-[#2e1a87]" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 1 ? <FaCheck size={12} /> : <FaHome size={12} />}
                  </div>
                  <span className="text-[10px] mt-1">Your Info</span>
                </div>
                <div className={`flex-1 h-0.5 mx-1 ${currentStep > 1 ? "bg-[#2e1a87]" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-[#2e1a87]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > 2 ? "bg-[#2e1a87] text-white" : currentStep === 2 ? "border-2 border-[#2e1a87]" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 2 ? <FaCheck size={12} /> : <FaUserFriends size={12} />}
                  </div>
                  <span className="text-[10px] mt-1">Co-Parent</span>
                </div>
                <div className={`flex-1 h-0.5 mx-1 ${currentStep > 2 ? "bg-[#2e1a87]" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-[#2e1a87]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > 3 ? "bg-[#2e1a87] text-white" : currentStep === 3 ? "border-2 border-[#2e1a87]" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 3 ? <FaCheck size={12} /> : <FaChild size={12} />}
                  </div>
                  <span className="text-[10px] mt-1">Children</span>
                </div>
                <div className={`flex-1 h-0.5 mx-1 ${currentStep > 3 ? "bg-[#2e1a87]" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-[#2e1a87]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    completed ? "bg-[#2e1a87] text-white" : currentStep === 4 ? "border-2 border-[#2e1a87]" : "border-2 border-gray-300"
                  }`}>
                    {completed ? <FaCheck size={12} /> : <FaGavel size={12} />}
                  </div>
                  <span className="text-[10px] mt-1">Jurisdiction</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Form {...personalInfoForm}>
                <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <FormField
                        control={personalInfoForm.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium">Your Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="" {...field} className="h-9 text-sm" />
                                {field.value && (
                                  <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                    ✓
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormLabel className="text-xs font-medium">Your Legal Address</FormLabel>
                      
                      <FormField
                        control={personalInfoForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="mb-2">
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="Address" {...field} className="h-9 text-sm pl-8" />
                                <div className="absolute left-2 top-2 text-gray-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-3 gap-2">
                        <FormItem className="space-y-1">
                          <FormControl>
                            <Input placeholder="City" className="h-9 text-sm" />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="space-y-1">
                          <Select>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                              {US_STATES.map((state) => (
                                <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, '_')}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                        
                        <FormItem className="space-y-1">
                          <FormControl>
                            <Input placeholder="ZIP" className="h-9 text-sm" />
                          </FormControl>
                        </FormItem>
                      </div>
                    </div>
                    
                    <FormField
                      control={personalInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-medium">Phone number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-0 top-0 h-9 w-8 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                              </div>
                              <Input placeholder="(555) 123-4567" {...field} className="h-9 text-sm pl-8" />
                              {field.value && (
                                <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-blue-800 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 2: Co-parent Information */}
            {currentStep === 2 && (
              <Form {...coParentForm}>
                <form onSubmit={coParentForm.handleSubmit(onCoParentSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={coParentForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-medium">Co-parent's Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="" {...field} className="h-9 text-sm" />
                              {field.value && (
                                <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={coParentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-medium">Co-parent's Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-0 top-0 h-9 w-8 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                              </div>
                              <Input placeholder="email@example.com" {...field} className="h-9 text-sm pl-8" />
                              {field.value && field.value.includes('@') && (
                                <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                          
                          {/* Beta tester note */}
                          <div className={noteStyle + " -rotate-3 mt-0"}>
                            <div>👆 Beta testers: Try entering a valid email format. The system should validate it!</div>
                            <ArrowRight className={`${arrowStyle} left-56 top-2`} />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={coParentForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-medium">Co-parent's Phone (optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-0 top-0 h-9 w-8 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                              </div>
                              <Input placeholder="(555) 123-4567" {...field} className="h-9 text-sm pl-8" />
                              {field.value && (
                                <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={coParentForm.control}
                      name="relationship"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-medium">Relationship (optional)</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ex_spouse">Ex-spouse</SelectItem>
                                <SelectItem value="separated">Separated</SelectItem>
                                <SelectItem value="never_married">Never married</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleInviteCoParent}
                        disabled={isSendingInvite || isInviteSent}
                        className="w-full flex items-center justify-center space-x-2 h-9 text-sm border-[#2e1a87] text-[#2e1a87]"
                      >
                        {isSendingInvite ? (
                          <>
                            <div className="h-4 w-4 border-2 border-t-2 border-r-2 border-[#2e1a87] border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : isInviteSent ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-green-500">Invite Sent</span>
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4" />
                            <span>Send Co-Parent Invitation</span>
                          </>
                        )}
                      </Button>
                      
                      {/* Beta testing note */}
                      <div className={noteStyle + " rotate-1 mt-2"}>
                        <div>👆 Beta testers: Try clicking this button! Does the notification make sense? 
                        Is the confirmation clear?</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="border-[#2e1a87] text-[#2e1a87]"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-blue-800 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 3: Children Information */}
            {currentStep === 3 && (
              <Form {...childForm}>
                <form onSubmit={childForm.handleSubmit(onChildSubmit)} className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Child {index + 1}</h3>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <FormField
                        control={childForm.control}
                        name={`children.${index}.fullName`}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium">Child's Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-9 text-sm" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={childForm.control}
                        name={`children.${index}.dateOfBirth`}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium">Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="h-9 text-sm" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={childForm.control}
                        name={`children.${index}.gender`}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium">Gender</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append(emptyChild)}
                    className="w-full h-9 text-sm border-dashed border-gray-300 text-gray-500 hover:text-[#2e1a87] hover:border-[#2e1a87]"
                  >
                    + Add Another Child
                  </Button>
                  
                  {/* Beta testing note */}
                  <div className={noteStyle + " -rotate-2"}>
                    <div>👆 Beta testers: Try adding multiple children. 
                    Is the process intuitive? Does removing a child work correctly?</div>
                  </div>
                  
                  <div className="pt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="border-[#2e1a87] text-[#2e1a87]"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-blue-800 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 4: Jurisdiction */}
            {currentStep === 4 && (
              <Form {...jurisdictionForm}>
                <form onSubmit={jurisdictionForm.handleSubmit(onJurisdictionSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Select the state or jurisdiction where your child(ren) primarily reside. 
                      This will help us customize your parenting plan according to local laws and regulations.
                    </p>
                    
                    <FormField
                      control={jurisdictionForm.control}
                      name="jurisdiction"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-medium">Primary Jurisdiction</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Select state or jurisdiction" />
                            </SelectTrigger>
                            <SelectContent>
                              {US_STATES.map((state) => (
                                <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, '_')}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <h3 className="text-sm font-medium text-blue-800 mb-2">Why jurisdiction matters:</h3>
                      <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                        <li>Different states have different laws regarding custody and parenting time</li>
                        <li>Courts apply the laws of the child's "home state" when resolving disputes</li>
                        <li>Your parenting plan should comply with local legal requirements</li>
                        <li>Jurisdiction determines which court has authority over your case</li>
                      </ul>
                    </div>
                    
                    {/* Beta testing note */}
                    <div className={noteStyle + " rotate-2"}>
                      <div>🔍 Beta testers: Are the jurisdiction explanations clear? 
                      Would you want to know more about how jurisdiction affects your parenting plan?</div>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="border-[#2e1a87] text-[#2e1a87]"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-blue-800 text-white"
                    >
                      Complete Setup
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center pt-2 pb-6">
            <div className="text-xs text-center text-gray-500">
              <p>All information provided is confidential and used only to customize your parenting plan.</p>
              
              {/* Beta tester feedback section */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm font-medium text-yellow-800">Beta Tester Feedback</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Please take note of any issues you encounter or suggestions you have for improving this onboarding process. 
                  You can email your feedback to betatest@resolve.com
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}