interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressBar = ({ currentQuestion, totalQuestions }: ProgressBarProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Question {currentQuestion + 1} of {totalQuestions}
        </h2>
        <div className="text-sm text-gray-500">
          {Math.round(progress)}% Complete
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary rounded-full h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};