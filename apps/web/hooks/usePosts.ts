'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPublicPosts, getUserPosts } from '@/app/actions/posts';

export interface DBPost {
  id: string;
  title: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  isPrivate: boolean;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    avatar: string | null;
  };
  likesCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  commentsCount?: number;
}

export function usePublicPosts() {
  const [posts, setPosts] = useState<DBPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getPublicPosts();
      setPosts(data as DBPost[]);
    } catch (err) {
      console.error('Error fetching public posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
}

export function useUserPosts(username: string, viewerId?: string) {
  const [posts, setPosts] = useState<DBPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getUserPosts(username, viewerId);
      setPosts(data as DBPost[]);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    } finally {
      setLoading(false);
    }
  }, [username, viewerId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
}
