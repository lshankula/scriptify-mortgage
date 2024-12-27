import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, FileText, TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-heading font-extrabold text-primary sm:text-5xl md:text-6xl">
                    <span className="block">Transform Your</span>
                    <span className="block text-accent">Mortgage Marketing</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Create compelling content that converts. From video scripts to social media posts, 
                    we help mortgage professionals stand out in a crowded market.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to="/signup">
                        <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Features Section */}
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

        {/* Benefits Section */}
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

        {/* CTA Section */}
        <div className="bg-primary">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-heading font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to transform your content?</span>
              <span className="block text-accent">Start your free trial today.</span>
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
    </DashboardLayout>
  );
};

export default Index;
