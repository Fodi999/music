// MusicBrainz API utilities - using internal API routes
import { getCoverByIndex } from './covers';

const API_BASE_URL = '/api/music';

// Rate limiting is handled by our API routes
async function apiRequest(url: string) {
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
  }
  
  return response.json();
}

export interface MusicBrainzArtist {
  id: string;
  name: string;
  'sort-name': string;
  disambiguation?: string;
  'type-id'?: string;
  type?: string;
  score?: number; // Search score from MusicBrainz
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
  media?: Array<{
    title?: string;
    'track-count': number;
    format?: string;
  }>;
  'label-info'?: Array<{
    label: {
      id: string;
      name: string;
    };
  }>;
  country?: string;
  disambiguation?: string;
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

// Search functions
export async function searchArtist(query: string, limit: number = 25, offset: number = 0): Promise<MusicBrainzArtistSearchResult> {
  try {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&type=artist&limit=${limit}&offset=${offset}`;
    const data = await apiRequest(url);
    return data as MusicBrainzArtistSearchResult;
  } catch (error) {
    console.error('Error searching artists:', error);
    throw error;
  }
}

export async function searchReleasesByArtist(artistId: string, limit: number = 25, offset: number = 0): Promise<MusicBrainzReleaseSearchResult> {
  try {
    const url = `${API_BASE_URL}/artist/${artistId}/releases?limit=${limit}&offset=${offset}`;
    const data = await apiRequest(url);
    return data as MusicBrainzReleaseSearchResult;
  } catch (error) {
    console.error('Error searching releases by artist:', error);
    throw error;
  }
}

export async function searchRecording(query: string, limit: number = 25, offset: number = 0): Promise<MusicBrainzRecordingSearchResult> {
  try {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&type=recording&limit=${limit}&offset=${offset}`;
    const data = await apiRequest(url);
    return data as MusicBrainzRecordingSearchResult;
  } catch (error) {
    console.error('Error searching recordings:', error);
    throw error;
  }
}

export async function getArtistReleases(artistId: string, releaseType?: string[], limit: number = 50): Promise<MusicBrainzReleaseSearchResult> {
  try {
    let url = `${API_BASE_URL}/artist/${artistId}/releases?limit=${limit}`;
    
    if (releaseType && releaseType.length > 0) {
      const types = releaseType.join('+OR+');
      url += `&type=${types}`;
    }
    
    const data = await apiRequest(url);
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
    const limit = options.limit || 25;
    const offset = options.offset || 0;
    
    const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&type=artist&limit=${limit}&offset=${offset}`;
    const data = await apiRequest(url);
    return data as MusicBrainzArtistSearchResult;
  } catch (error) {
    console.error('Error in advanced artist search:', error);
    throw error;
  }
}

// Generate playlist from MusicBrainz API
export async function generatePlaylistFromMusicBrainz(genres: string[], limit: number = 10) {
  try {
    const tracks = [];
    
    for (const genre of genres.slice(0, 3)) { // Limit to 3 genres to avoid too many requests
      try {
        const result = await searchRecording(genre, Math.ceil(limit / genres.length));
        if (result.recordings && result.recordings.length > 0) {
          tracks.push(...result.recordings.slice(0, Math.ceil(limit / genres.length)));
        }
      } catch (error) {
        console.warn(`Failed to search for genre ${genre}:`, error);
      }
    }
    
    return tracks.slice(0, limit).map((recording, index) => ({
      id: index + 1,
      title: recording.title,
      artist: recording['artist-credit']?.[0]?.name || recording['artist-credit']?.[0]?.artist?.name || 'Unknown Artist',
      album: recording.releases?.[0]?.title || 'Unknown Album',
      duration: recording.length ? formatDuration(recording.length) : '3:30',
      durationSeconds: recording.length ? Math.floor(recording.length / 1000) : 210,
      cover: getCoverByIndex(index),
      genre: genres[index % genres.length],
      year: recording.releases?.[0]?.date?.substring(0, 4) || '2024',
      mbid: recording.id,
      isLiked: index % 3 === 0 // Детерминированные лайки для демо
    }));
  } catch (error) {
    console.error('Error generating playlist from MusicBrainz:', error);
    return [];
  }
}

function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Cover Art Archive helper
export function getCoverArtUrl(mbid: string, size: 'small' | 'large' = 'small'): string {
  const sizeParam = size === 'large' ? '500' : '250';
  return `https://coverartarchive.org/release/${mbid}/front-${sizeParam}`;
}

// Example usage and demo functions
export const DEMO_QUERIES = {
  artists: ['Queen', 'The Beatles', 'Pink Floyd', 'Led Zeppelin'],
  recordings: ['Bohemian Rhapsody', 'Yesterday', 'Stairway to Heaven', 'Hotel California'],
  genres: ['electronic', 'rock', 'jazz', 'classical', 'hip hop']
};

export async function searchDemo() {
  try {
    console.log('🎵 Starting MusicBrainz Demo...');
    
    // Search for Queen
    const queenResults = await searchArtist('Queen');
    const queen = queenResults.artists.find(artist => 
      artist.name === 'Queen' && artist.type === 'Group'
    );
    
    if (queen) {
      console.log('👑 Found Queen:', queen.name, queen.id);
      
      // Get Queen's albums
      const albums = await searchReleasesByArtist(queen.id, 10);
      console.log(`📀 Found ${albums.releases.length} Queen albums`);
      
      // Search for Bohemian Rhapsody
      const bohemianResults = await searchRecording('Bohemian Rhapsody');
      console.log(`🎵 Found ${bohemianResults.recordings.length} versions of Bohemian Rhapsody`);
      
      return {
        artist: queen,
        albums: albums.releases,
        bohemianRhapsody: bohemianResults.recordings
      };
    } else {
      console.log('❌ Queen not found');
      return null;
    }
  } catch (error) {
    console.error('❌ Demo failed:', error);
    throw error;
  }
}
