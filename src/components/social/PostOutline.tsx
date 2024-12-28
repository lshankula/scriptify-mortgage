import React from 'react';
import { Button } from "@/components/ui/button";
import { Answers } from '@/types/social';
import { useNavigate } from 'react-router-dom';

interface PostOutlineProps {
  answers: Answers;
  onBack: () => void;
  onSubmit: () => void;
}

export const PostOutline = ({ answers, onBack, onSubmit }: PostOutlineProps) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    onSubmit();
    // For now, we'll navigate to a dummy post ID
    // In the real implementation, this would be the actual post ID
    navigate('/social/post/1');
  };

  return (
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
            onClick={onBack}
          >
            Edit Details
          </Button>
          <Button onClick={handleSubmit}>
            Generate Post
          </Button>
        </div>
      </div>
    </div>
  );
};