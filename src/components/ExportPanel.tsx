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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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
  Package,
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  Link,
  Copy,
  Clock,
  BarChart3
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

interface Thumbnail {
  id: string;
  time: number;
  selected: boolean;
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
  const [exportedFileUrl, setExportedFileUrl] = useState("");
  
  // Preview
  const [showPreview, setShowPreview] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  
  // Thumbnails
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([
    { id: "1", time: 0, selected: true },
    { id: "2", time: duration * 0.25, selected: false },
    { id: "3", time: duration * 0.5, selected: false },
    { id: "4", time: duration * 0.75, selected: false }
  ]);
  const [generatingThumbnails, setGeneratingThumbnails] = useState(false);
  
  // Social Sharing
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareTitle, setShareTitle] = useState("Mi video increíble");
  const [shareDescription, setShareDescription] = useState("Editado con nuestro editor de video con IA");
  const [linkCopied, setLinkCopied] = useState(false);
  
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
      icon: Twitter,
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
          setExportedFileUrl(`/videos/${fileName}.${format}`);
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

  const handleGenerateThumbnails = () => {
    setGeneratingThumbnails(true);
    
    // Simulate thumbnail generation
    setTimeout(() => {
      const newThumbnails = [
        { id: "1", time: 0, selected: thumbnails[0]?.selected || false },
        { id: "2", time: duration * 0.2, selected: false },
        { id: "3", time: duration * 0.4, selected: false },
        { id: "4", time: duration * 0.6, selected: false },
        { id: "5", time: duration * 0.8, selected: false },
        { id: "6", time: duration * 0.95, selected: false }
      ];
      setThumbnails(newThumbnails);
      setGeneratingThumbnails(false);
    }, 2000);
  };

  const handleSelectThumbnail = (id: string) => {
    setThumbnails(thumbnails.map(t => ({
      ...t,
      selected: t.id === id
    })));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + exportedFileUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.origin + exportedFileUrl);
    const title = encodeURIComponent(shareTitle);
    const description = encodeURIComponent(shareDescription);
    
    const shareUrls = {
      youtube: `https://www.youtube.com/upload`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      instagram: `https://www.instagram.com/`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
        
        {/* Preview Button */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-purple-500/50">
              <Eye className="w-4 h-4 mr-2" />
              Previsualizar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle>Vista Previa de Exportación</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <PlayCircle className="w-16 h-16 mx-auto text-purple-500" />
                  <p className="text-slate-400">Vista previa del video</p>
                  <p className="text-sm text-slate-500">
                    Resolución: {resolution} | Formato: {format.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tiempo: {formatTime(previewTime)}</span>
                  <span className="text-slate-400">Duración: {formatTime(duration)}</span>
                </div>
                <Slider
                  value={[previewTime]}
                  onValueChange={([value]) => setPreviewTime(value)}
                  min={0}
                  max={duration}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <Label className="text-xs text-slate-400">Configuración</Label>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Calidad:</span>
                      <span className="font-semibold">{getQualityBadge(quality).label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">FPS:</span>
                      <span className="font-semibold">{fps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Códec:</span>
                      <span className="font-semibold">{codec.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-slate-400">Tamaño Estimado</Label>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tamaño:</span>
                      <span className="font-semibold">{estimatedSize.toFixed(2)} MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bitrate:</span>
                      <span className="font-semibold">{(bitrate / 1000).toFixed(1)} Mbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tiempo:</span>
                      <span className="font-semibold">{hardwareAcceleration ? "~2 min" : "~5 min"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="presets" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="presets">
            <Zap className="w-4 h-4 mr-2" />
            Presets
          </TabsTrigger>
          <TabsTrigger value="custom">
            <Settings className="w-4 h-4 mr-2" />
            Personalizado
          </TabsTrigger>
          <TabsTrigger value="thumbnails">
            <ImageIcon className="w-4 h-4 mr-2" />
            Miniaturas
          </TabsTrigger>
          <TabsTrigger value="share">
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
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
                    <span>{formatTime(duration)}</span>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </TabsContent>

        {/* THUMBNAILS TAB */}
        <TabsContent value="thumbnails" className="space-y-4">
          <Alert className="bg-purple-500/10 border-purple-500/20">
            <ImageIcon className="w-4 h-4 text-purple-400" />
            <AlertDescription className="text-purple-200">
              Genera y selecciona la miniatura perfecta para tu video
            </AlertDescription>
          </Alert>

          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Miniaturas Generadas</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleGenerateThumbnails}
                  disabled={generatingThumbnails}
                  className="border-purple-500/50"
                >
                  {generatingThumbnails ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar con IA
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {thumbnails.map((thumb) => (
                  <div
                    key={thumb.id}
                    className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                      thumb.selected
                        ? "ring-2 ring-purple-500 scale-105"
                        : "ring-1 ring-slate-700 hover:ring-purple-500/50"
                    }`}
                    onClick={() => handleSelectThumbnail(thumb.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                        <p className="text-xs text-slate-400">{formatTime(thumb.time)}</p>
                      </div>
                    </div>
                    {thumb.selected && (
                      <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Alert className="bg-slate-900/50 border-slate-700">
                <Clock className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  <strong>Consejo:</strong> Las miniaturas automáticas capturan los momentos más visuales de tu video usando IA
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </TabsContent>

        {/* SHARE TAB */}
        <TabsContent value="share" className="space-y-4">
          {!exportComplete ? (
            <Alert className="bg-yellow-500/10 border-yellow-500/20">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200">
                Primero debes exportar el video para poder compartirlo
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <AlertDescription className="text-green-200">
                  Video exportado exitosamente. ¡Ahora puedes compartirlo!
                </AlertDescription>
              </Alert>

              <Card className="p-6 bg-slate-800/30 border-slate-700">
                <div className="space-y-4">
                  <div>
                    <Label>Título del Video</Label>
                    <Input
                      value={shareTitle}
                      onChange={(e) => setShareTitle(e.target.value)}
                      className="mt-2 bg-slate-900/50"
                      placeholder="Título para compartir"
                    />
                  </div>

                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={shareDescription}
                      onChange={(e) => setShareDescription(e.target.value)}
                      className="mt-2 bg-slate-900/50"
                      placeholder="Agrega una descripción..."
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <Label className="mb-3 block">Compartir en Redes Sociales</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="border-red-500/50 hover:bg-red-500/10"
                        onClick={() => handleShareToSocial("youtube")}
                      >
                        <Youtube className="w-4 h-4 mr-2 text-red-500" />
                        YouTube
                      </Button>
                      <Button
                        variant="outline"
                        className="border-pink-500/50 hover:bg-pink-500/10"
                        onClick={() => handleShareToSocial("instagram")}
                      >
                        <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                        Instagram
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500/50 hover:bg-blue-500/10"
                        onClick={() => handleShareToSocial("facebook")}
                      >
                        <Facebook className="w-4 h-4 mr-2 text-blue-500" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-500/50 hover:bg-slate-500/10"
                        onClick={() => handleShareToSocial("twitter")}
                      >
                        <Twitter className="w-4 h-4 mr-2 text-slate-400" />
                        Twitter/X
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-600/50 hover:bg-blue-600/10"
                        onClick={() => handleShareToSocial("linkedin")}
                      >
                        <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-500/50 hover:bg-purple-500/10"
                        onClick={handleCopyLink}
                      >
                        {linkCopied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                            ¡Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2 text-purple-500" />
                            Copiar Link
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Alert className="bg-slate-900/50 border-slate-700">
                    <Link className="w-4 h-4" />
                    <AlertDescription className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Link directo:</span>
                        <code className="text-xs text-purple-400 bg-slate-800 px-2 py-1 rounded">
                          {window.location.origin + exportedFileUrl}
                        </code>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>

              <Card className="p-6 bg-slate-800/30 border-slate-700">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    Estadísticas del Video
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Duración</p>
                      <p className="text-lg font-semibold">{formatTime(duration)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Resolución</p>
                      <p className="text-lg font-semibold">{resolution}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Tamaño</p>
                      <p className="text-lg font-semibold">{estimatedSize.toFixed(1)} MB</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Formato</p>
                      <p className="text-lg font-semibold">{format.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
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