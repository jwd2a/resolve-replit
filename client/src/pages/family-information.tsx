import { useState } from "react";
import { useLocation } from "wouter";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Home, User, Users, MapPin, Info, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// List of US states for form dropdowns
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

// Form validation schemas
const userSchema = z.object({
  displayName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter your address" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zip: z.string().min(5, { message: "ZIP code is required" }),
});

const coParentSchema = z.object({
  fullName: z.string().min(3, { message: "Co-parent's name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  relationship: z.string().optional(),
});

const childSchema = z.object({
  fullName: z.string().min(3, { message: "Child's name must be at least 3 characters" }),
  dateOfBirth: z.string().min(1, { message: "Please enter child's date of birth" }),
  gender: z.string().optional(),
});

const jurisdictionSchema = z.object({
  jurisdiction: z.string().min(1, { message: "Please select a jurisdiction" }),
});

export default function FamilyInformation() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Initialize tabs state
  const [activeTab, setActiveTab] = useState("you");
  
  // Initialize form hooks
  const userForm = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      displayName: "Jane Smith",
      phone: "(555) 123-4567",
      address: "123 Main Street",
      city: "Los Angeles",
      state: "California",
      zip: "90001",
    },
  });
  
  const coParentForm = useForm({
    resolver: zodResolver(coParentSchema),
    defaultValues: {
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 987-6543",
      relationship: "Ex-spouse",
    },
  });
  
  const jurisdictionForm = useForm({
    resolver: zodResolver(jurisdictionSchema),
    defaultValues: {
      jurisdiction: "California",
    },
  });
  
  // Children form state
  const [children, setChildren] = useState([
    { id: 1, fullName: "Emma Smith", birthDate: "2018-05-15", age: 6, gender: "female" },
    { id: 2, fullName: "Noah Smith", birthDate: "2020-09-23", age: 3, gender: "male" },
  ]);
  
  const [newChild, setNewChild] = useState({
    fullName: "",
    birthDate: "",
    age: 0,
    gender: "",
  });
  
  // Form handlers
  const onUserSubmit = (data: any) => {
    toast({
      title: "Your Information Updated",
      description: "Your personal information has been updated successfully.",
    });
    setActiveTab("co-parent");
  };
  
  const onCoParentSubmit = (data: any) => {
    toast({
      title: "Co-Parent Information Updated",
      description: "Your co-parent's information has been updated successfully.",
    });
    setActiveTab("children");
  };
  
  const onJurisdictionSubmit = (data: any) => {
    toast({
      title: "Jurisdiction Updated",
      description: "Your jurisdiction information has been updated successfully.",
    });
    navigate('/');
  };
  
  const addChild = () => {
    const childFormData = {
      id: children.length > 0 ? Math.max(...children.map(c => c.id)) + 1 : 1,
      fullName: newChild.fullName,
      birthDate: newChild.birthDate,
      age: calculateAge(newChild.birthDate),
      gender: newChild.gender,
    };
    
    setChildren([...children, childFormData]);
    setNewChild({ fullName: "", birthDate: "", age: 0, gender: "" });
  };
  
  const removeChild = (id: number) => {
    setChildren(children.filter(child => child.id !== id));
  };
  
  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = e.target.value;
    const age = calculateAge(birthDate);
    setNewChild({ ...newChild, birthDate, age });
  };
  
  const handleGenderChange = (value: string) => {
    setNewChild({ ...newChild, gender: value });
  };
  
  const canAddChild = () => {
    return newChild.fullName.length >= 2 && newChild.birthDate;
  };
  
  const handleSaveAllAndContinue = () => {
    toast({
      title: "All Information Saved",
      description: "Your family information has been saved successfully.",
    });
    navigate('/');
  };
  
  const allFormsValid = () => {
    return userForm.formState.isValid && 
           coParentForm.formState.isValid && 
           children.length > 0 &&
           jurisdictionForm.formState.isValid;
  };
  
  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      <NavigationMenu />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-[#2e1a87] hover:text-[#2e1a87]/80 hover:bg-[#f5f0ff]"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="bg-white rounded-xl border border-[#6c54da]/20 p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-5">
            <div className="bg-[#f5f0ff] p-2 rounded-md">
              <Home className="h-5 w-5 text-[#6c54da]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#2e1a87]">Family Information</h1>
              <p className="text-gray-600 text-sm mt-1">
                Enter information about everyone who will be included in your parenting plan.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                This information helps us create a parenting plan that meets your family's unique needs
                and complies with your local jurisdiction requirements.
              </p>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 bg-[#f5f0ff]">
              <TabsTrigger value="you" className="data-[state=active]:bg-[#6c54da] data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Your Info</span>
                <span className="sm:hidden">You</span>
              </TabsTrigger>
              <TabsTrigger value="co-parent" className="data-[state=active]:bg-[#6c54da] data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Co-Parent</span>
                <span className="sm:hidden">Co-Parent</span>
              </TabsTrigger>
              <TabsTrigger value="children" className="data-[state=active]:bg-[#6c54da] data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-2" />
                <span>Children</span>
              </TabsTrigger>
              <TabsTrigger value="jurisdiction" className="data-[state=active]:bg-[#6c54da] data-[state=active]:text-white">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Jurisdiction</span>
                <span className="sm:hidden">Location</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="you" className="space-y-6">
              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                  <FormField
                    control={userForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium">Legal Name</FormLabel>
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
                    <FormLabel className="text-xs font-medium">Legal Address</FormLabel>
                    
                    <FormField
                      control={userForm.control}
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
                      <FormField
                        control={userForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormControl>
                              <Input placeholder="City" {...field} className="h-9 text-sm" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormControl>
                              <Input placeholder="ZIP" {...field} className="h-9 text-sm" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={userForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium">Phone number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-2 top-2 text-gray-400">
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
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="co-parent" className="space-y-6">
              <Form {...coParentForm}>
                <form onSubmit={coParentForm.handleSubmit(onCoParentSubmit)} className="space-y-4">
                  <FormField
                    control={coParentForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium">Co-Parent's Full Legal Name</FormLabel>
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
                        <FormLabel className="text-xs font-medium">Co-Parent's Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-2 top-2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <Input placeholder="co-parent@example.com" type="email" {...field} className="h-9 text-sm pl-8" />
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium">Co-Parent's Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-2 top-2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <Input placeholder="(555) 987-6543" {...field} className="h-9 text-sm pl-8" />
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
                        <FormLabel className="text-xs font-medium">Relationship to You</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ex_spouse">Ex-spouse</SelectItem>
                            <SelectItem value="ex_partner">Ex-partner</SelectItem>
                            <SelectItem value="spouse">Current spouse</SelectItem>
                            <SelectItem value="partner">Current partner</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setActiveTab("you")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="children" className="space-y-6">
              <div className="space-y-6">
                <div className="border rounded-lg p-5">
                  <h3 className="text-base font-medium text-[#2e1a87] mb-4">Children Information</h3>
                  
                  {children.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {children.map((child) => (
                        <div key={child.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                          <div>
                            <h4 className="text-sm font-medium">{child.fullName}</h4>
                            <p className="text-xs text-gray-500">
                              {new Date(child.birthDate).toLocaleDateString()} • {child.age} years old
                              {child.gender && ` • ${child.gender.charAt(0).toUpperCase()}${child.gender.slice(1)}`}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeChild(child.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-100 rounded-md p-3 mb-6">
                      <p className="text-sm text-amber-800">
                        Please add at least one child to continue.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3 border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700">Add a Child</h4>
                    
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="childName" className="text-xs">Full Name</Label>
                        <div className="relative">
                          <Input 
                            id="childName" 
                            value={newChild.fullName}
                            onChange={(e) => setNewChild({...newChild, fullName: e.target.value})}
                            placeholder="Child's full name"
                            className="h-9 text-sm"
                          />
                          {newChild.fullName.length >= 2 && (
                            <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-7 md:col-span-4">
                        <Label htmlFor="birthDate" className="text-xs">Birth Date</Label>
                        <div className="relative">
                          <Input 
                            id="birthDate" 
                            type="date"
                            value={newChild.birthDate}
                            onChange={handleBirthDateChange}
                            className="h-9 text-sm"
                          />
                          {newChild.birthDate && (
                            <div className="absolute right-2 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-5 md:col-span-2">
                        <Label htmlFor="age" className="text-xs">Age</Label>
                        <Input 
                          id="age" 
                          type="number"
                          value={newChild.age.toString()}
                          readOnly
                          className="h-9 text-sm bg-gray-50"
                        />
                      </div>
                      
                      <div className="col-span-12">
                        <Label htmlFor="gender" className="text-xs">Gender</Label>
                        <Select value={newChild.gender} onValueChange={handleGenderChange}>
                          <SelectTrigger id="gender" className="h-9 text-sm">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={!canAddChild()}
                        onClick={addChild}
                        className="h-8 text-xs"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1.5" />
                        Add Child
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("co-parent")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-[#2e1a87] hover:bg-[#25156d]"
                    disabled={children.length === 0}
                    onClick={() => setActiveTab("jurisdiction")}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="jurisdiction" className="space-y-6">
              <Form {...jurisdictionForm}>
                <form onSubmit={jurisdictionForm.handleSubmit(onJurisdictionSubmit)} className="space-y-4">
                  <FormField
                    control={jurisdictionForm.control}
                    name="jurisdiction"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium">Where do your children primarily reside?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative">
                              <SelectTrigger className="h-9 text-sm w-full">
                                <SelectValue placeholder="Select a jurisdiction" />
                              </SelectTrigger>
                              {field.value && (
                                <div className="absolute right-8 top-2 text-white bg-green-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, '_')}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs text-gray-500">
                          Select the state/jurisdiction where your children primarily reside. This helps us ensure your parenting plan complies with local laws.
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="bg-amber-50 border border-amber-100 rounded-md p-4 my-6">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm text-amber-800">
                        Jurisdiction is important for your parenting plan as it determines which state's laws will apply. Make sure to select the state where your children spend the majority of their time.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setActiveTab("children")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                    >
                      Save and Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button 
              className={`w-full ${
                allFormsValid() 
                  ? "bg-[#2e1a87] hover:bg-[#25156d]" 
                  : "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!allFormsValid()}
              onClick={handleSaveAllAndContinue}
            >
              Save All and Continue to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}