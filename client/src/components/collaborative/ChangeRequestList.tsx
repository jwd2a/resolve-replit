import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  Check, 
  X, 
  Clock, 
  User, 
  FileText, 
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ChangeRequest, UserRole } from '@/types/collaborative-editing';
import { cn } from '@/lib/utils';

interface ChangeRequestListProps {
  changeRequests: ChangeRequest[];
  currentUser: UserRole;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  showOnlyPending?: boolean;
  showOnlyMyRequests?: boolean;
  showOnlyCompleted?: boolean;
}

interface ConfirmationDialogProps {
  isOpen: boolean;
  type: 'approve' | 'reject';
  request: ChangeRequest | null;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationDialog({ isOpen, type, request, onConfirm, onCancel }: ConfirmationDialogProps) {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'approve' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            {type === 'approve' ? 'Approve' : 'Reject'} Change Request
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {type} this change request for "{request.sectionTitle}"?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Requested Changes:</h4>
            <p className="text-sm text-gray-700">{request.description}</p>
          </div>

          {type === 'approve' && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                If you approve this request, legal language will be generated for both parties to review before the change is finalized.
              </AlertDescription>
            </Alert>
          )}

          {type === 'reject' && (
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                If you reject this request, it will be declined and the requesting parent will be notified.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className={type === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {type === 'approve' ? 'Approve Request' : 'Reject Request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ChangeRequestList({ 
  changeRequests, 
  currentUser, 
  onApprove, 
  onReject,
  showOnlyPending = false,
  showOnlyMyRequests = false,
  showOnlyCompleted = false
}: ChangeRequestListProps) {
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject';
    request: ChangeRequest | null;
  }>({
    isOpen: false,
    type: 'approve',
    request: null
  });

  // Use the passed requests directly since filtering is now done at the parent level
  const displayRequests = changeRequests;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            <FileText className="h-3 w-3 mr-1" />
            Legal Review
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'discarded':
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
            <X className="h-3 w-3 mr-1" />
            Discarded
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getParentName = (parent: UserRole) => {
    return parent === 'parentA' ? 'Eric' : 'Michelle';
  };

  const handleApprove = (request: ChangeRequest) => {
    setConfirmDialog({
      isOpen: true,
      type: 'approve',
      request
    });
  };

  const handleReject = (request: ChangeRequest) => {
    setConfirmDialog({
      isOpen: true,
      type: 'reject',
      request
    });
  };

  const handleConfirm = () => {
    if (!confirmDialog.request) return;

    if (confirmDialog.type === 'approve') {
      onApprove(confirmDialog.request.id);
    } else {
      onReject(confirmDialog.request.id);
    }

    setConfirmDialog({ isOpen: false, type: 'approve', request: null });
  };

  if (displayRequests.length === 0) {
    let emptyMessage = "There are currently no change requests for your parenting plan.";
    let emptyTitle = "No Change Requests";
    
    if (showOnlyPending) {
      emptyMessage = "There are no change requests waiting for your response.";
      emptyTitle = "No Pending Requests";
    } else if (showOnlyMyRequests) {
      emptyMessage = "You haven't submitted any change requests yet.";
      emptyTitle = "No Requests Submitted";
    } else if (showOnlyCompleted) {
      emptyMessage = "There are no completed change requests yet.";
      emptyTitle = "No Completed Requests";
    }

    return (
      <Card>
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyTitle}</h3>
          <p className="text-gray-600">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {displayRequests.map((request) => {
        const canTakeAction = showOnlyPending && request.status === 'pending' && request.requestingParent !== currentUser;
        
        return (
          <Card key={request.id}>
            <CardContent className="p-4">
              <div
                className={cn(
                  "border rounded-lg p-4",
                  request.status === 'pending' && "border-orange-200 bg-orange-50/30",
                  request.status === 'approved' && "border-blue-200 bg-blue-50/30",
                  request.status === 'rejected' && "border-red-200 bg-red-50/30",
                  request.status === 'completed' && "border-green-200 bg-green-50/30",
                  request.status === 'discarded' && "border-gray-200 bg-gray-50/30"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{request.sectionTitle}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <User className="h-3 w-3" />
                      {showOnlyMyRequests ? 'You requested' : `Requested by ${getParentName(request.requestingParent)}`}
                      <span>•</span>
                      <span>{formatDate(request.createdAt)}</span>
                      {request.respondedAt && (
                        <>
                          <span>•</span>
                          <span>Responded {formatDate(request.respondedAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="mb-4 space-y-3">
                  <div>
                    <h5 className="text-xs font-medium text-gray-600 mb-2">Requested Changes:</h5>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                      {request.description}
                    </p>
                  </div>
                  
                  {request.legalLanguage && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Proposed Legal Language:</h5>
                      <div className="text-sm text-gray-800 bg-purple-50 p-3 rounded border border-purple-200">
                        "{request.legalLanguage}"
                      </div>
                    </div>
                  )}
                </div>

                {canTakeAction && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(request)}
                      className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}

                {/* Status messages for different states */}
                {request.status === 'pending' && !canTakeAction && showOnlyMyRequests && (
                  <p className="text-xs text-orange-700">
                    Waiting for your co-parent to review this request.
                  </p>
                )}

                {request.status === 'approved' && request.legalLanguage && (
                  <p className="text-xs text-blue-700">
                    Legal language has been generated and is awaiting final approval from both parties.
                  </p>
                )}

                {request.status === 'rejected' && (
                  <p className="text-xs text-red-700">
                    This request was declined{showOnlyMyRequests ? ' by your co-parent' : ''}.
                  </p>
                )}

                {request.status === 'completed' && (
                  <p className="text-xs text-green-700">
                    This change has been successfully added to your parenting plan.
                  </p>
                )}

                {request.status === 'discarded' && (
                  <p className="text-xs text-gray-700">
                    This request was discarded during the legal language review process.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        type={confirmDialog.type}
        request={confirmDialog.request}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, type: 'approve', request: null })}
      />
    </div>
  );
}