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
  FileText, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  Eye,
  Scale
} from 'lucide-react';
import { ChangeRequest, UserRole } from '@/types/collaborative-editing';
import { cn } from '@/lib/utils';

interface LegalLanguageReviewProps {
  changeRequests: ChangeRequest[];
  currentUser: UserRole;
  onApproveLegalLanguage: (requestId: string) => void;
  onRejectLegalLanguage: (requestId: string) => void;
}

interface LegalReviewModalProps {
  isOpen: boolean;
  request: ChangeRequest | null;
  currentUser: UserRole;
  onApprove: () => void;
  onReject: () => void;
  onClose: () => void;
}

function LegalReviewModal({ 
  isOpen, 
  request, 
  currentUser, 
  onApprove, 
  onReject, 
  onClose 
}: LegalReviewModalProps) {
  if (!request || !request.legalLanguage) return null;

  const currentUserApproval = request.legalLanguageApprovals?.[currentUser];
  const otherUser = currentUser === 'parentA' ? 'parentB' : 'parentA';
  const otherUserApproval = request.legalLanguageApprovals?.[otherUser];

  const getParentName = (parent: UserRole) => {
    return parent === 'parentA' ? 'Eric' : 'Michelle';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-purple-600" />
            Legal Language Review: {request.sectionTitle}
          </DialogTitle>
          <DialogDescription>
            Review the generated legal language for this change request. Both parents must approve before it's added to the plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Request */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Original Change Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-900 font-medium mb-2">
                  Requested by: {getParentName(request.requestingParent)}
                </p>
                <p className="text-sm text-blue-800">{request.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Generated Legal Language */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Generated Legal Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm text-purple-900 whitespace-pre-wrap leading-relaxed">
                  {request.legalLanguage}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Approval Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Approval Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{getParentName('parentA')}</p>
                    <p className="text-xs text-gray-600">Parent A</p>
                  </div>
                  <div>
                    {request.legalLanguageApprovals?.parentA === true && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                    {request.legalLanguageApprovals?.parentA === false && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <X className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                    {request.legalLanguageApprovals?.parentA === null && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        <Eye className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{getParentName('parentB')}</p>
                    <p className="text-xs text-gray-600">Parent B</p>
                  </div>
                  <div>
                    {request.legalLanguageApprovals?.parentB === true && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                    {request.legalLanguageApprovals?.parentB === false && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <X className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                    {request.legalLanguageApprovals?.parentB === null && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        <Eye className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Required */}
          {currentUserApproval === null && (
            <Alert className="border-purple-200 bg-purple-50">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-700">
                <strong>Your approval is required.</strong> Please review the legal language above and decide whether to approve or reject it.
              </AlertDescription>
            </Alert>
          )}

          {/* Already Responded */}
          {currentUserApproval !== null && (
            <Alert className={cn(
              currentUserApproval ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
            )}>
              <CheckCircle className={cn(
                "h-4 w-4",
                currentUserApproval ? "text-green-600" : "text-red-600"
              )} />
              <AlertDescription className={cn(
                currentUserApproval ? "text-green-700" : "text-red-700"
              )}>
                You have {currentUserApproval ? 'approved' : 'rejected'} this legal language.
                {otherUserApproval === null && ' Waiting for your co-parent to respond.'}
                {otherUserApproval === true && currentUserApproval && ' Both parties have approved - this change will be added to your plan.'}
                {otherUserApproval === false && ' Your co-parent has rejected this language - the request will be discarded.'}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          {currentUserApproval === null && (
            <>
              <Button
                variant="outline"
                onClick={onReject}
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Reject Language
              </Button>
              <Button
                onClick={onApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Language
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function LegalLanguageReview({
  changeRequests,
  currentUser,
  onApproveLegalLanguage,
  onRejectLegalLanguage
}: LegalLanguageReviewProps) {
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter requests that have legal language ready for review
  const legalReviewRequests = changeRequests.filter(request => 
    request.status === 'approved' && 
    request.legalLanguage && 
    request.legalLanguageApprovals
  );

  const pendingReviewRequests = legalReviewRequests.filter(request =>
    request.legalLanguageApprovals?.[currentUser] === null
  );

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

  const handleReviewClick = (request: ChangeRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    if (selectedRequest) {
      onApproveLegalLanguage(selectedRequest.id);
      setIsModalOpen(false);
      setSelectedRequest(null);
    }
  };

  const handleReject = () => {
    if (selectedRequest) {
      onRejectLegalLanguage(selectedRequest.id);
      setIsModalOpen(false);
      setSelectedRequest(null);
    }
  };

  if (legalReviewRequests.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
          {legalReviewRequests.map((request) => {
            const currentUserApproval = request.legalLanguageApprovals?.[currentUser];
            const otherUser = currentUser === 'parentA' ? 'parentB' : 'parentA';
            const otherUserApproval = request.legalLanguageApprovals?.[otherUser];
            const needsAction = currentUserApproval === null;

            return (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div
                    className={cn(
                      "border rounded-lg p-4",
                      needsAction && "border-purple-200 bg-purple-50/50",
                      !needsAction && "border-gray-200 bg-gray-50/50"
                    )}
                  >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{request.sectionTitle}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <span>Requested by {getParentName(request.requestingParent)}</span>
                      <span>•</span>
                      <span>{formatDate(request.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {currentUserApproval === true && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        You Approved
                      </Badge>
                    )}
                    {currentUserApproval === false && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <X className="h-3 w-3 mr-1" />
                        You Rejected
                      </Badge>
                    )}
                    {needsAction && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        <Eye className="h-3 w-3 mr-1" />
                        Review Needed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-700 bg-white p-3 rounded border line-clamp-2">
                    {request.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    Approvals: {getParentName('parentA')} {
                      request.legalLanguageApprovals?.parentA === true ? '✓' : 
                      request.legalLanguageApprovals?.parentA === false ? '✗' : '⏳'
                    } • {getParentName('parentB')} {
                      request.legalLanguageApprovals?.parentB === true ? '✓' : 
                      request.legalLanguageApprovals?.parentB === false ? '✗' : '⏳'
                    }
                  </div>
                  
                  <Button
                    size="sm"
                    variant={needsAction ? "default" : "outline"}
                    onClick={() => handleReviewClick(request)}
                    className={needsAction ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {needsAction ? 'Review & Approve' : 'View Details'}
                  </Button>
                </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

      <LegalReviewModal
        isOpen={isModalOpen}
        request={selectedRequest}
        currentUser={currentUser}
        onApprove={handleApprove}
        onReject={handleReject}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRequest(null);
        }}
      />
    </div>
  );
}