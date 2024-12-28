import { Button } from "@/components/ui/button";

interface PostReviewProps {
  answers: Record<string, string>;
  onBack: () => void;
  onSubmit: () => void;
}

export const PostReview = ({ answers, onBack, onSubmit }: PostReviewProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Post Overview</h2>
        <div className="space-y-4 mb-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Topic</h3>
            <p className="text-gray-600">{answers.topic}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Brand Voice</h3>
            <p className="text-gray-600">{answers.brandVoice}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Key Messages</h3>
            <div className="text-gray-600">
              {answers.keyMessages?.split('\n').map((point, index) => (
                <p key={index}>• {point}</p>
              ))}
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Call to Action</h3>
            <p className="text-gray-600">{answers.callToAction}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onBack}
          >
            Edit Details
          </Button>
          <Button onClick={onSubmit}>
            Generate Post
          </Button>
        </div>
      </div>
    </div>
  );
};