'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchDiscordUser, DiscordUser } from '@/lib/discord-api';

interface DiscordAvatarProps {
  userId: string;
  size?: number;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
}

export default function DiscordAvatar({ 
  userId, 
  size = 48, 
  fallbackSrc = '/sellers/default-avatar.png',
  alt = 'Discord Avatar',
  className = ''
}: DiscordAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        // Fetch user data from Discord API using utility function
        const userData = await fetchDiscordUser(userId);
        
        if (userData?.avatarUrl) {
          setAvatarUrl(userData.avatarUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching Discord avatar:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchAvatar();
    }
  }, [userId]);

  // Show loading state
  if (isLoading) {
    return (
      <div 
        className={`animate-pulse bg-muted rounded-full ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Show avatar if available, otherwise fallback
  const imageSrc = avatarUrl || fallbackSrc;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      onError={() => setError(true)}
    />
  );
}
