export type UserRole = 'parentA' | 'parentB';
export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'discarded';
export type NotificationType = 'change_request' | 'approval_needed' | 'request_approved' | 'request_rejected' | 'modification_complete';
export type EmailType = 'change_request' | 'approval_response' | 'legal_review' | 'modification_complete';

export interface ChangeRequest {
  id: string;
  sectionId: string;
  sectionTitle: string;
  requestingParent: UserRole;
  description: string;
  status: RequestStatus;
  createdAt: Date;
  respondedAt?: Date;
  legalLanguage?: string;
  legalLanguageApprovals?: {
    parentA: boolean | null;
    parentB: boolean | null;
  };
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: Date;
  relatedRequestId?: string;
  targetUser: UserRole;
}

export interface SectionVersion {
  id: string;
  sectionId: string;
  content: string;
  changeDescription?: string;
  modifiedBy?: UserRole;
  modifiedAt: Date;
  changeRequestId?: string;
  version: number;
}

export interface EmailNotification {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  type: EmailType;
  sentAt: Date;
  relatedRequestId?: string;
}

export interface SectionState {
  hasModifications: boolean;
  hasPendingRequests: boolean;
  pendingRequestCount: number;
  lastModified?: Date;
  currentVersion: number;
}