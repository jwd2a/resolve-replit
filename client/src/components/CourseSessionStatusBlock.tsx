import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Check } from 'lucide-react';
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
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-[#2e1a87] bg-opacity-5 rounded-lg p-2.5 border border-[#2e1a87] border-opacity-10">
          <div className="flex flex-col items-center justify-center">
            <Calendar className="h-4 w-4 mb-0.5 text-[#2e1a87]" />
            <div className="text-[#2e1a87] font-medium text-xs leading-none">{getCalendarMonth()}</div>
            <div className="text-[#2e1a87] font-bold text-sm leading-tight">{getCalendarDay()}</div>
          </div>
        </div>
        
        <div className="flex-grow">
          {state === 'none' && (
            <>
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900">Set a Schedule</h3>
              </div>
              <p className="text-gray-600 text-xs mt-0.5">
                Choose a date to meet with your co-parent.
              </p>
            </>
          )}
          
          {state === 'proposed' && (
            <>
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900">Set a Schedule</h3>
                <div className="ml-2 bg-amber-50 rounded-full px-2 py-0.5 flex items-center text-amber-700 font-medium text-[10px]">
                  <Clock className="h-3 w-3 mr-0.5" />
                  Pending
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-0.5">
                {getFormattedWeekday()}, {getFormattedDate()} at {sessionTime}
              </p>
              <div className="mt-1 flex items-center gap-1">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <Users className="h-2.5 w-2.5 text-amber-600" />
                </div>
                <span className="text-amber-700 text-[10px]">Waiting for co-parent</span>
              </div>
            </>
          )}
          
          {state === 'scheduled' && (
            <>
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900">Set a Schedule</h3>
                <div className="ml-2 bg-green-50 rounded-full px-2 py-0.5 flex items-center text-green-700 font-medium text-[10px]">
                  <Check className="h-3 w-3 mr-0.5" />
                  Confirmed
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-0.5">
                {getFormattedWeekday()}, {getFormattedDate()} at {sessionTime}
              </p>
              {daysRemaining !== undefined && (
                <div className="mt-1 flex items-center gap-1">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-2.5 w-2.5 text-green-600" />
                  </div>
                  <span className="text-green-700 text-[10px]">
                    {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {state === 'none' && (
        <div className="mt-3 flex justify-end">
          <Button 
            onClick={onPropose}
            size="sm"
            className="bg-[#2e1a87] hover:bg-[#25156d] text-white h-7 text-xs px-2 font-medium"
          >
            Schedule Session
          </Button>
        </div>
      )}
      
      {state === 'proposed' && (
        <div className="mt-3 flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={onProposeNew}
            size="sm"
            className="border-[#2e1a87]/30 text-[#2e1a87] hover:bg-[#2e1a87]/5 h-7 text-xs px-2 font-medium"
          >
            Propose New
          </Button>
          <Button 
            onClick={onAccept}
            size="sm"
            className="bg-[#2e1a87] hover:bg-[#25156d] text-white h-7 text-xs px-2 font-medium"
          >
            Accept
          </Button>
        </div>
      )}
      
      {state === 'scheduled' && (
        <div className="mt-3 flex justify-between">
          <Button 
            variant="outline"
            size="sm"
            className="border-[#2e1a87]/30 text-[#2e1a87] hover:bg-[#2e1a87]/5 h-7 text-xs px-2 font-medium"
            onClick={onProposeNew}
          >
            Edit
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#2e1a87] hover:text-[#2e1a87] hover:bg-[#2e1a87]/5 h-7 text-xs px-2 font-medium"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Add to calendar
          </Button>
        </div>
      )}
    </div>
  );
}