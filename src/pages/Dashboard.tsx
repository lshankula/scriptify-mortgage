import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, Target, TrendingUp, Users, Zap, Trophy } from 'lucide-react';
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
        <div 
          className="cursor-pointer"
          onClick={handleToggle}
        >
          <input 
            type="checkbox" 
            checked={progress === 1}
            className="w-4 h-4 text-primary rounded cursor-pointer"
            readOnly
          />
        </div>
        <span 
          className={progress === 1 ? 'text-gray-500 line-through cursor-pointer' : 'cursor-pointer'}
          onClick={handleToggle}
        >
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
  const navigate = useNavigate();
  
  // Determine content type based on type field
  const getContentType = (post: Post) => {
    switch (post.type.toLowerCase()) {
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
  
  const handleViewPost = () => {
    // Navigate to the post detail page
    if (post.type.toLowerCase() === 'facebook' || 
        post.type.toLowerCase() === 'instagram' || 
        post.type.toLowerCase() === 'twitter' || 
        post.type.toLowerCase() === 'linkedin') {
      navigate(`/social/post/${post.id}`);
    } else if (post.type.toLowerCase() === 'blog') {
      navigate(`/content/blog/${post.id}`);
    } else if (post.type.toLowerCase() === 'video') {
      navigate(`/content/video/${post.id}`);
    } else {
      navigate(`/content/post/${post.id}`);
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
      <button 
        className="text-primary hover:text-primary-dark"
        onClick={handleViewPost}
      >
        View
      </button>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { missions, isLoading: missionsLoading, updateMissionStatus } = useMissions();
  const { posts, isLoading: postsLoading } = usePosts();
  const { 
    level, 
    levelTitle,
    xpTotal, 
    xpToNextLevel, 
    levelProgress, 
    levelConfig,
    isLoading: progressLoading,
    addXP
  } = useUserProgress();
  
  // Handle mission toggle
  const handleMissionToggle = async (id: string, status: MissionType['status']) => {
    // Get the mission before updating it
    const mission = missions.find(m => m.id === id);
    const previousStatus = mission?.status;
    
    await updateMissionStatus(id, status);
    
    // If mission is newly completed, add XP
    if (status === 'completed' && previousStatus !== 'completed') {
      if (mission) {
        addXP(mission.xp_reward);
      }
    }
    // If mission was completed but now is not, remove XP
    else if (previousStatus === 'completed' && status !== 'completed') {
      if (mission) {
        // Use negative XP to subtract
        addXP(-mission.xp_reward);
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
                <Trophy className="w-5 h-5 text-accent" />
                {levelTitle} (Level {level})
              </h2>
              <p className="text-gray-600">{levelConfig.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{xpTotal.toLocaleString()} XP</div>
              <p className="text-sm text-gray-600">Next level: {xpToNextLevel.toLocaleString()} XP needed</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500 ease-in-out" 
              style={{ width: `${Math.round(levelProgress * 100)}%` }}
              title={`${Math.round(levelProgress * 100)}% progress to next level`}
            ></div>
          </div>
          
          {/* Level benefits */}
          {levelConfig.benefits && levelConfig.benefits.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Level Benefits:</p>
              <div className="flex flex-wrap gap-2">
                {levelConfig.benefits.map((benefit, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    <Star className="w-3 h-3 mr-1" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}
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
                posts.length > 0 ? (
                  "↑ New content added"
                ) : (
                  <button 
                    className="text-green-600 hover:text-green-700 underline"
                    onClick={() => navigate('/social')}
                  >
                    Create your first content
                  </button>
                )
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Daily Missions
              </h3>
              {!missionsLoading && missions.filter(m => m.mission_type === 'daily').length > 0 && (
                <div className="text-sm text-gray-600">
                  {missions.filter(m => m.mission_type === 'daily' && m.status === 'completed').length}/
                  {missions.filter(m => m.mission_type === 'daily').length} completed
                </div>
              )}
            </div>
            <div className="space-y-3">
              {missionsLoading ? (
                // Loading state
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : missions.filter(m => m.mission_type === 'daily').length === 0 ? (
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
            </div>
          </div>

          {/* Recent Content */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Content</h3>
              {!postsLoading && posts.length > 0 && (
                <button 
                  className="text-sm text-primary hover:text-primary-dark"
                  onClick={() => navigate('/content')}
                >
                  View all
                </button>
              )}
            </div>
            <div className="space-y-3">
              {postsLoading ? (
                // Loading state
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : posts.length === 0 ? (
                // Empty state with call to action
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-3">No content created yet</p>
                  <button 
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    onClick={() => navigate('/social')}
                  >
                    Create Your First Content
                  </button>
                </div>
              ) : (
                // Posts list
                posts.slice(0, 3).map(post => (
                  <ContentItem key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
