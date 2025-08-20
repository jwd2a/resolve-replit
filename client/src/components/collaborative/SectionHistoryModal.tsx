import React, { useState } from 'react';
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
import { 
  History, 
  User, 
  Calendar, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  GitBranch,
  Clock
} from 'lucide-react';
import { SectionVersion, UserRole } from '@/types/collaborative-editing';
import { cn } from '@/lib/utils';

interface SectionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  sectionTitle: string;
  history: SectionVersion[];
}

interface VersionCardProps {
  version: SectionVersion;
  isLatest: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

function VersionCard({ version, isLatest, isExpanded, onToggleExpanded }: VersionCardProps) {
  const getParentName = (parent: UserRole) => {
    return parent === 'parentA' ? 'Eric' : 'Michelle';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={cn(
      "transition-all duration-200",
      isLatest && "border-green-200 bg-green-50/50",
      !isLatest && "border-gray-200"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              isLatest ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
            )}>
              v{version.version}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm">
                  {isLatest ? 'Current Version' : `Version ${version.version}`}
                </CardTitle>
                {isLatest && (
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                    <GitBranch className="h-3 w-3 mr-1" />
                    Latest
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(version.modifiedAt)}
                </div>
                
                {version.modifiedBy && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {getParentName(version.modifiedBy)}
                  </div>
                )}
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
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {version.changeDescription && (
          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800 border-l-2 border-blue-200">
            <strong>Change:</strong> {version.changeDescription}
          </div>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="bg-white p-4 rounded border">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Section Content</span>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
              {version.content}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function SectionHistoryModal({
  isOpen,
  onClose,
  sectionId,
  sectionTitle,
  history
}: SectionHistoryModalProps) {
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set());

  const toggleExpanded = (versionId: string) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(versionId)) {
      newExpanded.delete(versionId);
    } else {
      newExpanded.add(versionId);
    }
    setExpandedVersions(newExpanded);
  };

  const sortedHistory = [...history].sort((a, b) => b.version - a.version);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" />
            Section History: {sectionTitle}
          </DialogTitle>
          <DialogDescription>
            View all versions and changes made to this section over time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {sortedHistory.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No History Available</h3>
                <p className="text-gray-600">
                  This section hasn't been modified yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {sortedHistory.length} version{sortedHistory.length !== 1 ? 's' : ''} found
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (expandedVersions.size === sortedHistory.length) {
                      setExpandedVersions(new Set());
                    } else {
                      setExpandedVersions(new Set(sortedHistory.map(v => v.id)));
                    }
                  }}
                >
                  {expandedVersions.size === sortedHistory.length ? 'Collapse All' : 'Expand All'}
                </Button>
              </div>

              <div className="space-y-4">
                {sortedHistory.map((version, index) => (
                  <VersionCard
                    key={version.id}
                    version={version}
                    isLatest={index === 0}
                    isExpanded={expandedVersions.has(version.id)}
                    onToggleExpanded={() => toggleExpanded(version.id)}
                  />
                ))}
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