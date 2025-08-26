'use client'

import { useState, useEffect } from 'react';
import { 
  searchArtists, 
  searchRecordings, 
  getArtistDetails, 
  getReleaseDetails,
  getCoverArt,
  searchElectronicMusic,
  generateFallbackPlaylist,
  formatDuration,
  type MusicBrainzArtist,
  type MusicBrainzRecording,
  type MusicBrainzRelease
} from '@/lib/musicbrainz';

export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl?: string;
  releaseDate?: string;
  genre?: string;
  mbid?: string; // MusicBrainz ID
  isLiked?: boolean;
}

export function useMusicBrainz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>([]);

  // Search for artists
  const searchForArtists = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const artists = await searchArtists(query, 10);
      return artists;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search artists');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Search for recordings/tracks
  const searchForTracks = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const recordings = await searchRecordings(query, 10);
      return recordings;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search tracks');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get artist details
  const getArtist = async (artistId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const artist = await getArtistDetails(artistId);
      return artist;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get artist details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Build playlist from MusicBrainz data
  const buildPlaylistFromMusicBrainz = async (genres: string[] = ['electronic', 'techno', 'ambient']) => {
    setLoading(true);
    setError(null);
    
    try {
      const { recordings } = await searchElectronicMusic(genres);
      
      const playlistTracks: PlaylistTrack[] = [];
      
      for (const recording of recordings.slice(0, 10)) {
        const artist = recording['artist-credit']?.[0]?.name || 'Unknown Artist';
        const coverUrl = recording.releases?.[0]?.id 
          ? await getCoverArt(recording.releases[0].id)
          : null;
        
        const track: PlaylistTrack = {
          id: recording.id,
          title: recording.title,
          artist: artist,
          duration: formatDuration(recording.length),
          coverUrl: coverUrl || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=300&h=300&fit=crop`,
          releaseDate: recording.releases?.[0]?.date?.substring(0, 4),
          genre: recording.tags?.[0]?.name || 'Electronic',
          mbid: recording.id
        };
        
        playlistTracks.push(track);
      }
      
      // If we don't have enough tracks, fill with fallback data
      if (playlistTracks.length < 10) {
        const fallbackTracks = generateFallbackPlaylist().slice(playlistTracks.length);
        playlistTracks.push(...fallbackTracks);
      }
      
      setPlaylist(playlistTracks);
      return playlistTracks;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to build playlist');
      
      // Use fallback playlist on error
      const fallbackPlaylist = generateFallbackPlaylist();
      setPlaylist(fallbackPlaylist);
      return fallbackPlaylist;
    } finally {
      setLoading(false);
    }
  };

  // Initialize with fallback playlist
  useEffect(() => {
    const fallbackPlaylist = generateFallbackPlaylist();
    setPlaylist(fallbackPlaylist);
  }, []);

  // Toggle like for a track
  const toggleLike = (trackId: string) => {
    setPlaylist(prev => prev.map(track => 
      track.id === trackId 
        ? { ...track, isLiked: !track.isLiked }
        : track
    ));
  };

  return {
    loading,
    error,
    playlist,
    searchForArtists,
    searchForTracks,
    getArtist,
    buildPlaylistFromMusicBrainz,
    setPlaylist,
    toggleLike
  };
}

// Hook for getting enhanced track information
export function useTrackInfo(mbid?: string) {
  const [trackInfo, setTrackInfo] = useState<MusicBrainzRecording | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mbid) return;

    const fetchTrackInfo = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, we would have a getRecordingDetails function
        // For now, we'll use search to get basic info
        const recordings = await searchRecordings(`rid:${mbid}`, 1);
        if (recordings.length > 0) {
          setTrackInfo(recordings[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get track info');
      } finally {
        setLoading(false);
      }
    };

    fetchTrackInfo();
  }, [mbid]);

  return { trackInfo, loading, error };
}
