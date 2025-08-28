'use client'

import { useState, useEffect, useCallback } from 'react';
import { getCoverByIndex } from '@/lib/covers';
import { 
  searchArtist, 
  searchRecording, 
  searchReleasesByArtist,
  generatePlaylistFromMusicBrainz,
  getCoverArtUrl,
  type MusicBrainzArtist,
  type MusicBrainzRecording,
  type MusicBrainzRelease
} from '@/lib/musicbrainz';

export interface PlaylistTrack {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSeconds: number;
  cover: string;
  genre: string;
  year: string;
  mbid?: string; // MusicBrainz ID
  isLiked?: boolean;
}

export function useMusicBrainz() {
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback static playlist for when API fails
  const fallbackPlaylist: PlaylistTrack[] = [
    {
      id: 1,
      title: "Neon Dreams",
      artist: "NEXUS",
      album: "Neon Dreams",
      duration: "4:32",
      durationSeconds: 272,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
      genre: "Synthwave",
      year: "2024",
      isLiked: true
    },
    {
      id: 2,
      title: "Cyberpunk City",
      artist: "NEXUS ft. Alex Synth",
      album: "Cyberpunk City EP",
      duration: "5:18",
      durationSeconds: 318,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      genre: "Future Bass",
      year: "2023"
    },
    {
      id: 3,
      title: "Digital Horizon",
      artist: "NEXUS",
      album: "Digital Horizon",
      duration: "4:20",
      durationSeconds: 260,
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300",
      genre: "Ambient",
      year: "2023",
      isLiked: true
    },
    {
      id: 4,
      title: "Quantum Bass",
      artist: "NEXUS ft. Future Dynamics",
      album: "Quantum Bass EP",
      duration: "3:45",
      durationSeconds: 225,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      genre: "Bass",
      year: "2022"
    },
    {
      id: 5,
      title: "Synthwave Nights",
      artist: "NEXUS",
      album: "Synthwave Nights",
      duration: "6:12",
      durationSeconds: 372,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
      genre: "Synthwave",
      year: "2024",
      isLiked: true
    },
    {
      id: 6,
      title: "Future Waves",
      artist: "NEXUS",
      album: "Future Waves",
      duration: "5:12",
      durationSeconds: 312,
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300",
      genre: "Future Bass",
      year: "2024"
    },
    {
      id: 7,
      title: "Electric Storm",
      artist: "NEXUS ft. Lightning",
      album: "Storm Series",
      duration: "4:45",
      durationSeconds: 285,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      genre: "Electro",
      year: "2023",
      isLiked: true
    },
    {
      id: 8,
      title: "Midnight Drive",
      artist: "NEXUS",
      album: "Nocturnal",
      duration: "5:30",
      durationSeconds: 330,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
      genre: "Synthwave",
      year: "2024"
    },
    {
      id: 9,
      title: "Binary Dreams",
      artist: "NEXUS ft. Code Runner",
      album: "Digital Consciousness",
      duration: "3:58",
      durationSeconds: 238,
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300",
      genre: "Techno",
      year: "2023"
    },
    {
      id: 10,
      title: "Crystal Frequencies",
      artist: "NEXUS",
      album: "Ethereal Sounds",
      duration: "4:18",
      durationSeconds: 258,
      cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300",
      genre: "Ambient",
      year: "2024",
      isLiked: true
    }
  ];

  const buildPlaylistFromMusicBrainz = useCallback(async (genres: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Building playlist from MusicBrainz...');
      const musicBrainzTracks = await generatePlaylistFromMusicBrainz(genres, 10);
      
      if (musicBrainzTracks && musicBrainzTracks.length > 0) {
        console.log(`Generated ${musicBrainzTracks.length} tracks from MusicBrainz`);
        setPlaylist(musicBrainzTracks);
      } else {
        console.log('No tracks from MusicBrainz, using fallback playlist');
        setPlaylist(fallbackPlaylist);
      }
    } catch (error) {
      console.error('Error building playlist from MusicBrainz:', error);
      setError('Failed to load music data from MusicBrainz. Using offline playlist.');
      setPlaylist(fallbackPlaylist);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleLike = useCallback((trackId: number) => {
    setPlaylist(prev => prev.map(track => 
      track.id === trackId 
        ? { ...track, isLiked: !track.isLiked }
        : track
    ));
  }, []);

  const searchForArtist = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchArtist(query, 10);
      return result.artists;
    } catch (error) {
      console.error('Error searching for artist:', error);
      setError('Failed to search for artist');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchForRecording = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchRecording(query, 10);
      return result.recordings;
    } catch (error) {
      console.error('Error searching for recording:', error);
      setError('Failed to search for recording');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getArtistReleases = useCallback(async (artistId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchReleasesByArtist(artistId, 20);
      return result.releases;
    } catch (error) {
      console.error('Error getting artist releases:', error);
      setError('Failed to get artist releases');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize with fallback playlist
  useEffect(() => {
    if (playlist.length === 0) {
      setPlaylist(fallbackPlaylist);
    }
  }, []);

  return {
    playlist,
    loading,
    error,
    buildPlaylistFromMusicBrainz,
    toggleLike,
    searchForArtist,
    searchForRecording,
    getArtistReleases
  };
}

// Hook for getting track information
export function useTrackInfo(mbid?: string) {
  const [trackInfo, setTrackInfo] = useState<MusicBrainzRecording | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mbid) return;

    const fetchTrackInfo = async () => {
      setLoading(true);
      try {
        // This would be implemented when we have track details API
        console.log(`Would fetch track info for MBID: ${mbid}`);
      } catch (error) {
        console.error('Error fetching track info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackInfo();
  }, [mbid]);

  return { trackInfo, loading };
}
