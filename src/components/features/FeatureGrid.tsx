import { Clock, Video, FileText, MessageSquare, TrendingUp, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Clock className="h-12 w-12 text-accent" />,
    title: "10 Questions, Unlimited Content",
    description: "Answer just 10 simple questions about your mortgage business and expertise. That's all we need to generate endless personalized content."
  },
  {
    icon: <Video className="h-12 w-12 text-accent" />,
    title: "Video Scripts That Convert",
    description: "Get professionally crafted video scripts for both short-form and long-form content, designed to engage and convert your audience."
  },
  {
    icon: <FileText className="h-12 w-12 text-accent" />,
    title: "Long-Form Social Content",
    description: "Generate in-depth social media posts that establish your expertise and provide real value to your followers."
  },
  {
    icon: <MessageSquare className="h-12 w-12 text-accent" />,
    title: "Content Ideas Generator",
    description: "Never run out of ideas. Our AI analyzes trending topics in the mortgage industry to suggest relevant content themes."
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-accent" />,
    title: "Viral Content Analysis",
    description: "Our AI is trained on top-performing mortgage content to ensure your posts have the highest chance of reaching your target audience."
  },
  {
    icon: <Sparkles className="h-12 w-12 text-accent" />,
    title: "AI-Powered Optimization",
    description: "Each piece of content is optimized for engagement based on platform-specific best practices and industry trends."
  }
];

export const FeatureGrid = () => {
  return (
    <div className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-heading font-bold text-primary">
          Everything You Need to Create Engaging Content
        </h2>
        <p className="mt-4 text-xl text-gray-500">
          Answer 10 questions once, create content forever
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="inline-flex p-3 bg-white rounded-xl shadow-sm">
                {feature.icon}
              </div>
            </div>
            <div className="pt-8 text-center">
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};