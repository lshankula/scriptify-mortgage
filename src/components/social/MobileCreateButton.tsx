import { Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const MobileCreateButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 md:hidden z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => navigate('/social/create')}>
            Create Social Post
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/social/visual')}>
            Visual Content
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/social/template')}>
            Use Template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};