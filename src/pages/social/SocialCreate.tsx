import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { QuestionForm } from '@/components/social/QuestionForm';
import { PostOutline } from '@/components/social/PostOutline';
import { Answers } from '@/types/social';
import { questions } from '@/data/questions';

const SocialCreate = () => {
  const [postType, setPostType] = useState('social');
  const [answers, setAnswers] = useState<Answers>({});
  const [showOutline, setShowOutline] = useState(false);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleChangePostType = (type: string) => {
    setPostType(type);
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

      <div className="max-w-4xl mx-auto py-8">
        {!showOutline ? (
          <QuestionForm
            answers={answers}
            postType={postType}
            onAnswerChange={handleAnswerChange}
            onChangePostType={handleChangePostType}
            onNext={() => setShowOutline(true)}
          />
        ) : (
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