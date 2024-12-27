import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Share2, 
  BarChart, 
  FileText,
  MessageSquare,
  GraduationCap,
  Book
} from "lucide-react";

export const menuItems = {
  content: {
    label: "Content",
    icon: <FileText className="w-5 h-5" />,
    items: [
      {
        label: "Social Media",
        icon: <Share2 className="w-5 h-5" />,
        subitems: ["Social Post", "Social Calendar", "Social Analytics"]
      },
      {
        label: "Blog Posts",
        icon: <MessageSquare className="w-5 h-5" />,
        subitems: ["Create Post", "Blog Calendar", "Blog Analytics"]
      }
    ]
  },
  learning: {
    label: "Learning",
    icon: <GraduationCap className="w-5 h-5" />,
    items: [
      {
        label: "Learning Center",
        icon: <Book className="w-5 h-5" />,
        path: "/learning"
      }
    ]
  },
  analytics: {
    label: "Analytics",
    icon: <BarChart className="w-5 h-5" />,
    items: [
      {
        label: "Overview",
        icon: <LayoutDashboard className="w-5 h-5" />
      },
      {
        label: "Team",
        icon: <Users className="w-5 h-5" />
      }
    ]
  }
};