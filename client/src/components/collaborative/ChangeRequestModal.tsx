import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit3, AlertCircle, Send } from 'lucide-react';

interface ChangeRequestModalProps {
  isOpen: boolean;
  sectionTitle: string;
  sectionContent?: string;
  onSubmit: (description: string) => void;
  onClose: () => void;
}

export function ChangeRequestModal({
  isOpen,
  sectionTitle,
  sectionContent,
  onSubmit,
  onClose
}: ChangeRequestModalProps) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (description.trim().length < 20) {
      setError('Please provide at least 20 characters describing your requested changes.');
      return;
    }

    onSubmit(description.trim());
    setDescription('');
    setError('');
  };

  const handleClose = () => {
    setDescription('');
    setError('');
    onClose();
  };

  const characterCount = description.length;
  const isValid = characterCount >= 20;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-blue-600" />
            Request Changes to "{sectionTitle}"
          </DialogTitle>
          <DialogDescription>
            Describe the changes you'd like to make to this section. Your co-parent will review your request and can approve or decline it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {sectionContent && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Current Section Content:
              </Label>
              <div className="text-sm text-gray-600 max-h-32 overflow-y-auto whitespace-pre-wrap">
                {sectionContent.substring(0, 300)}
                {sectionContent.length > 300 && '...'}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="change-description" className="text-sm font-medium">
              Describe Your Requested Changes *
            </Label>
            <Textarea
              id="change-description"
              placeholder="Please explain what changes you'd like to make and why. Be specific about what should be modified, added, or removed from this section."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError('');
              }}
              className="min-h-[120px] resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                {characterCount}/1000 characters
                {characterCount < 20 && ` (${20 - characterCount} more needed)`}
              </span>
              <span className={isValid ? 'text-green-600' : 'text-gray-400'}>
                {isValid ? '✓ Ready to submit' : 'Minimum 20 characters required'}
              </span>
            </div>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Your co-parent will receive an email notification about your request</li>
              <li>They can review and either approve or decline your request</li>
              <li>If approved, legal language will be generated for both of you to review</li>
              <li>Once both parties approve the legal language, the change will be added to your plan</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}