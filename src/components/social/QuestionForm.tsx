import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface QuestionFormProps {
  currentQuestion: {
    id: string;
    question: string;
    description: string;
    type: string;
    placeholder: string;
    options?: string[];
  };
  answer: string;
  onAnswerChange: (value: string) => void;
}

export const QuestionForm = ({
  currentQuestion,
  answer,
  onAnswerChange,
}: QuestionFormProps) => {
  if (currentQuestion.type === 'select') {
    return (
      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options?.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={`p-4 h-auto text-left ${
              answer === option ? 'border-primary bg-primary/10' : ''
            }`}
            onClick={() => onAnswerChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    );
  }

  if (currentQuestion.type === 'textarea') {
    return (
      <Textarea
        className="w-full min-h-[8rem]"
        placeholder={currentQuestion.placeholder}
        value={answer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    );
  }

  return (
    <Input
      type="text"
      placeholder={currentQuestion.placeholder}
      value={answer || ''}
      onChange={(e) => onAnswerChange(e.target.value)}
    />
  );
};