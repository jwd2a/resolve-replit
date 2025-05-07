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

  // Render a compact holiday item component for the right panel
  const HolidayItem = ({ holiday }: { holiday: Holiday }) => {
    return (
      <div className="border-b border-gray-100 last:border-0">
        <AccordionItem value={holiday.id} className="border-0">
          <div className="flex items-center py-3">
            <Switch 
              checked={holiday.included} 
              onCheckedChange={() => toggleHoliday(holiday.id)}
              className={`mr-3 ${holiday.included ? 'bg-[#2e1a87]' : ''}`}
            />
            <AccordionTrigger className="hover:no-underline py-0 flex-1">
              <span className={`text-sm font-medium ${!holiday.included ? 'text-gray-400' : ''}`}>
                {holiday.name}
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <div className="pb-2 pt-1 space-y-3">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Timesharing Type</Label>
                <Select
                  value={holiday.timesharingType}
                  onValueChange={(value: 'alternate' | 'oneParent' | 'normal') => 
                    updateHoliday(holiday.id, 'timesharingType', value)
                  }
                  disabled={!holiday.included}
                >
                  <SelectTrigger className="w-full h-8 text-sm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alternate">Alternate Even/Odd Years</SelectItem>
                    <SelectItem value="oneParent">One Parent Always</SelectItem>
                    <SelectItem value="normal">Follow Normal Timesharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {holiday.timesharingType === 'alternate' && (
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Even Years Parent</Label>
                  <Select
                    value={holiday.evenYearParent}
                    onValueChange={(value: 'mother' | 'father') => 
                      updateHoliday(holiday.id, 'evenYearParent', value)
                    }
                    disabled={!holiday.included}
                  >
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {holiday.timesharingType === 'oneParent' && (
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Designated Parent</Label>
                  <Select
                    value={holiday.designatedParent}
                    onValueChange={(value: 'mother' | 'father') => 
                      updateHoliday(holiday.id, 'designatedParent', value)
                    }
                    disabled={!holiday.included}
                  >
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Time Range</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={holiday.startTime}
                    onChange={(e) => updateHoliday(holiday.id, 'startTime', e.target.value)}
                    disabled={!holiday.included}
                    className="h-8 text-sm"
                  />
                  <span className="text-gray-400">—</span>
                  <Input
                    type="time"
                    value={holiday.endTime}
                    onChange={(e) => updateHoliday(holiday.id, 'endTime', e.target.value)}
                    disabled={!holiday.included}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Notes</Label>
                <Textarea
                  placeholder="Add details..."
                  value={holiday.notes}
                  onChange={(e) => updateHoliday(holiday.id, 'notes', e.target.value)}
                  disabled={!holiday.included}
                  className="resize-none text-sm min-h-[60px]"
                  rows={2}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
    );
  };

  // For demo purposes - renders the component in both full view and sidebar view
  // In actual implementation, this would be just one part based on where it appears
  return (
    <>
      {/* DEMO ONLY: Full page version for when accessed directly via URL */}
      <div className="bg-white min-h-screen">
        <NavigationMenu />
        
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          <div className="grid grid-cols-12 gap-6">
            {/* Left column - Course modules (as in the screenshot) */}
            <div className="col-span-12 md:col-span-3 hidden md:block">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="text-sm font-medium text-gray-500 mb-3">Module 3</div>
                <div className="text-base font-semibold mb-4">Timesharing Schedule</div>
                <div className="space-y-2">
                  <div className="flex items-center p-2 bg-gray-100 rounded text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#2e1a87] flex items-center justify-center text-white mr-3 text-xs">1</div>
                    <span>Introduction to Time Sharing & Travel</span>
                  </div>
                  <div className="flex items-center p-2 bg-gray-100 rounded text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#2e1a87] flex items-center justify-center text-white mr-3 text-xs">2</div>
                    <span>Scheduling and Our Calendar</span>
                  </div>
                  <div className="flex items-center p-2 bg-gray-100 rounded text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#2e1a87] flex items-center justify-center text-white mr-3 text-xs">3</div>
                    <span>Weekday and Weekend Schedule</span>
                  </div>
                  <div className="flex items-center p-2 bg-[#2e1a87] rounded text-sm text-white">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#2e1a87] mr-3 text-xs font-bold">4</div>
                    <span>Holiday Schedule</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle column - Content (video as in screenshot) */}
            <div className="col-span-12 md:col-span-5">
              <div className="bg-[#2e1a87] rounded-lg overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h2 className="text-xl font-light mb-4 tracking-wider">TIMESHARING</h2>
                    <h1 className="text-3xl font-semibold">YOUR HOLIDAY SCHEDULE</h1>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-1 text-blue-800">Things to keep in mind</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Plan ahead to ensure stress-free holiday transitions.</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Be open to creating new traditions.</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Consider alternating years or splitting holiday time.</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Prioritize your child's joy over personal preferences.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right column - Holiday schedule component */}
            <div className="col-span-12 md:col-span-4">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Holiday Schedule</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Configure each holiday by selecting which parent will have the children and the times for the visitation. Click on a holiday to expand its details.
                  </p>
                </div>
                
                <div className="p-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <Accordion type="multiple" className="w-full">
                        {holidays.map(holiday => (
                          <HolidayItem key={holiday.id} holiday={holiday} />
                        ))}
                      </Accordion>
                      
                      {/* Add new holiday section */}
                      {showAddHoliday ? (
                        <div className="p-4 border-t">
                          <Label className="text-xs text-gray-500 mb-1 block">Holiday Name</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newHolidayName}
                              onChange={(e) => setNewHolidayName(e.target.value)}
                              placeholder="Enter holiday name..."
                              className="flex-1 h-8 text-sm"
                            />
                            <Button 
                              type="button" 
                              onClick={addNewHoliday}
                              className="bg-[#2e1a87] hover:bg-[#25156d] h-8 px-3 text-xs"
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
                              className="h-8 px-3 text-xs"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border-t">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddHoliday(true)}
                            className="w-full text-sm border-dashed text-[#2e1a87] h-8"
                          >
                            + Add Custom Holiday
                          </Button>
                        </div>
                      )}
                      
                      {/* Save button */}
                      <div className="p-4 border-t">
                        <Button 
                          type="submit" 
                          className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* This is the component that would be used when embedded in the actual course page */}
      <div className="hidden">
        {/* Right sidebar component only */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Holiday Schedule</h2>
            <p className="text-sm text-gray-500 mt-1">
              Configure each holiday by selecting which parent will have the children and the times for the visitation. Click on a holiday to expand its details.
            </p>
          </div>
          
          <div className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Accordion type="multiple" className="w-full">
                  {holidays.map(holiday => (
                    <HolidayItem key={holiday.id} holiday={holiday} />
                  ))}
                </Accordion>
                
                {/* Add new holiday section */}
                {showAddHoliday ? (
                  <div className="p-4 border-t">
                    <Label className="text-xs text-gray-500 mb-1 block">Holiday Name</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newHolidayName}
                        onChange={(e) => setNewHolidayName(e.target.value)}
                        placeholder="Enter holiday name..."
                        className="flex-1 h-8 text-sm"
                      />
                      <Button 
                        type="button" 
                        onClick={addNewHoliday}
                        className="bg-[#2e1a87] hover:bg-[#25156d] h-8 px-3 text-xs"
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
                        className="h-8 px-3 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddHoliday(true)}
                      className="w-full text-sm border-dashed text-[#2e1a87] h-8"
                    >
                      + Add Custom Holiday
                    </Button>
                  </div>
                )}
                
                {/* Save button */}
                <div className="p-4 border-t">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}