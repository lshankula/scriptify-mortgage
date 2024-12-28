import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { PlatformSelect } from '@/components/social/PlatformSelect';

const SocialPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showRemixOptions, setShowRemixOptions] = React.useState(false);
  const [selectedPlatform, setSelectedPlatform] = React.useState('');

  // Placeholder post data - this would come from your database in a real implementation
  const post = {
    content: "This is a sample post content. In a real implementation, this would be fetched from your database based on the post ID.",
    platform: "linkedin",
    createdAt: new Date().toLocaleDateString()
  };

  const handleRemix = () => {
    if (showRemixOptions && selectedPlatform) {
      // Navigate to create page with platform pre-selected
      navigate('/social/create', { 
        state: { 
          platform: selectedPlatform,
          remixFromId: id 
        }
      });
    } else {
      setShowRemixOptions(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Post Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="prose max-w-none">
            <p>{post.content}</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Posted on {post.platform} • {post.createdAt}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {showRemixOptions ? (
            <>
              <div className="w-48">
                <PlatformSelect
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                />
              </div>
              <Button 
                onClick={handleRemix}
                disabled={!selectedPlatform}
              >
                Remix for Selected Platform
              </Button>
            </>
          ) : (
            <Button onClick={handleRemix} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Remix for Another Platform
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialPost;