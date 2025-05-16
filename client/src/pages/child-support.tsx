import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight, Download, Info, Pencil } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";

// Form schema for type safety
const formSchema = z.object({
  parentAIncome: z.string().min(1, "Required"),
  parentBIncome: z.string().min(1, "Required"),
  numberOfChildren: z.string().min(1, "Required"),
  primaryCustody: z.enum(["shared", "parentA", "parentB"]),
  overnightsParentA: z.string().min(1, "Required"),
  overnightsParentB: z.string().min(1, "Required"),
  expenses: z.string(),
  state: z.string().min(1, "Required")
});

type FormValues = z.infer<typeof formSchema>;

// List of US states
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export default function ChildSupport() {
  const [step, setStep] = useState<"intro" | "form" | "results">("intro");
  const [result, setResult] = useState<{
    min: number;
    max: number;
    median: number;
    factors: string[];
  } | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentAIncome: "",
      parentBIncome: "",
      numberOfChildren: "",
      primaryCustody: "shared",
      overnightsParentA: "",
      overnightsParentB: "",
      expenses: "",
      state: "Florida"
    }
  });
  
  // Implement the updated child support calculation algorithm
  function estimateChildSupport({
    incomeA,
    incomeB,
    numChildren,
    overnightsA,
    extraExpenses
  }) {
    const totalOvernights = 365;
    const overnightsB = totalOvernights - overnightsA;
    const combinedIncome = incomeA + incomeB;

    if (combinedIncome === 0) return { error: "Combined income must be greater than 0." };

    // Multiplier by number of children
    const multipliers = { 1: 0.16, 2: 0.22, 3: 0.26 };
    const multiplier = multipliers[numChildren] || 0.30;

    const baseSupport = combinedIncome * multiplier;

    // Income share
    const aShare = incomeA / combinedIncome;
    const bShare = incomeB / combinedIncome;

    // Custody percentage
    const aCustodyPct = overnightsA / totalOvernights;
    const bCustodyPct = overnightsB / totalOvernights;

    const aToB = baseSupport * (aShare - aCustodyPct);
    const bToA = baseSupport * (bShare - bCustodyPct);

    let netSupport = Math.max(aToB, bToA, 0); // Only one pays
    netSupport += extraExpenses;

    const median = Math.round(netSupport);
    const min = Math.round(median * 0.9);
    const max = Math.round(median * 1.1);

    // Determine who pays
    const payingParent = aToB > bToA ? "Parent A" : "Parent B";

    // Determine factors that influenced the calculation
    const factors = [];
    
    // Income difference
    if (Math.abs(aShare - bShare) > 0.2) {
      factors.push(`Significant income difference between parents`);
    }
    
    // Custody arrangement
    if (Math.abs(aCustodyPct - 0.5) < 0.1) {
      factors.push(`Nearly equal time with both parents`);
    } else if (Math.abs(aCustodyPct - 0.5) < 0.3) {
      factors.push(`Uneven but shared custody arrangement`);
    } else {
      factors.push(`${aCustodyPct > 0.6 ? "Parent A" : "Parent B"} has primary custody`);
    }
    
    // Number of children
    if (numChildren > 1) {
      factors.push(`Multiple children (${numChildren})`);
    }
    
    // Expenses
    if (extraExpenses > 0) {
      factors.push(`Additional monthly expenses of $${extraExpenses}`);
    }

    return {
      supportRange: { min, max },
      median: median,
      payingParent,
      factors,
      details: {
        baseSupport: Math.round(baseSupport),
        incomeSplit: { aShare: aShare.toFixed(2), bShare: bShare.toFixed(2) },
        custodySplit: { aCustodyPct: aCustodyPct.toFixed(2), bCustodyPct: bCustodyPct.toFixed(2) },
      }
    };
  }

  const onSubmit = (data: FormValues) => {
    // Convert string values to numbers
    const parentAIncome = Number(data.parentAIncome);
    const parentBIncome = Number(data.parentBIncome);
    const numberOfChildren = Number(data.numberOfChildren);
    const overnightsParentA = Number(data.overnightsParentA);
    const expenses = data.expenses ? Number(data.expenses) : 0;
    
    // Calculate child support using the new algorithm
    const result = estimateChildSupport({
      incomeA: parentAIncome,
      incomeB: parentBIncome,
      numChildren: numberOfChildren,
      overnightsA: overnightsParentA,
      extraExpenses: expenses
    });
    
    if ('error' in result) {
      // Handle error case
      console.error(result.error);
      return;
    }
    
    const min = result.supportRange.min;
    const max = result.supportRange.max;
    const median = result.median;
    const factors = result.factors;
    
    setResult({
      min,
      max,
      median,
      factors
    });
    
    setStep("results");
  };
  
  const handleStartOver = () => {
    form.reset();
    setStep("form");
  };
  
  const downloadSummary = () => {
    // This would typically generate a PDF or formatted text
    // For now, we'll just alert with the information
    alert('Summary would be downloaded here in a real implementation');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationMenu />
      
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8">
        {step === "intro" && (
          <Card className="w-full">
            <CardHeader className="bg-gradient-to-r from-[#2e1a87] to-[#5040b8] text-white">
              <CardTitle className="text-2xl mb-2">Child Support Range Estimator</CardTitle>
              <CardDescription className="text-gray-100">
                Get a realistic estimate of monthly child support based on your family's circumstances
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">What this tool does:</h3>
                <p className="text-gray-600 mb-4">
                  Answer a few quick questions and see your estimated monthly range in minutes. This is not legal advice but a helpful starting point for discussions with your co-parent.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <div className="flex">
                    <Info className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Privacy Notice</h4>
                      <p className="text-sm text-blue-600">
                        Your information is not stored or saved. This calculator is for educational purposes only.
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">Why we show a range:</h3>
                <p className="text-gray-600">
                  Child support amounts can vary based on court discretion, specific state guidelines, and individual family circumstances. A range gives you a realistic idea of possible outcomes.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-gray-50 border-t">
              <Button 
                onClick={() => setStep("form")} 
                className="bg-[#2e1a87] hover:bg-[#462db4]"
              >
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === "form" && (
          <Card className="w-full">
            <CardHeader className="bg-gradient-to-r from-[#2e1a87] to-[#5040b8] text-white">
              <CardTitle className="text-xl mb-1">Enter Your Information</CardTitle>
              <CardDescription className="text-gray-100">
                All fields are required unless marked optional
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Income Information</h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="parentAIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent A Monthly Income ($)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 4000" {...field} type="number" min="0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="parentBIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent B Monthly Income ($)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 3500" {...field} type="number" min="0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    <h3 className="text-lg font-medium">Children & Custody Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="numberOfChildren"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Children</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2" {...field} type="number" min="1" max="10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="primaryCustody"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Who has primary custody?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="shared" id="shared" />
                                <Label htmlFor="shared">Shared Custody</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="parentA" id="parentA" />
                                <Label htmlFor="parentA">Parent A</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="parentB" id="parentB" />
                                <Label htmlFor="parentB">Parent B</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="overnightsParentA"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Overnights with Parent A (per year)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 182" {...field} type="number" min="0" max="365" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="overnightsParentB"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Overnights with Parent B (per year)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 183" {...field} type="number" min="0" max="365" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    <h3 className="text-lg font-medium">Additional Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="expenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Child-Related Expenses ($ - Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 500" {...field} type="number" min="0" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep("intro")}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="submit" className="bg-[#2e1a87] hover:bg-[#462db4]">
                      Calculate Estimate
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        
        {step === "results" && result && (
          <Card className="w-full">
            <CardHeader className="bg-gradient-to-r from-[#2e1a87] to-[#5040b8] text-white">
              <CardTitle className="text-xl mb-1">Your Child Support Estimate</CardTitle>
              <CardDescription className="text-gray-100">
                Based on the information you provided
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-8 text-center">
                <h3 className="text-lg text-gray-600 mb-2">Estimated Monthly Range:</h3>
                <div className="text-4xl font-bold text-[#2e1a87] mb-2">
                  ${result.min.toLocaleString()} – ${result.max.toLocaleString()}
                </div>
                <p className="text-gray-500">Median value: ${result.median.toLocaleString()}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">Key factors influencing this estimate:</h4>
                <ul className="space-y-2">
                  {result.factors.map((factor, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mb-6">
                <h4 className="text-amber-800 font-medium mb-1">Important Note</h4>
                <p className="text-amber-700 text-sm">
                  This is an educational estimate only and should not be considered legal advice. 
                  Child support calculations vary by jurisdiction, and actual court-ordered amounts may differ.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-3 bg-gray-50 border-t">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleStartOver}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Adjust Inputs
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadSummary}
                >
                  <Download className="mr-2 h-4 w-4" /> Save Summary
                </Button>
              </div>
              <Button 
                onClick={() => setStep("intro")} 
                variant="outline"
                size="sm"
              >
                Start Over
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This Child Support Range Estimator is provided as an educational tool only. The estimates generated are based on simplified formulas and may not reflect the exact amount that would be ordered in your case. Many factors influence child support calculations, including state-specific guidelines, judicial discretion, and individual circumstances not captured by this tool.
              </p>
              <p className="text-sm text-gray-600 mt-3">
                We strongly recommend consulting with a qualified legal professional for personalized advice regarding your specific situation. This tool is not intended to replace legal counsel or mediation services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}