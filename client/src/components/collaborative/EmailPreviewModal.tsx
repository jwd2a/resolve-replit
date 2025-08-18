import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  User,
  Calendar,
  Eye,
  X
} from 'lucide-react';
import { EmailNotification, EmailType } from '@/types/collaborative-editing';
import { cn } from '@/lib/utils';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  emails: EmailNotification[];
}

interface EmailCardProps {
  email: EmailNotification;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

function EmailCard({ email, isExpanded, onToggleExpanded }: EmailCardProps) {
  const getEmailTypeColor = (type: EmailType) => {
    switch (type) {
      case 'change_request':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approval_response':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'legal_review':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'modification_complete':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEmailTypeLabel = (type: EmailType) => {
    switch (type) {
      case 'change_request':
        return 'Change Request';
      case 'approval_response':
        return 'Approval Response';
      case 'legal_review':
        return 'Legal Review';
      case 'modification_complete':
        return 'Modification Complete';
      default:
        return 'Notification';
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

  return (
    <Card className="transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-sm font-medium">{email.subject}</CardTitle>
                <Badge className={getEmailTypeColor(email.type)}>
                  {getEmailTypeLabel(email.type)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  To: {email.to}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(email.sentAt)}
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Delivered
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <X className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="bg-gray-50 p-4 rounded border">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Email Content</span>
            </div>
            
            <div className="bg-white p-4 rounded border text-sm">
              <div className="border-b pb-2 mb-3 text-xs text-gray-600">
                <div><strong>From:</strong> {email.from}</div>
                <div><strong>To:</strong> {email.to}</div>
                <div><strong>Subject:</strong> {email.subject}</div>
                <div><strong>Date:</strong> {email.sentAt.toLocaleString()}</div>
              </div>
              
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {email.body}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function EmailPreviewModal({
  isOpen,
  onClose,
  emails
}: EmailPreviewModalProps) {
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set());
  const [simulatedDelivery, setSimulatedDelivery] = useState<Set<string>>(new Set());

  // Simulate email delivery with delays
  useEffect(() => {
    if (!isOpen) return;

    const recentEmails = emails.filter(email => 
      Date.now() - email.sentAt.getTime() < 5000 // Last 5 seconds
    );

    recentEmails.forEach(email => {
      if (!simulatedDelivery.has(email.id)) {
        const delay = Math.random() * 2000 + 1000; // 1-3 second delay
        setTimeout(() => {
          setSimulatedDelivery(prev => new Set([...prev, email.id]));
        }, delay);
      }
    });
  }, [emails, isOpen, simulatedDelivery]);

  const toggleExpanded = (emailId: string) => {
    const newExpanded = new Set(expandedEmails);
    if (newExpanded.has(emailId)) {
      newExpanded.delete(emailId);
    } else {
      newExpanded.add(emailId);
    }
    setExpandedEmails(newExpanded);
  };

  const sortedEmails = [...emails].sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Email Notifications ({emails.length})
          </DialogTitle>
          <DialogDescription>
            Preview of email notifications sent to co-parents during the collaborative editing process.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {sortedEmails.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Emails Sent</h3>
                <p className="text-gray-600">
                  No email notifications have been sent yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Alert className="border-blue-200 bg-blue-50">
                <Send className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  <strong>Demo Mode:</strong> These are simulated email notifications. In a real application, 
                  these would be sent to the actual email addresses of the co-parents.
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {sortedEmails.length} email{sortedEmails.length !== 1 ? 's' : ''} sent
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (expandedEmails.size === sortedEmails.length) {
                      setExpandedEmails(new Set());
                    } else {
                      setExpandedEmails(new Set(sortedEmails.map(e => e.id)));
                    }
                  }}
                >
                  {expandedEmails.size === sortedEmails.length ? 'Collapse All' : 'Expand All'}
                </Button>
              </div>

              <div className="space-y-4">
                {sortedEmails.map((email) => {
                  const isDelivered = simulatedDelivery.has(email.id);
                  const isRecent = Date.now() - email.sentAt.getTime() < 5000;

                  return (
                    <div key={email.id} className="relative">
                      {isRecent && !isDelivered && (
                        <div className="absolute top-2 right-2 z-10">
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 animate-pulse">
                            <Clock className="h-3 w-3 mr-1" />
                            Sending...
                          </Badge>
                        </div>
                      )}
                      
                      <EmailCard
                        email={email}
                        isExpanded={expandedEmails.has(email.id)}
                        onToggleExpanded={() => toggleExpanded(email.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}