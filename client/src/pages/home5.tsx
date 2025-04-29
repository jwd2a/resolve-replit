import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { 
  Mail, 
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Users,
  MapPin,
  Phone,
  AtSign,
  Calendar,
  FileText,
  Info,
  AlertCircle,
  Heart,
  Bookmark,
  Loader2
} from "lucide-react";
import Header from "@/components/Header";

// Mock US states array 
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

// Common US holidays
const US_HOLIDAYS = [
  { id: "new_years", name: "New Year's Day" },
  { id: "mlk", name: "Martin Luther King Jr. Day" },
  { id: "presidents", name: "Presidents' Day" },
  { id: "memorial", name: "Memorial Day" },
  { id: "juneteenth", name: "Juneteenth" },
  { id: "independence", name: "Independence Day" },
  { id: "labor", name: "Labor Day" },
  { id: "columbus", name: "Columbus Day" },
  { id: "veterans", name: "Veterans Day" },
  { id: "thanksgiving", name: "Thanksgiving" },
  { id: "christmas", name: "Christmas" },
  { id: "easter", name: "Easter" },
  { id: "mothers", name: "Mother's Day" },
  { id: "fathers", name: "Father's Day" },
  { id: "halloween", name: "Halloween" },
  { id: "valentines", name: "Valentine's Day" },
];

// Form interfaces
interface PersonalInfoForm {
  legalName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

interface CoParentInfoForm {
  legalName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  sameAddress: boolean;
}

interface ChildInfo {
  fullName: string;
  dateOfBirth: string;
  gender: string;
}

interface ChildrenInfoForm {
  children: ChildInfo[];
}

interface JurisdictionForm {
  state: string;
}

interface RequiredFormsForm {
  confidentialityAgreement: boolean;
  termsAndConditions: boolean;
}

interface HolidayPreference {
  id: string;
  name: string;
  selected: boolean;
}

interface HolidayPreferencesForm {
  holidays: HolidayPreference[];
  customTraditions: string;
}

export default function Home5() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showSendInviteModal, setShowSendInviteModal] = useState(false);
  const [coParentJoined, setCoParentJoined] = useState(false);
  
  // Form states
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoForm>({
    legalName: user?.displayName || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: user?.email || ""
  });
  
  const [coParentInfo, setCoParentInfo] = useState<CoParentInfoForm>({
    legalName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    sameAddress: false
  });
  
  const [childrenInfo, setChildrenInfo] = useState<ChildrenInfoForm>({
    children: [{ fullName: "", dateOfBirth: "", gender: "" }]
  });
  
  const [jurisdictionInfo, setJurisdictionInfo] = useState<JurisdictionForm>({
    state: ""
  });
  
  const [requiredFormsInfo, setRequiredFormsInfo] = useState<RequiredFormsForm>({
    confidentialityAgreement: false,
    termsAndConditions: false
  });
  
  const [holidayPreferencesInfo, setHolidayPreferencesInfo] = useState<HolidayPreferencesForm>({
    holidays: US_HOLIDAYS.map(holiday => ({ ...holiday, selected: false })),
    customTraditions: ""
  });
  
  // Effect to simulate loading saved progress
  useEffect(() => {
    // In a real app, we would fetch saved progress from the backend here
    // For now, this is just simulating a delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle co-parent address sync when "same address" is checked
  useEffect(() => {
    if (coParentInfo.sameAddress) {
      setCoParentInfo(prevState => ({
        ...prevState,
        address: personalInfo.address,
        city: personalInfo.city,
        state: personalInfo.state,
        zip: personalInfo.zip
      }));
    }
  }, [coParentInfo.sameAddress, personalInfo]);
  
  // Navigation functions
  const nextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };
  
  const prevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const skipToNext = () => {
    window.scrollTo(0, 0);
    // For steps that can be skipped
    nextStep();
  };
  
  // Add a new child
  const addChild = () => {
    setChildrenInfo(prevState => ({
      children: [...prevState.children, { fullName: "", dateOfBirth: "", gender: "" }]
    }));
  };
  
  // Remove a child
  const removeChild = (index: number) => {
    setChildrenInfo(prevState => ({
      children: prevState.children.filter((_, i) => i !== index)
    }));
  };
  
  // Update a child's information
  const updateChildInfo = (index: number, field: keyof ChildInfo, value: string) => {
    setChildrenInfo(prevState => {
      const updatedChildren = [...prevState.children];
      updatedChildren[index] = { ...updatedChildren[index], [field]: value };
      return { children: updatedChildren };
    });
  };
  
  // Toggle holiday selection
  const toggleHoliday = (id: string) => {
    setHolidayPreferencesInfo(prevState => ({
      ...prevState,
      holidays: prevState.holidays.map(holiday => 
        holiday.id === id ? { ...holiday, selected: !holiday.selected } : holiday
      )
    }));
  };
  
  // Handle simulated invite to co-parent
  const sendCoParentInvite = () => {
    if (!coParentInfo.email) {
      toast({
        title: "Email Required",
        description: "Please enter your co-parent's email address to send an invitation.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate sending invite
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${coParentInfo.email}.`,
      });
      setShowSendInviteModal(false);
    }, 1500);
  };
  
  // Complete onboarding and redirect to course
  const completeOnboarding = () => {
    setIsCompleting(true);
    // Simulate saving data and redirecting
    setTimeout(() => {
      setIsCompleting(false);
      toast({
        title: "Onboarding Complete",
        description: "You're all set! Ready to start your course.",
      });
      
      // In a real app, you'd update the user's onboarding status here
      if (user) {
        // user.onboardingComplete = true;
      }
      
      // Redirect to course page
      setLocation("/course");
    }, 2000);
  };
  
  // This is required for the Header component
  const onMenuClick = () => {
    // This would typically toggle a mobile menu
  };
  
  // Determine if we can proceed to the next step
  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: // Parent & Co-Parent Info
        return (
          personalInfo.legalName && 
          personalInfo.address && 
          personalInfo.city && 
          personalInfo.state && 
          personalInfo.zip && 
          personalInfo.phone && 
          personalInfo.email
        );
      case 2: // Children Info
        return childrenInfo.children.every(child => 
          child.fullName && child.dateOfBirth && child.gender
        );
      case 3: // Jurisdiction
        return !!jurisdictionInfo.state;
      case 4: // Required Forms
        // This step can proceed even if forms aren't signed
        return true;
      case 5: // Co-Parent Status
        // This step can always proceed
        return true;
      case 6: // Parenting Preferences
        // This step is optional
        return true;
      default:
        return false;
    }
  };
  
  // Determine the title for the current step
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Tell us about you and your co-parent";
      case 2: return "Who are the children in your parenting plan?";
      case 3: return "Where will you be filing your parenting plan?";
      case 4: return "Required forms and agreements";
      case 5: return "Co-parent invitation status";
      case 6: return "Parenting preferences";
      default: return "";
    }
  };
  
  // Determine the helper text for the current step
  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "We'll use this information to customize your parenting plan.";
      case 2:
        return "Enter information for each child who will be included in your parenting plan.";
      case 3:
        return "Different states have different requirements for parenting plans.";
      case 4:
        return "These agreements help protect your privacy and outline how we'll work together.";
      case 5:
        return "Working together with your co-parent helps create the best plan for your children.";
      case 6:
        return "Tell us about important holidays and family traditions to include in your plan.";
      default:
        return "";
    }
  };
  
  if (isLoading && currentStep === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#2e1a87] mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Loading your progress</h3>
          <p className="mt-1 text-sm text-gray-500">Just a moment while we get things ready...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header title="Complete Your Onboarding" onMenuClick={onMenuClick} />
      
      <div className="max-w-3xl mx-auto pt-6 px-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle>{getStepTitle()}</CardTitle>
                <CardDescription className="mt-1">{getStepDescription()}</CardDescription>
              </div>
              <div className="rounded-full bg-[#2e1a87]/10 text-[#2e1a87] px-3 py-1 text-sm font-medium">
                Step {currentStep} of 6
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#2e1a87]" 
                style={{ width: `${(currentStep / 6) * 100}%` }}
              ></div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Step 1: Parent & Co-Parent Info */}
            {currentStep === 1 && (
              <div className="space-y-8">
                {/* Your Information */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-base font-medium mb-4">Your Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Legal Name</Label>
                      <div className="relative mt-1">
                        <Input
                          value={personalInfo.legalName}
                          onChange={(e) => setPersonalInfo({...personalInfo, legalName: e.target.value})}
                          className="pl-8"
                        />
                        <User className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        {personalInfo.legalName && (
                          <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Legal Address</Label>
                      <div className="relative mt-1">
                        <Input
                          value={personalInfo.address}
                          onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                          placeholder="Street address"
                          className="pl-8"
                        />
                        <MapPin className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        value={personalInfo.city}
                        onChange={(e) => setPersonalInfo({...personalInfo, city: e.target.value})}
                        placeholder="City"
                      />
                      <Select 
                        value={personalInfo.state}
                        onValueChange={(value) => setPersonalInfo({...personalInfo, state: value})}
                      >
                        <SelectTrigger>
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
                      <Input
                        value={personalInfo.zip}
                        onChange={(e) => setPersonalInfo({...personalInfo, zip: e.target.value})}
                        placeholder="ZIP"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Phone Number</Label>
                      <div className="relative mt-1">
                        <Input
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          placeholder="(555) 123-4567"
                          className="pl-8"
                        />
                        <Phone className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        {personalInfo.phone && (
                          <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Email</Label>
                      <div className="relative mt-1">
                        <Input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          placeholder="your.email@example.com"
                          className="pl-8"
                        />
                        <AtSign className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        {personalInfo.email && (
                          <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Co-Parent Information */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-base font-medium mb-4">Co-Parent Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Legal Name</Label>
                      <div className="relative mt-1">
                        <Input
                          value={coParentInfo.legalName}
                          onChange={(e) => setCoParentInfo({...coParentInfo, legalName: e.target.value})}
                          className="pl-8"
                        />
                        <User className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        {coParentInfo.legalName && (
                          <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="same-address" 
                        checked={coParentInfo.sameAddress}
                        onCheckedChange={(checked) => 
                          setCoParentInfo({...coParentInfo, sameAddress: checked as boolean})
                        }
                      />
                      <label
                        htmlFor="same-address"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Same address as you
                      </label>
                    </div>
                    
                    {!coParentInfo.sameAddress && (
                      <>
                        <div>
                          <Label className="text-sm">Legal Address</Label>
                          <div className="relative mt-1">
                            <Input
                              value={coParentInfo.address}
                              onChange={(e) => setCoParentInfo({...coParentInfo, address: e.target.value})}
                              placeholder="Street address"
                              className="pl-8"
                            />
                            <MapPin className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            value={coParentInfo.city}
                            onChange={(e) => setCoParentInfo({...coParentInfo, city: e.target.value})}
                            placeholder="City"
                          />
                          <Select 
                            value={coParentInfo.state}
                            onValueChange={(value) => setCoParentInfo({...coParentInfo, state: value})}
                          >
                            <SelectTrigger>
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
                          <Input
                            value={coParentInfo.zip}
                            onChange={(e) => setCoParentInfo({...coParentInfo, zip: e.target.value})}
                            placeholder="ZIP"
                          />
                        </div>
                      </>
                    )}
                    
                    <div>
                      <Label className="text-sm">Phone Number</Label>
                      <div className="relative mt-1">
                        <Input
                          value={coParentInfo.phone}
                          onChange={(e) => setCoParentInfo({...coParentInfo, phone: e.target.value})}
                          placeholder="(555) 123-4567"
                          className="pl-8"
                        />
                        <Phone className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        {coParentInfo.phone && (
                          <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Email</Label>
                      <div className="relative mt-1">
                        <Input
                          type="email"
                          value={coParentInfo.email}
                          onChange={(e) => setCoParentInfo({...coParentInfo, email: e.target.value})}
                          placeholder="coparent@example.com"
                          className="pl-8"
                        />
                        <AtSign className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        {coParentInfo.email && (
                          <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center p-2 bg-gray-100 border border-gray-300 border-dashed rounded-md mt-3">
                      <div className="flex-shrink-0 mr-2">
                        <Info className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-xs text-gray-600 italic">
                        It is common to have the same legal address as your co-parent at this stage. You can always adjust your plan as things progress.
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex flex-col space-y-3">
                        <h3 className="text-sm font-medium text-gray-700">Invite Your Co-Parent</h3>
                        <div className="bg-blue-50 rounded-md p-3 text-sm text-blue-800 mb-2">
                          <p>Since you and your co-parent will take the course together, they will need to register as well. You can also invite them later from the home screen.</p>
                        </div>
                        
                        <div className="flex">
                          <Button 
                            type="button"
                            variant="outline"
                            className="border-[#2e1a87] text-[#2e1a87] hover:bg-[#f5f3ff] text-sm"
                            onClick={() => setShowSendInviteModal(true)}
                            disabled={!coParentInfo.email}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Invite Email Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Children Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {childrenInfo.children.map((child, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-medium">Child {index + 1}</h3>
                      {index > 0 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeChild(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">Full Name</Label>
                        <div className="relative mt-1">
                          <Input
                            value={child.fullName}
                            onChange={(e) => updateChildInfo(index, 'fullName', e.target.value)}
                            placeholder="Child's full name"
                            className="pl-8"
                          />
                          <User className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Date of Birth</Label>
                        <div className="relative mt-1">
                          <Input
                            type="date"
                            value={child.dateOfBirth}
                            onChange={(e) => updateChildInfo(index, 'dateOfBirth', e.target.value)}
                            className="pl-8"
                          />
                          <Calendar className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Gender</Label>
                        <div className="mt-1">
                          <Select 
                            value={child.gender}
                            onValueChange={(value) => updateChildInfo(index, 'gender', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="non-binary">Non-binary</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addChild}
                    className="border-dashed border-gray-300"
                  >
                    + Add Another Child
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Jurisdiction Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Select Your State</Label>
                      <div className="mt-1">
                        <Select 
                          value={jurisdictionInfo.state}
                          onValueChange={(value) => setJurisdictionInfo({state: value})}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select the state where you'll file your parenting plan" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, '_')}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-md mt-4">
                      <div className="flex items-start">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-blue-800">
                          Different states have different requirements for parenting plans. Your selection helps us customize your experience to meet local regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Required Forms */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-base font-medium mb-4">Required Agreements</h3>
                  
                  <div className="space-y-5">
                    <div className="border rounded-md p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="confidentiality" 
                          checked={requiredFormsInfo.confidentialityAgreement}
                          onCheckedChange={(checked) => 
                            setRequiredFormsInfo({...requiredFormsInfo, confidentialityAgreement: checked as boolean})
                          }
                          className="mt-1"
                        />
                        <div>
                          <label
                            htmlFor="confidentiality"
                            className="text-sm font-medium"
                          >
                            Confidentiality Agreement
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            I agree to keep all shared information confidential during the course and parenting plan development process.
                          </p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-[#2e1a87] text-xs mt-1"
                            onClick={() => {
                              // In a real app, this would open the full agreement
                              toast({
                                title: "Document Opened",
                                description: "Confidentiality Agreement opened in a new window.",
                              });
                            }}
                          >
                            Read Full Agreement
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="terms" 
                          checked={requiredFormsInfo.termsAndConditions}
                          onCheckedChange={(checked) => 
                            setRequiredFormsInfo({...requiredFormsInfo, termsAndConditions: checked as boolean})
                          }
                          className="mt-1"
                        />
                        <div>
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium"
                          >
                            Terms & Conditions
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            I agree to the Terms & Conditions, including participation in good faith in the mediation process if needed during the course.
                          </p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-[#2e1a87] text-xs mt-1"
                            onClick={() => {
                              // In a real app, this would open the full agreement
                              toast({
                                title: "Document Opened",
                                description: "Terms & Conditions opened in a new window.",
                              });
                            }}
                          >
                            Read Full Agreement
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-start bg-amber-50 p-3 rounded-md">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                          {requiredFormsInfo.confidentialityAgreement && requiredFormsInfo.termsAndConditions 
                            ? "Thank you for signing the agreements!" 
                            : "You can proceed without signing the agreements now, but they will need to be completed before you can finalize your parenting plan."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 5: Co-Parent Status */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className={`bg-gray-50 p-5 rounded-lg ${coParentJoined ? "border-green-200" : "border-amber-100"}`}>
                  <h3 className="text-base font-medium mb-4">Co-Parent Status</h3>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm">{coParentInfo.email || "No email provided"}</p>
                    {coParentJoined ? (
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Joined
                      </div>
                    ) : (
                      <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                        Pending
                      </div>
                    )}
                  </div>
                  
                  {coParentJoined ? (
                    <div className="bg-green-50 p-3 rounded-md">
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-green-800">
                          Great news! {coParentInfo.legalName || "Your co-parent"} has joined and will be working with you on the parenting plan.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-amber-50 p-3 rounded-md mb-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-sm text-amber-800">
                            Your co-parent hasn't joined yet. You can send another invitation or continue on your own for now.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          className="border-[#2e1a87] text-[#2e1a87]"
                          onClick={() => setShowSendInviteModal(true)}
                          disabled={!coParentInfo.email}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Another Invitation
                        </Button>
                        
                        <Button 
                          variant="ghost"
                          onClick={() => {
                            // This mimics the co-parent joining for demo purposes
                            // In a real app, this would come from a backend event
                            setCoParentJoined(true);
                            toast({
                              title: "Demo Mode",
                              description: "In the real app, this would happen when your co-parent actually joins.",
                            });
                          }}
                        >
                          Demo: Simulate Co-Parent Joining
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 6: Parenting Preferences */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-base font-medium mb-2">Important Holidays</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Select holidays that are important to include in your parenting plan.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {holidayPreferencesInfo.holidays.map((holiday) => (
                      <div key={holiday.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={holiday.id} 
                          checked={holiday.selected}
                          onCheckedChange={() => toggleHoliday(holiday.id)}
                        />
                        <label
                          htmlFor={holiday.id}
                          className="text-sm"
                        >
                          {holiday.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Label className="text-sm">Family Traditions</Label>
                    <p className="text-xs text-gray-500 mb-2">
                      Describe any special family traditions or events that should be included in your plan.
                    </p>
                    <Textarea 
                      placeholder="Family reunions, cultural celebrations, annual vacations, etc."
                      className="mt-1"
                      value={holidayPreferencesInfo.customTraditions}
                      onChange={(e) => setHolidayPreferencesInfo({
                        ...holidayPreferencesInfo, 
                        customTraditions: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="mt-6 bg-blue-50 p-3 rounded-md">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-800">
                        These preferences help us create a more tailored parenting plan. You can always modify this later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="border-t pt-6 flex justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            ) : (
              <div></div> // Empty div to maintain spacing
            )}
            
            {currentStep < 6 ? (
              <Button
                type="button"
                className="bg-[#2e1a87] hover:bg-[#25156d]"
                onClick={nextStep}
                disabled={isLoading || !canProceedToNext()}
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-[#2e1a87] hover:bg-[#25156d]"
                onClick={completeOnboarding}
                disabled={isCompleting}
              >
                {isCompleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    Start Course Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {currentStep !== 1 && currentStep !== 6 && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-gray-500 text-sm"
              onClick={skipToNext}
            >
              {currentStep === 5 ? "Skip to Final Step" : "Skip This Step"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}