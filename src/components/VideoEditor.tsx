import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Upload, Play, Pause, Square, Volume2, VolumeX, SkipBack, SkipForward, Maximize, Sparkles, Download } from "lucide-react";
import { Timeline } from "@/components/Timeline";
import { EffectsPanel } from "@/components/EffectsPanel";
import { AIAssistant } from "@/components/AIAssistant";
import { ExportPanel } from "@/components/ExportPanel";
import { AudioMixer } from "@/components/AudioMixer";

interface VideoClip {
  id: string;
  file: File;
  url: string;
  duration: number;
  startTime: number;
  endTime: number;
}

export function VideoEditor() {
  const [videoClips, setVideoClips] = useState<VideoClip[]>([]);
  const [currentClip, setCurrentClip] = useState<VideoClip | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isDragging]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("video/")) {
      alert("Por favor, selecciona un archivo de video válido");
      return;
    }

    const url = URL.createObjectURL(file);
    const clip: VideoClip = {
      id: Date.now().toString(),
      file,
      url,
      duration: 0,
      startTime: 0,
      endTime: 0,
    };

    setVideoClips([...videoClips, clip]);
    setCurrentClip(clip);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("video/")) {
      alert("Por favor, arrastra un archivo de video válido");
      return;
    }

    const url = URL.createObjectURL(file);
    const clip: VideoClip = {
      id: Date.now().toString(),
      file,
      url,
      duration: 0,
      startTime: 0,
      endTime: 0,
    };

    setVideoClips([...videoClips, clip]);
    setCurrentClip(clip);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (value: number[]) => {
    if (!videoRef.current) return;
    const newTime = value[0];
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekStart = () => {
    setIsDragging(true);
  };

  const handleSeekEnd = () => {
    setIsDragging(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const skipBackward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  };

  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6 bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Reproductor de Video</h2>
              
              {!currentClip ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-purple-500/50 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer bg-slate-800/30"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p className="text-lg text-gray-300 mb-2">Arrastra y suelta tu video aquí</p>
                  <p className="text-sm text-gray-500 mb-4">o haz clic para seleccionar un archivo</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Seleccionar Video
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    <video
                      ref={videoRef}
                      src={currentClip.url}
                      className="w-full h-full"
                      onClick={togglePlayPause}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 min-w-[48px]">
                        {formatTime(currentTime)}
                      </span>
                      <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={0.1}
                        onValueChange={handleSeek}
                        onPointerDown={handleSeekStart}
                        onPointerUp={handleSeekEnd}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-400 min-w-[48px]">
                        {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={skipBackward}
                          className="bg-slate-800 border-purple-500/20 hover:bg-purple-900/30"
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="icon"
                          onClick={togglePlayPause}
                          className="bg-purple-600 hover:bg-purple-700 w-12 h-12"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6 ml-0.5" />
                          )}
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={handleStop}
                          className="bg-slate-800 border-purple-500/20 hover:bg-purple-900/30"
                        >
                          <Square className="w-4 h-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={skipForward}
                          className="bg-slate-800 border-purple-500/20 hover:bg-purple-900/30"
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={toggleMute}
                            className="text-gray-400 hover:text-white"
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="w-5 h-5" />
                            ) : (
                              <Volume2 className="w-5 h-5" />
                            )}
                          </Button>
                          <Slider
                            value={[volume]}
                            max={100}
                            step={1}
                            onValueChange={handleVolumeChange}
                            className="w-24"
                          />
                          <span className="text-sm text-gray-400 min-w-[36px]">
                            {volume}%
                          </span>
                        </div>

                        <select
                          value={playbackRate}
                          onChange={(e) => setPlaybackRate(Number(e.target.value))}
                          className="bg-slate-800 border border-purple-500/20 rounded-md px-3 py-2 text-sm text-white"
                        >
                          <option value={0.25}>0.25x</option>
                          <option value={0.5}>0.5x</option>
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2x</option>
                        </select>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={toggleFullscreen}
                          className="text-gray-400 hover:text-white"
                        >
                          <Maximize className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-slate-800 border-purple-500/20 hover:bg-purple-900/30"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Cargar Otro Video
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Timeline
              currentTime={currentTime}
              duration={duration}
              onSeek={(time) => handleSeek([time])}
              videoFile={currentClip?.file || null}
            />
          </div>

          <div className="space-y-4">
            <Tabs defaultValue="effects" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-900/50">
                <TabsTrigger value="effects">Efectos</TabsTrigger>
                <TabsTrigger value="audio">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Audio
                </TabsTrigger>
                <TabsTrigger value="ai">
                  <Sparkles className="w-4 h-4 mr-2" />
                  IA
                </TabsTrigger>
                <TabsTrigger value="export">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="effects" className="mt-4">
                <EffectsPanel />
              </TabsContent>
              
              <TabsContent value="audio" className="mt-0 h-[calc(100vh-12rem)]">
                <AudioMixer />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0 h-full">
                <AIAssistant
                  onApplyAI={(type) => console.log("Applying AI:", type)}
                />
              </TabsContent>
              
              <TabsContent value="export" className="mt-0 h-full">
                <ExportPanel
                  duration={duration}
                  onExport={(settings) => console.log("Exporting:", settings)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}