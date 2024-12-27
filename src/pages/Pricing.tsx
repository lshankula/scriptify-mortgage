import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const PricingTier = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  onSubscribe,
  tier
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  onSubscribe: (tier: string) => void;
  tier: string;
}) => (
  <div className={`rounded-2xl p-6 ${highlighted ? 'ring-2 ring-primary shadow-lg' : 'border'}`}>
    <h3 className="text-2xl font-bold font-heading">{name}</h3>
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{description}</p>
    <div className="mt-4 flex items-baseline">
      <span className="text-4xl font-bold tracking-tight">{price}</span>
      {price !== "Free" && <span className="ml-1 text-gray-500">/month</span>}
    </div>
    <ul className="mt-6 space-y-4">
      {features.map((feature) => (
        <li key={feature} className="flex">
          <Check className="h-5 w-5 text-primary shrink-0" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      onClick={() => onSubscribe(tier)}
      className={`w-full mt-8 ${highlighted ? 'bg-primary hover:bg-primary-dark' : ''}`}
    >
      Get Started
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async (tier: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { tier }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive",
      });
    }
  };

  const tiers = [
    {
      name: "Free",
      price: "Free",
      tier: "free",
      description: "Perfect for trying out our AI content generation tools",
      features: [
        "Up to 10 content outputs",
        "AI-powered content generation",
        "Video script generation",
        "Social media content ideas",
        "Basic analytics"
      ]
    },
    {
      name: "Pro",
      price: "$10",
      tier: "pro",
      description: "Ideal for growing mortgage professionals",
      features: [
        "Up to 50 content outputs",
        "Everything in Free",
        "Priority content generation",
        "Advanced analytics",
        "Email support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$25",
      tier: "enterprise",
      description: "For mortgage businesses that need unlimited content",
      features: [
        "Unlimited content outputs",
        "Everything in Pro",
        "Custom content templates",
        "Dedicated support",
        "Team collaboration tools"
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Choose the perfect plan for your mortgage content needs
          </p>
        </div>
        <div className="mt-16 grid gap-8 max-w-7xl mx-auto md:grid-cols-3">
          {tiers.map((tier) => (
            <PricingTier 
              key={tier.name} 
              {...tier} 
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Need a custom plan?
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Contact us for custom pricing options for larger teams and specific needs.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pricing;
