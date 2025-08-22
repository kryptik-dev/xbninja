// Discord API utility functions
const DISCORD_API_BASE = 'https://avatar-cyan.vercel.app/api';

export interface DiscordUser {
  id: string;
  username: string;
  display_name: string;
  avatarUrl: string;
  discriminator: string;
}

export interface DiscordBanner {
  bannerUrl: string;
  size?: number;
  format?: string;
}

// Cache for user data to avoid repeated API calls
const userCache = new Map<string, { data: DiscordUser; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchDiscordUser(userId: string): Promise<DiscordUser | null> {
  try {
    // Check cache first
    const cached = userCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const response = await fetch(`${DISCORD_API_BASE}/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    
    const userData: DiscordUser = await response.json();
    
    // Cache the result
    userCache.set(userId, { data: userData, timestamp: Date.now() });
    
    return userData;
  } catch (error) {
    console.error(`Error fetching Discord user ${userId}:`, error);
    return null;
  }
}

export async function fetchDiscordAvatar(userId: string, size: number = 512, format: string = 'png'): Promise<string | null> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/pfp/${userId}/${size}?format=${format}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch avatar: ${response.status}`);
    }
    
    return response.url;
  } catch (error) {
    console.error(`Error fetching Discord avatar ${userId}:`, error);
    return null;
  }
}

export async function fetchDiscordBanner(userId: string, size: number = 512, format: string = 'png'): Promise<string | null> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/banner/${userId}?size=${size}&format=${format}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch banner: ${response.status}`);
    }
    
    const bannerData: DiscordBanner = await response.json();
    return bannerData.bannerUrl || null;
  } catch (error) {
    console.error(`Error fetching Discord banner ${userId}:`, error);
    return null;
  }
}

// Get avatar URL with fallback to default Discord avatar
export function getAvatarUrl(userId: string, avatarHash: string | null, size: number = 512): string {
  if (!avatarHash) {
    // Return default Discord avatar
    const defaultAvatarNumber = parseInt(userId) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  }
  
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=${size}`;
}

// Clear cache (useful for testing or when you want fresh data)
export function clearDiscordCache(): void {
  userCache.clear();
}
