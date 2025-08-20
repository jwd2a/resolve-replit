import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Check, 
  X, 
  Clock, 
  User, 
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Scale,
  MessageSquare
} from 'lucide-react';
import { ChangeRequest, UserRole } from '@/types/collaborative-editing';
import { cn } from '@/lib/utils';

interface InlineChangeRequestProps {
  request: ChangeRequest;
  currentUser: UserRole;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export function InlineChangeRequest({
  request,
  currentUser,
  onApprove,
  onReject
}: InlineChangeRequestProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const getParentName = (parent: UserRole) => {
    return parent === 'parentA' ? 'Eric' : 'Michelle';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canTakeAction = request.status === 'pending' && request.requestingParent !== currentUser;
  const isMyRequest = request.requestingParent === currentUser;

  return (
    <Card className={cn(
      "mb-4 border-l-4 transition-all duration-200",
      request.status === 'pending' && "border-l-orange-400 bg-orange-50/50",
      request.status === 'completed' && "border-l-green-400 bg-green-50/50",
      request.status === 'rejected' && "border-l-red-400 bg-red-50/50"
    )}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="p-4 cursor-pointer hover:bg-white/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {canTakeAction ? 'Change Request Needs Your Review' : 
                       isMyRequest ? 'Your Change Request' : 'Change Request'}
                    </span>
                    
                    {request.status === 'pending' && (
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    
                    {request.status === 'completed' && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    
                    {request.status === 'rejected' && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <X className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 mt-1">
                    {isMyRequest ? 'You requested' : `Requested by ${getParentName(request.requestingParent)}`} • {formatDate(request.createdAt)}
                  </div>
                </div>
              </div>
              
              {canTakeAction && (
                <AlertCircle className="h-5 w-5 text-orange-600" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 px-4">
            <div className="space-y-4">
              {/* Requested Changes */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Requested Changes:</h5>
                <div className="text-sm text-gray-800 bg-white p-3 rounded border">
                  {request.description}
                </div>
              </div>
              
              {/* Proposed Legal Language */}
              {request.legalLanguage && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    Proposed Legal Language:
                  </h5>
                  <div className="text-sm text-gray-800 bg-purple-50 p-3 rounded border border-purple-200">
                    "{request.legalLanguage}"
                  </div>
                </div>
              )}
              
              {/* Action Required Alert */}
              {canTakeAction && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Your approval is needed.</strong> Review the requested changes and proposed legal language above, then approve or reject this request.
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Status Messages */}
              {request.status === 'pending' && isMyRequest && (
                <div className="text-sm text-orange-700 bg-orange-50 p-3 rounded">
                  Waiting for your co-parent to review this request.
                </div>
              )}
              
              {request.status === 'completed' && (
                <div className="text-sm text-green-700 bg-green-50 p-3 rounded">
                  ✓ This change has been approved and added to your parenting plan.
                </div>
              )}
              
              {request.status === 'rejected' && (
                <div className="text-sm text-red-700 bg-red-50 p-3 rounded">
                  This request was declined{isMyRequest ? ' by your co-parent' : ''}.
                </div>
              )}
              
              {/* Action Buttons */}
              {canTakeAction && (
                <div className="flex gap-3 pt-2">
                  <Button
                    size="sm"
                    onClick={() => onApprove(request.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Changes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReject(request.id)}
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Request
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}