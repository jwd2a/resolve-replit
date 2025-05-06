import { useState } from 'react';
import { CalendarIcon, Clock, Calendar, Check, X, ArrowRight, CalendarPlus, Share } from 'lucide-react';
import { Button } from './ui/button';
import { format, addDays, differenceInDays } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the different session states
export type SessionState = 'none' | 'proposed' | 'scheduled';

// Props for the CourseSessionStatusBlock component
interface CourseSessionStatusBlockProps {
  state: SessionState;
  sessionDate?: Date;
  sessionTime?: string;
  daysRemaining?: number;
  onAccept?: () => void;
  onProposeNew?: () => void;
  onPropose?: () => void;
}

export function CourseSessionStatusBlock({
  state = 'none',
  sessionDate,
  sessionTime,
  daysRemaining,
  onAccept,
  onProposeNew,
  onPropose,
}: CourseSessionStatusBlockProps) {
  const [proposeDialogOpen, setProposeDialogOpen] = useState(false);
  const [proposedDate, setProposedDate] = useState('');
  const [proposedTime, setProposedTime] = useState('');
  
  // Format the date for display
  const formattedDate = sessionDate 
    ? format(sessionDate, 'EEEE, MMMM d, yyyy') 
    : '';

  // Handle propose submission
  const handleProposeSubmit = () => {
    // Here you would normally send the proposed date/time to the backend
    if (onPropose) {
      onPropose();
    }
    setProposeDialogOpen(false);
  };

  return (
    <div className="relative">
      {/* The main session status card with different states */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {/* Card header with state-specific styling */}
        <div className={`px-4 py-3 flex items-center justify-between ${
          state === 'scheduled' 
            ? 'bg-green-50 border-b border-green-100' 
            : state === 'proposed' 
              ? 'bg-blue-50 border-b border-blue-100' 
              : 'bg-gray-50 border-b border-gray-100'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              state === 'scheduled' 
                ? 'bg-green-100' 
                : state === 'proposed' 
                  ? 'bg-blue-100' 
                  : 'bg-gray-100'
            }`}>
              {state === 'scheduled' ? (
                <Calendar className={`h-4 w-4 text-green-600`} />
              ) : state === 'proposed' ? (
                <CalendarPlus className={`h-4 w-4 text-blue-600`} />
              ) : (
                <CalendarIcon className={`h-4 w-4 text-gray-600`} />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm">
                {state === 'scheduled' 
                  ? 'Course Session Scheduled' 
                  : state === 'proposed' 
                    ? 'Course Session Proposed' 
                    : 'Schedule Course Session'}
              </h3>
              <p className="text-xs text-gray-500">
                {state === 'scheduled' 
                  ? 'Get ready for your upcoming session' 
                  : state === 'proposed' 
                    ? 'Waiting for response' 
                    : 'Set a time for your 2-hour learning session'}
              </p>
            </div>
          </div>
          
          {/* State indicator */}
          {state === 'scheduled' && (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Confirmed
            </div>
          )}
          {state === 'proposed' && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Pending
            </div>
          )}
        </div>
        
        {/* Card body content based on state */}
        <div className="p-4">
          {state === 'none' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                The course requires a 2-hour live session with both parents. Propose a time that works for you and your co-parent.
              </p>
              <Button 
                onClick={() => setProposeDialogOpen(true)}
                className="w-full bg-[#2e1a87] hover:bg-[#25156d] mt-2"
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Propose a Session Time
              </Button>
            </div>
          )}
          
          {state === 'proposed' && sessionDate && sessionTime && (
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center text-blue-700 text-sm font-medium mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Proposed Session</span>
                    </div>
                    <p className="text-sm font-medium">{formattedDate}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      <span>{sessionTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  onClick={() => setProposeDialogOpen(true)}
                >
                  Change Proposal
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 italic text-center">
                Waiting for your co-parent to respond...
              </p>
            </div>
          )}
          
          {state === 'scheduled' && sessionDate && sessionTime && (
            <div className="space-y-3">
              <div className="rounded-md border border-green-100 p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center text-green-700 text-sm font-medium mb-1">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>Confirmed Session</span>
                    </div>
                    <p className="text-sm font-medium">{formattedDate}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      <span>{sessionTime}</span>
                    </div>
                  </div>
                  
                  {daysRemaining !== undefined && (
                    <div className="bg-green-50 px-2 py-1 rounded-md text-center">
                      <span className="block text-sm font-bold text-green-700">{daysRemaining}</span>
                      <span className="text-xs text-green-600">days left</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  onClick={() => setProposeDialogOpen(true)}
                >
                  Reschedule
                </Button>
                <Button className="flex-1 bg-[#2e1a87] hover:bg-[#25156d]">
                  <Share className="mr-1.5 h-4 w-4" />
                  Add to Calendar
                </Button>
              </div>
            </div>
          )}
          
          {/* Respond to proposal section - special case when co-parent proposed */}
          {state === 'proposed' && onAccept && onProposeNew && (
            <div className="space-y-3 border-t border-gray-100 mt-3 pt-3">
              <h4 className="font-medium text-sm">Respond to Proposal</h4>
              
              <div className="bg-blue-50 rounded-md p-3">
                <div className="flex items-start">
                  <div>
                    <div className="flex items-center text-blue-700 text-sm font-medium mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Proposed by Co-Parent</span>
                    </div>
                    <p className="text-sm font-medium">{formattedDate}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      <span>{sessionTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  onClick={onProposeNew}
                >
                  Propose New Time
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={onAccept}
                >
                  <Check className="mr-1.5 h-4 w-4" />
                  Accept
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Propose session dialog */}
      <Dialog open={proposeDialogOpen} onOpenChange={setProposeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Propose Course Session</DialogTitle>
            <DialogDescription>
              Choose a date and time that works for you and your co-parent for the 2-hour course session.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={proposedTime}
                onChange={(e) => setProposedTime(e.target.value)}
                className="col-span-3"
              />
            </div>
            <p className="text-sm text-gray-500">
              The session will last approximately 2 hours. Make sure both you and your co-parent have sufficient time set aside.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProposeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProposeSubmit} className="bg-[#2e1a87] hover:bg-[#25156d]">
              Propose Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}