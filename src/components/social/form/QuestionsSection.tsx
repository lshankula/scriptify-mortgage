import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { questions } from '@/data/questions';
import { Answers } from '@/types/social';

interface QuestionsSectionProps {
  answers: Answers;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export const QuestionsSection = ({ answers, onAnswerChange }: QuestionsSectionProps) => {
  return (
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
  );
};