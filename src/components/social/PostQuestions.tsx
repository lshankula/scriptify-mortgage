import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postTypes } from "./PostTypeSelection";

export interface Question {
  id: string;
  question: string;
  description: string;
  type: string;
  placeholder: string;
  options?: string[];
}

export const questions: Question[] = [
  {
    id: 'topic',
    question: "What is the primary topic you would like me to write about?",
    description: "More detail will allow me to create a better, more valuable post",
    type: 'textarea',
    placeholder: "Provide detailed information about your topic..."
  },
  {
    id: 'brandVoice',
    question: "What is the preferred tone and style for your brand's content?",
    description: "Should the post be more casual and conversational, or formal and informative?",
    type: 'select',
    placeholder: "Select your preferred tone",
    options: [
      'Friendly and professional',
      'Authoritative and informative',
      'Casual and conversational',
      'Urgent and persuasive',
      'Trustworthy and educational',
      'Fun and engaging'
    ]
  },
  {
    id: 'keyMessages',
    question: "Are there any specific messages or themes that you want to emphasize in this post?",
    description: "List the key points you want to include in your post",
    type: 'textarea',
    placeholder: "List your key messages..."
  },
  {
    id: 'callToAction',
    question: "What specific actions do you want the audience to take after viewing this post?",
    description: "This could include dropping a comment, sending you a DM, engaging with specific content, or checking the link in your bio",
    type: 'textarea',
    placeholder: "Describe the desired actions you want your audience to take..."
  }
];

interface PostQuestionsProps {
  postType: string;
  currentQuestion: number;
  answers: Record<string, string>;
  onBack: () => void;
  onNext: () => void;
  onChangePostType: () => void;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export const PostQuestions = ({
  postType,
  currentQuestion,
  answers,
  onBack,
  onNext,
  onChangePostType,
  onAnswerChange
}: PostQuestionsProps) => {
  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  
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

      <div className="bg-white border rounded-lg p-4 md:p-6 mb-6">
        <h3 className="text-lg font-medium mb-2">{currentQ.question}</h3>
        <p className="text-gray-600 mb-4">{currentQ.description}</p>
        
        {currentQ.type === 'select' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options?.map((option, index) => (
              <button
                key={index}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  answers[currentQ.id] === option ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
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
          {isLastQuestion ? 'Review Post' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};