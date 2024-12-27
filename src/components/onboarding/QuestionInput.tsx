import { Textarea } from "@/components/ui/textarea";

interface QuestionInputProps {
  question: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const QuestionInput = ({ 
  question, 
  placeholder, 
  value, 
  onChange 
}: QuestionInputProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {question}
      </h3>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px] mb-4"
      />
    </div>
  );
};