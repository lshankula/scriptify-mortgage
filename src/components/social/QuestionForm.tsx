import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { questions } from '@/data/questions';
import { Question, Answers } from '@/types/social';
import { postTypes } from '@/data/postTypes';

interface QuestionFormProps {
  currentQuestion: number;
  answers: Answers;
  postType: string;
  onAnswerChange: (questionId: string, answer: string) => void;
  onBack: () => void;
  onNext: () => void;
  onChangePostType: () => void;
}

export const QuestionForm = ({
  currentQuestion,
  answers,
  postType,
  onAnswerChange,
  onBack,
  onNext,
  onChangePostType
}: QuestionFormProps) => {
  const currentQ = questions[currentQuestion];
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{postTypes[postType].title}</h2>
          <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <button 
          onClick={onChangePostType}
          className="text-blue-600 hover:text-blue-700"
        >
          Change Post Type
        </button>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-2">{currentQ.question}</h3>
        <p className="text-gray-600 mb-4">{currentQ.description}</p>
        
        {currentQ.type === 'select' ? (
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options?.map((option, index) => (
              <button
                key={index}
                className={`p-4 border rounded-lg text-left ${
                  answers[currentQ.id] === option ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => onAnswerChange(currentQ.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <Textarea
            className="w-full min-h-[120px]"
            placeholder={currentQ.placeholder}
            value={answers[currentQ.id] || ''}
            onChange={(e) => onAnswerChange(currentQ.id, e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentQuestion === 0}
        >
          Back
        </Button>
        <Button onClick={onNext}>
          {currentQuestion === questions.length - 1 ? 'Review Post' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};