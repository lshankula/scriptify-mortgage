import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CreateContentButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/social/create")}
      className="bg-primary hover:bg-primary-dark flex items-center gap-2"
    >
      <Plus className="h-4 w-4" />
      Create Content
    </Button>
  );
};