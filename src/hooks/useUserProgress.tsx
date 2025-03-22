import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/useSession';
import { 
  calculateLevel, 
  calculateXpToNextLevel, 
  calculateLevelProgress, 
  getLevelConfig 
} from '@/data/levelConfig';
import type { UserProgress } from '@/integrations/supabase/types/user-progress';

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { session } = useSession();

  const fetchProgress = useCallback(async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      // Check if user_progress table exists
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        // If the table doesn't exist or the user doesn't have a progress record,
        // we'll create a default one
        if (error.code === 'PGRST116') { // Table doesn't exist
          console.log('User progress table does not exist, using default data');
          // Return default data with 0 XP
          const initialXpTotal = 0;
          const initialLevel = calculateLevel(initialXpTotal);
          setProgress({
            id: 'mock-id',
            user_id: session.user.id,
            xp_total: initialXpTotal,
            level: initialLevel,
            xp_to_next_level: calculateXpToNextLevel(initialXpTotal),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          return;
        } else if (error.code === 'PGRST104') { // No rows returned
          // Create a new progress record
          await createInitialProgress();
          return;
        } else {
          throw error;
        }
      }
      
      setProgress(data);
    } catch (error: any) {
      console.error('Error fetching user progress:', error);
      // Use default data as fallback with 0 XP
      const initialXpTotal = 0;
      const initialLevel = calculateLevel(initialXpTotal);
      setProgress({
        id: 'mock-id',
        user_id: session.user.id,
        xp_total: initialXpTotal,
        level: initialLevel,
        xp_to_next_level: calculateXpToNextLevel(initialXpTotal),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const createInitialProgress = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const initialXpTotal = 0;
      const initialLevel = calculateLevel(initialXpTotal);
      const initialProgress = {
        user_id: session.user.id,
        xp_total: initialXpTotal,
        level: initialLevel,
        xp_to_next_level: calculateXpToNextLevel(initialXpTotal),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('user_progress')
        .insert(initialProgress)
        .select()
        .single();

      if (error) {
        // If we can't create a record (e.g., table doesn't exist),
        // use mock data
        setProgress({
          id: 'mock-id',
          ...initialProgress,
        });
        return;
      }
      
      setProgress(data);
    } catch (error: any) {
      console.error('Error creating initial user progress:', error);
      // Use mock data as fallback
      const initialXpTotal = 0;
      const initialLevel = calculateLevel(initialXpTotal);
      setProgress({
        id: 'mock-id',
        user_id: session.user.id,
        xp_total: initialXpTotal,
        level: initialLevel,
        xp_to_next_level: calculateXpToNextLevel(initialXpTotal),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }, [session]);

  const addXP = useCallback(async (amount: number) => {
    if (!session?.user?.id || !progress) return;

    // Calculate new values using the level config system
    const newXpTotal = progress.xp_total + amount;
    const newLevel = calculateLevel(newXpTotal);
    const newXpToNextLevel = calculateXpToNextLevel(newXpTotal);

    try {
      // Try to update in database
      const { data, error } = await supabase
        .from('user_progress')
        .update({
          xp_total: newXpTotal,
          level: newLevel,
          xp_to_next_level: newXpToNextLevel,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user.id)
        .select()
        .single();

      if (error) {
        // If update fails, just update local state
        setProgress({
          ...progress,
          xp_total: newXpTotal,
          level: newLevel,
          xp_to_next_level: newXpToNextLevel,
          updated_at: new Date().toISOString(),
        });
        
        if (newLevel > progress.level) {
          toast({
            title: 'Level Up!',
            description: `Congratulations! You've reached level ${newLevel}!`,
          });
        } else {
          toast({
            title: 'XP Earned',
            description: `You earned ${amount} XP!`,
          });
        }
        
        return;
      }
      
      // Update local state with data from database
      setProgress(data);
      
      if (newLevel > progress.level) {
        toast({
          title: 'Level Up!',
          description: `Congratulations! You've reached level ${newLevel}!`,
        });
      } else {
        toast({
          title: 'XP Earned',
          description: `You earned ${amount} XP!`,
        });
      }
    } catch (error: any) {
      console.error('Error adding XP:', error);
      // Update local state anyway
      setProgress({
        ...progress,
        xp_total: newXpTotal,
        level: newLevel,
        xp_to_next_level: newXpToNextLevel,
        updated_at: new Date().toISOString(),
      });
      
      toast({
        title: 'XP Earned',
        description: `You earned ${amount} XP!`,
      });
    }
  }, [session, progress, toast]);

  // Initialize progress on component mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchProgress();
    } else {
      setProgress(null);
      setIsLoading(false);
    }
  }, [session, fetchProgress]);

  // Get the level title and config from the level config
  const levelConfig = progress ? getLevelConfig(progress.level) : getLevelConfig(1);
  
  return {
    progress,
    isLoading,
    fetchProgress,
    addXP,
    level: progress?.level || 1,
    levelTitle: levelConfig.title,
    xpTotal: progress?.xp_total || 0,
    xpToNextLevel: progress?.xp_to_next_level || calculateXpToNextLevel(0),
    levelProgress: progress ? calculateLevelProgress(progress.xp_total) : 0,
    levelConfig,
  };
};
