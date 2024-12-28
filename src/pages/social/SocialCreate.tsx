import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FileText, Settings, Lightbulb, RefreshCw, ChevronDown, Check, Copy, ArrowRight, Award, MessageSquare, Megaphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const SocialCreate = () => {
  const [step, setStep] = useState('type');
  const [postType, setPostType] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showOutline, setShowOutline] = useState(false);

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

  interface Question {
    id: string;
    question: string;
    description: string;
    type: string;
    placeholder: string;
    options?: string[];
  }

  const questions: Question[] = [
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

  const renderPostTypeSelection = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Post Type</h2>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(postTypes).map(([key, type]) => (
          <button
            key={key}
            className="p-6 border rounded-lg text-left hover:bg-gray-50"
            onClick={() => {
              setPostType(key);
              setStep('questions');
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              {type.icon}
              <span className="text-lg font-medium">{type.title}</span>
            </div>
            <p className="text-gray-600 mb-3">{type.description}</p>
            <div className="text-sm text-gray-500">
              Examples:
              <ul className="mt-2 space-y-1">
                {type.examples.map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderQuestions = () => {
    const currentQ = questions[currentQuestion];
    
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{postTypes[postType as keyof typeof postTypes].title}</h2>
            <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <button 
            onClick={() => {
              setStep('type');
              setPostType(null);
              setCurrentQuestion(0);
            }}
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
                  onClick={() => setAnswers({ ...answers, [currentQ.id]: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : currentQ.type === 'textarea' ? (
            <Textarea
              className="w-full min-h-[120px]"
              placeholder={currentQ.placeholder}
              value={answers[currentQ.id] || ''}
              onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
            />
          ) : (
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder={currentQ.placeholder}
              value={answers[currentQ.id] || ''}
              onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
            />
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(curr => curr - 1)}
            disabled={currentQuestion === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(curr => curr + 1);
              } else {
                setShowOutline(true);
              }
            }}
          >
            {currentQuestion === questions.length - 1 ? 'Review Post' : 'Continue'}
          </Button>
        </div>
      </div>
    );
  };

  const renderOutline = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-xl font-bold mb-4">Post Overview</h2>
        <div className="space-y-4 mb-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Topic</h3>
            <p className="text-gray-600">{answers.topic}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Brand Voice</h3>
            <p className="text-gray-600">{answers.brandVoice}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Key Messages</h3>
            <div className="text-gray-600">
              {answers.keyMessages?.split('\n').map((point, index) => (
                <p key={index}>• {point}</p>
              ))}
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Call to Action</h3>
            <p className="text-gray-600">{answers.callToAction}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setShowOutline(false)}
          >
            Edit Details
          </Button>
          <Button>
            Generate Post
          </Button>
        </div>
      </div>
    </div>
  );

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

      <div className="max-w-4xl mx-auto py-6">
        {step === 'type' && renderPostTypeSelection()}
        {step === 'questions' && renderQuestions()}
        {showOutline && renderOutline()}
      </div>
    </DashboardLayout>
  );
};

export default SocialCreate;