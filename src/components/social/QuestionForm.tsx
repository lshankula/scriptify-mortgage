import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { questions } from '@/data/questions';
import { Answers } from '@/types/social';
import { Lightbulb } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { PlatformSelect } from './PlatformSelect';
import { PostTypeSelect } from './PostTypeSelect';
import { ContentIdeasDialog } from './ContentIdeasDialog';

interface QuestionFormProps {
  answers: Answers;
  postType: string;
  onAnswerChange: (questionId: string, answer: string) => void;
  onChangePostType: (type: string) => void;
  onNext: () => void;
  onSaveDraft?: () => void;
}

const quickIdeas = [
  "Share a recent client success story",
  "Market update on interest rates",
  "First-time homebuyer tip",
  "Myth-busting common mortgage misconceptions",
  "Team highlight or behind-the-scenes",
  "Local market statistics",
  "Mortgage process explanation",
  "Client testimonial feature",
  "Homebuying checklist",
  "Partnership announcement with local agent"
];

export const QuestionForm = ({
  answers,
  postType,
  onAnswerChange,
  onChangePostType,
  onNext,
  onSaveDraft
}: QuestionFormProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("linkedin");
  const [showIdeasDialog, setShowIdeasDialog] = useState(false);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Create Content</h2>
        <p className="text-gray-600 mb-6">Create engaging content for your audience</p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <PostTypeSelect 
              value={postType} 
              onValueChange={onChangePostType} 
            />
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <PlatformSelect 
              value={selectedPlatform} 
              onValueChange={setSelectedPlatform} 
            />
          </div>

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

      <ContentIdeasDialog
        open={showIdeasDialog}
        onOpenChange={setShowIdeasDialog}
        onSelectIdea={(idea) => onAnswerChange('topic', idea)}
        ideas={quickIdeas}
      />

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Post Content</h3>
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {q.question}
              </label>
              <Textarea
                className="w-full"
                placeholder={q.placeholder}
                value={answers[q.id] || ''}
                onChange={(e) => onAnswerChange(q.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};