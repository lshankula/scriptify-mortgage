import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { PostTypeSelection } from "@/components/social/PostTypeSelection";
import { PostQuestions } from "@/components/social/PostQuestions";
import { PostReview } from "@/components/social/PostReview";
import { MobileCreateButton } from "@/components/social/MobileCreateButton";

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

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      setShowOutline(true);
    }
  };

  const handleChangePostType = () => {
    setStep('type');
    setPostType(null);
    setCurrentQuestion(0);
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

      <div className="max-w-4xl mx-auto py-6 px-4">
        {step === 'type' && (
          <PostTypeSelection onSelect={handlePostTypeSelect} />
        )}
        
        {step === 'questions' && postType && (
          <PostQuestions
            postType={postType}
            currentQuestion={currentQuestion}
            answers={answers}
            onBack={handleBack}
            onNext={handleNext}
            onChangePostType={handleChangePostType}
            onAnswerChange={handleAnswerChange}
          />
        )}
        
        {showOutline && (
          <PostReview
            answers={answers}
            onBack={() => setShowOutline(false)}
            onSubmit={() => console.log('Generating post...', answers)}
          />
        )}
      </div>

      <MobileCreateButton />
    </DashboardLayout>
  );
};

export default SocialCreate;