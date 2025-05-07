import { useState, useEffect } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon, Clock, Save } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Define the type for a holiday
interface Holiday {
  id: string;
  name: string;
  included: boolean;
  timesharingType: 'alternate' | 'oneParent' | 'normal';
  evenYearParent: 'mother' | 'father';
  designatedParent: 'mother' | 'father';
  startTime: string;
  endTime: string;
  notes: string;
  isExpanded: boolean;
}

// Default holidays
const defaultHolidays: Holiday[] = [
  {
    id: 'new-years',
    name: 'New Year\'s Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'mother',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'martin-luther-king',
    name: 'Martin Luther King Jr. Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'father',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'presidents-day',
    name: 'Presidents\' Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'mother',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'memorial-day',
    name: 'Memorial Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'father',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'independence-day',
    name: 'Independence Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'mother',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'labor-day',
    name: 'Labor Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'father',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'columbus-day',
    name: 'Columbus Day',
    included: false,
    timesharingType: 'alternate',
    evenYearParent: 'mother',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'veterans-day',
    name: 'Veterans Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'father',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '17:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'mother',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '20:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'christmas-eve',
    name: 'Christmas Eve',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'father',
    designatedParent: 'mother',
    startTime: '13:00',
    endTime: '21:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'christmas-day',
    name: 'Christmas Day',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'mother',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '20:00',
    notes: '',
    isExpanded: false
  },
  {
    id: 'erics-birthday',
    name: 'Eric\'s Birthday',
    included: true,
    timesharingType: 'alternate',
    evenYearParent: 'father',
    designatedParent: 'mother',
    startTime: '09:00',
    endTime: '20:00',
    notes: '',
    isExpanded: false
  }
];

// Define schema for the holiday form
const holidaySchema = z.object({
  holidays: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      included: z.boolean(),
      timesharingType: z.enum(['alternate', 'oneParent', 'normal']),
      evenYearParent: z.enum(['mother', 'father']),
      designatedParent: z.enum(['mother', 'father']),
      startTime: z.string(),
      endTime: z.string(),
      notes: z.string(),
    })
  )
});

export default function HolidaySchedule() {
  const [holidays, setHolidays] = useState<Holiday[]>(defaultHolidays);
  const [showAddHoliday, setShowAddHoliday] = useState(false);
  const [newHolidayName, setNewHolidayName] = useState("");
  const { toast } = useToast();

  // Initialize the form
  const form = useForm<z.infer<typeof holidaySchema>>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      holidays: holidays
    }
  });

  // Update form values when holidays change
  useEffect(() => {
    form.reset({ holidays });
  }, [holidays, form]);

  // Function to toggle holiday inclusion
  const toggleHoliday = (id: string) => {
    setHolidays(holidays.map(holiday => 
      holiday.id === id ? { ...holiday, included: !holiday.included } : holiday
    ));
  };

  // Function to update holiday details
  const updateHoliday = (id: string, field: keyof Holiday, value: any) => {
    setHolidays(holidays.map(holiday => 
      holiday.id === id ? { ...holiday, [field]: value } : holiday
    ));
  };

  // Function to toggle accordion expansion
  const toggleExpand = (id: string) => {
    setHolidays(holidays.map(holiday => 
      holiday.id === id ? { ...holiday, isExpanded: !holiday.isExpanded } : holiday
    ));
  };

  // Function to add a new holiday
  const addNewHoliday = () => {
    if (!newHolidayName.trim()) {
      toast({
        title: "Holiday name required",
        description: "Please enter a name for the holiday.",
        variant: "destructive",
      });
      return;
    }

    const newId = `holiday-${Date.now()}`;
    const newHoliday: Holiday = {
      id: newId,
      name: newHolidayName,
      included: true,
      timesharingType: 'alternate',
      evenYearParent: 'mother',
      designatedParent: 'mother',
      startTime: '09:00',
      endTime: '17:00',
      notes: '',
      isExpanded: true
    };

    setHolidays([...holidays, newHoliday]);
    setNewHolidayName("");
    setShowAddHoliday(false);
  };

  // Function to handle form submission
  const onSubmit = (data: z.infer<typeof holidaySchema>) => {
    console.log('Saving holiday schedule:', data);
    toast({
      title: "Schedule Saved",
      description: "Your holiday schedule has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <NavigationMenu />
      
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar - could be added here in the future */}
          
          {/* Main content area */}
          <div className="lg:col-span-12">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-[#2e1a87] text-white rounded-t-lg">
                <CardTitle className="text-2xl">Holiday Schedule</CardTitle>
                <CardDescription className="text-gray-100">
                  Select and configure the holidays that matter to your family.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6 pb-2">
                {/* Info tip banner */}
                <div className="bg-blue-50 p-4 mb-6 rounded-lg flex gap-3 items-start">
                  <InfoIcon className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 font-medium">Tips for a stress-free holiday schedule:</p>
                    <ul className="mt-1 text-blue-700 text-sm list-disc list-inside">
                      <li>Plan ahead to reduce stress and anxiety</li>
                      <li>Alternate holidays between parents whenever possible</li>
                      <li>Always prioritize what works best for your children</li>
                      <li>Be specific about pick-up and drop-off times</li>
                    </ul>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Holiday list */}
                    <Accordion type="multiple" className="space-y-4">
                      {holidays.map((holiday, index) => (
                        <Card key={holiday.id} className={`overflow-hidden ${holiday.included ? 'border-[#2e1a87]/20' : 'opacity-70 border-dashed'}`}>
                          <div className="flex items-center p-4 justify-between bg-gray-50 border-b">
                            <div className="flex items-center gap-3">
                              <Switch 
                                checked={holiday.included} 
                                onCheckedChange={() => toggleHoliday(holiday.id)}
                                className={holiday.included ? 'bg-[#2e1a87]' : ''}
                              />
                              <h3 className="font-medium">{holiday.name}</h3>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-[#2e1a87]"
                              onClick={() => toggleExpand(holiday.id)}
                            >
                              {holiday.isExpanded ? 'Collapse' : 'Expand'}
                            </Button>
                          </div>
                          
                          {holiday.isExpanded && (
                            <CardContent className="pt-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <FormLabel className="text-sm font-medium mb-1.5 block">
                                    Timesharing Type
                                  </FormLabel>
                                  <Select
                                    value={holiday.timesharingType}
                                    onValueChange={(value: 'alternate' | 'oneParent' | 'normal') => 
                                      updateHoliday(holiday.id, 'timesharingType', value)
                                    }
                                    disabled={!holiday.included}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="alternate">Alternate Even/Odd Years</SelectItem>
                                      <SelectItem value="oneParent">One Parent Always</SelectItem>
                                      <SelectItem value="normal">Follow Normal Timesharing</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  {holiday.timesharingType === 'alternate' && (
                                    <div className="mt-4">
                                      <FormLabel className="text-sm font-medium mb-1.5 block">
                                        Even Years Parent
                                      </FormLabel>
                                      <Select
                                        value={holiday.evenYearParent}
                                        onValueChange={(value: 'mother' | 'father') => 
                                          updateHoliday(holiday.id, 'evenYearParent', value)
                                        }
                                        disabled={!holiday.included}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select parent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="mother">Mother</SelectItem>
                                          <SelectItem value="father">Father</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormDescription className="text-xs mt-1">
                                        Odd years will automatically go to the other parent.
                                      </FormDescription>
                                    </div>
                                  )}
                                  
                                  {holiday.timesharingType === 'oneParent' && (
                                    <div className="mt-4">
                                      <FormLabel className="text-sm font-medium mb-1.5 block">
                                        Designated Parent
                                      </FormLabel>
                                      <Select
                                        value={holiday.designatedParent}
                                        onValueChange={(value: 'mother' | 'father') => 
                                          updateHoliday(holiday.id, 'designatedParent', value)
                                        }
                                        disabled={!holiday.included}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select parent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="mother">Mother</SelectItem>
                                          <SelectItem value="father">Father</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormDescription className="text-xs mt-1">
                                        This parent will always have this holiday.
                                      </FormDescription>
                                    </div>
                                  )}
                                </div>
                                
                                <div>
                                  <div className="mb-4">
                                    <FormLabel className="text-sm font-medium mb-1.5 block flex items-center">
                                      <Clock size={16} className="mr-1.5" />
                                      Time Range
                                    </FormLabel>
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1">
                                        <FormLabel className="text-xs text-gray-500">Start Time</FormLabel>
                                        <Input
                                          type="time"
                                          value={holiday.startTime}
                                          onChange={(e) => updateHoliday(holiday.id, 'startTime', e.target.value)}
                                          disabled={!holiday.included}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div className="pt-5">—</div>
                                      <div className="flex-1">
                                        <FormLabel className="text-xs text-gray-500">End Time</FormLabel>
                                        <Input
                                          type="time"
                                          value={holiday.endTime}
                                          onChange={(e) => updateHoliday(holiday.id, 'endTime', e.target.value)}
                                          disabled={!holiday.included}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <FormLabel className="text-sm font-medium mb-1.5 block">
                                      Notes (Optional)
                                    </FormLabel>
                                    <Textarea
                                      placeholder="Add any specific details about this holiday..."
                                      value={holiday.notes}
                                      onChange={(e) => updateHoliday(holiday.id, 'notes', e.target.value)}
                                      disabled={!holiday.included}
                                      className="resize-none"
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </Accordion>
                    
                    {/* Add new holiday section */}
                    {showAddHoliday ? (
                      <Card className="mt-4 border-dashed">
                        <CardContent className="pt-4">
                          <FormLabel className="text-sm font-medium mb-1.5 block">
                            Holiday Name
                          </FormLabel>
                          <div className="flex gap-2">
                            <Input
                              value={newHolidayName}
                              onChange={(e) => setNewHolidayName(e.target.value)}
                              placeholder="Enter holiday name..."
                              className="flex-1"
                            />
                            <Button 
                              type="button" 
                              onClick={addNewHoliday}
                              className="bg-[#2e1a87] hover:bg-[#25156d]"
                            >
                              Add
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setShowAddHoliday(false);
                                setNewHolidayName("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddHoliday(true)}
                        className="mt-4 w-full border-dashed text-[#2e1a87]"
                      >
                        + Add Custom Holiday
                      </Button>
                    )}
                    
                    {/* Sticky save button */}
                    <div className="sticky bottom-4 flex justify-end mt-6 pb-4">
                      <Button 
                        type="submit" 
                        className="bg-[#2e1a87] hover:bg-[#25156d] shadow-md"
                        size="lg"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}