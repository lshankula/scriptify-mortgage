import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { questions } from '@/data/questions';
import { Answers } from '@/types/social';
import { postTypes } from '@/data/postTypes';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  ChevronDown,
  Lightbulb,
  ArrowRight,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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
            <Select value={postType} onValueChange={onChangePostType}>
              <SelectTrigger className="w-full bg-white border-gray-200">
                <SelectValue placeholder="Select Purpose" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {Object.entries(postTypes).map(([key, type]) => (
                  <SelectItem key={key} value={key} className="flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      {type.icon}
                      {type.title}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-full bg-white border-gray-200">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="linkedin">
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </span>
                </SelectItem>
                <SelectItem value="facebook">
                  <span className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </span>
                </SelectItem>
                <SelectItem value="instagram">
                  <span className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </span>
                </SelectItem>
                <SelectItem value="twitter">
                  <span className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
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

      <Dialog open={showIdeasDialog} onOpenChange={setShowIdeasDialog}>
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
            {quickIdeas.map((idea, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <p>{idea}</p>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-700 hover:bg-transparent"
                  onClick={() => {
                    onAnswerChange('topic', idea);
                    setShowIdeasDialog(false);
                  }}
                >
                  Use This <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Post Content</h3>
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {q.question}
              </label>
              {q.type === 'select' ? (
                <Select 
                  value={answers[q.id]} 
                  onValueChange={(value) => onAnswerChange(q.id, value)}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {q.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Textarea
                  className="w-full"
                  placeholder={q.placeholder}
                  value={answers[q.id] || ''}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                />
              )}
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