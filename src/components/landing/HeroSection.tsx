import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="relative bg-white overflow-hidden pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-heading font-extrabold text-primary sm:text-5xl md:text-6xl">
                <span className="block">Transform Your</span>
                <span className="block text-accent">Mortgage Marketing</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create compelling content that converts. From video scripts to social media posts, 
                we help mortgage professionals stand out in a crowded market.
              </p>
              <div className="mt-5 sm:mt-8 flex justify-center lg:justify-start">
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
  );
};