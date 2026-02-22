import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Film, 
  Scissors, 
  ZoomIn, 
  ZoomOut, 
  Plus,
  Music,
  Type,
  Sparkles,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from "lucide-react";

interface Clip {
  id: string;
  type: "video" | "audio" | "text" | "effect";
  name: string;
  start: number;
  duration: number;
  trackIndex: number;
  color: string;
  locked: boolean;
  visible: boolean;
}

interface Track {
  id: string;
  type: "video" | "audio" | "text" | "effect";
  name: string;
  clips: Clip[];
  muted: boolean;
  locked: boolean;
  visible: boolean;
}

interface TimelineProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  videoFile: File | null;
}

export function Timeline({ currentTime, duration, onSeek, videoFile }: TimelineProps) {
  const [zoom, setZoom] = useState(1);
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: "track-video-1",
      type: "video",
      name: "Video Principal",
      clips: [],
      muted: false,
      locked: false,
      visible: true
    },
    {
      id: "track-audio-1",
      type: "audio",
      name: "Audio Principal",
      clips: [],
      muted: false,
      locked: false,
      visible: true
    },
    {
      id: "track-text-1",
      type: "text",
      name: "Texto & Títulos",
      clips: [],
      muted: false,
      locked: false,
      visible: true
    }
  ]);
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const [draggingClip, setDraggingClip] = useState<string | null>(null);
  const [markers, setMarkers] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [splitTime, setSplitTime] = useState<number | null>(null);

  const pixelsPerSecond = 50 * zoom;
  const timelineWidth = duration * pixelsPerSecond;

  useEffect(() => {
    if (videoFile && tracks[0].clips.length === 0) {
      const videoClip: Clip = {
        id: `clip-${Date.now()}`,
        type: "video",
        name: videoFile.name,
        start: 0,
        duration: duration,
        trackIndex: 0,
        color: "#8b5cf6",
        locked: false,
        visible: true
      };
      
      const audioClip: Clip = {
        id: `clip-audio-${Date.now()}`,
        type: "audio",
        name: `${videoFile.name} (Audio)`,
        start: 0,
        duration: duration,
        trackIndex: 1,
        color: "#10b981",
        locked: false,
        visible: true
      };

      setTracks(prev => prev.map((track, idx) => {
        if (idx === 0) return { ...track, clips: [videoClip] };
        if (idx === 1) return { ...track, clips: [audioClip] };
        return track;
      }));
    }
  }, [videoFile, duration]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 0.5));

  const handleAddTrack = (type: "video" | "audio" | "text" | "effect") => {
    const newTrack: Track = {
      id: `track-${type}-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${tracks.filter(t => t.type === type).length + 1}`,
      clips: [],
      muted: false,
      locked: false,
      visible: true
    };
    setTracks(prev => [...prev, newTrack]);
  };

  const handleSplitClip = (clipId: string, splitPosition: number) => {
    setTracks(prev => prev.map(track => {
      const clipIndex = track.clips.findIndex(c => c.id === clipId);
      if (clipIndex === -1) return track;

      const clip = track.clips[clipIndex];
      const relativeTime = splitPosition - clip.start;

      if (relativeTime <= 0 || relativeTime >= clip.duration) return track;

      const firstPart: Clip = {
        ...clip,
        id: `${clip.id}-part1`,
        duration: relativeTime
      };

      const secondPart: Clip = {
        ...clip,
        id: `${clip.id}-part2`,
        start: clip.start + relativeTime,
        duration: clip.duration - relativeTime
      };

      const newClips = [...track.clips];
      newClips.splice(clipIndex, 1, firstPart, secondPart);

      return { ...track, clips: newClips };
    }));
    setSplitTime(null);
  };

  const handleDeleteClip = (clipId: string) => {
    setTracks(prev => prev.map(track => ({
      ...track,
      clips: track.clips.filter(c => c.id !== clipId)
    })));
    setSelectedClip(null);
  };

  const handleDuplicateClip = (clipId: string) => {
    setTracks(prev => prev.map(track => {
      const clip = track.clips.find(c => c.id === clipId);
      if (!clip) return track;

      const newClip: Clip = {
        ...clip,
        id: `${clip.id}-copy-${Date.now()}`,
        start: clip.start + clip.duration + 0.5
      };

      return { ...track, clips: [...track.clips, newClip] };
    }));
  };

  const handleClipDragStart = (clipId: string) => {
    setDraggingClip(clipId);
  };

  const handleClipDrag = (clipId: string, newStart: number) => {
    setTracks(prev => prev.map(track => ({
      ...track,
      clips: track.clips.map(clip => 
        clip.id === clipId ? { ...clip, start: Math.max(0, newStart) } : clip
      )
    })));
  };

  const handleClipDragEnd = () => {
    setDraggingClip(null);
  };

  const toggleTrackLock = (trackId: string) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, locked: !track.locked } : track
    ));
  };

  const toggleTrackVisibility = (trackId: string) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, visible: !track.visible } : track
    ));
  };

  const addMarker = () => {
    setMarkers(prev => [...prev, currentTime]);
  };

  const removeMarker = (time: number) => {
    setMarkers(prev => prev.filter(m => m !== time));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case "video": return <Film className="w-4 h-4" />;
      case "audio": return <Music className="w-4 h-4" />;
      case "text": return <Type className="w-4 h-4" />;
      case "effect": return <Sparkles className="w-4 h-4" />;
      default: return <Film className="w-4 h-4" />;
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const scrollLeft = timelineRef.current.scrollLeft;
    const clickX = e.clientX - rect.left + scrollLeft - 16; // Adjust for padding
    const newTime = Math.max(0, Math.min(duration, clickX / pixelsPerSecond));
    onSeek(newTime);
  };

  return (
    <Card className="p-4 bg-slate-900 border-slate-700">
      <div className="space-y-4">
        {/* Timeline Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Timeline Profesional</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={addMarker}
              className="bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Marcador
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              className="bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            
            <span className="text-sm text-slate-400 px-2">{zoom.toFixed(1)}x</span>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              className="bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Add Track Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAddTrack("video")}
            className="bg-purple-900/20 border-purple-600/50 hover:bg-purple-900/40"
          >
            <Film className="w-3 h-3 mr-1" />
            Video
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAddTrack("audio")}
            className="bg-green-900/20 border-green-600/50 hover:bg-green-900/40"
          >
            <Music className="w-3 h-3 mr-1" />
            Audio
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAddTrack("text")}
            className="bg-blue-900/20 border-blue-600/50 hover:bg-blue-900/40"
          >
            <Type className="w-3 h-3 mr-1" />
            Texto
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAddTrack("effect")}
            className="bg-yellow-900/20 border-yellow-600/50 hover:bg-yellow-900/40"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Efectos
          </Button>
        </div>

        {/* Timeline Ruler */}
        <div 
          className="relative bg-slate-800 rounded-lg p-2 overflow-x-auto select-none" 
          ref={timelineRef}
        >
          <div 
            className="relative h-8 mb-2 cursor-pointer border-b border-slate-700 hover:bg-slate-700/50 transition-colors" 
            style={{ width: `${timelineWidth}px` }}
            onClick={handleTimelineClick}
          >
            {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 flex flex-col items-center"
                style={{ left: `${i * pixelsPerSecond}px` }}
              >
                <div className="w-px h-4 bg-slate-600" />
                <span className="text-xs text-slate-400 mt-1">{formatTime(i)}</span>
              </div>
            ))}
          </div>

          {/* Tracks */}
          <div className="space-y-2">
            {tracks.map((track, trackIndex) => (
              <div key={track.id} className="flex gap-2">
                {/* Track Controls */}
                <div className="w-40 bg-slate-700 rounded p-2 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTrackIcon(track.type)}
                      <span className="text-xs text-white truncate">{track.name}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleTrackLock(track.id)}
                      className="h-6 w-6 p-0"
                    >
                      {track.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleTrackVisibility(track.id)}
                      className="h-6 w-6 p-0"
                    >
                      {track.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>

                {/* Track Timeline */}
                <div className="relative flex-1 h-16 bg-slate-800 rounded" style={{ width: `${timelineWidth}px` }}>
                  {track.clips.map(clip => (
                    <div
                      key={clip.id}
                      className={`absolute top-1 h-14 rounded cursor-move transition-all ${
                        selectedClip === clip.id ? "ring-2 ring-white" : ""
                      } ${clip.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={{
                        left: `${clip.start * pixelsPerSecond}px`,
                        width: `${clip.duration * pixelsPerSecond}px`,
                        backgroundColor: clip.color
                      }}
                      onClick={() => !clip.locked && setSelectedClip(clip.id)}
                      draggable={!clip.locked}
                      onDragStart={() => handleClipDragStart(clip.id)}
                      onDrag={(e) => {
                        if (e.clientX > 0) {
                          const rect = timelineRef.current?.getBoundingClientRect();
                          if (rect) {
                            const newStart = (e.clientX - rect.left - 160) / pixelsPerSecond;
                            handleClipDrag(clip.id, newStart);
                          }
                        }
                      }}
                      onDragEnd={handleClipDragEnd}
                    >
                      <div className="px-2 py-1 text-xs text-white truncate font-medium">
                        {clip.name}
                      </div>
                      <div className="px-2 text-xs text-white/70">
                        {formatTime(clip.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-0 w-0.5 bg-red-500 z-20 pointer-events-none"
            style={{
              left: `${currentTime * pixelsPerSecond}px`,
              height: "100%"
            }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full -translate-x-1/2" />
          </div>

          {/* Markers */}
          {markers.map((marker, idx) => (
            <div
              key={idx}
              className="absolute top-0 w-0.5 bg-blue-500 z-10 cursor-pointer"
              style={{
                left: `${marker * pixelsPerSecond}px`,
                height: "100%"
              }}
              onClick={() => removeMarker(marker)}
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2" />
            </div>
          ))}
        </div>

        {/* Clip Actions */}
        {selectedClip && (
          <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
            <span className="text-sm text-slate-400">Clip seleccionado:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSplitClip(selectedClip, currentTime)}
              className="bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <Scissors className="w-4 h-4 mr-1" />
              Dividir
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDuplicateClip(selectedClip)}
              className="bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <Copy className="w-4 h-4 mr-1" />
              Duplicar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeleteClip(selectedClip)}
              className="bg-red-900/20 border-red-600/50 hover:bg-red-900/40"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Eliminar
            </Button>
          </div>
        )}

        {/* Time Display */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Actual: {formatTime(currentTime)}</span>
          <span>Duración: {formatTime(duration)}</span>
          <span>Zoom: {zoom.toFixed(1)}x</span>
        </div>
      </div>
    </Card>
  );
}