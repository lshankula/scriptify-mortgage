import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { PlatformSelect } from "@/components/social/PlatformSelect";
import { RefreshCw } from "lucide-react";

const SocialPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPlatformSelect, setShowPlatformSelect] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Placeholder post data - this would come from your database in a real implementation
  const post = {
    topic: "First-time homebuyer tips",
    content: "Here are 5 essential tips for first-time homebuyers...",
    platform: "linkedin"
  };

  const handleRemix = () => {
    if (selectedPlatform) {
      // Navigate to create page with platform pre-selected
      navigate(`/social/create?platform=${selectedPlatform}&remixFrom=${id}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{post.topic}</h1>
            <Button
              variant="outline"
              onClick={() => setShowPlatformSelect(!showPlatformSelect)}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Remix for Another Channel
            </Button>
          </div>

          {showPlatformSelect && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-sm font-medium mb-2">Select Platform to Remix For</h3>
              <div className="flex gap-4">
                <div className="w-64">
                  <PlatformSelect
                    value={selectedPlatform}
                    onValueChange={setSelectedPlatform}
                  />
                </div>
                <Button
                  onClick={handleRemix}
                  disabled={!selectedPlatform}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          <div className="prose max-w-none">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialPost;