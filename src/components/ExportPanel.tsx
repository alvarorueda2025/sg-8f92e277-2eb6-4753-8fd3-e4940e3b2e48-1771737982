import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Download,
  Film,
  Sparkles,
  Settings,
  Zap,
  Youtube,
  Instagram,
  Share2,
  FileVideo,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Cloud,
  Smartphone,
  Monitor,
  Tv,
  PlayCircle,
  Image as ImageIcon,
  Music,
  FileText,
  Package
} from "lucide-react";

interface ExportPanelProps {
  duration: number;
  onExport?: (settings: ExportSettings) => void;
}

interface ExportSettings {
  format: string;
  resolution: string;
  quality: string;
  fps: number;
  codec: string;
  bitrate: number;
  audioCodec: string;
  audioBitrate: number;
}

interface ExportPreset {
  name: string;
  platform: string;
  resolution: string;
  format: string;
  quality: string;
  description: string;
  icon: any;
  color: string;
}

export function ExportPanel({ duration, onExport }: ExportPanelProps) {
  // Export Settings
  const [format, setFormat] = useState("mp4");
  const [resolution, setResolution] = useState("1920x1080");
  const [quality, setQuality] = useState("high");
  const [fps, setFps] = useState(30);
  const [codec, setCodec] = useState("h264");
  const [bitrate, setBitrate] = useState(8000);
  const [audioCodec, setAudioCodec] = useState("aac");
  const [audioBitrate, setAudioBitrate] = useState(320);
  
  // Export Options
  const [fileName, setFileName] = useState("mi-video-editado");
  const [includeAudio, setIncludeAudio] = useState(true);
  const [includeSubtitles, setIncludeSubtitles] = useState(false);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  
  // Export Status
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStage, setExportStage] = useState("");
  const [exportComplete, setExportComplete] = useState(false);
  
  // File Size Estimation
  const estimatedSize = ((bitrate + audioBitrate) * duration) / (8 * 1024);

  // Platform Presets
  const presets: ExportPreset[] = [
    {
      name: "YouTube",
      platform: "youtube",
      resolution: "1920x1080",
      format: "mp4",
      quality: "high",
      description: "Optimizado para YouTube 1080p",
      icon: Youtube,
      color: "text-red-500"
    },
    {
      name: "Instagram Feed",
      platform: "instagram-feed",
      resolution: "1080x1080",
      format: "mp4",
      quality: "high",
      description: "Formato cuadrado para feed",
      icon: Instagram,
      color: "text-pink-500"
    },
    {
      name: "Instagram Story",
      platform: "instagram-story",
      resolution: "1080x1920",
      format: "mp4",
      quality: "medium",
      description: "Vertical para historias",
      icon: Smartphone,
      color: "text-purple-500"
    },
    {
      name: "TikTok",
      platform: "tiktok",
      resolution: "1080x1920",
      format: "mp4",
      quality: "high",
      description: "Optimizado para TikTok",
      icon: Share2,
      color: "text-blue-500"
    },
    {
      name: "Twitter/X",
      platform: "twitter",
      resolution: "1280x720",
      format: "mp4",
      quality: "medium",
      description: "Optimizado para X (Twitter)",
      icon: Share2,
      color: "text-slate-500"
    },
    {
      name: "4K Ultra HD",
      platform: "4k",
      resolution: "3840x2160",
      format: "mp4",
      quality: "ultra",
      description: "Máxima calidad 4K",
      icon: Tv,
      color: "text-blue-600"
    }
  ];

  const handleApplyPreset = (preset: ExportPreset) => {
    setResolution(preset.resolution);
    setFormat(preset.format);
    setQuality(preset.quality);
    
    // Adjust settings based on quality
    if (preset.quality === "ultra") {
      setBitrate(20000);
      setFps(60);
    } else if (preset.quality === "high") {
      setBitrate(10000);
      setFps(30);
    } else {
      setBitrate(5000);
      setFps(30);
    }
  };

  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportComplete(false);

    // Simulate export process
    const stages = [
      "Preparando archivos...",
      "Procesando video...",
      "Aplicando efectos...",
      "Codificando audio...",
      "Renderizando escenas...",
      "Optimizando calidad...",
      "Finalizando exportación..."
    ];

    let currentStage = 0;
    const progressInterval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          setExportComplete(true);
          return 100;
        }
        
        const newProgress = prev + 2;
        if (newProgress % 15 === 0 && currentStage < stages.length) {
          setExportStage(stages[currentStage]);
          currentStage++;
        }
        
        return newProgress;
      });
    }, 100);
  };

  const getQualityBadge = (quality: string) => {
    const badges = {
      ultra: { label: "Ultra HD", color: "bg-blue-500" },
      high: { label: "Alta", color: "bg-green-500" },
      medium: { label: "Media", color: "bg-yellow-500" },
      low: { label: "Baja", color: "bg-orange-500" }
    };
    return badges[quality as keyof typeof badges] || badges.medium;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-purple-500" />
          <h2 className="text-2xl font-bold">Exportar Video</h2>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Optimizado con IA
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="presets" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="presets">
            <Zap className="w-4 h-4 mr-2" />
            Presets Rápidos
          </TabsTrigger>
          <TabsTrigger value="custom">
            <Settings className="w-4 h-4 mr-2" />
            Personalizado
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Film className="w-4 h-4 mr-2" />
            Avanzado
          </TabsTrigger>
        </TabsList>

        {/* PRESETS TAB */}
        <TabsContent value="presets" className="space-y-4">
          <Alert className="bg-blue-500/10 border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              Elige un preset optimizado para tu plataforma favorita
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.map((preset) => {
              const Icon = preset.icon;
              return (
                <Card
                  key={preset.platform}
                  className="p-4 bg-slate-800/30 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer"
                  onClick={() => handleApplyPreset(preset)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-slate-700/50 ${preset.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{preset.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {preset.resolution}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">{preset.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {preset.format.toUpperCase()}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getQualityBadge(preset.quality).color}`}
                        >
                          {getQualityBadge(preset.quality).label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* CUSTOM TAB */}
        <TabsContent value="custom" className="space-y-4">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="space-y-6">
              {/* File Name */}
              <div className="space-y-2">
                <Label>Nombre del Archivo</Label>
                <div className="flex gap-2">
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="bg-slate-900/50"
                    placeholder="mi-video-editado"
                  />
                  <Badge variant="secondary" className="px-3">
                    .{format}
                  </Badge>
                </div>
              </div>

              {/* Format Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Formato</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="bg-slate-900/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4 (H.264)</SelectItem>
                      <SelectItem value="webm">WebM</SelectItem>
                      <SelectItem value="mov">MOV (QuickTime)</SelectItem>
                      <SelectItem value="avi">AVI</SelectItem>
                      <SelectItem value="mkv">MKV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Resolución</Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger className="bg-slate-900/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3840x2160">4K (3840x2160)</SelectItem>
                      <SelectItem value="2560x1440">2K (2560x1440)</SelectItem>
                      <SelectItem value="1920x1080">Full HD (1920x1080)</SelectItem>
                      <SelectItem value="1280x720">HD (1280x720)</SelectItem>
                      <SelectItem value="1080x1920">Vertical (1080x1920)</SelectItem>
                      <SelectItem value="1080x1080">Cuadrado (1080x1080)</SelectItem>
                      <SelectItem value="720x480">SD (720x480)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Quality */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Calidad de Video</Label>
                  <Badge
                    variant="secondary"
                    className={getQualityBadge(quality).color}
                  >
                    {getQualityBadge(quality).label}
                  </Badge>
                </div>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger className="bg-slate-900/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ultra">Ultra HD (Máxima Calidad)</SelectItem>
                    <SelectItem value="high">Alta Calidad</SelectItem>
                    <SelectItem value="medium">Calidad Media</SelectItem>
                    <SelectItem value="low">Baja Calidad (Menor Tamaño)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* FPS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>FPS (Cuadros por Segundo)</Label>
                  <span className="text-sm text-slate-400">{fps} fps</span>
                </div>
                <Slider
                  value={[fps]}
                  onValueChange={([value]) => setFps(value)}
                  min={24}
                  max={120}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>24</span>
                  <span>30</span>
                  <span>60</span>
                  <span>120</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="audio"
                    checked={includeAudio}
                    onCheckedChange={(checked) => setIncludeAudio(checked as boolean)}
                  />
                  <Label htmlFor="audio" className="cursor-pointer">
                    Incluir audio
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subtitles"
                    checked={includeSubtitles}
                    onCheckedChange={(checked) => setIncludeSubtitles(checked as boolean)}
                  />
                  <Label htmlFor="subtitles" className="cursor-pointer">
                    Incluir subtítulos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hardware"
                    checked={hardwareAcceleration}
                    onCheckedChange={(checked) => setHardwareAcceleration(checked as boolean)}
                  />
                  <Label htmlFor="hardware" className="cursor-pointer">
                    Aceleración por hardware (más rápido)
                  </Label>
                </div>
              </div>

              {/* File Size Estimation */}
              <Alert className="bg-slate-900/50 border-slate-700">
                <HardDrive className="w-4 h-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>Tamaño estimado:</span>
                    <span className="font-semibold">{estimatedSize.toFixed(2)} MB</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
                    <span>Duración del video:</span>
                    <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, "0")}</span>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </TabsContent>

        {/* ADVANCED TAB */}
        <TabsContent value="advanced" className="space-y-4">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="space-y-6">
              <Alert className="bg-yellow-500/10 border-yellow-500/20">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200">
                  Configuración avanzada para usuarios expertos
                </AlertDescription>
              </Alert>

              {/* Video Codec */}
              <div className="space-y-2">
                <Label>Códec de Video</Label>
                <Select value={codec} onValueChange={setCodec}>
                  <SelectTrigger className="bg-slate-900/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h264">H.264 (AVC)</SelectItem>
                    <SelectItem value="h265">H.265 (HEVC)</SelectItem>
                    <SelectItem value="vp9">VP9</SelectItem>
                    <SelectItem value="av1">AV1</SelectItem>
                    <SelectItem value="prores">ProRes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Video Bitrate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Bitrate de Video</Label>
                  <span className="text-sm text-slate-400">{bitrate} kbps</span>
                </div>
                <Slider
                  value={[bitrate]}
                  onValueChange={([value]) => setBitrate(value)}
                  min={1000}
                  max={50000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 Mbps</span>
                  <span>10 Mbps</span>
                  <span>25 Mbps</span>
                  <span>50 Mbps</span>
                </div>
              </div>

              {/* Audio Codec */}
              <div className="space-y-2">
                <Label>Códec de Audio</Label>
                <Select value={audioCodec} onValueChange={setAudioCodec}>
                  <SelectTrigger className="bg-slate-900/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aac">AAC</SelectItem>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="opus">Opus</SelectItem>
                    <SelectItem value="vorbis">Vorbis</SelectItem>
                    <SelectItem value="flac">FLAC (Sin pérdida)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Audio Bitrate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Bitrate de Audio</Label>
                  <span className="text-sm text-slate-400">{audioBitrate} kbps</span>
                </div>
                <Slider
                  value={[audioBitrate]}
                  onValueChange={([value]) => setAudioBitrate(value)}
                  min={128}
                  max={512}
                  step={32}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>128</span>
                  <span>256</span>
                  <span>320</span>
                  <span>512</span>
                </div>
              </div>

              {/* Performance Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">Rendimiento</div>
                  <div className="flex items-center gap-2">
                    {hardwareAcceleration ? (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                        <Zap className="w-3 h-3 mr-1" />
                        GPU Activa
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                        <Monitor className="w-3 h-3 mr-1" />
                        CPU
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">Tiempo estimado</div>
                  <div className="font-semibold">
                    {hardwareAcceleration ? "~2 min" : "~5 min"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Progress */}
      {(isExporting || exportComplete) && (
        <Card className="p-6 bg-slate-800/30 border-slate-700">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {exportComplete ? "Exportación Completa" : "Exportando..."}
              </h3>
              {exportComplete ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
              )}
            </div>

            <Progress value={exportProgress} className="h-2" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{exportStage}</span>
              <span className="font-semibold">{exportProgress}%</span>
            </div>

            {exportComplete && (
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <AlertDescription className="text-green-200">
                  Tu video ha sido exportado exitosamente: {fileName}.{format}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      )}

      {/* Export Button */}
      <div className="flex gap-4">
        <Button
          size="lg"
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={handleStartExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Exportando...
            </>
          ) : exportComplete ? (
            <>
              <Download className="w-5 h-5 mr-2" />
              Descargar Video
            </>
          ) : (
            <>
              <FileVideo className="w-5 h-5 mr-2" />
              Iniciar Exportación
            </>
          )}
        </Button>

        {exportComplete && (
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600"
          >
            <Cloud className="w-5 h-5 mr-2" />
            Subir a la Nube
          </Button>
        )}
      </div>

      {/* Additional Export Options */}
      <Card className="p-4 bg-slate-800/30 border-slate-700">
        <h3 className="font-semibold mb-3">Exportar También</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="border-slate-600" size="sm">
            <ImageIcon className="w-4 h-4 mr-2" />
            Thumbnail
          </Button>
          <Button variant="outline" className="border-slate-600" size="sm">
            <Music className="w-4 h-4 mr-2" />
            Solo Audio
          </Button>
          <Button variant="outline" className="border-slate-600" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Subtítulos SRT
          </Button>
          <Button variant="outline" className="border-slate-600" size="sm">
            <Package className="w-4 h-4 mr-2" />
            Proyecto
          </Button>
        </div>
      </Card>
    </div>
  );
}