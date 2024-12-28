import { PublicNavigation } from "@/components/navigation/PublicNavigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PricingTier } from "@/components/pricing/PricingTier";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { ContactSection } from "@/components/pricing/ContactSection";
import { pricingTiers } from "@/components/pricing/pricingData";

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

  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />
      <div className="py-16 px-4 sm:px-6 lg:px-8 pt-16">
        <PricingHeader />
        <div className="mt-16 grid gap-8 max-w-7xl mx-auto md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTier 
              key={tier.name} 
              {...tier} 
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
        <ContactSection />
      </div>
    </div>
  );
};

export default Pricing;