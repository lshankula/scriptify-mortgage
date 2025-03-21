import { useState, useEffect } from 'react';
import { Plus, Star, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { NavigationMenu } from '@/components/navigation/NavigationMenu';
import { OnboardingDialog } from '@/components/onboarding/OnboardingDialog';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useMissions } from '@/hooks/useMissions';
import { usePosts } from '@/hooks/usePosts';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useSession } from '@/hooks/useSession';
import type { Mission as MissionType } from '@/integrations/supabase/types/missions';
import type { Post } from '@/integrations/supabase/types/posts';
import { formatDistanceToNow } from 'date-fns';

// Separate components to reduce file size
const MissionItem = ({ 
  mission, 
  onToggle 
}: { 
  mission: MissionType; 
  onToggle: (id: string, status: MissionType['status']) => void;
}) => {
  const progress = mission.status === 'completed' ? 1 : mission.status === 'in_progress' ? 0.5 : 0;
  
  const handleToggle = () => {
    const newStatus = mission.status === 'completed' 
      ? 'not_started' 
      : mission.status === 'in_progress' 
        ? 'completed' 
        : 'in_progress';
    
    onToggle(mission.id, newStatus);
  };
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          checked={progress === 1}
          className="w-4 h-4 text-primary rounded cursor-pointer"
          onChange={handleToggle}
        />
        <span className={progress === 1 ? 'text-gray-500 line-through' : ''}>
          {mission.title}
        </span>
      </div>
      <div className="flex items-center gap-2 text-accent">
        <Star className="w-4 h-4" />
        <span>{mission.xp_reward} XP</span>
      </div>
    </div>
  );
};

const ContentItem = ({ post }: { post: Post }) => {
  // Determine content type based on platform or other properties
  const getContentType = (post: Post) => {
    switch (post.platform.toLowerCase()) {
      case 'facebook':
      case 'instagram':
      case 'twitter':
      case 'linkedin':
        return 'Social Post';
      case 'blog':
        return 'Blog Post';
      case 'video':
        return 'Video Script';
      case 'email':
        return 'Email';
      default:
        return 'Content';
    }
  };
  
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
      <div>
        <h4 className="font-medium">{post.title}</h4>
        <p className="text-sm text-gray-600">
          {getContentType(post)} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </p>
      </div>
      <button className="text-primary hover:text-primary-dark">View</button>
    </div>
  );
};

const Dashboard = () => {
  const [notifications] = useState(3);
  const { session } = useSession();
  const { missions, isLoading: missionsLoading, updateMissionStatus } = useMissions();
  const { posts, isLoading: postsLoading } = usePosts();
  const { 
    level, 
    xpTotal, 
    xpToNextLevel, 
    levelProgress, 
    isLoading: progressLoading,
    addXP
  } = useUserProgress();
  
  // Handle mission toggle
  const handleMissionToggle = async (id: string, status: MissionType['status']) => {
    await updateMissionStatus(id, status);
    
    // If mission is completed, add XP
    if (status === 'completed') {
      const mission = missions.find(m => m.id === id);
      if (mission) {
        addXP(mission.xp_reward);
      }
    }
  };

  return (
    <DashboardLayout>
      <OnboardingDialog />
      <div className="p-8">
        <div className="bg-white p-6 rounded-lg border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Content Master Level {level}
              </h2>
              <p className="text-gray-600">Complete daily tasks to level up!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{xpTotal.toLocaleString()} XP</div>
              <p className="text-sm text-gray-600">Next level: {xpToNextLevel.toLocaleString()} XP needed</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500 ease-in-out" 
              style={{ width: `${Math.round(levelProgress * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Content Created</h3>
                <p className="text-2xl font-bold">
                  {postsLoading ? (
                    <span className="inline-block w-8 h-6 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    posts.length || 0
                  )}
                </p>
              </div>
            </div>
            <div className="text-sm text-green-600">
              {postsLoading ? (
                <span className="inline-block w-24 h-4 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                posts.length > 0 ? "↑ New content added" : "Create your first content"
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Active Co-Marketing</h3>
                <p className="text-2xl font-bold">
                  {/* This would ideally come from a co-marketing hook */}
                  {session ? 0 : <span className="inline-block w-8 h-6 bg-gray-200 animate-pulse rounded"></span>}
                </p>
              </div>
            </div>
            <div className="text-sm text-primary">
              {session ? "Set up your first partnership" : <span className="inline-block w-24 h-4 bg-gray-200 animate-pulse rounded"></span>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Weekly Goals</h3>
                <p className="text-2xl font-bold">
                  {missionsLoading ? (
                    <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    <>
                      {missions.filter(m => m.mission_type === 'weekly' && m.status === 'completed').length}/
                      {missions.filter(m => m.mission_type === 'weekly').length || 5}
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="text-sm text-accent">
              {missionsLoading ? (
                <span className="inline-block w-24 h-4 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                <>
                  {missions.filter(m => m.mission_type === 'weekly' && m.status !== 'completed').length} tasks remaining
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Missions */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Daily Missions
            </h3>
            <div className="space-y-3">
              {missionsLoading ? (
                // Loading state
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : missions.length === 0 ? (
                // Empty state
                <div className="text-center py-4 text-gray-500">
                  <p>No missions available</p>
                </div>
              ) : (
                // Missions list
                missions
                  .filter(mission => mission.mission_type === 'daily')
                  .slice(0, 3) // Show only first 3 missions
                  .map(mission => (
                    <MissionItem 
                      key={mission.id}
                      mission={mission}
                      onToggle={handleMissionToggle}
                    />
                  ))
              )}
              
              {/* If we don't have enough real missions, show some mock ones */}
              {!missionsLoading && missions.filter(m => m.mission_type === 'daily').length === 0 && (
                <>
                  <MissionItem 
                    mission={{
                      id: 'mock-1',
                      user_id: session?.user?.id || 'test-user',
                      title: "Create your first video script",
                      description: "Create a video script for your mortgage business",
                      xp_reward: 100,
                      status: 'not_started',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                      expires_at: null,
                      mission_type: 'daily'
                    }}
                    onToggle={handleMissionToggle}
                  />
                  <MissionItem 
                    mission={{
                      id: 'mock-2',
                      user_id: session?.user?.id || 'test-user',
                      title: "Share content with an agent",
                      description: "Share one of your content pieces with a real estate agent",
                      xp_reward: 50,
                      status: 'in_progress',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                      expires_at: null,
                      mission_type: 'daily'
                    }}
                    onToggle={handleMissionToggle}
                  />
                  <MissionItem 
                    mission={{
                      id: 'mock-3',
                      user_id: session?.user?.id || 'test-user',
                      title: "Complete your profile",
                      description: "Fill out all fields in your profile",
                      xp_reward: 25,
                      status: 'completed',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                      expires_at: null,
                      mission_type: 'daily'
                    }}
                    onToggle={handleMissionToggle}
                  />
                </>
              )}
            </div>
          </div>

          {/* Recent Content */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-bold mb-4">Recent Content</h3>
            <div className="space-y-3">
              {postsLoading ? (
                // Loading state
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : posts.length === 0 ? (
                // Empty state
                <div className="text-center py-4 text-gray-500">
                  <p>No content created yet</p>
                </div>
              ) : (
                // Posts list
                posts.slice(0, 3).map(post => (
                  <ContentItem key={post.id} post={post} />
                ))
              )}
              
              {/* If we don't have enough real posts, show some mock ones */}
              {!postsLoading && posts.length === 0 && (
                <>
                  <ContentItem 
                    post={{
                      id: 'mock-1',
                      user_id: session?.user?.id || 'test-user',
                      title: "First-Time Homebuyer Guide",
                      content: "Content about first-time homebuyers...",
                      platform: "blog",
                      status: 'published',
                      remixed_from: null,
                      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    }}
                  />
                  <ContentItem 
                    post={{
                      id: 'mock-2',
                      user_id: session?.user?.id || 'test-user',
                      title: "Market Update Video Script",
                      content: "Script for a market update video...",
                      platform: "video",
                      status: 'published',
                      remixed_from: null,
                      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
                      updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    }}
                  />
                  <ContentItem 
                    post={{
                      id: 'mock-3',
                      user_id: session?.user?.id || 'test-user',
                      title: "Rate Change Announcement",
                      content: "Announcement about rate changes...",
                      platform: "facebook",
                      status: 'published',
                      remixed_from: null,
                      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
