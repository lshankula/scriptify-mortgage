import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { PlatformSelect } from '@/components/social/PlatformSelect';
import { Label } from '@/components/ui/label';
import { Remix } from 'lucide-react';

const SocialPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPlatform, setSelectedPlatform] = React.useState('linkedin');
  
  console.log('Rendering SocialPost page for post:', id);

  const handleRemix = () => {
    console.log('Remixing post for platform:', selectedPlatform);
    // Here we would handle the remixing logic
    // For now, we'll just navigate back to create with the platform pre-selected
    navigate('/social/create', { 
      state: { 
        platform: selectedPlatform,
        remixFromId: id 
      }
    });
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
            <BreadcrumbPage>Post</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Generated Post</h2>
          {/* Post content will go here */}
          <div className="p-4 border rounded-lg mb-6">
            <p className="text-gray-600">
              This is where the generated post content will be displayed.
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Remix for Another Platform</h3>
          <div className="space-y-4">
            <div>
              <Label>Select Platform</Label>
              <PlatformSelect 
                value={selectedPlatform} 
                onValueChange={setSelectedPlatform}
              />
            </div>
            <Button 
              onClick={handleRemix}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <Remix className="w-4 h-4" />
              Remix for {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialPost;