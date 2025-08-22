'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchDiscordUser, DiscordUser } from '@/lib/discord-api';

interface DiscordUserCardProps {
  userId: string;
  displayName?: string;
  role?: string;
  className?: string;
}

export default function DiscordUserCard({ 
  userId, 
  displayName,
  role = 'Official Seller',
  className = ''
}: DiscordUserCardProps) {
  const [userData, setUserData] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        // Fetch user data from Discord API using utility function
        const data = await fetchDiscordUser(userId);
        
        if (data) {
          setUserData(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching Discord user data:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Use provided display name or fallback to Discord data
  const finalDisplayName = displayName || userData?.display_name || userData?.username || 'Unknown User';

  return (
    <Link
      href={`https://discord.com/users/${userId}`}
      className={`glass-card p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {isLoading ? (
          <div className="w-12 h-12 animate-pulse bg-muted rounded-full" />
        ) : error || !userData?.avatarUrl ? (
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <span className="text-muted-foreground text-lg font-bold">
              {finalDisplayName.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <Image
            src={userData.avatarUrl}
            alt={finalDisplayName}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
      </div>
      
      <span className="font-greater-theory text-xl text-center">{finalDisplayName}</span>
      
      <div className="flex items-center gap-2 text-primary">
        <span className="text-sm">{role}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2">
          <circle cx="12" cy="12" r="10" fill="#1877F2" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
