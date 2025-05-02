import { useState } from "react";
import { useNavigate } from "wouter";
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

// Form validation schemas
const userSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

const coParentSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
});

const childSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  age: z.number().min(0, "Age must be a positive number"),
});

const jurisdictionSchema = z.object({
  state: z.string().min(1, "State is required"),
  county: z.string().min(1, "County is required"),
});

export default function FamilyInformation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize tabs state
  const [activeTab, setActiveTab] = useState("you");
  
  // Initialize form hooks
  const userForm = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 123-4567",
    },
  });
  
  const coParentForm = useForm({
    resolver: zodResolver(coParentSchema),
    defaultValues: {
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "",
    },
  });
  
  const jurisdictionForm = useForm({
    resolver: zodResolver(jurisdictionSchema),
    defaultValues: {
      state: "California",
      county: "Los Angeles",
    },
  });
  
  // Children form state
  const [children, setChildren] = useState([
    { id: 1, fullName: "Emma Smith", birthDate: "2018-05-15", age: 6 },
    { id: 2, fullName: "Noah Smith", birthDate: "2020-09-23", age: 3 },
  ]);
  
  const [newChild, setNewChild] = useState({
    fullName: "",
    birthDate: "",
    age: 0,
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
    };
    
    setChildren([...children, childFormData]);
    setNewChild({ fullName: "", birthDate: "", age: 0 });
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
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Legal Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
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
                      <FormItem>
                        <FormLabel>Co-Parent's Full Legal Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Co-Parent's Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={coParentForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Co-Parent's Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
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
                        <Input 
                          id="childName" 
                          value={newChild.fullName}
                          onChange={(e) => setNewChild({...newChild, fullName: e.target.value})}
                          placeholder="Child's full name"
                          className="h-9 text-sm"
                        />
                      </div>
                      
                      <div className="col-span-7 md:col-span-4">
                        <Label htmlFor="birthDate" className="text-xs">Birth Date</Label>
                        <Input 
                          id="birthDate" 
                          type="date"
                          value={newChild.birthDate}
                          onChange={handleBirthDateChange}
                          className="h-9 text-sm"
                        />
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
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="California">California</SelectItem>
                            <SelectItem value="Texas">Texas</SelectItem>
                            <SelectItem value="Florida">Florida</SelectItem>
                            <SelectItem value="New York">New York</SelectItem>
                            <SelectItem value="Virginia">Virginia</SelectItem>
                            <SelectItem value="Washington">Washington</SelectItem>
                            <SelectItem value="Oregon">Oregon</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the state where your children primarily reside
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={jurisdictionForm.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the county where your children primarily reside
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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