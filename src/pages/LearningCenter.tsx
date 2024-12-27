import React, { useState } from 'react';
import { Book, Play, Star, Trophy, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useSession } from "@/hooks/useSession";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

const LearningCenter = () => {
  const [progress, setProgress] = useState(30); // Example progress
  const navigate = useNavigate();
  const { session } = useSession();
  const { checkOnboardingStatus, isCheckingStatus } = useOnboardingStatus();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  React.useEffect(() => {
    const checkStatus = async () => {
      if (session?.user?.id) {
        const completed = await checkOnboardingStatus(session.user.id);
        setHasCompletedOnboarding(completed);
        setProgress(completed ? 100 : 30);
      }
    };
    checkStatus();
  }, [session?.user?.id, checkOnboardingStatus]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Progress Banner */}
        <div className="bg-primary/10 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Platform Mastery Progress</h3>
            <span className="text-primary">{progress}% Complete</span>
          </div>
          <div className="w-full bg-primary/20 rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Onboarding Survey Button */}
        {!hasCompletedOnboarding && (
          <div className="mb-6 p-4 bg-accent/10 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-lg mb-2">Complete Your Onboarding Survey</h3>
                <p className="text-gray-600">Help us personalize your experience by completing the onboarding survey.</p>
              </div>
              <Button 
                onClick={() => navigate('/onboarding')}
                className="bg-accent hover:bg-accent-dark"
              >
                Start Onboarding Survey
              </Button>
            </div>
          </div>
        )}

        {/* Learning Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Start Guide */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Play className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg">Quick Start</h3>
            </div>
            <div className="space-y-3">
              <LearningItem 
                title="Platform Overview"
                duration="5 min"
                completed={hasCompletedOnboarding}
              />
              <LearningItem 
                title="Content Creation Basics"
                duration="8 min"
                completed={hasCompletedOnboarding}
              />
              <LearningItem 
                title="Publishing Your First Post"
                duration="6 min"
                completed={false}
              />
            </div>
          </div>

          {/* Feature Mastery */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-secondary" />
              <h3 className="font-semibold text-lg">Feature Mastery</h3>
            </div>
            <div className="space-y-3">
              <LearningItem 
                title="Visual Content Creation"
                duration="12 min"
                completed={false}
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
              <Trophy className="w-6 h-6 text-accent" />
              <h3 className="font-semibold text-lg">Achievements</h3>
            </div>
            <div className="space-y-3">
              <Achievement 
                title="Content Creator"
                description="Create your first piece of content"
                completed={hasCompletedOnboarding}
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
    </DashboardLayout>
  );
};

const LearningItem = ({ title, duration, completed }: { title: string; duration: string; completed: boolean }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
    <div className="flex items-center gap-2">
      {completed ? (
        <CheckCircle className="w-5 h-5 text-primary" />
      ) : (
        <Play className="w-5 h-5 text-secondary" />
      )}
      <span className={completed ? 'text-gray-500' : ''}>{title}</span>
    </div>
    <span className="text-sm text-gray-500">{duration}</span>
  </div>
);

const Achievement = ({ title, description, completed }: { title: string; description: string; completed: boolean }) => (
  <div className={`p-3 rounded ${completed ? 'bg-accent/10' : 'bg-gray-50'}`}>
    <div className="flex items-center gap-2">
      <Trophy className={`w-5 h-5 ${completed ? 'text-accent' : 'text-gray-400'}`} />
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export default LearningCenter;
