import { useState, useEffect } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

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

export default function OnboardingPage() {
  const { user, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  
  // Auto-redirect after completion
  useEffect(() => {
    if (completed && user) {
      const timer = setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [completed, user]);
  
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

  // If user is not logged in or has already completed onboarding, redirect
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  if (user.onboardingComplete && !completed) {
    return <Redirect to="/dashboard" />;
  }
  
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
    <div className="min-h-screen bg-gradient-to-b from-[#2e1a87] to-[#6c54da]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <img 
            src={logoSrc}
            alt="Resolve Logo" 
            className="h-32"
          />
        </div>

        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
            <CardDescription>
              Let's gather the information we need to create your parenting plan
            </CardDescription>
            
            {/* Step indicators */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center w-full max-w-3xl">
                <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-primary" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > 1 ? "bg-primary text-white" : currentStep === 1 ? "border-2 border-primary" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 1 ? <FaCheck size={16} /> : <FaHome size={16} />}
                  </div>
                  <span className="text-xs mt-1">Your Info</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep > 1 ? "bg-primary" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-primary" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > 2 ? "bg-primary text-white" : currentStep === 2 ? "border-2 border-primary" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 2 ? <FaCheck size={16} /> : <FaUserFriends size={16} />}
                  </div>
                  <span className="text-xs mt-1">Co-Parent</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep > 2 ? "bg-primary" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-primary" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > 3 ? "bg-primary text-white" : currentStep === 3 ? "border-2 border-primary" : "border-2 border-gray-300"
                  }`}>
                    {currentStep > 3 ? <FaCheck size={16} /> : <FaChild size={16} />}
                  </div>
                  <span className="text-xs mt-1">Children</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep > 3 ? "bg-primary" : "bg-gray-300"}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-primary" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    completed ? "bg-primary text-white" : currentStep === 4 ? "border-2 border-primary" : "border-2 border-gray-300"
                  }`}>
                    {completed ? <FaCheck size={16} /> : <FaGavel size={16} />}
                  </div>
                  <span className="text-xs mt-1">Jurisdiction</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Form {...personalInfoForm}>
                <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <FormField
                        control={personalInfoForm.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Your Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="" {...field} className="h-12" />
                                {field.value && (
                                  <div className="absolute right-3 top-3 text-white bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                    ✓
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormLabel className="text-base font-medium">Your Legal Address</FormLabel>
                      
                      <FormField
                        control={personalInfoForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel className="text-sm text-gray-600">Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="" {...field} className="h-12" />
                                <div className="absolute left-3 top-3 text-gray-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">City</FormLabel>
                          <Input placeholder="" className="h-12" />
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">State / Province</FormLabel>
                          <Select>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="" />
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
                        
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">ZIP / Postal code</FormLabel>
                          <Input placeholder="" className="h-12" />
                        </FormItem>
                      </div>
                    </div>
                    
                    <FormField
                      control={personalInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Phone number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-0 top-0 h-12 w-14 flex items-center justify-center border-r">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18">
                                    <rect y="0" width="24" height="18" fill="#fff"/>
                                    <rect y="0" width="8" height="18" fill="#002868"/>
                                    <rect x="16" y="0" width="8" height="18" fill="#bf0a30"/>
                                  </svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                              </div>
                              <Input placeholder="" {...field} className="h-12 pl-16" />
                              {field.value && (
                                <div className="absolute right-3 top-3 text-white bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel className="text-base font-medium">Email</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <Input placeholder="" className="h-12 pl-10" />
                      </div>
                    </FormItem>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                      disabled={isLoading}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 2: Co-Parent Information */}
            {currentStep === 2 && (
              <Form {...coParentForm}>
                <form onSubmit={coParentForm.handleSubmit(onCoParentSubmit)} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <FormField
                        control={coParentForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Co-Parent's Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="" {...field} className="h-12" />
                                {field.value && (
                                  <div className="absolute right-3 top-3 text-white bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                    ✓
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormLabel className="text-base font-medium">Co-Parent's Legal Address</FormLabel>
                      
                      <FormItem className="mb-4">
                        <FormLabel className="text-sm text-gray-600">Address</FormLabel>
                        <div className="relative">
                          <Input placeholder="" className="h-12" />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          </div>
                        </div>
                      </FormItem>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">City</FormLabel>
                          <Input placeholder="" className="h-12" />
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">State / Province</FormLabel>
                          <Select>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="" />
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
                        
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">ZIP / Postal code</FormLabel>
                          <Input placeholder="" className="h-12" />
                        </FormItem>
                      </div>
                    </div>
                    
                    <FormField
                      control={coParentForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Phone number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-0 top-0 h-12 w-14 flex items-center justify-center border-r">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18">
                                    <rect y="0" width="24" height="18" fill="#fff"/>
                                    <rect y="0" width="8" height="18" fill="#002868"/>
                                    <rect x="16" y="0" width="8" height="18" fill="#bf0a30"/>
                                  </svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                              </div>
                              <Input placeholder="" {...field} className="h-12 pl-16" />
                              {field.value && (
                                <div className="absolute right-3 top-3 text-white bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={coParentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-3 top-3 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                              </div>
                              <Input placeholder="" {...field} className="h-12 pl-10" />
                              {field.value && (
                                <div className="absolute right-3 top-3 text-white bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    

                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                      disabled={isLoading}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 3: Children Information */}
            {currentStep === 3 && (
              <Form {...childForm}>
                <form onSubmit={childForm.handleSubmit(onChildSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Children Information</h3>
                    <p className="text-sm text-gray-500">
                      Add information about each child who will be included in the parenting plan.
                    </p>
                    
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-md font-medium">Child {index + 1}</h4>
                          {index > 0 && (
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="sm"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={childForm.control}
                            name={`children.${index}.fullName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Child's full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={childForm.control}
                            name={`children.${index}.dateOfBirth`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={childForm.control}
                            name={`children.${index}.gender`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="male">Male</SelectItem>
                                      <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          

                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => append(emptyChild)}
                        className="px-8"
                      >
                        + Add Another Child
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                      disabled={isLoading}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 4: Jurisdiction Information */}
            {currentStep === 4 && (
              <Form {...jurisdictionForm}>
                <form onSubmit={jurisdictionForm.handleSubmit(onJurisdictionSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Last step, we need the state in which your child(ren) reside:</h3>
                    
                    <FormField
                      control={jurisdictionForm.control}
                      name="jurisdiction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What state will you be filing your divorce or separation?</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {US_STATES.map((state) => (
                                  <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, '_')}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                      disabled={isLoading}
                    >
                      Complete Onboarding
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Completion Screen */}
            {completed && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheck className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="mt-6 text-2xl font-medium">Onboarding Complete!</h3>
                <p className="mt-2 text-gray-500">
                  Thank you for providing the information needed to create your parenting plan. You'll be automatically redirected to your dashboard in 2 seconds.
                </p>
                <div className="mt-8">
                  <Button
                    onClick={() => { window.location.href = "/dashboard"; }}
                    className="bg-[#2e1a87] hover:bg-[#25156d]"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}