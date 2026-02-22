import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Volume2,
  VolumeX,
  Music,
  Mic,
  Waveform,
  Settings2,
  Download,
  Play,
  Pause,
  Plus,
  Trash2,
  Upload,
  Split,
  Sparkles,
  Volume1,
  Radio
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AudioTrack {
  id: string;
  name: string;
  type: "voice" | "music" | "sfx";
  volume: number;
  muted: boolean;
  solo: boolean;
  effects: {
    fadeIn: number;
    fadeOut: number;
    eq: {
      low: number;
      mid: number;
      high: number;
    };
    noiseReduction: number;
    normalized: boolean;
  };
}

interface MusicLibraryItem {
  id: string;
  name: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
}

export function AudioMixer() {
  const [tracks, setTracks] = useState<AudioTrack[]>([
    {
      id: "track-1",
      name: "Narración Principal",
      type: "voice",
      volume: 75,
      muted: false,
      solo: false,
      effects: {
        fadeIn: 0,
        fadeOut: 0,
        eq: { low: 0, mid: 0, high: 0 },
        noiseReduction: 0,
        normalized: false
      }
    },
    {
      id: "track-2",
      name: "Música de Fondo",
      type: "music",
      volume: 50,
      muted: false,
      solo: false,
      effects: {
        fadeIn: 2,
        fadeOut: 2,
        eq: { low: 0, mid: 0, high: 0 },
        noiseReduction: 0,
        normalized: false
      }
    }
  ]);

  const [selectedTrack, setSelectedTrack] = useState<string | null>(tracks[0]?.id || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicLibrary, setShowMusicLibrary] = useState(false);

  const musicLibrary: MusicLibraryItem[] = [
    { id: "m1", name: "Ambient Dreams", artist: "AudioLibrary", duration: "3:24", genre: "Ambient", mood: "Calm" },
    { id: "m2", name: "Corporate Motivational", artist: "FreeMusic", duration: "2:45", genre: "Corporate", mood: "Uplifting" },
    { id: "m3", name: "Epic Cinematic", artist: "SoundCloud", duration: "4:12", genre: "Cinematic", mood: "Dramatic" },
    { id: "m4", name: "Upbeat Pop", artist: "Bensound", duration: "2:58", genre: "Pop", mood: "Happy" },
    { id: "m5", name: "Acoustic Guitar", artist: "AudioJungle", duration: "3:35", genre: "Acoustic", mood: "Peaceful" },
    { id: "m6", name: "Electronic Beat", artist: "FMA", duration: "3:15", genre: "Electronic", mood: "Energetic" }
  ];

  const updateTrackVolume = (trackId: string, volume: number) => {
    setTracks(prev => prev.map(track =>
      track.id === trackId ? { ...track, volume } : track
    ));
  };

  const toggleMute = (trackId: string) => {
    setTracks(prev => prev.map(track =>
      track.id === trackId ? { ...track, muted: !track.muted } : track
    ));
  };

  const toggleSolo = (trackId: string) => {
    setTracks(prev => prev.map(track =>
      track.id === trackId ? { ...track, solo: !track.solo } : track
    ));
  };

  const updateEffect = (trackId: string, effectType: string, value: number | boolean) => {
    setTracks(prev => prev.map(track => {
      if (track.id !== trackId) return track;
      
      if (effectType === "normalized") {
        return {
          ...track,
          effects: { ...track.effects, normalized: value as boolean }
        };
      }
      
      if (effectType.startsWith("eq.")) {
        const eqBand = effectType.split(".")[1] as "low" | "mid" | "high";
        return {
          ...track,
          effects: {
            ...track.effects,
            eq: { ...track.effects.eq, [eqBand]: value as number }
          }
        };
      }
      
      return {
        ...track,
        effects: { ...track.effects, [effectType]: value }
      };
    }));
  };

  const addTrack = (type: "voice" | "music" | "sfx") => {
    const newTrack: AudioTrack = {
      id: `track-${Date.now()}`,
      name: `Nueva Pista ${type === "voice" ? "de Voz" : type === "music" ? "Musical" : "de Efectos"}`,
      type,
      volume: 75,
      muted: false,
      solo: false,
      effects: {
        fadeIn: 0,
        fadeOut: 0,
        eq: { low: 0, mid: 0, high: 0 },
        noiseReduction: 0,
        normalized: false
      }
    };
    setTracks(prev => [...prev, newTrack]);
    setSelectedTrack(newTrack.id);
  };

  const removeTrack = (trackId: string) => {
    setTracks(prev => prev.filter(track => track.id !== trackId));
    if (selectedTrack === trackId) {
      setSelectedTrack(tracks[0]?.id || null);
    }
  };

  const separateVoiceMusic = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    // Simulate AI separation
    const voiceTrack: AudioTrack = {
      id: `${trackId}-voice`,
      name: `${track.name} (Voz)`,
      type: "voice",
      volume: track.volume,
      muted: false,
      solo: false,
      effects: { ...track.effects }
    };

    const musicTrack: AudioTrack = {
      id: `${trackId}-music`,
      name: `${track.name} (Música)`,
      type: "music",
      volume: track.volume,
      muted: false,
      solo: false,
      effects: { ...track.effects }
    };

    setTracks(prev => [
      ...prev.filter(t => t.id !== trackId),
      voiceTrack,
      musicTrack
    ]);
  };

  const addMusicFromLibrary = (music: MusicLibraryItem) => {
    const newTrack: AudioTrack = {
      id: `music-${music.id}`,
      name: music.name,
      type: "music",
      volume: 50,
      muted: false,
      solo: false,
      effects: {
        fadeIn: 2,
        fadeOut: 2,
        eq: { low: 0, mid: 0, high: 0 },
        noiseReduction: 0,
        normalized: false
      }
    };
    setTracks(prev => [...prev, newTrack]);
    setShowMusicLibrary(false);
  };

  const selectedTrackData = tracks.find(t => t.id === selectedTrack);

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Mezclador de Audio</h2>
            <p className="text-sm text-slate-400">Control multipista avanzado</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="border-slate-700"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Audio
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tracks List */}
        <div className="w-80 border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => addTrack("voice")}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <Mic className="w-4 h-4 mr-2" />
                Voz
              </Button>
              <Button
                size="sm"
                onClick={() => addTrack("music")}
                className="flex-1 bg-pink-600 hover:bg-pink-700"
              >
                <Music className="w-4 h-4 mr-2" />
                Música
              </Button>
              <Button
                size="sm"
                onClick={() => addTrack("sfx")}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Waveform className="w-4 h-4 mr-2" />
                SFX
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {tracks.map(track => (
                <Card
                  key={track.id}
                  className={`p-3 cursor-pointer transition-all ${
                    selectedTrack === track.id
                      ? "bg-purple-900/50 border-purple-600"
                      : "bg-slate-800 border-slate-700 hover:bg-slate-750"
                  }`}
                  onClick={() => setSelectedTrack(track.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {track.type === "voice" && <Mic className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                        {track.type === "music" && <Music className="w-4 h-4 text-pink-400 flex-shrink-0" />}
                        {track.type === "sfx" && <Waveform className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                        <span className="text-sm font-medium text-white truncate">{track.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-slate-600">
                        {track.type === "voice" ? "Voz" : track.type === "music" ? "Música" : "Efectos"}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTrack(track.id);
                      }}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(track.id);
                        }}
                        className={track.muted ? "text-red-400" : "text-slate-400"}
                      >
                        {track.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <Slider
                        value={[track.volume]}
                        onValueChange={([value]) => updateTrackVolume(track.id, value)}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-slate-400 w-10 text-right">{track.volume}%</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Effects Panel */}
        <div className="flex-1 flex flex-col">
          {selectedTrackData ? (
            <Tabs defaultValue="effects" className="flex-1 flex flex-col">
              <TabsList className="mx-4 mt-4 grid grid-cols-3 bg-slate-800">
                <TabsTrigger value="effects">Efectos</TabsTrigger>
                <TabsTrigger value="eq">Ecualizador</TabsTrigger>
                <TabsTrigger value="library">Biblioteca</TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1 p-4">
                <TabsContent value="effects" className="space-y-6 mt-0">
                  {/* Fade Effects */}
                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Volume1 className="w-4 h-4 text-purple-400" />
                      Fundido (Fade)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-300 mb-2 block">
                          Fade In (entrada): {selectedTrackData.effects.fadeIn}s
                        </label>
                        <Slider
                          value={[selectedTrackData.effects.fadeIn]}
                          onValueChange={([value]) => updateEffect(selectedTrackData.id, "fadeIn", value)}
                          max={10}
                          step={0.1}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-300 mb-2 block">
                          Fade Out (salida): {selectedTrackData.effects.fadeOut}s
                        </label>
                        <Slider
                          value={[selectedTrackData.effects.fadeOut]}
                          onValueChange={([value]) => updateEffect(selectedTrackData.id, "fadeOut", value)}
                          max={10}
                          step={0.1}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Noise Reduction */}
                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-pink-400" />
                      Reducción de Ruido
                    </h3>
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">
                        Intensidad: {selectedTrackData.effects.noiseReduction}%
                      </label>
                      <Slider
                        value={[selectedTrackData.effects.noiseReduction]}
                        onValueChange={([value]) => updateEffect(selectedTrackData.id, "noiseReduction", value)}
                        max={100}
                        step={1}
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        Elimina ruido de fondo y mejora la claridad del audio
                      </p>
                    </div>
                  </Card>

                  {/* Normalization */}
                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-blue-400" />
                      Normalización
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300 mb-1">Auto-normalizar volumen</p>
                        <p className="text-xs text-slate-400">Ajusta el volumen a niveles óptimos</p>
                      </div>
                      <Button
                        variant={selectedTrackData.effects.normalized ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateEffect(selectedTrackData.id, "normalized", !selectedTrackData.effects.normalized)}
                        className={selectedTrackData.effects.normalized ? "bg-purple-600 hover:bg-purple-700" : "border-slate-600"}
                      >
                        {selectedTrackData.effects.normalized ? "Activado" : "Desactivado"}
                      </Button>
                    </div>
                  </Card>

                  {/* AI Separation */}
                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      Separación con IA
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-300">
                        Separa automáticamente voz y música en pistas independientes
                      </p>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        onClick={() => separateVoiceMusic(selectedTrackData.id)}
                      >
                        <Split className="w-4 h-4 mr-2" />
                        Separar Voz y Música
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="eq" className="space-y-6 mt-0">
                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-purple-400" />
                      Ecualizador de 3 Bandas
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Low Frequency */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm text-slate-300">Graves (Low)</label>
                          <span className="text-xs text-slate-400">{selectedTrackData.effects.eq.low > 0 ? "+" : ""}{selectedTrackData.effects.eq.low} dB</span>
                        </div>
                        <Slider
                          value={[selectedTrackData.effects.eq.low]}
                          onValueChange={([value]) => updateEffect(selectedTrackData.id, "eq.low", value)}
                          min={-12}
                          max={12}
                          step={0.5}
                        />
                      </div>

                      {/* Mid Frequency */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm text-slate-300">Medios (Mid)</label>
                          <span className="text-xs text-slate-400">{selectedTrackData.effects.eq.mid > 0 ? "+" : ""}{selectedTrackData.effects.eq.mid} dB</span>
                        </div>
                        <Slider
                          value={[selectedTrackData.effects.eq.mid]}
                          onValueChange={([value]) => updateEffect(selectedTrackData.id, "eq.mid", value)}
                          min={-12}
                          max={12}
                          step={0.5}
                        />
                      </div>

                      {/* High Frequency */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm text-slate-300">Agudos (High)</label>
                          <span className="text-xs text-slate-400">{selectedTrackData.effects.eq.high > 0 ? "+" : ""}{selectedTrackData.effects.eq.high} dB</span>
                        </div>
                        <Slider
                          value={[selectedTrackData.effects.eq.high]}
                          onValueChange={([value]) => updateEffect(selectedTrackData.id, "eq.high", value)}
                          min={-12}
                          max={12}
                          step={0.5}
                        />
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-slate-600"
                        onClick={() => {
                          updateEffect(selectedTrackData.id, "eq.low", 0);
                          updateEffect(selectedTrackData.id, "eq.mid", 0);
                          updateEffect(selectedTrackData.id, "eq.high", 0);
                        }}
                      >
                        Resetear EQ
                      </Button>
                    </div>
                  </Card>

                  {/* EQ Presets */}
                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-white mb-4">Presets de EQ</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600"
                        onClick={() => {
                          updateEffect(selectedTrackData.id, "eq.low", 3);
                          updateEffect(selectedTrackData.id, "eq.mid", 0);
                          updateEffect(selectedTrackData.id, "eq.high", -2);
                        }}
                      >
                        Bass Boost
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600"
                        onClick={() => {
                          updateEffect(selectedTrackData.id, "eq.low", -2);
                          updateEffect(selectedTrackData.id, "eq.mid", 3);
                          updateEffect(selectedTrackData.id, "eq.high", 2);
                        }}
                      >
                        Vocal Clarity
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600"
                        onClick={() => {
                          updateEffect(selectedTrackData.id, "eq.low", -1);
                          updateEffect(selectedTrackData.id, "eq.mid", 0);
                          updateEffect(selectedTrackData.id, "eq.high", 4);
                        }}
                      >
                        Treble Boost
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600"
                        onClick={() => {
                          updateEffect(selectedTrackData.id, "eq.low", 2);
                          updateEffect(selectedTrackData.id, "eq.mid", -3);
                          updateEffect(selectedTrackData.id, "eq.high", 2);
                        }}
                      >
                        V-Shape
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="library" className="space-y-4 mt-0">
                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Music className="w-4 h-4 text-pink-400" />
                      Música Libre de Derechos
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <Select>
                        <SelectTrigger className="bg-slate-900 border-slate-700">
                          <SelectValue placeholder="Filtrar por género" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los géneros</SelectItem>
                          <SelectItem value="ambient">Ambient</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="cinematic">Cinematic</SelectItem>
                          <SelectItem value="pop">Pop</SelectItem>
                          <SelectItem value="acoustic">Acoustic</SelectItem>
                          <SelectItem value="electronic">Electronic</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="bg-slate-900 border-slate-700">
                          <SelectValue placeholder="Filtrar por estado de ánimo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="calm">Calm</SelectItem>
                          <SelectItem value="uplifting">Uplifting</SelectItem>
                          <SelectItem value="dramatic">Dramatic</SelectItem>
                          <SelectItem value="happy">Happy</SelectItem>
                          <SelectItem value="peaceful">Peaceful</SelectItem>
                          <SelectItem value="energetic">Energetic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {musicLibrary.map(music => (
                          <Card
                            key={music.id}
                            className="bg-slate-900 border-slate-700 p-3 hover:bg-slate-800 transition-colors cursor-pointer"
                            onClick={() => addMusicFromLibrary(music)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-white mb-1 truncate">{music.name}</h4>
                                <p className="text-xs text-slate-400 mb-2">{music.artist}</p>
                                <div className="flex gap-2">
                                  <Badge variant="outline" className="text-xs border-slate-600">
                                    {music.genre}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs border-slate-600">
                                    {music.mood}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="text-xs text-slate-400">{music.duration}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-purple-400 hover:text-purple-300"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 p-4">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Mi Música
                    </Button>
                  </Card>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Volume2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Selecciona una pista para ver sus controles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}