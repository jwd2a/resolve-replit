import { useState } from "react";
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
      specialNeeds: z.string().optional(),
    })
  ).min(1, { message: "Please add at least one child" }),
});

const jurisdictionSchema = z.object({
  jurisdiction: z.string().min(1, { message: "Please select a jurisdiction" }),
  caseNumber: z.string().optional(),
  courtName: z.string().optional(),
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
  
  // Initial form for children
  const emptyChild = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    specialNeeds: "",
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
      caseNumber: "",
      courtName: "",
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
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e1a87] to-[#6c54da]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <img 
            src={logoSrc}
            alt="Resolve Logo" 
            className="h-16"
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Personal Information</h3>
                    <p className="text-sm text-gray-500">
                      This information will be used for your parenting plan documentation.
                    </p>
                    
                    <FormField
                      control={personalInfoForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Legal Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Michael Doe" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your complete legal name as it would appear on official documents.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalInfoForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Home Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="123 Main St, Apt 4B&#10;Anytown, CA 12345" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Co-Parent Information</h3>
                    <p className="text-sm text-gray-500">
                      This information helps us create a comprehensive parenting plan that includes both parents.
                    </p>
                    
                    <FormField
                      control={coParentForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Co-Parent's Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Alice Smith" {...field} />
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
                          <FormLabel>Co-Parent's Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jane.smith@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll use this to invite them to collaborate on the parenting plan.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={coParentForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Co-Parent's Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 987-6543" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={coParentForm.control}
                      name="relationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship Status</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your relationship status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="divorced">Divorced</SelectItem>
                                <SelectItem value="separated">Separated</SelectItem>
                                <SelectItem value="never_married">Never Married</SelectItem>
                                <SelectItem value="in_process">Divorce in Process</SelectItem>
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
                                      <SelectItem value="other">Other/Non-binary</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={childForm.control}
                            name={`children.${index}.specialNeeds`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Special Needs (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Any special needs or requirements" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => append(emptyChild)}
                    >
                      Add Another Child
                    </Button>
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
                    <h3 className="text-lg font-medium">Jurisdiction Information</h3>
                    <p className="text-sm text-gray-500">
                      This helps us ensure your parenting plan complies with local laws and regulations.
                    </p>
                    
                    <FormField
                      control={jurisdictionForm.control}
                      name="jurisdiction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Jurisdiction</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state or jurisdiction" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[240px]">
                                {US_STATES.map((state) => (
                                  <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, '_')}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Select the state where your case is being or will be processed.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={jurisdictionForm.control}
                      name="caseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., FAM-2023-12345" {...field} />
                          </FormControl>
                          <FormDescription>
                            If you already have a case number from the court, enter it here.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={jurisdictionForm.control}
                      name="courtName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Court Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Superior Court of California, County of Los Angeles" {...field} />
                          </FormControl>
                          <FormDescription>
                            If known, enter the court where your case is being or will be processed.
                          </FormDescription>
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
                      Complete Setup
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Completion message */}
            {completed && (
              <div className="text-center py-6">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Setup Complete!</h3>
                <p className="text-gray-600 mb-8">
                  You've successfully completed your profile setup. You're ready to start creating your parenting plan.
                </p>
                <Button 
                  className="bg-[#2e1a87] hover:bg-[#25156d]"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}