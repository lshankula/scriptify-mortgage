import { Clock, Target, Zap } from 'lucide-react';

export const BenefitsSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-heading font-bold text-primary">Why Choose Us?</h2>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-heading font-medium text-primary">Save Time</h3>
                <p className="mt-2 text-base text-gray-500">
                  Create weeks worth of content in minutes, not hours.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-heading font-medium text-primary">Industry Focused</h3>
                <p className="mt-2 text-base text-gray-500">
                  Content specifically designed for mortgage professionals.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-heading font-medium text-primary">Instant Results</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get professional-quality content at the click of a button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};