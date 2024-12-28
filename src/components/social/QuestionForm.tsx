import React, { useState } from 'react';
import { Answers } from '@/types/social';
import { ContentIdeasDialog } from './ContentIdeasDialog';
import { FormHeader } from './form/FormHeader';
import { QuestionsSection } from './form/QuestionsSection';
import { FormActions } from './form/FormActions';

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
      <FormHeader
        postType={postType}
        selectedPlatform={selectedPlatform}
        onChangePostType={onChangePostType}
        setSelectedPlatform={setSelectedPlatform}
        setShowIdeasDialog={setShowIdeasDialog}
      />

      <ContentIdeasDialog
        open={showIdeasDialog}
        onOpenChange={setShowIdeasDialog}
        onSelectIdea={(idea) => onAnswerChange('topic', idea)}
        ideas={quickIdeas}
      />

      <QuestionsSection 
        answers={answers}
        onAnswerChange={onAnswerChange}
      />

      <FormActions 
        onSaveDraft={onSaveDraft}
        onNext={onNext}
      />
    </div>
  );
};