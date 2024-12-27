import { CheckCircle } from 'lucide-react';

const benefits = [
  "Save hours of content creation time",
  "Maintain consistent posting schedule",
  "Engage your audience with relevant content",
  "Build authority in your market",
  "Generate more leads through social media",
  "Stand out from other mortgage professionals"
];

export const BenefitsList = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-primary">
            Stop Spending Hours Creating Content
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Let our AI handle the heavy lifting while you focus on what matters most - growing your business and helping clients.
          </p>
          <div className="mt-8 space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="ml-3 text-gray-500">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <img 
            src="/placeholder.svg" 
            alt="Content Creation Process" 
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};