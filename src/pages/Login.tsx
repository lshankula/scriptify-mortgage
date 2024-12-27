import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Navigation } from "@/components/Navigation";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("User already logged in, redirecting...");
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (event === "SIGNED_IN") {
        // Check if user has completed onboarding
        const { data: existingResponses } = await supabase
          .from("onboarding_responses")
          .select("*")
          .limit(1);

        if (existingResponses && existingResponses.length > 0) {
          console.log("User has completed onboarding, redirecting to home");
          navigate("/");
        } else {
          console.log("User needs to complete onboarding");
          navigate("/onboarding");
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
        console.error("Auth error occurred");
        toast({
          title: "Authentication Error",
          description: "An error occurred during authentication",
          variant: "destructive",
        });
      }
    });

    return () => subscription.unsubscribe();
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
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;