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
        link: '/learning'
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
        link: '/content-hub/visual'
      },
      { 
        label: "Templates", 
        icon: <Layout className="w-4 h-4" />,
        link: '/content-hub/templates'
      },
      { 
        label: "My Content", 
        icon: <FileText className="w-4 h-4" />,
        link: '/content-hub/my-content'
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
        link: '/co-marketing/portal'
      },
      { 
        label: "Cost Sharing", 
        icon: <DollarSign className="w-4 h-4" />,
        link: '/co-marketing/cost-sharing'
      },
      { 
        label: "Campaigns", 
        icon: <Layout className="w-4 h-4" />,
        link: '/co-marketing/campaigns'
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
        link: '/analytics/performance'
      },
      { 
        label: "Reports", 
        icon: <FileText className="w-4 h-4" />,
        link: '/analytics/reports'
      },
      { 
        label: "ROI Tracking", 
        icon: <DollarSign className="w-4 h-4" />,
        link: '/analytics/roi'
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
        link: '/achievements/missions'
      },
      { 
        label: "Badges", 
        icon: <Trophy className="w-4 h-4" />,
        link: '/achievements/badges'
      },
      { 
        label: "Leaderboard", 
        icon: <Users className="w-4 h-4" />,
        link: '/achievements/leaderboard'
      }
    ]
  },
};