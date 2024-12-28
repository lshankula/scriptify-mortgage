import React from 'react';
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PlatformSelect } from '../PlatformSelect';
import { PostTypeSelect } from '../PostTypeSelect';

interface FormHeaderProps {
  postType: string;
  selectedPlatform: string;
  onChangePostType: (type: string) => void;
  setSelectedPlatform: (platform: string) => void;
  setShowIdeasDialog: (show: boolean) => void;
}

export const FormHeader = ({
  postType,
  selectedPlatform,
  onChangePostType,
  setSelectedPlatform,
  setShowIdeasDialog
}: FormHeaderProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Content</h2>
      <p className="text-gray-600 mb-6">Create engaging content for your audience</p>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px] space-y-2">
          <Label>Select Purpose</Label>
          <PostTypeSelect 
            value={postType} 
            onValueChange={onChangePostType} 
          />
        </div>
        
        <div className="flex-1 min-w-[200px] space-y-2">
          <Label>Select Platform</Label>
          <PlatformSelect 
            value={selectedPlatform} 
            onValueChange={setSelectedPlatform} 
          />
        </div>

        <div className="flex items-end">
          <Button 
            variant="outline" 
            className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-800"
            onClick={() => setShowIdeasDialog(true)}
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Need Content Ideas?
          </Button>
        </div>
      </div>
    </div>
  );
};