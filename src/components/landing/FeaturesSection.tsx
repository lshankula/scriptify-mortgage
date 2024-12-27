import { Video, FileText, TrendingUp } from 'lucide-react';

export const FeaturesSection = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-heading font-bold text-primary">Everything You Need</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Comprehensive content creation tools designed specifically for mortgage professionals.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <Video className="h-12 w-12 text-accent" />
              <h3 className="mt-5 text-lg font-heading font-medium text-primary">Video Scripts</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Create engaging video scripts that explain complex mortgage concepts simply.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <FileText className="h-12 w-12 text-accent" />
              <h3 className="mt-5 text-lg font-heading font-medium text-primary">Social Media Content</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Generate viral-worthy posts that educate and engage your audience.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-12 w-12 text-accent" />
              <h3 className="mt-5 text-lg font-heading font-medium text-primary">Market Updates</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Keep your audience informed with timely market analysis content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};