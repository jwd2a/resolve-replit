import { 
  ChangeRequest, 
  Notification, 
  SectionVersion, 
  EmailNotification, 
  UserRole, 
  RequestStatus,
  NotificationType,
  EmailType 
} from '@/types/collaborative-editing';

class MockDataService {
  private changeRequests: ChangeRequest[] = [];
  private notifications: Notification[] = [];
  private sectionHistory: SectionVersion[] = [];
  private emailQueue: EmailNotification[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Sample change requests in various states
    this.changeRequests = [
      {
        id: 'req-001',
        sectionId: '11',
        sectionTitle: 'Holiday Schedule',
        requestingParent: 'parentA',
        description: 'I would like to modify the Christmas schedule to allow for alternating Christmas Eve and Christmas Day, rather than the full day alternating. This would give both parents time with the children during the Christmas period each year.',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        id: 'req-002',
        sectionId: '10',
        sectionTitle: 'Weekday and Weekend Schedule',
        requestingParent: 'parentB',
        description: 'Can we adjust the Sunday exchange time from 6:00 PM to 7:00 PM? This would give us more time for Sunday activities and reduce the rush.',
        status: 'approved',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        respondedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        legalLanguage: 'During the school year, exchanges will occur on Sunday evenings at 7:00 PM. The receiving parent will pick up the child(ren) from the other parent\'s residence. Weekend activities and commitments should be coordinated between both parents to ensure consistency for the child(ren).',
        legalLanguageApprovals: {
          parentA: true,
          parentB: null
        }
      },
      {
        id: 'req-003',
        sectionId: '14',
        sectionTitle: 'Travel & Work Restrictions',
        requestingParent: 'parentA',
        description: 'I think we should reduce the advance notice for out-of-state travel from 30 days to 14 days for non-vacation travel, like family emergencies or work requirements.',
        status: 'rejected',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        respondedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      }
    ];

    // Sample notifications
    this.notifications = [
      {
        id: 'notif-001',
        type: 'change_request',
        title: 'New Change Request',
        message: 'Eric has requested changes to the Holiday Schedule section',
        actionUrl: '/parenting-plan3#11',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        relatedRequestId: 'req-001',
        targetUser: 'parentB'
      },
      {
        id: 'notif-002',
        type: 'approval_needed',
        title: 'Legal Language Ready for Review',
        message: 'Please review the legal language for the Weekday Schedule changes',
        actionUrl: '/parenting-plan3#10',
        isRead: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        relatedRequestId: 'req-002',
        targetUser: 'parentB'
      },
      {
        id: 'notif-003',
        type: 'request_rejected',
        title: 'Change Request Declined',
        message: 'Your request to modify Travel & Work Restrictions was declined',
        isRead: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        relatedRequestId: 'req-003',
        targetUser: 'parentA'
      }
    ];

    // Sample section history
    this.sectionHistory = [
      {
        id: 'hist-001',
        sectionId: '10',
        content: 'Our regular timesharing schedule will be based on alternating weeks, running from Sunday evening to Sunday evening. During the school year, exchanges will occur on Sunday evenings at 6:00 PM. The receiving parent will pick up the child(ren) from the other parent\'s residence.',
        modifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        version: 1
      },
      {
        id: 'hist-002',
        sectionId: '11',
        content: 'Holidays will be alternated annually between parents unless otherwise agreed. Major holidays include: Christmas Day, Thanksgiving Day, New Year\'s Day, Easter, Memorial Day, Independence Day, Labor Day, and the child(ren)\'s birthday.',
        modifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        version: 1
      }
    ];

    // Sample email queue
    this.emailQueue = [
      {
        id: 'email-001',
        to: 'mmrabinovitz@gmail.com',
        from: 'noreply@parentingplan.com',
        subject: 'Change Request: Holiday Schedule',
        body: this.generateChangeRequestEmail('Eric', 'Holiday Schedule', 'I would like to modify the Christmas schedule...'),
        type: 'change_request',
        sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        relatedRequestId: 'req-001'
      }
    ];
  }

  // Change Request Methods
  createChangeRequest(sectionId: string, sectionTitle: string, description: string, requestingParent: UserRole): ChangeRequest {
    const request: ChangeRequest = {
      id: `req-${Date.now()}`,
      sectionId,
      sectionTitle,
      requestingParent,
      description,
      status: 'pending',
      createdAt: new Date()
    };

    this.changeRequests.push(request);
    
    // Create notification for co-parent with realistic delay
    const targetUser = requestingParent === 'parentA' ? 'parentB' : 'parentA';
    setTimeout(() => {
      this.createNotification(
        'change_request',
        'New Change Request',
        `${this.getParentName(requestingParent)} has requested changes to the ${sectionTitle} section`,
        targetUser,
        request.id
      );
    }, 500);

    // Simulate email with realistic delay
    setTimeout(() => {
      this.sendEmail(
        this.getParentEmail(targetUser),
        'Change Request: ' + sectionTitle,
        this.generateChangeRequestEmail(this.getParentName(requestingParent), sectionTitle, description),
        'change_request',
        request.id
      );
    }, 1000);

    return request;
  }

  updateChangeRequestStatus(requestId: string, status: RequestStatus, respondingParent?: UserRole): void {
    const request = this.changeRequests.find(r => r.id === requestId);
    if (!request) return;

    request.status = status;
    request.respondedAt = new Date();

    if (status === 'approved') {
      // Generate legal language
      request.legalLanguage = this.generateLegalLanguage(request.description, request.sectionId);
      request.legalLanguageApprovals = {
        parentA: null,
        parentB: null
      };

      // Notify both parents for legal review
      this.createNotification(
        'approval_needed',
        'Legal Language Ready for Review',
        `Please review the legal language for ${request.sectionTitle} changes`,
        'parentA',
        request.id
      );
      this.createNotification(
        'approval_needed',
        'Legal Language Ready for Review',
        `Please review the legal language for ${request.sectionTitle} changes`,
        'parentB',
        request.id
      );
    } else if (status === 'rejected') {
      // Notify requesting parent
      this.createNotification(
        'request_rejected',
        'Change Request Declined',
        `Your request to modify ${request.sectionTitle} was declined`,
        request.requestingParent,
        request.id
      );
    }
  }

  approveLegalLanguage(requestId: string, approvingParent: UserRole): void {
    const request = this.changeRequests.find(r => r.id === requestId);
    if (!request || !request.legalLanguageApprovals) return;

    request.legalLanguageApprovals[approvingParent] = true;

    // Check if both parents have approved
    if (request.legalLanguageApprovals.parentA && request.legalLanguageApprovals.parentB) {
      request.status = 'completed';
      
      // Add to section history
      this.addSectionVersion(
        request.sectionId,
        request.legalLanguage!,
        request.description,
        request.requestingParent,
        request.id
      );

      // Notify both parents
      this.createNotification(
        'modification_complete',
        'Plan Updated',
        `${request.sectionTitle} has been successfully updated`,
        'parentA',
        request.id
      );
      this.createNotification(
        'modification_complete',
        'Plan Updated',
        `${request.sectionTitle} has been successfully updated`,
        'parentB',
        request.id
      );
    }
  }

  rejectLegalLanguage(requestId: string, rejectingParent: UserRole): void {
    const request = this.changeRequests.find(r => r.id === requestId);
    if (!request) return;

    request.status = 'discarded';

    // Notify both parents
    this.createNotification(
      'request_rejected',
      'Legal Language Rejected',
      `The legal language for ${request.sectionTitle} changes was rejected`,
      request.requestingParent === 'parentA' ? 'parentB' : 'parentA',
      request.id
    );
    this.createNotification(
      'request_rejected',
      'Legal Language Rejected',
      `The legal language for ${request.sectionTitle} changes was rejected`,
      request.requestingParent,
      request.id
    );
  }

  // Notification Methods
  createNotification(type: NotificationType, title: string, message: string, targetUser: UserRole, relatedRequestId?: string): void {
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date(),
      targetUser,
      relatedRequestId
    };

    this.notifications.push(notification);
  }

  markNotificationAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  }

  // Section History Methods
  addSectionVersion(sectionId: string, content: string, changeDescription: string, modifiedBy: UserRole, changeRequestId: string): void {
    const currentVersions = this.sectionHistory.filter(h => h.sectionId === sectionId);
    const nextVersion = Math.max(...currentVersions.map(v => v.version), 0) + 1;

    const version: SectionVersion = {
      id: `hist-${Date.now()}`,
      sectionId,
      content,
      changeDescription,
      modifiedBy,
      modifiedAt: new Date(),
      changeRequestId,
      version: nextVersion
    };

    this.sectionHistory.push(version);
  }

  // Email Methods
  sendEmail(to: string, subject: string, body: string, type: EmailType, relatedRequestId?: string): void {
    const email: EmailNotification = {
      id: `email-${Date.now()}`,
      to,
      from: 'noreply@parentingplan.com',
      subject,
      body,
      type,
      sentAt: new Date(),
      relatedRequestId
    };

    this.emailQueue.push(email);
  }

  // Getter Methods
  getChangeRequests(): ChangeRequest[] {
    return [...this.changeRequests];
  }

  getChangeRequestsForUser(user: UserRole): ChangeRequest[] {
    return this.changeRequests.filter(r => 
      r.requestingParent === user || 
      (r.status === 'pending' && r.requestingParent !== user) ||
      (r.status === 'approved' && r.legalLanguageApprovals)
    );
  }

  getNotificationsForUser(user: UserRole): Notification[] {
    return this.notifications.filter(n => n.targetUser === user);
  }

  getUnreadNotificationCount(user: UserRole): number {
    return this.notifications.filter(n => n.targetUser === user && !n.isRead).length;
  }

  getSectionHistory(sectionId: string): SectionVersion[] {
    return this.sectionHistory
      .filter(h => h.sectionId === sectionId)
      .sort((a, b) => b.version - a.version);
  }

  getEmailQueue(): EmailNotification[] {
    return [...this.emailQueue];
  }

  // Utility Methods
  private getParentName(parent: UserRole): string {
    return parent === 'parentA' ? 'Eric' : 'Michelle';
  }

  private getParentEmail(parent: UserRole): string {
    return parent === 'parentA' ? 'ebrcapital@gmail.com' : 'mmrabinovitz@gmail.com';
  }

  private generateLegalLanguage(description: string, sectionId: string): string {
    // Mock legal language generation based on common patterns
    const templates = {
      '10': 'Our regular timesharing schedule will be based on alternating weeks, running from Sunday evening to Sunday evening. During the school year, exchanges will occur on Sunday evenings at [TIME]. The receiving parent will pick up the child(ren) from the other parent\'s residence. Weekend activities and commitments should be coordinated between both parents to ensure consistency for the child(ren).',
      '11': 'Holidays will be alternated annually between parents unless otherwise agreed. Major holidays include: Christmas Day, Thanksgiving Day, New Year\'s Day, Easter, Memorial Day, Independence Day, Labor Day, and the child(ren)\'s birthday. [HOLIDAY_MODIFICATION] The child(ren)\'s birthday celebrations may be shared or alternated as agreed upon by both parents, with both parents having the right to celebrate with the child(ren).',
      '14': 'Neither parent may travel with the child(ren) outside of the state of Florida without written consent from the other parent at least [DAYS] days in advance, except for medical emergencies. For any travel exceeding 100 miles from the child(ren)\'s primary residence, 48-hour advance notice is required. Work-related travel that interferes with scheduled timesharing should be discussed and arrangements made for alternative care or schedule adjustments.'
    };

    let template = templates[sectionId as keyof typeof templates] || 'The following modification has been agreed upon: [MODIFICATION]';
    
    // Simple replacements based on description content
    if (description.includes('7:00 PM')) {
      template = template.replace('[TIME]', '7:00 PM');
    }
    if (description.includes('Christmas Eve')) {
      template = template.replace('[HOLIDAY_MODIFICATION]', 'Christmas Eve and Christmas Day will be alternated separately, with Christmas Eve (6:00 PM December 24 - 6:00 AM December 25) and Christmas Day (6:00 AM December 25 - 6:00 AM December 26) alternating between parents annually.');
    }
    if (description.includes('14 days')) {
      template = template.replace('[DAYS]', '14');
    }

    return template;
  }

  private generateChangeRequestEmail(fromParent: string, sectionTitle: string, description: string): string {
    return `
Dear Co-Parent,

${fromParent} has submitted a request to modify the "${sectionTitle}" section of your Parenting Partnership Agreement.

Request Details:
${description}

Please log into your account to review this request and provide your response. You can approve or decline this request, and if approved, you'll have the opportunity to review the specific legal language before it's added to your agreement.

To review this request, please visit: [Your Parenting Plan Dashboard]

Best regards,
The Parenting Plan Team

---
This is an automated message. Please do not reply to this email.
    `.trim();
  }
}

export const mockDataService = new MockDataService();