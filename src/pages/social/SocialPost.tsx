import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Post } from '@/types/social';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function SocialPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        toast({
          title: 'Error',
          description: 'Failed to load post',
          variant: 'destructive',
        });
        throw error;
      }

      return data as Post;
    },
  });

  const handleRemix = async (platform: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        toast({
          title: 'Error',
          description: 'You must be logged in to remix posts',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: session.session.user.id,
          title: `${post?.title} (Remix)`,
          content: post?.content,
          type: post?.type || 'thoughtLeadership',
          metadata: {
            ...post?.metadata,
            platform,
            isRemix: true,
            originalPostId: post?.id
          }
        })
        .select()
        .single();

      if (error) {
        console.error('Error remixing post:', error);
        toast({
          title: 'Error',
          description: 'Failed to remix post',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Post remixed successfully',
      });

      navigate(`/social/post/${data.id}`);
    } catch (error) {
      console.error('Error in remix handler:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const platform = post.metadata?.platform || 'linkedin';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          <div className="mt-4 text-sm text-gray-500">
            Platform: {platform}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Remix for another platform</h2>
          <div className="flex flex-wrap gap-4">
            {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((p) => (
              p.toLowerCase() !== platform.toLowerCase() && (
                <Button
                  key={p}
                  onClick={() => handleRemix(p.toLowerCase())}
                  variant="outline"
                >
                  Remix for {p}
                </Button>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}