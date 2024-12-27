import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const CreateContentButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
      onClick={() => navigate('/social/create')}
    >
      <Plus className="w-4 h-4" />
      Create Content
    </Button>
  );
};