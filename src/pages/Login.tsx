import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSignedInUser = async (userId: string) => {
    try {
      console.log("Checking onboarding status for user:", userId);
      const { data: existingResponses, error } = await supabase
        .from("onboarding_responses")
        .select("*")
        .eq("user_id", userId)
        .limit(1);

      if (error) {
        console.error("Error checking onboarding status:", error);
        throw error;
      }

      if (existingResponses && existingResponses.length > 0) {
        console.log("User has completed onboarding, redirecting to home");
        navigate("/");
      } else {
        console.log("User needs to complete onboarding");
        navigate("/onboarding");
      }
    } catch (error) {
      console.error("Error handling signed in user:", error);
      toast({
        title: "Error",
        description: "Failed to check onboarding status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Login component mounted");
    
    const checkSession = async () => {
      try {
        setIsLoading(true);
        console.log("Checking initial session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          toast({
            title: "Error",
            description: "Failed to check authentication status",
            variant: "destructive",
          });
          return;
        }
        
        if (session?.user) {
          console.log("User already logged in, checking onboarding status for:", session.user.email);
          await handleSignedInUser(session.user.id);
        } else {
          console.log("No active session found");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Unexpected error checking session:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      try {
        if (event === "SIGNED_IN" && session?.user) {
          setIsLoading(true);
          console.log("Sign in successful, checking onboarding status...");
          await handleSignedInUser(session.user.id);
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error in auth state change handler:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred during authentication",
          variant: "destructive",
        });
        setIsLoading(false);
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
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#1a365d',
                      brandAccent: '#2b6cb0',
                    },
                  },
                },
              }}
              theme="light"
              providers={[]}
              redirectTo={window.location.origin}
              view="sign_in"
              showLinks={true}
              onlyThirdPartyProviders={false}
            />
            {isLoading && (
              <div className="mt-4 text-center text-sm text-gray-600">
                Processing your sign in...
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;