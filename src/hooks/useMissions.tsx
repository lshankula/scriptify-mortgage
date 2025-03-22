import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Mission, MissionInsert, MissionUpdate } from '@/integrations/supabase/types/missions';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/useSession';
import { usePosts } from '@/hooks/usePosts';

// Generic database operations to handle the case where the missions table doesn't exist
const dbOperations = {
  async fetchMissions(userId: string) {
    try {
      // Use any to bypass TypeScript checking
      const result = await (supabase as any)
        .from('missions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      return result;
    } catch (error) {
      console.error('Error in fetchMissions:', error);
      return { data: null, error };
    }
  },
  
  async updateMission(missionId: string, userId: string, updates: any) {
    try {
      const result = await (supabase as any)
        .from('missions')
        .update(updates)
        .eq('id', missionId)
        .eq('user_id', userId);
      
      return result;
    } catch (error) {
      console.error('Error in updateMission:', error);
      return { data: null, error };
    }
  },
  
  async createMission(mission: any) {
    try {
      const result = await (supabase as any)
        .from('missions')
        .insert(mission)
        .select()
        .single();
      
      return result;
    } catch (error) {
      console.error('Error in createMission:', error);
      return { data: null, error };
    }
  }
};

// Daily mission templates
const DAILY_MISSION_TEMPLATES = [
  {
    title: "Create a social media post",
    description: "Create a new social media post for your mortgage business",
    xp_reward: 100,
    mission_type: 'daily'
  },
  {
    title: "Create a video script",
    description: "Create a video script for your mortgage business",
    xp_reward: 150,
    mission_type: 'daily'
  },
  {
    title: "Create a blog post",
    description: "Create a blog post for your mortgage business",
    xp_reward: 200,
    mission_type: 'daily'
  },
  {
    title: "Share content with a client",
    description: "Share one of your content pieces with a client",
    xp_reward: 50,
    mission_type: 'daily'
  },
  {
    title: "Share content with an agent",
    description: "Share one of your content pieces with a real estate agent",
    xp_reward: 75,
    mission_type: 'daily'
  },
  {
    title: "Update your profile",
    description: "Keep your profile information up to date",
    xp_reward: 25,
    mission_type: 'daily'
  },
  {
    title: "Complete onboarding",
    description: "Complete the onboarding process",
    xp_reward: 50,
    mission_type: 'daily'
  },
  {
    title: "Create an email campaign",
    description: "Create an email campaign for your mortgage business",
    xp_reward: 125,
    mission_type: 'daily'
  }
];

// Weekly mission templates
const WEEKLY_MISSION_TEMPLATES = [
  {
    title: "Create 5 social media posts",
    description: "Create 5 social media posts this week",
    xp_reward: 500,
    mission_type: 'weekly'
  },
  {
    title: "Create a video script and share it",
    description: "Create a video script and share it with at least one person",
    xp_reward: 300,
    mission_type: 'weekly'
  },
  {
    title: "Create content for 3 different platforms",
    description: "Create content for 3 different platforms (e.g., Facebook, Instagram, LinkedIn)",
    xp_reward: 400,
    mission_type: 'weekly'
  }
];

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { session } = useSession();
  const { posts } = usePosts();

  // Generate dynamic daily missions based on user activity and current date
  const generateDailyMissions = useCallback(() => {
    if (!session?.user?.id) return [];
    
    // Use the current date as a seed for consistent daily missions
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Simple hash function to get a consistent number from the date string
    const getHashFromString = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    
    const dateHash = getHashFromString(dateString + session.user.id);
    
    // Select 3 random missions for today based on the date hash
    const selectedMissions: Mission[] = [];
    const missionCount = Math.min(3, DAILY_MISSION_TEMPLATES.length);
    
    // Create a copy of the templates to avoid modifying the original
    const templates = [...DAILY_MISSION_TEMPLATES];
    
    // Prioritize content creation if user has no posts
    if (posts.length === 0) {
      // Find content creation missions
      const contentCreationIndices = templates
        .map((template, index) => template.title.toLowerCase().includes('create') ? index : -1)
        .filter(index => index !== -1);
      
      if (contentCreationIndices.length > 0) {
        // Add a content creation mission first
        const randomIndex = contentCreationIndices[dateHash % contentCreationIndices.length];
        const template = templates[randomIndex];
        
        selectedMissions.push({
          id: `daily-${dateString}-${randomIndex}`,
          user_id: session.user.id,
          title: template.title,
          description: template.description,
          xp_reward: template.xp_reward,
          status: 'not_started',
          created_at: today.toISOString(),
          updated_at: today.toISOString(),
          expires_at: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString(),
          mission_type: 'daily'
        });
        
        // Remove the selected template
        templates.splice(randomIndex, 1);
      }
    }
    
    // Fill the remaining slots with random missions
    while (selectedMissions.length < missionCount && templates.length > 0) {
      const randomIndex = (dateHash + selectedMissions.length) % templates.length;
      const template = templates[randomIndex];
      
      selectedMissions.push({
        id: `daily-${dateString}-${randomIndex}-${selectedMissions.length}`,
        user_id: session.user.id,
        title: template.title,
        description: template.description,
        xp_reward: template.xp_reward,
        status: 'not_started',
        created_at: today.toISOString(),
        updated_at: today.toISOString(),
        expires_at: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString(),
        mission_type: 'daily'
      });
      
      // Remove the selected template
      templates.splice(randomIndex, 1);
    }
    
    return selectedMissions;
  }, [session, posts]);
  
  // Generate dynamic weekly missions
  const generateWeeklyMissions = useCallback(() => {
    if (!session?.user?.id) return [];
    
    // Get the current week number
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((today.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    
    // Use the week number as a seed for consistent weekly missions
    const weekString = `${today.getFullYear()}-W${weekNumber}`;
    
    // Simple hash function to get a consistent number from the week string
    const getHashFromString = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    
    const weekHash = getHashFromString(weekString + session.user.id);
    
    // Select 2 random missions for this week based on the week hash
    const selectedMissions: Mission[] = [];
    const missionCount = Math.min(2, WEEKLY_MISSION_TEMPLATES.length);
    
    // Create a copy of the templates to avoid modifying the original
    const templates = [...WEEKLY_MISSION_TEMPLATES];
    
    // Fill the slots with random missions
    while (selectedMissions.length < missionCount && templates.length > 0) {
      const randomIndex = (weekHash + selectedMissions.length) % templates.length;
      const template = templates[randomIndex];
      
      // Calculate the end of the week (Sunday)
      const daysUntilSunday = 7 - today.getDay();
      const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSunday);
      
      selectedMissions.push({
        id: `weekly-${weekString}-${randomIndex}-${selectedMissions.length}`,
        user_id: session.user.id,
        title: template.title,
        description: template.description,
        xp_reward: template.xp_reward,
        status: 'not_started',
        created_at: today.toISOString(),
        updated_at: today.toISOString(),
        expires_at: endOfWeek.toISOString(),
        mission_type: 'weekly'
      });
      
      // Remove the selected template
      templates.splice(randomIndex, 1);
    }
    
    return selectedMissions;
  }, [session]);

  const fetchMissions = useCallback(async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const { data, error } = await dbOperations.fetchMissions(session.user.id);

      if (error) {
        // If there's an error (like table doesn't exist), use generated missions
        console.log('Error fetching missions, using generated missions:', error);
        const dailyMissions = generateDailyMissions();
        const weeklyMissions = generateWeeklyMissions();
        setMissions([...dailyMissions, ...weeklyMissions]);
        return;
      }
      
      // If we have missions in the database, use those
      if (data && data.length > 0) {
        setMissions(data as Mission[]);
      } else {
        // If no missions in database, use generated ones
        const dailyMissions = generateDailyMissions();
        const weeklyMissions = generateWeeklyMissions();
        setMissions([...dailyMissions, ...weeklyMissions]);
      }
    } catch (error: any) {
      console.error('Error fetching missions:', error);
      // Use generated missions as fallback
      const dailyMissions = generateDailyMissions();
      const weeklyMissions = generateWeeklyMissions();
      setMissions([...dailyMissions, ...weeklyMissions]);
      
      toast({
        title: 'Notice',
        description: 'Using generated missions while database connection is unavailable.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [session, toast, generateDailyMissions, generateWeeklyMissions]);

  const updateMissionStatus = useCallback(async (missionId: string, status: Mission['status']) => {
    if (!session?.user?.id) return;

    try {
      // Check if this is a generated mission (ID starts with 'daily-' or 'weekly-')
      const isGeneratedMission = missionId.startsWith('daily-') || missionId.startsWith('weekly-');
      
      if (!isGeneratedMission) {
        // If it's a real mission in the database, update it
        const { error } = await dbOperations.updateMission(
          missionId,
          session.user.id,
          { 
            status,
            updated_at: new Date().toISOString()
          }
        );

        if (error) throw error;
      }
      
      // Update local state regardless of whether it's a generated or real mission
      setMissions(prev => 
        prev.map(mission => 
          mission.id === missionId 
            ? { ...mission, status, updated_at: new Date().toISOString() } 
            : mission
        )
      );

      toast({
        title: 'Mission Updated',
        description: status === 'completed' 
          ? 'Mission completed! You earned XP!' 
          : 'Mission status updated.',
      });
    } catch (error: any) {
      console.error('Error updating mission:', error);
      
      // Even if the database update fails, update the local state for generated missions
      if (missionId.startsWith('daily-') || missionId.startsWith('weekly-')) {
        setMissions(prev => 
          prev.map(mission => 
            mission.id === missionId 
              ? { ...mission, status, updated_at: new Date().toISOString() } 
              : mission
          )
        );
        
        toast({
          title: 'Mission Updated',
          description: status === 'completed' 
            ? 'Mission completed! You earned XP!' 
            : 'Mission status updated.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update mission. Please try again.',
          variant: 'destructive',
        });
      }
    }
  }, [session, toast]);

  const createMission = useCallback(async (mission: Omit<MissionInsert, 'user_id'>) => {
    if (!session?.user?.id) return;

    try {
      const newMission: MissionInsert = {
        ...mission,
        user_id: session.user.id,
        status: mission.status || 'not_started',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await dbOperations.createMission(newMission);

      if (error) {
        // If database insert fails, still add to local state with a generated ID
        const localMission: Mission = {
          ...newMission as any,
          id: `local-${Date.now()}`,
          status: newMission.status || 'not_started',
          created_at: newMission.created_at || new Date().toISOString(),
          updated_at: newMission.updated_at || new Date().toISOString(),
          expires_at: null,
          mission_type: newMission.mission_type || 'daily',
        };
        
        setMissions(prev => [localMission, ...prev]);
        
        toast({
          title: 'Mission Created',
          description: 'New mission has been created locally.',
        });
        
        return localMission;
      }
      
      // Update local state with the database response
      setMissions(prev => [data as Mission, ...prev]);

      toast({
        title: 'Mission Created',
        description: 'New mission has been created.',
      });

      return data as Mission;
    } catch (error: any) {
      console.error('Error creating mission:', error);
      toast({
        title: 'Error',
        description: 'Failed to create mission. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  }, [session, toast]);

  // Refresh missions when the date changes
  useEffect(() => {
    const checkForNewDay = () => {
      const now = new Date();
      const currentDate = now.toDateString();
      const storedDate = localStorage.getItem('lastMissionCheckDate');
      
      if (storedDate !== currentDate) {
        localStorage.setItem('lastMissionCheckDate', currentDate);
        if (session?.user?.id) {
          fetchMissions();
        }
      }
    };
    
    // Check immediately
    checkForNewDay();
    
    // Then check periodically
    const interval = setInterval(checkForNewDay, 60 * 60 * 1000); // Check every hour
    
    return () => clearInterval(interval);
  }, [session, fetchMissions]);

  // Initialize missions on component mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchMissions();
    } else {
      setMissions([]);
      setIsLoading(false);
    }
  }, [session, fetchMissions]);

  return {
    missions,
    isLoading,
    fetchMissions,
    updateMissionStatus,
    createMission,
    generateDailyMissions,
    generateWeeklyMissions,
    dailyMissions: missions.filter(m => m.mission_type === 'daily'),
    weeklyMissions: missions.filter(m => m.mission_type === 'weekly'),
    achievements: missions.filter(m => m.mission_type === 'achievement'),
  };
};
