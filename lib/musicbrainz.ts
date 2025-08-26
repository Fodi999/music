// MusicBrainz API utilities
const MUSICBRAINZ_BASE_URL = 'https://musicbrainz.org/ws/2';
const USER_AGENT = 'NEXUS-Music-Website/1.0.0 (contact@nexusmusic.com)';

// Rate limiting: MusicBrainz allows 1 request per second
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1000;

async function rateLimitedFetch(url: string, options: RequestInit = {}) {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  
  return fetch(url, {
    ...options,
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'application/json',
      ...options.headers,
    },
  });
}

export interface MusicBrainzArtist {
  id: string;
  name: string;
  'sort-name': string;
  disambiguation?: string;
  'type-id'?: string;
  type?: string;
  'life-span'?: {
    begin?: string;
    end?: string;
    ended?: boolean;
  };
  area?: {
    id: string;
    name: string;
    'sort-name': string;
  };
  genres?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  tags?: Array<{
    name: string;
    count: number;
  }>;
}

export interface MusicBrainzRecording {
  id: string;
  title: string;
  length?: number;
  disambiguation?: string;
  score?: number; // Search score from MusicBrainz
  'artist-credit'?: Array<{
    name: string;
    artist: {
      id: string;
      name: string;
    };
  }>;
  releases?: Array<{
    id: string;
    title: string;
    date?: string;
    'cover-art-archive'?: {
      count: number;
      front: boolean;
      back: boolean;
    };
  }>;
  tags?: Array<{
    name: string;
    count: number;
  }>;
}

export interface MusicBrainzRelease {
  id: string;
  title: string;
  date?: string;
  status?: string; // Release status
  'primary-type'?: string; // Album, Single, EP, etc.
  'track-count'?: number; // Number of tracks
  'cover-art-archive': {
    count: number;
    front: boolean;
    back: boolean;
  };
  'artist-credit': Array<{
    name: string;
    artist: {
      id: string;
      name: string;
    };
  }>;
  'release-group'?: {
    id: string;
    'primary-type': string;
    'secondary-types'?: string[];
  };
  media?: Array<{
    title?: string;
    'track-count': number;
    tracks?: Array<{
      id: string;
      title: string;
      length?: number;
      position: number;
      recording: MusicBrainzRecording;
    }>;
  }>;
}

export interface MusicBrainzSearchResponse<T> {
  count: number;
  offset: number;
  created: string;
  [key: string]: T[] | number | string;
}

export interface MusicBrainzArtistSearchResult {
  artists: MusicBrainzArtist[];
  count: number;
  offset: number;
}

export interface MusicBrainzReleaseSearchResult {
  releases: MusicBrainzRelease[];
  count: number;
  offset: number;
}

export interface MusicBrainzRecordingSearchResult {
  recordings: MusicBrainzRecording[];
  count: number;
  offset: number;
}

// Search for artists
export async function searchArtists(query: string, limit: number = 10): Promise<MusicBrainzArtist[]> {
  try {
    const params = new URLSearchParams({
      query: query,
      fmt: 'json',
      limit: limit.toString(),
    });
    
    const response = await rateLimitedFetch(`${MUSICBRAINZ_BASE_URL}/artist?${params}`);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.artists || [];
  } catch (error) {
    console.error('Error searching artists:', error);
    return [];
  }
}

// Get artist details with releases
export async function getArtistDetails(artistId: string): Promise<MusicBrainzArtist | null> {
  try {
    const params = new URLSearchParams({
      fmt: 'json',
      inc: 'releases+release-groups+genres+tags+area',
    });
    
    const response = await rateLimitedFetch(`${MUSICBRAINZ_BASE_URL}/artist/${artistId}?${params}`);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting artist details:', error);
    return null;
  }
}

// Search for recordings (songs)
export async function searchRecordings(query: string, limit: number = 10): Promise<MusicBrainzRecording[]> {
  try {
    const params = new URLSearchParams({
      query: query,
      fmt: 'json',
      limit: limit.toString(),
    });
    
    const response = await rateLimitedFetch(`${MUSICBRAINZ_BASE_URL}/recording?${params}`);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.recordings || [];
  } catch (error) {
    console.error('Error searching recordings:', error);
    return [];
  }
}

// Get release details with tracks
export async function getReleaseDetails(releaseId: string): Promise<MusicBrainzRelease | null> {
  try {
    const params = new URLSearchParams({
      fmt: 'json',
      inc: 'recordings+artist-credits+release-groups',
    });
    
    const response = await rateLimitedFetch(`${MUSICBRAINZ_BASE_URL}/release/${releaseId}?${params}`);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting release details:', error);
    return null;
  }
}

// Get cover art from Cover Art Archive
export async function getCoverArt(releaseId: string): Promise<string | null> {
  try {
    const response = await fetch(`https://coverartarchive.org/release/${releaseId}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    const frontCover = data.images?.find((img: any) => img.front);
    
    return frontCover?.image || data.images?.[0]?.image || null;
  } catch (error) {
    console.error('Error getting cover art:', error);
    return null;
  }
}

// Search for electronic music artists and their releases
export async function searchElectronicMusic(genres: string[] = ['electronic', 'techno', 'house', 'ambient']): Promise<{
  artists: MusicBrainzArtist[];
  recordings: MusicBrainzRecording[];
}> {
  const results = {
    artists: [] as MusicBrainzArtist[],
    recordings: [] as MusicBrainzRecording[],
  };
  
  for (const genre of genres.slice(0, 2)) { // Limit to avoid rate limiting
    const artists = await searchArtists(`genre:${genre}`, 5);
    const recordings = await searchRecordings(`tag:${genre}`, 5);
    
    results.artists.push(...artists);
    results.recordings.push(...recordings);
  }
  
  return results;
}

// Format duration from milliseconds to MM:SS
export function formatDuration(milliseconds?: number): string {
  if (!milliseconds) return '0:00';
  
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Generate fallback playlist data
export function generateFallbackPlaylist() {
  return [
    {
      id: '1',
      title: 'Neon Dreams',
      artist: 'NEXUS',
      duration: '4:32',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      releaseDate: '2024',
      genre: 'Future Bass'
    },
    {
      id: '2',
      title: 'Cyberpunk Nights',
      artist: 'NEXUS',
      duration: '5:18',
      coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
      releaseDate: '2024',
      genre: 'Synthwave'
    },
    {
      id: '3',
      title: 'Digital Horizon',
      artist: 'NEXUS ft. Echo Matrix',
      duration: '4:45',
      coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop',
      releaseDate: '2023',
      genre: 'Ambient'
    },
    {
      id: '4',
      title: 'Quantum Bass',
      artist: 'NEXUS',
      duration: '6:12',
      coverUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      releaseDate: '2023',
      genre: 'Dubstep'
    },
    {
      id: '5',
      title: 'Synthetic Emotions',
      artist: 'NEXUS & Luna Waves',
      duration: '4:03',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      releaseDate: '2024',
      genre: 'Melodic Dubstep'
    },
    {
      id: '6',
      title: 'Orbital Drift',
      artist: 'NEXUS',
      duration: '7:21',
      coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop',
      releaseDate: '2022',
      genre: 'Ambient Techno'
    },
    {
      id: '7',
      title: 'Voltage Rush',
      artist: 'NEXUS ft. Digital Storm',
      duration: '3:54',
      coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
      releaseDate: '2023',
      genre: 'Electro House'
    },
    {
      id: '8',
      title: 'Binary Stars',
      artist: 'NEXUS',
      duration: '5:37',
      coverUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      releaseDate: '2022',
      genre: 'Progressive House'
    },
    {
      id: '9',
      title: 'Neural Network',
      artist: 'NEXUS & Future Dynamics',
      duration: '4:28',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      releaseDate: '2024',
      genre: 'Neurofunk'
    },
    {
      id: '10',
      title: 'Infinity Loop',
      artist: 'NEXUS',
      duration: '6:45',
      coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop',
      releaseDate: '2022',
      genre: 'Psytrance'
    }
  ];
}

// Search functions
export async function searchArtist(query: string, limit: number = 25, offset: number = 0): Promise<MusicBrainzArtistSearchResult> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `${MUSICBRAINZ_BASE_URL}/artist?query=${encodedQuery}&limit=${limit}&offset=${offset}&fmt=json`;
    
    const response = await rateLimitedFetch(url);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as MusicBrainzArtistSearchResult;
  } catch (error) {
    console.error('Error searching artists:', error);
    throw error;
  }
}

export async function searchReleasesByArtist(artistId: string, limit: number = 25, offset: number = 0): Promise<MusicBrainzReleaseSearchResult> {
  try {
    const url = `${MUSICBRAINZ_BASE_URL}/release?artist=${artistId}&limit=${limit}&offset=${offset}&fmt=json`;
    
    const response = await rateLimitedFetch(url);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as MusicBrainzReleaseSearchResult;
  } catch (error) {
    console.error('Error searching releases by artist:', error);
    throw error;
  }
}

export async function searchRecording(query: string, limit: number = 25, offset: number = 0): Promise<MusicBrainzRecordingSearchResult> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `${MUSICBRAINZ_BASE_URL}/recording?query=${encodedQuery}&limit=${limit}&offset=${offset}&fmt=json`;
    
    const response = await rateLimitedFetch(url);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as MusicBrainzRecordingSearchResult;
  } catch (error) {
    console.error('Error searching recordings:', error);
    throw error;
  }
}

export async function getArtistReleases(artistId: string, releaseType?: string[], limit: number = 50): Promise<MusicBrainzReleaseSearchResult> {
  try {
    let url = `${MUSICBRAINZ_BASE_URL}/release?artist=${artistId}&limit=${limit}&fmt=json`;
    
    if (releaseType && releaseType.length > 0) {
      const types = releaseType.join('+OR+');
      url += `&type=${types}`;
    }
    
    const response = await rateLimitedFetch(url);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as MusicBrainzReleaseSearchResult;
  } catch (error) {
    console.error('Error getting artist releases:', error);
    throw error;
  }
}

// Advanced search with filters
export async function advancedArtistSearch(options: {
  name?: string;
  country?: string;
  type?: string;
  area?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}): Promise<MusicBrainzArtistSearchResult> {
  try {
    const queryParts: string[] = [];
    
    if (options.name) queryParts.push(`artist:"${options.name}"`);
    if (options.country) queryParts.push(`country:${options.country}`);
    if (options.type) queryParts.push(`type:${options.type}`);
    if (options.area) queryParts.push(`area:"${options.area}"`);
    if (options.tag) queryParts.push(`tag:${options.tag}`);
    
    const query = queryParts.join(' AND ');
    const encodedQuery = encodeURIComponent(query);
    
    const limit = options.limit || 25;
    const offset = options.offset || 0;
    
    const url = `${MUSICBRAINZ_BASE_URL}/artist?query=${encodedQuery}&limit=${limit}&offset=${offset}&fmt=json`;
    
    const response = await rateLimitedFetch(url);
    
    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as MusicBrainzArtistSearchResult;
  } catch (error) {
    console.error('Error in advanced artist search:', error);
    throw error;
  }
}
