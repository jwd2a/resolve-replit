import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ExitConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitConfirmationModal({ isOpen, onConfirm, onCancel }: ExitConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Are you sure you want to leave the course?
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p className="text-gray-700 text-center leading-relaxed font-medium">
            You'll need to complete co-parent registration again to rejoin.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 text-center text-sm leading-relaxed">
              💾 Your progress is automatically saved
            </p>
          </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onConfirm}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Leave Anyway
          </Button>
          <Button
            onClick={onCancel}
            className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white"
          >
            Stay in Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}