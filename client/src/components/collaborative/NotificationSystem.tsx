import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Bell, 
  Check, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  FileText,
  Eye
} from 'lucide-react';
import { Notification, NotificationType } from '@/types/collaborative-editing';
import { cn } from '@/lib/utils';

interface NotificationSystemProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (notificationId: string) => void;
  onNotificationClick?: (notification: Notification) => void;
}

export function NotificationSystem({
  notifications,
  unreadCount,
  onMarkAsRead,
  onNotificationClick
}: NotificationSystemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'change_request':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'approval_needed':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'request_approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'request_rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'modification_complete':
        return <Check className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'change_request':
        return 'border-l-blue-400 bg-blue-50';
      case 'approval_needed':
        return 'border-l-orange-400 bg-orange-50';
      case 'request_approved':
        return 'border-l-green-400 bg-green-50';
      case 'request_rejected':
        return 'border-l-red-400 bg-red-50';
      case 'modification_complete':
        return 'border-l-purple-400 bg-purple-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    
    setIsOpen(false);
  };

  const markAllAsRead = () => {
    notifications.filter(n => !n.isRead).forEach(n => onMarkAsRead(n.id));
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-auto p-1"
            >
              Mark all read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No notifications yet
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <DropdownMenuItem
                  className={cn(
                    "p-0 cursor-pointer",
                    !notification.isRead && "bg-blue-50/50"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={cn(
                    "w-full p-3 border-l-4 transition-colors",
                    getNotificationColor(notification.type),
                    !notification.isRead && "bg-opacity-100",
                    notification.isRead && "bg-opacity-50"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={cn(
                            "text-sm font-medium truncate",
                            !notification.isRead && "text-gray-900",
                            notification.isRead && "text-gray-600"
                          )}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2" />
                          )}
                        </div>
                        
                        <p className={cn(
                          "text-xs mt-1 line-clamp-2",
                          !notification.isRead && "text-gray-700",
                          notification.isRead && "text-gray-500"
                        )}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                          
                          {notification.actionUrl && (
                            <div className="flex items-center text-xs text-blue-600">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                
                {index < notifications.length - 1 && (
                  <DropdownMenuSeparator className="my-0" />
                )}
              </div>
            ))}
          </div>
        )}
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}