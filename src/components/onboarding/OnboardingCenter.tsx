import { useState, useEffect } from 'react';
import { Book, Play, Star, Trophy, Lightbulb, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { supabase } from '@/integrations/supabase/client';

export const OnboardingCenter = () => {
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const { checkOnboardingStatus } = useOnboardingStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
        if (hasCompletedOnboarding) {
          setProgress(100);
        }
      }
    };

    checkStatus();
  }, [checkOnboardingStatus]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Banner */}
      <div className="bg-primary/10 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Onboarding Progress</h3>
          <span className="text-primary">{progress}% Complete</span>
        </div>
        <div className="w-full bg-primary/5 rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Onboarding Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Onboarding Survey */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-lg">Onboarding Survey</h3>
          </div>
          <div className="space-y-3">
            <OnboardingItem 
              title="Tell Us About Yourself"
              description="Complete the onboarding questionnaire"
              duration="10 min"
              completed={progress === 100}
              onClick={() => navigate('/onboarding')}
              isFirst
            />
          </div>
        </div>

        {/* Platform Features */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold text-lg">Platform Features</h3>
          </div>
          <div className="space-y-3">
            <OnboardingItem 
              title="Content Creation"
              description="Learn how to create engaging content"
              duration="5 min"
              completed={false}
              locked={progress < 100}
            />
            <OnboardingItem 
              title="Co-Marketing Tools"
              description="Discover collaboration features"
              duration="5 min"
              completed={false}
              locked={progress < 100}
            />
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold text-lg">Getting Started</h3>
          </div>
          <div className="space-y-3">
            <OnboardingItem 
              title="Create First Content"
              description="Start with your first piece of content"
              duration="10 min"
              completed={false}
              locked={progress < 100}
            />
            <OnboardingItem 
              title="Invite Team Members"
              description="Add your team to collaborate"
              duration="3 min"
              completed={false}
              locked={progress < 100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface OnboardingItemProps {
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked?: boolean;
  onClick?: () => void;
  isFirst?: boolean;
}

const OnboardingItem = ({ 
  title, 
  description, 
  duration, 
  completed, 
  locked, 
  onClick,
  isFirst 
}: OnboardingItemProps) => (
  <div 
    className={`p-3 rounded transition-all ${
      completed ? 'bg-primary/10' : 
      locked ? 'bg-gray-100 opacity-50' : 
      'bg-gray-50 hover:bg-gray-100 cursor-pointer'
    }`}
    onClick={!locked ? onClick : undefined}
  >
    <div className="flex items-center gap-2">
      {completed ? (
        <CheckCircle className="w-5 h-5 text-primary" />
      ) : locked ? (
        <Lightbulb className="w-5 h-5 text-gray-400" />
      ) : (
        <Play className="w-5 h-5 text-primary" />
      )}
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">{duration}</span>
          {isFirst && !completed && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
              Start Here
            </span>
          )}
          {locked && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              Complete Survey First
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);