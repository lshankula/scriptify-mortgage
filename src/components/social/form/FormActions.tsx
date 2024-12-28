import React from 'react';
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onSaveDraft?: () => void;
  onNext: () => void;
}

export const FormActions = ({ onSaveDraft, onNext }: FormActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <Button 
        variant="outline"
        onClick={onSaveDraft}
      >
        Save Draft
      </Button>
      <Button onClick={onNext}>
        Review Post
      </Button>
    </div>
  );
};