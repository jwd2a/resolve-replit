import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Check, 
  X, 
  Clock, 
  User, 
  AlertCircle,
  Scale
} from 'lucide-react';
import { ChangeRequest, UserRole } from '@/types/collaborative-editing';
import { cn } from '@/lib/utils';

interface ChangeRequestPopoverProps {
  requests: ChangeRequest[];
  currentUser: UserRole;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export function ChangeRequestPopover({
  requests,
  currentUser,
  onApprove,
  onReject
}: ChangeRequestPopoverProps) {
  if (requests.length === 0) return null;

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

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const hasPendingAction = pendingRequests.some(r => r.requestingParent !== currentUser);

  const getIconColor = () => {
    if (hasPendingAction) return 'text-orange-600 hover:text-orange-700';
    if (pendingRequests.length > 0) return 'text-orange-500 hover:text-orange-600';
    return 'text-green-600 hover:text-green-700';
  };

  const getIcon = () => {
    if (hasPendingAction) return <AlertCircle className="h-4 w-4" />;
    if (pendingRequests.length > 0) return <Clock className="h-4 w-4" />;
    return <Check className="h-4 w-4" />;
  };

  const getTooltipText = () => {
    if (hasPendingAction) return 'Change request needs your review';
    if (pendingRequests.length > 0) return 'Change request pending';
    return 'View change history';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "relative inline-flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-100",
            getIconColor()
          )}
          title={getTooltipText()}
        >
          {getIcon()}
          {requests.length > 1 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
              {requests.length}
            </span>
          )}
        </button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="start">
        <div className="p-4 border-b">
          <h4 className="font-medium text-gray-900 mb-1">
            Change Request{requests.length > 1 ? 's' : ''} for this Section
          </h4>
          <p className="text-sm text-gray-600">
            {requests.length} request{requests.length > 1 ? 's' : ''} • 
            {pendingRequests.length > 0 ? ` ${pendingRequests.length} pending` : ' All resolved'}
          </p>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {requests.map((request, index) => {
            const canTakeAction = request.status === 'pending' && request.requestingParent !== currentUser;
            const isMyRequest = request.requestingParent === currentUser;
            
            return (
              <div 
                key={request.id} 
                className={cn(
                  "p-4 border-b last:border-b-0",
                  request.status === 'pending' && "bg-orange-50/50",
                  request.status === 'completed' && "bg-green-50/50",
                  request.status === 'rejected' && "bg-red-50/50"
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-900">
                      {isMyRequest ? 'Your Request' : `Request by ${getParentName(request.requestingParent)}`}
                    </div>
                    
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
                  
                  {canTakeAction && (
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  )}
                </div>
                
                <div className="text-xs text-gray-500 mb-3">
                  {formatDate(request.createdAt)}
                  {request.respondedAt && ` • Responded ${formatDate(request.respondedAt)}`}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  {/* Requested Changes */}
                  <div>
                    <h6 className="text-xs font-medium text-gray-600 mb-1">Requested Changes:</h6>
                    <div className="text-sm text-gray-800 bg-white p-2 rounded border text-xs">
                      {request.description}
                    </div>
                  </div>
                  
                  {/* Proposed Legal Language */}
                  {request.legalLanguage && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Scale className="h-3 w-3" />
                        Proposed Legal Language:
                      </h6>
                      <div className="text-sm text-gray-800 bg-purple-50 p-2 rounded border border-purple-200 text-xs">
                        "{request.legalLanguage}"
                      </div>
                    </div>
                  )}
                  
                  {/* Status Messages */}
                  {request.status === 'pending' && isMyRequest && (
                    <div className="text-xs text-orange-700 bg-orange-50 p-2 rounded">
                      Waiting for your co-parent to review this request.
                    </div>
                  )}
                  
                  {request.status === 'completed' && (
                    <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                      ✓ This change has been approved and added to your parenting plan.
                    </div>
                  )}
                  
                  {request.status === 'rejected' && (
                    <div className="text-xs text-red-700 bg-red-50 p-2 rounded">
                      This request was declined{isMyRequest ? ' by your co-parent' : ''}.
                    </div>
                  )}
                  
                  {/* Action Required Alert */}
                  {canTakeAction && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-3 w-3 text-orange-600" />
                      <AlertDescription className="text-orange-800 text-xs">
                        <strong>Your approval is needed.</strong> Review the changes and legal language above.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {/* Action Buttons */}
                  {canTakeAction && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => onApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700 h-8 text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReject(request.id)}
                        className="border-red-200 text-red-700 hover:bg-red-50 h-8 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}