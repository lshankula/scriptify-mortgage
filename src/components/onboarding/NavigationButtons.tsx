import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}

export const NavigationButtons = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  isSubmitting
}: NavigationButtonsProps) => {
  return (
    <>
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0 || isSubmitting}
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={isSubmitting}
        >
          {currentQuestion === totalQuestions - 1 ? "Complete" : "Next"}
        </Button>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 text-center">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
      </div>
    </>
  );
};