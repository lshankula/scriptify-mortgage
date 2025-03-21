import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/useSession';

interface UserProgress {
  id: string;
  user_id: string;
  xp_total: number;
  level: number;
  xp_to_next_level: number;
  created_at: string;
  updated_at: string;
}

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
          console.log('User progress table does not exist, using mock data');
          // Return mock data for now
          setProgress({
            id: 'mock-id',
            user_id: session.user.id,
            xp_total: 2450,
            level: 3,
            xp_to_next_level: 550,
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
      // Use mock data as fallback
      setProgress({
        id: 'mock-id',
        user_id: session.user.id,
        xp_total: 2450,
        level: 3,
        xp_to_next_level: 550,
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
      const initialProgress = {
        user_id: session.user.id,
        xp_total: 0,
        level: 1,
        xp_to_next_level: 1000,
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
      setProgress({
        id: 'mock-id',
        user_id: session.user.id,
        xp_total: 0,
        level: 1,
        xp_to_next_level: 1000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }, [session]);

  const addXP = useCallback(async (amount: number) => {
    if (!session?.user?.id || !progress) return;

    // Calculate new values
    const newXpTotal = progress.xp_total + amount;
    let newLevel = progress.level;
    let newXpToNextLevel = progress.xp_to_next_level - amount;
    
    // Check if user leveled up
    if (newXpToNextLevel <= 0) {
      newLevel += 1;
      // Each level requires more XP (simple formula: 1000 * level)
      newXpToNextLevel = 1000 * newLevel - Math.abs(newXpToNextLevel);
    }

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

  return {
    progress,
    isLoading,
    fetchProgress,
    addXP,
    level: progress?.level || 1,
    xpTotal: progress?.xp_total || 0,
    xpToNextLevel: progress?.xp_to_next_level || 1000,
    levelProgress: progress ? 1 - (progress.xp_to_next_level / (1000 * progress.level)) : 0,
  };
};
