import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  onSubscribe: (tier: string) => void;
  tier: string;
}

export const PricingTier = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  onSubscribe,
  tier
}: PricingTierProps) => (
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