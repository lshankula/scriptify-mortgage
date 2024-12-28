import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { PostTypeSelection } from '@/components/social/PostTypeSelection';
import { QuestionForm } from '@/components/social/QuestionForm';
import { PostOutline } from '@/components/social/PostOutline';
import { Answers } from '@/types/social';

const SocialCreate = () => {
  const [step, setStep] = useState('type');
  const [postType, setPostType] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showOutline, setShowOutline] = useState(false);

  const handlePostTypeSelect = (type: string) => {
    setPostType(type);
    setStep('questions');
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleBack = () => {
    setCurrentQuestion(curr => curr - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

      <div className="max-w-4xl mx-auto py-6">
        {step === 'type' && (
          <PostTypeSelection onSelect={handlePostTypeSelect} />
        )}
        {step === 'questions' && postType && (
          <QuestionForm
            currentQuestion={currentQuestion}
            answers={answers}
            postType={postType}
            onAnswerChange={handleAnswerChange}
            onBack={handleBack}
            onNext={handleNext}
            onChangePostType={handleChangePostType}
          />
        )}
        {showOutline && (
          <PostOutline
            answers={answers}
            onBack={() => setShowOutline(false)}
            onSubmit={() => console.log('Generating post...')}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SocialCreate;