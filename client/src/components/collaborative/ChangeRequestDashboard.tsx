import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChangeRequestList } from './ChangeRequestList';
import { LegalLanguageReview } from './LegalLanguageReview';
import { ChangeRequest, UserRole } from '@/types/collaborative-editing';
import { 
  FileText, 
  Scale, 
  Clock, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

interface ChangeRequestDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  changeRequests: ChangeRequest[];
  currentUser: UserRole;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onApproveLegalLanguage: (requestId: string) => void;
  onRejectLegalLanguage: (requestId: string) => void;
}

export function ChangeRequestDashboard({
  isOpen,
  onClose,
  changeRequests,
  currentUser,
  onApprove,
  onReject,
  onApproveLegalLanguage,
  onRejectLegalLanguage
}: ChangeRequestDashboardProps) {
  const [activeTab, setActiveTab] = useState('requests');

  // Calculate counts for each tab
  const pendingRequests = changeRequests.filter(r => 
    r.status === 'pending' && r.requestingParent !== currentUser
  ).length;

  const legalReviewRequests = changeRequests.filter(r => 
    r.status === 'approved' && 
    r.legalLanguage && 
    r.legalLanguageApprovals?.[currentUser] === null
  ).length;

  const myRequests = changeRequests.filter(r => 
    r.requestingParent === currentUser
  ).length;

  const completedRequests = changeRequests.filter(r => 
    r.status === 'completed' || r.status === 'rejected' || r.status === 'discarded'
  ).length;

  // Auto-switch to tabs with pending actions
  React.useEffect(() => {
    if (legalReviewRequests > 0) {
      setActiveTab('legal-review');
    } else if (pendingRequests > 0) {
      setActiveTab('requests');
    }
  }, [legalReviewRequests, pendingRequests]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Change Request Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex gap-6">
          <TabsList className="flex flex-col h-fit w-64 p-1 bg-gray-50">
            <TabsTrigger 
              value="requests" 
              className="relative w-full justify-start p-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Pending Requests</div>
                    <div className="text-xs text-gray-500">Need your response</div>
                  </div>
                </div>
                {pendingRequests > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {pendingRequests}
                  </Badge>
                )}
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="legal-review" 
              className="relative w-full justify-start p-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Scale className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Legal Review</div>
                    <div className="text-xs text-gray-500">Approve legal language</div>
                  </div>
                </div>
                {legalReviewRequests > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {legalReviewRequests}
                  </Badge>
                )}
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="my-requests" 
              className="w-full justify-start p-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">My Requests</div>
                  <div className="text-xs text-gray-500">{myRequests} submitted</div>
                </div>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="completed" 
              className="w-full justify-start p-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Completed</div>
                  <div className="text-xs text-gray-500">{completedRequests} finished</div>
                </div>
              </div>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="requests" className="m-0 flex-1">
              <div className="space-y-4 h-full">
                {pendingRequests > 0 ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      <h3 className="font-medium text-orange-900">
                        Action Required: {pendingRequests} Request{pendingRequests !== 1 ? 's' : ''} Awaiting Your Response
                      </h3>
                    </div>
                    <p className="text-sm text-orange-800">
                      Your co-parent has submitted change requests that need your review and approval.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h3>
                    <p>There are no change requests waiting for your response.</p>
                  </div>
                )}
                
                <ChangeRequestList
                  changeRequests={changeRequests.filter(r => 
                    r.status === 'pending' && r.requestingParent !== currentUser
                  )}
                  currentUser={currentUser}
                  onApprove={onApprove}
                  onReject={onReject}
                  showOnlyPending={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="legal-review" className="m-0 flex-1">
              <div className="space-y-4 h-full">
                {legalReviewRequests > 0 ? (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium text-purple-900">
                        Legal Language Review Required: {legalReviewRequests} Item{legalReviewRequests !== 1 ? 's' : ''}
                      </h3>
                    </div>
                    <p className="text-sm text-purple-800">
                      Legal language has been generated for approved change requests and needs your final approval.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Scale className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Legal Reviews Pending</h3>
                    <p>There are no legal language reviews waiting for your approval.</p>
                  </div>
                )}
                
                <LegalLanguageReview
                  changeRequests={changeRequests}
                  currentUser={currentUser}
                  onApproveLegalLanguage={onApproveLegalLanguage}
                  onRejectLegalLanguage={onRejectLegalLanguage}
                />
              </div>
            </TabsContent>

            <TabsContent value="my-requests" className="m-0 flex-1">
              <div className="space-y-4 h-full">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900">Your Change Requests</h3>
                  </div>
                  <p className="text-sm text-blue-800">
                    Track the status of change requests you've submitted to your co-parent.
                  </p>
                </div>
                
                <ChangeRequestList
                  changeRequests={changeRequests.filter(r => r.requestingParent === currentUser)}
                  currentUser={currentUser}
                  onApprove={onApprove}
                  onReject={onReject}
                  showOnlyMyRequests={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="completed" className="m-0 flex-1">
              <div className="space-y-4 h-full">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-900">Completed Requests</h3>
                  </div>
                  <p className="text-sm text-green-800">
                    View the history of all completed, rejected, and discarded change requests.
                  </p>
                </div>
                
                <ChangeRequestList
                  changeRequests={changeRequests.filter(r => 
                    r.status === 'completed' || r.status === 'rejected' || r.status === 'discarded'
                  )}
                  currentUser={currentUser}
                  onApprove={onApprove}
                  onReject={onReject}
                  showOnlyCompleted={true}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}