import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FileText, Settings, Lightbulb, RefreshCw, ChevronDown, Check, Copy, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const SocialCreate = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['linkedin']);
  const [showPlatformSelect, setShowPlatformSelect] = useState(false);
  const [showIdeaGenerator, setShowIdeaGenerator] = useState(false);
  
  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-600' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-500' },
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-400' }
  ];

  const quickIdeas = [
    "Share a recent client success story",
    "Market update on interest rates",
    "First-time homebuyer tip",
    "Myth-busting common mortgage misconceptions",
    "Team highlight or behind-the-scenes",
    "Local market statistics",
    "Mortgage process explanation",
    "Client testimonial feature",
    "Homebuying checklist",
    "Partnership announcement with local agent"
  ];

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Create Content</h1>
          <p className="text-gray-600">Create engaging content for your audience</p>
        </div>

        {/* Platform Selector Dropdown */}
        <div className="mb-6 flex gap-4 items-start">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowPlatformSelect(!showPlatformSelect)}
              className="flex items-center gap-2"
            >
              Select Platforms
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {showPlatformSelect && (
              <div className="absolute top-full mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                {platforms.map((platform) => (
                  <label
                    key={platform.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPlatforms([...selectedPlatforms, platform.id]);
                        } else {
                          setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id));
                        }
                      }}
                    />
                    <span>{platform.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Quick Idea Generator */}
          <Button
            variant="outline"
            onClick={() => setShowIdeaGenerator(true)}
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Need Content Ideas?
          </Button>
        </div>

        {/* Quick Idea Generator Modal */}
        {showIdeaGenerator && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Quick Content Ideas</h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowIdeaGenerator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {quickIdeas.map((idea, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <p>{idea}</p>
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                    >
                      Use This <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Creation Area */}
        <div className="bg-white border rounded-lg p-6">
          <div className="mb-6">
            <Textarea
              className="w-full h-32"
              placeholder="Write your post content..."
            />
          </div>

          {/* Platform Previews */}
          {selectedPlatforms.map((platformId) => {
            const platform = platforms.find(p => p.id === platformId);
            return (
              <div key={platformId} className="mb-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{platform.name} Preview</h3>
                  <Button 
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                    onClick={() => {/* Handle remix */}}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Remix for {platform.name}
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  {/* Platform-specific preview */}
                  Preview content here
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Advanced Settings
            </Button>
            
            <div className="flex gap-3">
              <Button variant="outline">
                Save Draft
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create Post{selectedPlatforms.length > 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialCreate;