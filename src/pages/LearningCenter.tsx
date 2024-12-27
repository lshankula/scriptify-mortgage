import { useEffect, useState } from "react";
import { Book, Play, Star, Trophy, Lightbulb, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import { OnboardingCenter } from "@/components/onboarding/OnboardingCenter";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { supabase } from "@/integrations/supabase/client";

const LearningCenter = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const { checkOnboardingStatus } = useOnboardingStatus();

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }

    const checkStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
        setProgress(hasCompletedOnboarding ? 100 : 33); // Basic progress calculation
      }
    };

    checkStatus();
  }, [session, navigate, checkOnboardingStatus]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Onboarding Section */}
        <OnboardingCenter />

        {/* Learning Sections */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Learning Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Start Guide */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Play className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold text-lg">Quick Start</h3>
              </div>
              <div className="space-y-3">
                <LearningItem 
                  title="Platform Overview"
                  duration="5 min"
                  completed={true}
                />
                <LearningItem 
                  title="Content Creation Basics"
                  duration="8 min"
                  completed={progress >= 50}
                />
                <LearningItem 
                  title="Publishing Your First Post"
                  duration="6 min"
                  completed={progress >= 75}
                />
              </div>
            </div>

            {/* Feature Mastery */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-purple-500" />
                <h3 className="font-semibold text-lg">Feature Mastery</h3>
              </div>
              <div className="space-y-3">
                <LearningItem 
                  title="Visual Content Creation"
                  duration="12 min"
                  completed={progress === 100}
                />
                <LearningItem 
                  title="Co-Marketing Tools"
                  duration="10 min"
                  completed={false}
                />
                <LearningItem 
                  title="Analytics Deep Dive"
                  duration="15 min"
                  completed={false}
                />
              </div>
            </div>

            {/* Achievement Center */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="font-semibold text-lg">Achievements</h3>
              </div>
              <div className="space-y-3">
                <Achievement 
                  title="Content Creator"
                  description="Create your first piece of content"
                  completed={progress >= 50}
                />
                <Achievement 
                  title="Team Player"
                  description="Invite your first team member"
                  completed={false}
                />
                <Achievement 
                  title="Analytics Pro"
                  description="Generate your first report"
                  completed={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LearningItemProps {
  title: string;
  duration: string;
  completed: boolean;
}

const LearningItem = ({ title, duration, completed }: LearningItemProps) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
    <div className="flex items-center gap-2">
      {completed ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <Play className="w-5 h-5 text-primary" />
      )}
      <span className={completed ? 'text-gray-500' : ''}>{title}</span>
    </div>
    <span className="text-sm text-gray-500">{duration}</span>
  </div>
);

interface AchievementProps {
  title: string;
  description: string;
  completed: boolean;
}

const Achievement = ({ title, description, completed }: AchievementProps) => (
  <div className={`p-3 rounded ${completed ? 'bg-primary/10' : 'bg-gray-50'}`}>
    <div className="flex items-center gap-2">
      <Trophy className={`w-5 h-5 ${completed ? 'text-primary' : 'text-gray-400'}`} />
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export default LearningCenter;