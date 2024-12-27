import { Card } from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const Login = () => {
  const { isLoading } = useAuthRedirect();

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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
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
                redirectTo={window.location.origin + "/login"}
                onlyThirdPartyProviders={false}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;