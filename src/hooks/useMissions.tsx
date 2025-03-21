import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Mission, MissionInsert, MissionUpdate } from '@/integrations/supabase/types/missions';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/useSession';

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { session } = useSession();

  const fetchMissions = useCallback(async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMissions(data || []);
    } catch (error: any) {
      console.error('Error fetching missions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load missions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [session, toast]);

  const updateMissionStatus = useCallback(async (missionId: string, status: Mission['status']) => {
    if (!session?.user?.id) return;

    try {
      const { error } = await supabase
        .from('missions')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', missionId)
        .eq('user_id', session.user.id);

      if (error) throw error;
      
      // Update local state
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
      toast({
        title: 'Error',
        description: 'Failed to update mission. Please try again.',
        variant: 'destructive',
      });
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

      const { data, error } = await supabase
        .from('missions')
        .insert(newMission)
        .select()
        .single();

      if (error) throw error;
      
      // Update local state
      setMissions(prev => [data, ...prev]);

      toast({
        title: 'Mission Created',
        description: 'New mission has been created.',
      });

      return data;
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
    dailyMissions: missions.filter(m => m.mission_type === 'daily'),
    weeklyMissions: missions.filter(m => m.mission_type === 'weekly'),
    achievements: missions.filter(m => m.mission_type === 'achievement'),
  };
};
