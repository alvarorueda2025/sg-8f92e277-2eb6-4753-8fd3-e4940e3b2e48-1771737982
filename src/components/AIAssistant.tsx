import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Mic,
  FileText,
  Scissors,
  ImageIcon,
  Wand2,
  Zap,
  AlertCircle,
  Download,
  Languages,
  Volume2,
  Type,
  Camera,
  Eraser,
  MessageSquare,
  Brain,
  Video,
  Music,
  Image as ImageIconLucide,
  Film,
  TrendingUp,
  Bot,
  MessageCircle,
  Lightbulb,
  Target,
  Loader2,
  CheckCircle2,
  Clock,
  Hash,
  Eye,
  EyeOff,
  Play
} from "lucide-react";

interface AIAssistantProps {
  onApplyAI?: (config: any) => void;
}

export function AIAssistant({ onApplyAI }: AIAssistantProps) {
  // Audio & Transcription States
  const [language, setLanguage] = useState("auto");
  const [transcribing, setTranscribing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [subtitlesGenerated, setSubtitlesGenerated] = useState(false);
  const [subtitleStyle, setSubtitleStyle] = useState("classic");
  const [subtitlePosition, setSubtitlePosition] = useState("bottom");
  const [subtitleSize, setSubtitleSize] = useState([24]);
  const [noiseReduction, setNoiseReduction] = useState([50]);
  const [normalizeVolume, setNormalizeVolume] = useState(false);
  const [improveVoiceClarity, setImproveVoiceClarity] = useState(false);
  const [processingAudio, setProcessingAudio] = useState(false);

  // Video Processing States
  const [sceneSensitivity, setSceneSensitivity] = useState([50]);
  const [detectedScenes, setDetectedScenes] = useState<number[]>([]);
  const [analyzingScenes, setAnalyzingScenes] = useState(false);
  const [stabilizationStrength, setStabilizationStrength] = useState([70]);
  const [stabilizationSmoothing, setStabilizationSmoothing] = useState([50]);
  const [stabilizing, setStabilizing] = useState(false);
  const [bgRemovalQuality, setBgRemovalQuality] = useState("balanced");
  const [chromaKeyMode, setChromaKeyMode] = useState(false);
  const [removingBg, setRemovingBg] = useState(false);

  // Advanced AI States
  const [generatingContent, setGeneratingContent] = useState(false);
  const [contentType, setContentType] = useState("broll");
  const [contentPrompt, setContentPrompt] = useState("");
  const [contentStyle, setContentStyle] = useState("realistic");
  const [contentDuration, setContentDuration] = useState([5]);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);

  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatProcessing, setChatProcessing] = useState(false);

  const [smartEditPrompt, setSmartEditPrompt] = useState("");
  const [smartEditProcessing, setSmartEditProcessing] = useState(false);
  const [smartEditSuggestions, setSmartEditSuggestions] = useState<string[]>([]);

  const [autoEditStyle, setAutoEditStyle] = useState("dynamic");
  const [autoEditLength, setAutoEditLength] = useState("medium");
  const [autoEditMusic, setAutoEditMusic] = useState(true);
  const [autoEditTransitions, setAutoEditTransitions] = useState(true);
  const [autoEditing, setAutoEditing] = useState(false);

  const [objectToTrack, setObjectToTrack] = useState("");
  const [trackingActive, setTrackingActive] = useState(false);
  const [trackingObjects, setTrackingObjects] = useState<string[]>([]);

  const [trendAnalyzing, setTrendAnalyzing] = useState(false);
  const [trendData, setTrendData] = useState<any>(null);

  // Transcription Functions
  const handleTranscribe = async () => {
    setTranscribing(true);
    setTranscriptionProgress(0);
    
    const interval = setInterval(() => {
      setTranscriptionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      setTranscription("Hola, este es un ejemplo de transcripción automática. El sistema de IA ha detectado y convertido el audio en texto de manera precisa. Esta funcionalidad utiliza modelos avanzados de reconocimiento de voz para proporcionar transcripciones de alta calidad en tiempo real.");
      setTranscribing(false);
    }, 3000);
  };

  const handleGenerateSubtitles = () => {
    if (!transcription) return;
    setSubtitlesGenerated(true);
    onApplyAI?.({
      type: "subtitles",
      style: subtitleStyle,
      position: subtitlePosition,
      size: subtitleSize[0],
      text: transcription
    });
  };

  const handleImproveAudio = async () => {
    setProcessingAudio(true);
    setTimeout(() => {
      setProcessingAudio(false);
      onApplyAI?.({
        type: "audio-enhancement",
        noiseReduction: noiseReduction[0],
        normalize: normalizeVolume,
        voiceClarity: improveVoiceClarity
      });
    }, 2000);
  };

  // Scene Detection
  const handleDetectScenes = async () => {
    setAnalyzingScenes(true);
    setTimeout(() => {
      const scenes = [0, 5.2, 12.8, 18.5, 25.1, 32.7, 40.3];
      setDetectedScenes(scenes);
      setAnalyzingScenes(false);
    }, 2000);
  };

  // Stabilization
  const handleStabilize = async () => {
    setStabilizing(true);
    setTimeout(() => {
      setStabilizing(false);
      onApplyAI?.({
        type: "stabilization",
        strength: stabilizationStrength[0],
        smoothing: stabilizationSmoothing[0]
      });
    }, 3000);
  };

  // Background Removal
  const handleRemoveBackground = async () => {
    setRemovingBg(true);
    setTimeout(() => {
      setRemovingBg(false);
      onApplyAI?.({
        type: "background-removal",
        quality: bgRemovalQuality,
        chromaKey: chromaKeyMode
      });
    }, 3000);
  };

  // Content Generation
  const handleGenerateContent = async () => {
    if (!contentPrompt) return;
    
    setGeneratingContent(true);
    setTimeout(() => {
      const newContent = {
        id: Date.now(),
        type: contentType,
        prompt: contentPrompt,
        style: contentStyle,
        duration: contentDuration[0],
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
        status: "ready"
      };
      setGeneratedContent([...generatedContent, newContent]);
      setGeneratingContent(false);
      setContentPrompt("");
    }, 4000);
  };

  // AI Chat Assistant
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput("");
    setChatProcessing(true);

    setTimeout(() => {
      const responses = [
        "He analizado tu video y sugiero añadir una transición de fade entre el segundo 5 y 7.",
        "Detecté que el audio tiene algunos picos. ¿Quieres que lo normalice automáticamente?",
        "He identificado 3 escenas principales. Puedo ayudarte a organizarlas mejor.",
        "El balance de color en los primeros 10 segundos parece un poco frío. ¿Aplico corrección automática?",
        "Noté que hay espacio vacío entre clips. ¿Quieres que lo elimine automáticamente?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage = { role: "assistant", content: randomResponse };
      setChatMessages(prev => [...prev, aiMessage]);
      setChatProcessing(false);
    }, 1500);
  };

  // Smart Edit
  const handleSmartEdit = async () => {
    if (!smartEditPrompt) return;
    
    setSmartEditProcessing(true);
    setTimeout(() => {
      const suggestions = [
        "Cortar escena aburrida entre 15-18s",
        "Añadir música energética de fondo",
        "Aplicar zoom dinámico en momentos clave",
        "Agregar subtítulos con estilo moderno",
        "Mejorar iluminación en escenas oscuras"
      ];
      setSmartEditSuggestions(suggestions);
      setSmartEditProcessing(false);
    }, 2000);
  };

  // Auto Edit
  const handleAutoEdit = async () => {
    setAutoEditing(true);
    setTimeout(() => {
      setAutoEditing(false);
      onApplyAI?.({
        type: "auto-edit",
        style: autoEditStyle,
        length: autoEditLength,
        music: autoEditMusic,
        transitions: autoEditTransitions
      });
    }, 5000);
  };

  // Object Tracking
  const handleAddTracking = () => {
    if (!objectToTrack) return;
    setTrackingObjects([...trackingObjects, objectToTrack]);
    setObjectToTrack("");
  };

  const handleStartTracking = () => {
    setTrackingActive(true);
    setTimeout(() => {
      setTrackingActive(false);
    }, 3000);
  };

  // Trend Analysis
  const handleAnalyzeTrends = async () => {
    setTrendAnalyzing(true);
    setTimeout(() => {
      setTrendData({
        platform: "YouTube",
        trending: ["Tutorial", "Vlog", "Shorts"],
        bestLength: "8-12 minutos",
        bestTime: "18:00 - 21:00",
        tags: ["#trending", "#viral", "#2024"],
        score: 87
      });
      setTrendAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Asistente de IA</h2>
        <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
          <Sparkles className="w-3 h-3 mr-1" />
          Powered by AI
        </Badge>
      </div>

      <Tabs defaultValue="audio" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="generate">Generar</TabsTrigger>
          <TabsTrigger value="assistant">Asistente</TabsTrigger>
          <TabsTrigger value="auto">Auto</TabsTrigger>
        </TabsList>

        {/* AUDIO & TRANSCRIPTION TAB */}
        <TabsContent value="audio" className="space-y-4">
          <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
            {/* Transcription */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Mic className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold">Transcripción Automática</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detectar</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="fr">Francés</SelectItem>
                      <SelectItem value="de">Alemán</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                      <SelectItem value="pt">Portugués</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleTranscribe} 
                  disabled={transcribing}
                  className="w-full"
                >
                  {transcribing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Transcribiendo...
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Iniciar Transcripción
                    </>
                  )}
                </Button>

                {transcribing && (
                  <div className="space-y-2">
                    <Progress value={transcriptionProgress} />
                    <p className="text-sm text-slate-400 text-center">{transcriptionProgress}%</p>
                  </div>
                )}

                {transcription && (
                  <div className="space-y-2">
                    <Label>Texto Transcrito</Label>
                    <Textarea 
                      value={transcription}
                      onChange={(e) => setTranscription(e.target.value)}
                      rows={4}
                      className="bg-slate-900/50"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Languages className="w-4 h-4 mr-2" />
                        Traducir
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Subtitles */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Generación de Subtítulos</h3>
                {subtitlesGenerated && (
                  <Badge variant="outline" className="ml-auto bg-green-500/20 text-green-300">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Generados
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Estilo de Subtítulos</Label>
                  <Select value={subtitleStyle} onValueChange={setSubtitleStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Clásico</SelectItem>
                      <SelectItem value="modern">Moderno</SelectItem>
                      <SelectItem value="minimal">Minimalista</SelectItem>
                      <SelectItem value="bold">Negrita</SelectItem>
                      <SelectItem value="outlined">Con Borde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Posición</Label>
                  <Select value={subtitlePosition} onValueChange={setSubtitlePosition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Superior</SelectItem>
                      <SelectItem value="center">Centro</SelectItem>
                      <SelectItem value="bottom">Inferior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tamaño: {subtitleSize[0]}px</Label>
                  <Slider
                    value={subtitleSize}
                    onValueChange={setSubtitleSize}
                    min={12}
                    max={48}
                    step={2}
                  />
                </div>

                <Button 
                  onClick={handleGenerateSubtitles}
                  disabled={!transcription}
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generar Subtítulos
                </Button>
              </div>
            </Card>

            {/* Audio Enhancement */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Volume2 className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold">Mejora de Audio</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Reducción de Ruido: {noiseReduction[0]}%</Label>
                  <Slider
                    value={noiseReduction}
                    onValueChange={setNoiseReduction}
                    max={100}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Normalizar Volumen</Label>
                  <Switch checked={normalizeVolume} onCheckedChange={setNormalizeVolume} />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Mejorar Claridad de Voz</Label>
                  <Switch checked={improveVoiceClarity} onCheckedChange={setImproveVoiceClarity} />
                </div>

                <Button 
                  onClick={handleImproveAudio}
                  disabled={processingAudio}
                  className="w-full"
                >
                  {processingAudio ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Aplicar Mejoras
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* VIDEO PROCESSING TAB */}
        <TabsContent value="video" className="space-y-4">
          <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
            {/* Scene Detection */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Scissors className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold">Detección de Escenas</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Sensibilidad: {sceneSensitivity[0]}%</Label>
                  <Slider
                    value={sceneSensitivity}
                    onValueChange={setSceneSensitivity}
                    max={100}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Mayor sensibilidad = menos escenas detectadas
                  </p>
                </div>

                <Button 
                  onClick={handleDetectScenes}
                  disabled={analyzingScenes}
                  className="w-full"
                >
                  {analyzingScenes ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Detectar Escenas
                    </>
                  )}
                </Button>

                {detectedScenes.length > 0 && (
                  <div className="space-y-2">
                    <Label>Escenas Detectadas: {detectedScenes.length}</Label>
                    <div className="flex flex-wrap gap-2">
                      {detectedScenes.map((time, index) => (
                        <Badge key={index} variant="outline" className="bg-yellow-500/20 text-yellow-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {Math.floor(time / 60)}:{(time % 60).toFixed(1)}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Scissors className="w-4 h-4 mr-2" />
                      Cortar en Todas las Escenas
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Stabilization */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Estabilización de Video</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Fuerza: {stabilizationStrength[0]}%</Label>
                  <Slider
                    value={stabilizationStrength}
                    onValueChange={setStabilizationStrength}
                    max={100}
                  />
                </div>

                <div>
                  <Label>Suavizado: {stabilizationSmoothing[0]}%</Label>
                  <Slider
                    value={stabilizationSmoothing}
                    onValueChange={setStabilizationSmoothing}
                    max={100}
                  />
                </div>

                <Alert className="bg-blue-500/10 border-blue-500/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    La estabilización puede recortar bordes del video
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleStabilize}
                  disabled={stabilizing}
                  className="w-full"
                >
                  {stabilizing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Estabilizando...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Estabilizar Video
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Background Removal */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Eraser className="w-5 h-5 text-pink-400" />
                <h3 className="font-semibold">Eliminación de Fondo</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Calidad</Label>
                  <Select value={bgRemovalQuality} onValueChange={setBgRemovalQuality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Rápida (baja calidad)</SelectItem>
                      <SelectItem value="balanced">Equilibrada</SelectItem>
                      <SelectItem value="precise">Precisa (alta calidad)</SelectItem>
                      <SelectItem value="ultra">Ultra (muy lenta)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Modo Chroma Key</Label>
                  <Switch checked={chromaKeyMode} onCheckedChange={setChromaKeyMode} />
                </div>

                <Alert className="bg-yellow-500/10 border-yellow-500/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Proceso intensivo. Puede tardar varios minutos.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleRemoveBackground}
                  disabled={removingBg}
                  className="w-full"
                >
                  {removingBg ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Eraser className="w-4 h-4 mr-2" />
                      Eliminar Fondo
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* CONTENT GENERATION TAB */}
        <TabsContent value="generate" className="space-y-4">
          <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
            {/* AI Content Generator */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold">Generador de Contenido IA</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Tipo de Contenido</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="broll">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          B-Roll
                        </div>
                      </SelectItem>
                      <SelectItem value="music">
                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4" />
                          Música de Fondo
                        </div>
                      </SelectItem>
                      <SelectItem value="image">
                        <div className="flex items-center gap-2">
                          <ImageIconLucide className="w-4 h-4" />
                          Imagen/Ilustración
                        </div>
                      </SelectItem>
                      <SelectItem value="transition">
                        <div className="flex items-center gap-2">
                          <Film className="w-4 h-4" />
                          Transición Personalizada
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Describe lo que necesitas</Label>
                  <Textarea
                    value={contentPrompt}
                    onChange={(e) => setContentPrompt(e.target.value)}
                    placeholder="Ej: Un atardecer en la playa con olas suaves..."
                    rows={3}
                    className="bg-slate-900/50"
                  />
                </div>

                <div>
                  <Label>Estilo Visual</Label>
                  <Select value={contentStyle} onValueChange={setContentStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realista</SelectItem>
                      <SelectItem value="artistic">Artístico</SelectItem>
                      <SelectItem value="cinematic">Cinematográfico</SelectItem>
                      <SelectItem value="animated">Animado</SelectItem>
                      <SelectItem value="abstract">Abstracto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Duración: {contentDuration[0]}s</Label>
                  <Slider
                    value={contentDuration}
                    onValueChange={setContentDuration}
                    min={1}
                    max={30}
                  />
                </div>

                <Button 
                  onClick={handleGenerateContent}
                  disabled={generatingContent || !contentPrompt}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {generatingContent ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generando con IA...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar Contenido
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Generated Content */}
            {generatedContent.length > 0 && (
              <Card className="p-4 bg-slate-800/30 border-slate-700">
                <h3 className="font-semibold mb-3">Contenido Generado</h3>
                <div className="space-y-2">
                  {generatedContent.map((content) => (
                    <div 
                      key={content.id}
                      className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700"
                    >
                      <img 
                        src={content.thumbnail} 
                        alt="Thumbnail"
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{content.prompt}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {content.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300">
                            {content.duration}s
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* AI ASSISTANT TAB */}
        <TabsContent value="assistant" className="space-y-4">
          <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
            {/* Chat Assistant */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Chat Asistente IA</h3>
              </div>

              <div className="space-y-3">
                <div className="h-[200px] overflow-y-auto space-y-2 p-3 bg-slate-900/50 rounded-lg">
                  {chatMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                      <div className="text-center">
                        <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Pregúntame sobre tu video</p>
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg ${
                          msg.role === "user" 
                            ? "bg-purple-500/20 ml-8" 
                            : "bg-slate-700/50 mr-8"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    ))
                  )}
                  {chatProcessing && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>IA pensando...</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Escribe tu pregunta..."
                    className="bg-slate-900/50"
                  />
                  <Button onClick={handleSendMessage} disabled={chatProcessing || !chatInput}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Sugerencias
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Target className="w-4 h-4 mr-2" />
                    Analizar
                  </Button>
                </div>
              </div>
            </Card>

            {/* Smart Edit Suggestions */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-pink-400" />
                <h3 className="font-semibold">Edición Inteligente</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Describe cómo quieres editar</Label>
                  <Textarea
                    value={smartEditPrompt}
                    onChange={(e) => setSmartEditPrompt(e.target.value)}
                    placeholder="Ej: Haz el video más dinámico y profesional..."
                    rows={3}
                    className="bg-slate-900/50"
                  />
                </div>

                <Button 
                  onClick={handleSmartEdit}
                  disabled={smartEditProcessing || !smartEditPrompt}
                  className="w-full"
                >
                  {smartEditProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generar Sugerencias
                    </>
                  )}
                </Button>

                {smartEditSuggestions.length > 0 && (
                  <div className="space-y-2">
                    <Label>Sugerencias de IA:</Label>
                    {smartEditSuggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                        <span className="text-sm flex-1">{suggestion}</span>
                        <Button size="sm" variant="ghost">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Object Tracking */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold">Seguimiento de Objetos</h3>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={objectToTrack}
                    onChange={(e) => setObjectToTrack(e.target.value)}
                    placeholder="Ej: rostro, coche, pelota..."
                    className="bg-slate-900/50"
                  />
                  <Button onClick={handleAddTracking} disabled={!objectToTrack}>
                    <Hash className="w-4 h-4" />
                  </Button>
                </div>

                {trackingObjects.length > 0 && (
                  <div className="space-y-2">
                    <Label>Objetos a rastrear:</Label>
                    <div className="flex flex-wrap gap-2">
                      {trackingObjects.map((obj, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-500/20 text-orange-300">
                          <Eye className="w-3 h-3 mr-1" />
                          {obj}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={handleStartTracking}
                      disabled={trackingActive}
                      className="w-full"
                    >
                      {trackingActive ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Rastreando...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Iniciar Rastreo
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* AUTO EDITING TAB */}
        <TabsContent value="auto" className="space-y-4">
          <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
            {/* Auto Edit */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold">Edición Automática</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Estilo de Edición</Label>
                  <Select value={autoEditStyle} onValueChange={setAutoEditStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dynamic">Dinámico</SelectItem>
                      <SelectItem value="calm">Tranquilo</SelectItem>
                      <SelectItem value="professional">Profesional</SelectItem>
                      <SelectItem value="creative">Creativo</SelectItem>
                      <SelectItem value="vlog">Vlog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Duración Objetivo</Label>
                  <Select value={autoEditLength} onValueChange={setAutoEditLength}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Corto (&lt;1 min)</SelectItem>
                      <SelectItem value="medium">Medio (1-5 min)</SelectItem>
                      <SelectItem value="long">Largo (&gt;5 min)</SelectItem>
                      <SelectItem value="keep">Mantener Original</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Añadir Música de Fondo</Label>
                  <Switch checked={autoEditMusic} onCheckedChange={setAutoEditMusic} />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Añadir Transiciones</Label>
                  <Switch checked={autoEditTransitions} onCheckedChange={setAutoEditTransitions} />
                </div>

                <Alert className="bg-purple-500/10 border-purple-500/30">
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    La IA analizará tu video y creará una edición completa automáticamente
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleAutoEdit}
                  disabled={autoEditing}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                >
                  {autoEditing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Editando Automáticamente...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Crear Edición Automática
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Trend Analysis */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold">Análisis de Tendencias</h3>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-slate-400">
                  Analiza tendencias actuales para optimizar tu contenido
                </p>

                <Button 
                  onClick={handleAnalyzeTrends}
                  disabled={trendAnalyzing}
                  className="w-full"
                >
                  {trendAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analizar Tendencias
                    </>
                  )}
                </Button>

                {trendData && (
                  <div className="space-y-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div>
                      <Label className="text-xs text-slate-400">Plataforma:</Label>
                      <p className="text-sm font-medium">{trendData.platform}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400">Trending Topics:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {trendData.trending.map((topic: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400">Duración Ideal:</Label>
                      <p className="text-sm font-medium">{trendData.bestLength}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400">Mejor Horario:</Label>
                      <p className="text-sm font-medium">{trendData.bestTime}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400">Tags Sugeridos:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {trendData.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-500/20 text-blue-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400">Puntuación Viral:</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={trendData.score} className="flex-1" />
                        <span className="text-sm font-bold text-green-400">{trendData.score}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Presets */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold">Presets Rápidos</h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Video className="w-5 h-5 mb-2 text-red-400" />
                  <span className="font-semibold">YouTube</span>
                  <span className="text-xs text-slate-400">1920x1080, Thumbnails</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <ImageIconLucide className="w-5 h-5 mb-2 text-pink-400" />
                  <span className="font-semibold">Instagram</span>
                  <span className="text-xs text-slate-400">1080x1080, Filtros</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Music className="w-5 h-5 mb-2 text-blue-400" />
                  <span className="font-semibold">TikTok</span>
                  <span className="text-xs text-slate-400">1080x1920, Subtítulos</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Sparkles className="w-5 h-5 mb-2 text-purple-400" />
                  <span className="font-semibold">Auto Todo</span>
                  <span className="text-xs text-slate-400">Mejora completa</span>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <Button 
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        size="lg"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Aplicar Todas las Mejoras de IA
      </Button>
    </div>
  );
}