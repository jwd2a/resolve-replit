import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
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
    <div className="relative bg-[#4c37ae] rounded-xl border border-white/20 text-white p-3 shadow-sm text-sm">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 bg-[#5a45c0] rounded-full p-2 h-12 w-12 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Calendar className="h-4 w-4 mb-0.5 text-white" />
            <div className="text-white font-medium text-xs leading-none">{getCalendarMonth()}</div>
            <div className="text-white font-bold text-xs leading-none">{getCalendarDay()}</div>
          </div>
        </div>
        
        <div className="flex-grow">
          {state === 'none' && (
            <>
              <h3 className="text-sm font-semibold mb-0.5">No course session proposed</h3>
              <p className="text-white/80 text-xs">Select a date to propose a session.</p>
            </>
          )}
          
          {state === 'proposed' && (
            <>
              <h3 className="text-sm font-semibold mb-0.5">Course session proposed</h3>
              <p className="text-white/80 text-xs">
                {getFormattedWeekday()}, {getFormattedDate()} at {sessionTime}
              </p>
            </>
          )}
          
          {state === 'scheduled' && (
            <>
              <h3 className="text-sm font-semibold mb-0.5">Course session scheduled for:</h3>
              <p className="text-white/80 text-xs">
                {getFormattedWeekday()}, {getFormattedDate()} at {sessionTime}
              </p>
              {daysRemaining !== undefined && (
                <p className="text-white/90 mt-0.5 text-xs font-medium">
                  {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
                </p>
              )}
            </>
          )}
        </div>
      </div>
      
      {state === 'none' && (
        <div className="mt-2 flex justify-end">
          <Button 
            onClick={onPropose}
            size="sm"
            className="bg-white text-[#4c37ae] hover:bg-white/90 h-7 text-xs px-2"
          >
            Propose Time
          </Button>
        </div>
      )}
      
      {state === 'proposed' && (
        <div className="mt-2 flex justify-end gap-2">
          <Button 
            variant="secondary"
            onClick={onAccept}
            size="sm"
            className="bg-[#5a46c1] text-white hover:bg-[#5a46c1]/90 border border-white/10 h-7 text-xs px-2"
          >
            Accept
          </Button>
          <Button 
            onClick={onProposeNew}
            size="sm"
            className="bg-white text-[#4c37ae] hover:bg-white/90 h-7 text-xs px-2"
          >
            Propose New Time
          </Button>
        </div>
      )}
      
      {state === 'scheduled' && (
        <div className="mt-2 flex justify-end">
          <Button 
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-[#5a46c1]/50 h-6 text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Add to calendar
          </Button>
        </div>
      )}
    </div>
  );
}