import React, { useState } from 'react';
import { CourseSessionStatusBlock, SessionState } from '@/components/CourseSessionStatusBlock';
import { Button } from '@/components/ui/button';
import { format, addDays } from 'date-fns';

export default function CourseSessionDemo() {
  const [currentState, setCurrentState] = useState<SessionState>('none');
  
  // Example dates
  const today = new Date();
  const proposedDate = addDays(today, 3);
  const scheduledDate = addDays(today, 7);
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8 text-[#2e1a87]">Course Session Status Block Demo</h1>
      
      <div className="grid gap-8">
        <div>
          <h2 className="text-xl font-medium mb-4 text-[#2e1a87]">Current State: {currentState}</h2>
          
          <div className="mb-4">
            <div className="flex gap-2 mb-4">
              <Button 
                onClick={() => setCurrentState('none')}
                variant={currentState === 'none' ? 'default' : 'outline'} 
                className={currentState === 'none' ? 'bg-[#4c37ae]' : ''}
              >
                No Session
              </Button>
              <Button 
                onClick={() => setCurrentState('proposed')}
                variant={currentState === 'proposed' ? 'default' : 'outline'}
                className={currentState === 'proposed' ? 'bg-[#4c37ae]' : ''}
              >
                Proposed Session
              </Button>
              <Button 
                onClick={() => setCurrentState('scheduled')}
                variant={currentState === 'scheduled' ? 'default' : 'outline'}
                className={currentState === 'scheduled' ? 'bg-[#4c37ae]' : ''}
              >
                Scheduled Session
              </Button>
            </div>
          </div>
          
          {/* Current active state */}
          <CourseSessionStatusBlock 
            state={currentState}
            sessionDate={currentState === 'scheduled' ? scheduledDate : currentState === 'proposed' ? proposedDate : undefined}
            sessionTime={currentState !== 'none' ? '3:00 PM' : undefined}
            daysRemaining={currentState === 'scheduled' ? 2 : undefined}
            onPropose={() => setCurrentState('proposed')}
            onAccept={() => setCurrentState('scheduled')}
            onProposeNew={() => alert('Propose new time clicked')}
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
          <div>
            <h3 className="font-medium mb-2">Default State</h3>
            <CourseSessionStatusBlock 
              state="none"
              onPropose={() => alert('Propose time clicked')}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Proposed State</h3>
            <CourseSessionStatusBlock 
              state="proposed"
              sessionDate={proposedDate}
              sessionTime="3:00 PM"
              onAccept={() => alert('Accept clicked')}
              onProposeNew={() => alert('Propose new time clicked')}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Scheduled State</h3>
            <CourseSessionStatusBlock 
              state="scheduled"
              sessionDate={scheduledDate}
              sessionTime="3:00 PM"
              daysRemaining={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}