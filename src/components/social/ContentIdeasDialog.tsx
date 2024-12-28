import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

interface ContentIdeasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectIdea: (idea: string) => void;
  ideas: string[];
}

export const ContentIdeasDialog = ({ 
  open, 
  onOpenChange, 
  onSelectIdea,
  ideas 
}: ContentIdeasDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Quick Content Ideas</DialogTitle>
            <DialogClose className="w-4 h-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {ideas.map((idea, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <p>{idea}</p>
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-700 hover:bg-transparent"
                onClick={() => {
                  onSelectIdea(idea);
                  onOpenChange(false);
                }}
              >
                Use This <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};