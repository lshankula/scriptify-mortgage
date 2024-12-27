import { useState } from 'react';
import { 
  FileText, MessageSquare, Megaphone, Award,
  ChevronDown, CheckCircle, Lightbulb, ArrowRight 
} from 'lucide-react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PostTypeCard } from "@/components/social/PostTypeCard";
import { QuestionForm } from "@/components/social/QuestionForm";
import { PostOverview } from "@/components/social/PostOverview";

const postTypes = {
  thoughtLeadership: {
    icon: <Award className="w-6 h-6" />,
    title: "Thought Leadership",
    description: "Share industry expertise and insights",
    examples: [
      "Market analysis",
      "Industry trends",
      "Professional advice",
      "Expert tips"
    ]
  },
  marketUpdate: {
    icon: <FileText className="w-6 h-6" />,
    title: "Market Update",
    description: "Share current market conditions and rates",
    examples: [
      "Rate updates",
      "Market trends",
      "Local statistics",
      "Industry news"
    ]
  },
  valueContent: {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Value Content",
    description: "Educational content for your audience",
    examples: [
      "How-to guides",
      "Tips and tricks",
      "Process explanations",
      "Common questions"
    ]
  },
  announcement: {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Announcement",
    description: "Share news or updates",
    examples: [
      "Company news",
      "Team updates",
      "Special offers",
      "Event promotion"
    ]
  }
};

const questions = [
  {
    id: 'topic',
    question: "What is the primary topic you would like to write about?",
    description: "More detail will allow me to create a better, more valuable post",
    type: 'textarea',
    placeholder: "Provide detailed information about your topic..."
  },
  {
    id: 'tone',
    question: "What is the preferred tone and style for your brand's content?",
    description: "Should the post be more casual and conversational, or formal and informative?",
    type: 'select',
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
    id: 'messages',
    question: "Are there any specific messages or themes that you want to emphasize in this post?",
    description: "List key points you want to include",
    type: 'textarea',
    placeholder: "List your key messages..."
  },
  {
    id: 'cta',
    question: "What specific actions do you want the audience to take after viewing this post?",
    description: "This could include comments, DMs, checking bio link, etc.",
    type: 'text',
    placeholder: "E.g., Drop a comment, send DM, click link in bio..."
  }
];

const SocialCreate = () => {
  const [step, setStep] = useState('type');
  const [postType, setPostType] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showOutline, setShowOutline] = useState(false);

  const handlePostTypeSelect = (type: string) => {
    setPostType(type);
    setStep('questions');
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    } else {
      setStep('type');
      setPostType(null);
      setCurrentQuestion(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      setShowOutline(true);
    }
  };

  return (
    <DashboardLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/social">Content Hub</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Post</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto p-6">
        {step === 'type' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Choose Post Type</h2>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(postTypes).map(([key, type]) => (
                <PostTypeCard
                  key={key}
                  icon={type.icon}
                  title={type.title}
                  description={type.description}
                  examples={type.examples}
                  onClick={() => handlePostTypeSelect(key)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 'questions' && postType && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{postTypes[postType].title}</h2>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => {
                  setStep('type');
                  setPostType(null);
                  setCurrentQuestion(0);
                }}
              >
                Change Post Type
              </Button>
            </div>

            <div className="bg-white border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-2">{questions[currentQuestion].question}</h3>
              <p className="text-gray-600 mb-4">{questions[currentQuestion].description}</p>
              
              <QuestionForm
                currentQuestion={questions[currentQuestion]}
                answer={answers[questions[currentQuestion].id] || ''}
                onAnswerChange={handleAnswerChange}
              />
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
              >
                Back
              </Button>
              <Button onClick={handleNext}>
                {currentQuestion === questions.length - 1 ? 'Review Post' : 'Continue'}
              </Button>
            </div>
          </div>
        )}

        {showOutline && (
          <PostOverview
            answers={answers}
            onClose={() => setShowOutline(false)}
            onGenerate={() => {
              console.log('Generating post with:', { postType, answers });
              // TODO: Implement post generation
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SocialCreate;