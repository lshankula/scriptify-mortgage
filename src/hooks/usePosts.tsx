import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Post, PostInsert, PostUpdate } from '@/integrations/supabase/types/posts';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/useSession';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { session } = useSession();

  const fetchPosts = useCallback(async (limit = 10) => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load posts. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [session, toast]);

  const createPost = useCallback(async (post: Omit<PostInsert, 'user_id'>) => {
    if (!session?.user?.id) return;

    try {
      const newPost: PostInsert = {
        ...post,
        user_id: session.user.id,
        status: post.status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('posts')
        .insert(newPost)
        .select()
        .single();

      if (error) throw error;
      
      // Update local state
      setPosts(prev => [data, ...prev]);

      toast({
        title: 'Post Created',
        description: 'Your post has been created successfully.',
      });

      return data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  }, [session, toast]);

  const updatePost = useCallback(async (id: string, updates: PostUpdate) => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', session.user.id)
        .select()
        .single();

      if (error) throw error;
      
      // Update local state
      setPosts(prev => 
        prev.map(post => 
          post.id === id ? data : post
        )
      );

      toast({
        title: 'Post Updated',
        description: 'Your post has been updated successfully.',
      });

      return data;
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to update post. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  }, [session, toast]);

  const deletePost = useCallback(async (id: string) => {
    if (!session?.user?.id) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) throw error;
      
      // Update local state
      setPosts(prev => prev.filter(post => post.id !== id));

      toast({
        title: 'Post Deleted',
        description: 'Your post has been deleted successfully.',
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete post. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [session, toast]);

  // Initialize posts on component mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchPosts();
    } else {
      setPosts([]);
      setIsLoading(false);
    }
  }, [session, fetchPosts]);

  return {
    posts,
    isLoading,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    recentPosts: posts.slice(0, 5), // Get 5 most recent posts
  };
};
