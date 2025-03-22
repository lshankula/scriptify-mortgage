import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Answers, Post } from '@/types/social';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PostOutlineProps {
  answers: Answers;
  onBack: () => void;
  onSubmit: () => void;
}

export const PostOutline = ({ answers, onBack, onSubmit }: PostOutlineProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to create posts",
          variant: "destructive",
        });
        return;
      }

      // Generate content using AI
      const response = await fetch('/functions/v1/generate-post', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          postRequirements: answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate post content');
      }

      const { content } = await response.json();

      // Save the post to the database
      const { data: post, error: saveError } = await supabase
        .from('posts')
        .insert({
          user_id: session.user.id,
          title: answers.topic || 'Untitled Post',
          content,
          type: answers.platform || 'linkedin',
          status: 'draft',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (saveError) throw saveError;

      toast({
        title: "Success",
        description: "Your post has been generated and saved",
      });

      onSubmit();
      navigate(`/social/post/${post.id}`);
    } catch (error) {
      console.error('Error generating post:', error);
      toast({
        title: "Error",
        description: "Failed to generate post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Post Overview</h2>
          <ScrollArea className="h-[calc(90vh-12rem)]">
            <div className="space-y-4 pr-4">
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
          </ScrollArea>
        </div>
        <div className="border-t p-4 flex justify-end gap-3 bg-white">
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
