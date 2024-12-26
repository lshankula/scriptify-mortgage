import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  Video, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Sparkles,
  ArrowRight,
  CheckCircle 
} from 'lucide-react';

const Features = () => {
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

  const benefits = [
    "Save hours of content creation time",
    "Maintain consistent posting schedule",
    "Engage your audience with relevant content",
    "Build authority in your market",
    "Generate more leads through social media",
    "Stand out from other mortgage professionals"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-extrabold text-primary sm:text-5xl md:text-6xl">
              Create Better Content,{" "}
              <span className="text-accent">Faster</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Transform your mortgage business content strategy with AI-powered tools trained on viral content that actually converts.
            </p>
            <div className="mt-8">
              <Link to="/signup">
                <Button size="lg" className="px-8">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
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
              <div className="mt-10">
                <Link to="/signup">
                  <Button size="lg">
                    Start Creating Content
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
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
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-heading font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your content?</span>
            <span className="block text-accent">Get started in minutes.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/signup">
                <Button className="bg-accent hover:bg-accent-dark">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;