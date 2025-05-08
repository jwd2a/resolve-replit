import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Check, CalendarDays, Users } from 'lucide-react';
import { format } from 'date-fns';

export type SessionState = 'none' | 'proposed' | 'scheduled';

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
  sessionTime = '3:00 PM',
  daysRemaining,
  onAccept,
  onProposeNew,
  onPropose,
}: CourseSessionStatusBlockProps) {
  
  const getFormattedDate = () => {
    if (sessionDate) {
      return format(sessionDate, 'MMMM d');
    }
    return '--';
  };
  
  const getFormattedWeekday = () => {
    if (sessionDate) {
      return format(sessionDate, 'EEEE');
    }
    return '';
  };
  
  const getCalendarMonth = () => {
    if (sessionDate) {
      return format(sessionDate, 'MMM');
    }
    // Current month if no date
    return format(new Date(), 'MMM');
  };
  
  const getCalendarDay = () => {
    if (sessionDate) {
      return format(sessionDate, 'd');
    }
    return '--';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-50 p-2 rounded-md">
            <CalendarDays className="h-5 w-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">Set a Schedule</h2>
        </div>
        
        {state === 'scheduled' && (
          <div className="bg-green-50 rounded-full px-3 py-1 flex items-center text-green-700 font-medium text-xs">
            <Check className="h-3.5 w-3.5 mr-1" />
            Confirmed
          </div>
        )}
        
        {state === 'proposed' && (
          <div className="bg-amber-50 rounded-full px-3 py-1 flex items-center text-amber-700 font-medium text-xs">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </div>
        )}
      </div>
      
      <div className="flex items-start gap-4 mb-4">
        {/* Calendar Icon with Date */}
        <div className="flex-shrink-0 bg-[#2e1a87] bg-opacity-5 rounded-lg p-3 border border-[#2e1a87] border-opacity-10">
          <div className="flex flex-col items-center justify-center">
            <Calendar className="h-5 w-5 mb-1 text-[#2e1a87]" />
            <div className="text-[#2e1a87] font-medium text-xs">{getCalendarMonth()}</div>
            <div className="text-[#2e1a87] font-bold text-lg leading-none">{getCalendarDay()}</div>
          </div>
        </div>
        
        <div className="flex-grow">
          {state === 'none' && (
            <>
              <h3 className="text-gray-800 font-medium mb-1">Schedule a course session</h3>
              <p className="text-gray-600 text-sm">
                Choose a date and time to complete the course with your co-parent.
              </p>
            </>
          )}
          
          {state === 'proposed' && (
            <>
              <h3 className="text-gray-800 font-medium mb-1">Session proposed</h3>
              <p className="text-gray-600 text-sm">
                {getFormattedWeekday()}, {getFormattedDate()} at {sessionTime}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <Users className="h-3 w-3 text-amber-600" />
                </div>
                <span className="text-amber-700 text-xs">Waiting for co-parent to confirm</span>
              </div>
            </>
          )}
          
          {state === 'scheduled' && (
            <>
              <h3 className="text-gray-800 font-medium mb-1">Session confirmed</h3>
              <p className="text-gray-600 text-sm">
                {getFormattedWeekday()}, {getFormattedDate()} at {sessionTime}
              </p>
              {daysRemaining !== undefined && (
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-green-700 text-xs">
                    {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {state === 'none' && (
        <div className="flex justify-end">
          <Button 
            onClick={onPropose}
            size="sm"
            className="bg-[#2e1a87] hover:bg-[#25156d] text-white h-8 text-xs px-3 font-medium"
          >
            Schedule Session
          </Button>
        </div>
      )}
      
      {state === 'proposed' && (
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={onProposeNew}
            size="sm"
            className="border-[#2e1a87]/30 text-[#2e1a87] hover:bg-[#2e1a87]/5 h-8 text-xs px-3 font-medium"
          >
            Propose New Time
          </Button>
          <Button 
            onClick={onAccept}
            size="sm"
            className="bg-[#2e1a87] hover:bg-[#25156d] text-white h-8 text-xs px-3 font-medium"
          >
            Accept
          </Button>
        </div>
      )}
      
      {state === 'scheduled' && (
        <div className="flex justify-between">
          <Button 
            variant="outline"
            size="sm"
            className="border-[#2e1a87]/30 text-[#2e1a87] hover:bg-[#2e1a87]/5 h-8 text-xs px-3 font-medium"
            onClick={onProposeNew}
          >
            Edit Schedule
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#2e1a87] hover:text-[#2e1a87] hover:bg-[#2e1a87]/5 h-8 text-xs px-3 font-medium"
          >
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Add to calendar
          </Button>
        </div>
      )}
    </div>
  );
}