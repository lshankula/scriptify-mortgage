import { 
  Layout, Users, BarChart, Trophy, FileText, 
  Image, DollarSign, PieChart, Star, GraduationCap,
  ClipboardList
} from 'lucide-react';
import { MenuItems } from './types';

export const menuItems: MenuItems = {
  learning: {
    icon: <GraduationCap className="w-5 h-5" />,
    label: "Learning Center",
    items: [
      { 
        label: "Onboarding", 
        icon: <ClipboardList className="w-4 h-4" />, 
        subitems: ["Basic Onboarding", "Advanced Training"] 
      },
      { 
        label: "Learning Center",
        icon: <GraduationCap className="w-4 h-4" />,
        subitems: ["Learning Center"]
      }
    ]
  },
  contentHub: {
    icon: <Layout className="w-5 h-5" />,
    label: "Content Hub",
    items: [
      { 
        label: "Create New", 
        icon: <FileText className="w-4 h-4" />, 
        subitems: ["Social Post", "Blog Article", "Video Script", "Email Template"] 
      },
      { 
        label: "Visual Content", 
        icon: <Image className="w-4 h-4" />,
        subitems: ["Infographics", "Charts", "Graphics", "Presentations"] 
      },
      { 
        label: "Templates", 
        icon: <Layout className="w-4 h-4" />,
        subitems: ["Social Media", "Email", "Video", "Marketing"] 
      },
      { 
        label: "My Content", 
        icon: <FileText className="w-4 h-4" />,
        subitems: ["Drafts", "Published", "Archived", "Shared"] 
      }
    ]
  },
  coMarketing: {
    icon: <Users className="w-5 h-5" />,
    label: "Co-Marketing",
    items: [
      { 
        label: "Agent Portal", 
        icon: <Users className="w-4 h-4" />,
        subitems: ["Partner Directory", "Invitations", "Joint Content", "Settings"] 
      },
      { 
        label: "Cost Sharing", 
        icon: <DollarSign className="w-4 h-4" />,
        subitems: ["Expenses", "Reports", "Settings", "History"] 
      },
      { 
        label: "Campaigns", 
        icon: <Layout className="w-4 h-4" />,
        subitems: ["Active", "Scheduled", "Completed", "Analytics"] 
      }
    ]
  },
  analytics: {
    icon: <BarChart className="w-5 h-5" />,
    label: "Analytics",
    items: [
      { 
        label: "Performance", 
        icon: <PieChart className="w-4 h-4" />,
        subitems: ["Content Stats", "Engagement", "Growth", "Trends"] 
      },
      { 
        label: "Reports", 
        icon: <FileText className="w-4 h-4" />,
        subitems: ["Overview", "Custom", "Scheduled", "Archived"] 
      },
      { 
        label: "ROI Tracking", 
        icon: <DollarSign className="w-4 h-4" />,
        subitems: ["Campaign ROI", "Content ROI", "Partner ROI"] 
      }
    ]
  },
  achievements: {
    icon: <Trophy className="w-5 h-5" />,
    label: "Achievements",
    items: [
      { 
        label: "Missions", 
        icon: <Star className="w-4 h-4" />,
        subitems: ["Daily", "Weekly", "Special Events"] 
      },
      { 
        label: "Badges", 
        icon: <Trophy className="w-4 h-4" />,
        subitems: ["Content", "Engagement", "Partnership", "Expert"] 
      },
      { 
        label: "Leaderboard", 
        icon: <Users className="w-4 h-4" />,
        subitems: ["Team", "Global", "Partners"] 
      }
    ]
  },
};
