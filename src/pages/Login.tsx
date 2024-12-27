import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("Login component mounted");
    
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error checking session:", error);
        toast({
          title: "Error",
          description: "Failed to check authentication status",
          variant: "destructive",
        });
        return;
      }
      
      if (session) {
        console.log("User already logged in, redirecting...");
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (event === "SIGNED_IN") {
        try {
          // Check if user has completed onboarding
          const { data: existingResponses, error } = await supabase
            .from("onboarding_responses")
            .select("*")
            .limit(1);

          if (error) {
            console.error("Error checking onboarding status:", error);
            toast({
              title: "Error",
              description: "Failed to check onboarding status",
              variant: "destructive",
            });
            return;
          }

          if (existingResponses && existingResponses.length > 0) {
            console.log("User has completed onboarding, redirecting to home");
            navigate("/");
          } else {
            console.log("User needs to complete onboarding");
            navigate("/onboarding");
          }
        } catch (error) {
          console.error("Error in auth state change handler:", error);
          toast({
            title: "Error",
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        }
      }
      
      if (event === "SIGNED_OUT") {
        console.log("User signed out");
        navigate("/login");
      }
      
      if (event === "USER_UPDATED") {
        console.log("User updated:", session);
      }

      if (event === "INITIAL_SESSION" && !session) {
        console.log("No initial session");
      }
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to MortgageContent.ai
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="light"
              providers={[]}
              redirectTo={window.location.origin}
              view="sign_in"
              showLinks={true}
              onlyThirdPartyProviders={false}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;