import { useState, useEffect } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Check, X, Mail, Users } from "lucide-react";

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
// Combined step 1 schema includes both personal info and co-parent info
const combinedInfoSchema = z.object({
  // Personal info fields
  displayName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  address: z.string().min(5, { message: "Please enter your address" }).optional(),
  
  // Co-parent info fields
  coParentName: z.string().min(3, { message: "Co-parent's name must be at least 3 characters" }),
  coParentEmail: z.string().email({ message: "Please enter a valid email address" }).optional(),
  coParentPhone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  coParentAddress: z.string().min(5, { message: "Please enter their address" }).optional(),
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
type CombinedInfoFormValues = z.infer<typeof combinedInfoSchema>;
type ChildFormValues = z.infer<typeof childSchema>;
type JurisdictionFormValues = z.infer<typeof jurisdictionSchema>;

export default function OnboardingPage3Step() {
  const { user, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const { toast } = useToast();
  
  // Auto-redirect after completion
  useEffect(() => {
    if (completed && user) {
      // Immediately navigate to new dashboard design
      window.location.href = "/";
    }
  }, [completed, user]);
  
  // Initial form for children
  const emptyChild = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
  };
  
  // Form setup for each step
  const combinedInfoForm = useForm<CombinedInfoFormValues>({
    resolver: zodResolver(combinedInfoSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      address: "",
      coParentName: "",
      coParentEmail: "",
      coParentPhone: "",
      coParentAddress: "",
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

  // For testing purposes, we're allowing access without authentication
  // in a production environment, you would keep these checks:
  /*
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  if (user.onboardingComplete && !completed) {
    return <Redirect to="/" />;
  }
  */
  
  // Handle step completion
  const nextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  
  // Submit handlers for combined step
  const onCombinedInfoSubmit = (data: CombinedInfoFormValues) => {
    console.log("Combined info submitted:", data);
    nextStep();
  };
  
  const onChildSubmit = (data: ChildFormValues) => {
    console.log("Child info submitted:", data);
    nextStep();
  };
  
  // Handle inviting co-parent
  const handleInviteCoParent = async () => {
    const coParentEmail = combinedInfoForm.getValues("coParentEmail");
    const coParentName = combinedInfoForm.getValues("coParentName");
    
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e1a87] to-[#4730b8]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-lg font-bold">Complete Your Profile</CardTitle>
            <CardDescription className="text-sm">
              A few more details to create your parenting plan
            </CardDescription>
            
            {/* Modified Step indicators for 3 steps instead of 4 */}
            <div className="flex justify-center mt-3">
              <div className="flex items-center w-full max-w-md">
                <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-[#2e1a87]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > 1 ? "bg-[#2e1a87] text-white" : currentStep === 1 ? "border-2 border-[#2e1a87]" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 1 ? <FaCheck size={12} /> : <FaUserFriends size={12} />}
                  </div>
                  <span className="text-[10px] mt-1">Parent Info</span>
                </div>
                <div className={`flex-1 h-0.5 mx-1 ${currentStep > 1 ? "bg-[#2e1a87]" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-[#2e1a87]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > 2 ? "bg-[#2e1a87] text-white" : currentStep === 2 ? "border-2 border-[#2e1a87]" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 2 ? <FaCheck size={12} /> : <FaChild size={12} />}
                  </div>
                  <span className="text-[10px] mt-1">Children</span>
                </div>
                <div className={`flex-1 h-0.5 mx-1 ${currentStep > 2 ? "bg-[#2e1a87]" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-[#2e1a87]" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    completed ? "bg-[#2e1a87] text-white" : currentStep === 3 ? "border-2 border-[#2e1a87]" : "border-2 border-gray-300"
                  }`}>
                    {completed ? <FaCheck size={12} /> : <FaGavel size={12} />}
                  </div>
                  <span className="text-[10px] mt-1">Jurisdiction</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Step 1: Combined Your Information and Co-Parent Information */}
            {currentStep === 1 && (
              <Form {...combinedInfoForm}>
                <form onSubmit={combinedInfoForm.handleSubmit(onCombinedInfoSubmit)} className="space-y-4">
                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left column - Your Information */}
                    <div className="space-y-4">
                      <h3 className="text-md font-semibold text-[#2e1a87] border-b pb-1">Your Information</h3>
                      
                      <FormField
                        control={combinedInfoForm.control}
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
                      
                      <div>
                        <FormLabel className="text-xs font-medium">Your Legal Address</FormLabel>
                        
                        <FormField
                          control={combinedInfoForm.control}
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
                        control={combinedInfoForm.control}
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
                    
                    {/* Right column - Co-Parent Information */}
                    <div className="space-y-4 relative border-l pl-4 md:pl-6">
                      <h3 className="text-md font-semibold text-[#2e1a87] border-b pb-1">Co-Parent Information</h3>
                      
                      <FormField
                        control={combinedInfoForm.control}
                        name="coParentName"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium">Co-Parent's Name</FormLabel>
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
                        control={combinedInfoForm.control}
                        name="coParentEmail"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium">Co-Parent's Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute left-0 top-0 h-9 w-8 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <Input placeholder="email@example.com" {...field} className="h-9 text-sm pl-8" />
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
                      
                      <div>
                        <FormLabel className="text-xs font-medium">Co-Parent's Legal Address</FormLabel>
                        
                        <FormField
                          control={combinedInfoForm.control}
                          name="coParentAddress"
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
                        control={combinedInfoForm.control}
                        name="coParentPhone"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium">Co-Parent's Phone</FormLabel>
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
                      

                      
                      {/* Invite Co-parent button */}
                      <div className="mt-2">
                        <div className="bg-blue-50 p-3 rounded-md mb-2">
                          <p className="text-xs text-blue-800">
                            You can complete the co-parent information now, or invite them to complete it themselves.
                            This information can also be updated later.
                          </p>
                        </div>
                        
                        <Button
                          type="button"
                          onClick={handleInviteCoParent}
                          variant="outline"
                          className="flex items-center text-xs w-full border-[#2e1a87] text-[#2e1a87] hover:bg-[#2e1a87] hover:text-white"
                          disabled={isSendingInvite || isInviteSent || !combinedInfoForm.getValues("coParentEmail")}
                        >
                          {isSendingInvite ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending Invitation...
                            </>
                          ) : isInviteSent ? (
                            <>
                              <Check className="w-4 h-4 mr-2 text-green-500" />
                              Invitation Sent!
                            </>
                          ) : (
                            <>
                              <Mail className="w-4 h-4 mr-2" />
                              Invite Co-Parent via Email
                            </>
                          )}
                        </Button>
                        
                        {combinedInfoForm.getValues("coParentEmail") ? null : 
                          <p className="text-xs text-amber-600 mt-1 text-center">
                            Please enter your co-parent's email to send an invitation
                          </p>
                        }
                        
                        {isInviteSent && (
                          <p className="text-xs text-green-700 mt-2 text-center">
                            We sent an invitation to join this parenting plan to your co-parent
                          </p>
                        )}
                      </div>
                    </div>
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
            
            {/* Step 2: Children (was step 3 in the original flow) */}
            {currentStep === 2 && (
              <Form {...childForm}>
                <form onSubmit={childForm.handleSubmit(onChildSubmit)} className="space-y-6">
                  <h3 className="text-md font-semibold text-[#2e1a87] border-b pb-1">Children</h3>
                  
                  <div className="space-y-6">
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg relative">
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute right-2 top-2 h-6 w-6 p-0"
                            onClick={() => remove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <div className="space-y-4">
                          <FormField
                            control={childForm.control}
                            name={`children.${index}.fullName`}
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs font-medium">Child's Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="" {...field} className="h-9 text-sm" />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={childForm.control}
                              name={`children.${index}.dateOfBirth`}
                              render={({ field }) => (
                                <FormItem className="space-y-1">
                                  <FormLabel className="text-xs font-medium">Date of Birth</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="date"
                                      placeholder="" 
                                      {...field} 
                                      className="h-9 text-sm" 
                                    />
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
                                    <FormControl>
                                      <SelectTrigger className="h-9 text-sm">
                                        <SelectValue placeholder="Select gender" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="male">Male</SelectItem>
                                      <SelectItem value="female">Female</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => append(emptyChild)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Add Another Child
                    </Button>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
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
            
            {/* Step 3: Jurisdiction (was step 4 in the original flow) */}
            {currentStep === 3 && (
              <Form {...jurisdictionForm}>
                <form onSubmit={jurisdictionForm.handleSubmit(onJurisdictionSubmit)} className="space-y-4">
                  <h3 className="text-md font-semibold text-[#2e1a87] border-b pb-1">Jurisdiction</h3>
                  
                  <div className="space-y-4 bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex gap-2 text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-800">Why we need jurisdiction information</p>
                        <p className="text-xs mt-1">
                          Your parenting plan needs to comply with the laws in your state. 
                          This helps ensure the agreement will be legally recognized by the courts.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <FormField
                    control={jurisdictionForm.control}
                    name="jurisdiction"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-medium">Select Your State</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, '_')}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-blue-800 text-white"
                    >
                      Complete
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}