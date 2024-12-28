import React from 'react';
import { Button } from "@/components/ui/button";
import { questions } from '@/data/questions';
import { Answers } from '@/types/social';
import { postTypes } from '@/data/postTypes';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface QuestionFormProps {
  answers: Answers;
  postType: string;
  onAnswerChange: (questionId: string, answer: string) => void;
  onChangePostType: (type: string) => void;
  onNext: () => void;
  onSaveDraft?: () => void;
}

export const QuestionForm = ({
  answers,
  postType,
  onAnswerChange,
  onChangePostType,
  onNext,
  onSaveDraft
}: QuestionFormProps) => {
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>("linkedin");
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Create Content</h2>
        <p className="text-gray-600 mb-6">Create engaging content for your audience</p>
        
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <ToggleGroup 
              type="single" 
              value={postType}
              onValueChange={(value) => value && onChangePostType(value)}
              className="justify-start border rounded-lg p-2 bg-white"
            >
              {Object.entries(postTypes).map(([key, type]) => (
                <ToggleGroupItem 
                  key={key} 
                  value={key}
                  className="flex items-center gap-2 data-[state=on]:bg-blue-50"
                >
                  {type.icon}
                  <span>{type.title}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          <div className="flex-1">
            <ToggleGroup 
              type="single"
              value={selectedPlatform}
              onValueChange={(value) => value && setSelectedPlatform(value)}
              className="justify-start border rounded-lg p-2 bg-white"
            >
              <ToggleGroupItem value="linkedin" className="data-[state=on]:bg-blue-50">
                <Linkedin className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="facebook" className="data-[state=on]:bg-blue-50">
                <Facebook className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="instagram" className="data-[state=on]:bg-blue-50">
                <Instagram className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="twitter" className="data-[state=on]:bg-blue-50">
                <Twitter className="h-5 w-5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Post Content</h3>
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {q.question}
              </label>
              {q.type === 'select' ? (
                <ToggleGroup 
                  type="single"
                  value={answers[q.id]}
                  onValueChange={(value) => value && onAnswerChange(q.id, value)}
                  className="justify-start flex-wrap gap-2"
                >
                  {q.options?.map((option) => (
                    <ToggleGroupItem
                      key={option}
                      value={option}
                      className="border rounded px-4 py-2 data-[state=on]:bg-blue-50 data-[state=on]:border-blue-500"
                    >
                      {option}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
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