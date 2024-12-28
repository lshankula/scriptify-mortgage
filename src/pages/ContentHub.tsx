import React from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FilePlus, Image, LayoutTemplate, Folder, FileText, Video, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PostTypeCard } from '@/components/content/PostTypeCard';

const ContentHub = () => {
  const navigate = useNavigate();

  const contentTypes = {
    createNew: {
      icon: <FilePlus className="w-6 h-6" />,
      title: "Create New",
      description: "Create different types of content",
      examples: [
        "Social Post",
        "Blog Article",
        "Video Script",
        "Email Template"
      ],
      onClick: () => navigate('/social/create')
    },
    visualContent: {
      icon: <Image className="w-6 h-6" />,
      title: "Visual Content",
      description: "Create and manage visual assets",
      examples: [
        "Infographics",
        "Charts",
        "Graphics",
        "Presentations"
      ],
      onClick: () => navigate('/visual-content')
    },
    templates: {
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: "Templates",
      description: "Access pre-made templates",
      examples: [
        "Social Media",
        "Email",
        "Video",
        "Marketing"
      ],
      onClick: () => navigate('/templates')
    },
    myContent: {
      icon: <Folder className="w-6 h-6" />,
      title: "My Content",
      description: "Access your content library",
      examples: [
        "Drafts",
        "Published",
        "Archived",
        "Shared"
      ],
      onClick: () => navigate('/my-content')
    }
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
            <BreadcrumbPage>Content Hub</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto py-6">
        <h2 className="text-2xl font-bold mb-6">Content Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(contentTypes).map(([key, type]) => (
            <PostTypeCard
              key={key}
              icon={type.icon}
              title={type.title}
              description={type.description}
              examples={type.examples}
              onClick={type.onClick}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentHub;