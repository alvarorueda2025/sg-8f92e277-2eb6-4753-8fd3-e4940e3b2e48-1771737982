import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Wand2,
  Palette,
  Sparkles,
  Video,
  RotateCw,
  Crop,
  Zap,
  Eye,
  RefreshCw,
  Sun,
  Moon,
  Droplet,
  Circle,
  Square,
} from "lucide-react";

interface EffectsPanelProps {
  onApplyEffect?: (effect: any) => void;
}

interface ColorFilters {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  temperature: number;
  tint: number;
  exposure: number;
  highlights: number;
  shadows: number;
  vibrance: number;
}

interface VideoEffects {
  blur: number;
  sharpen: number;
  grain: number;
  vignette: number;
  chromatic: number;
}

interface TransformSettings {
  rotation: number;
  scale: number;
  flipH: boolean;
  flipV: boolean;
  opacity: number;
}

export function EffectsPanel({ onApplyEffect }: EffectsPanelProps) {
  const [colorFilters, setColorFilters] = useState<ColorFilters>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    temperature: 0,
    tint: 0,
    exposure: 0,
    highlights: 0,
    shadows: 0,
    vibrance: 100,
  });

  const [videoEffects, setVideoEffects] = useState<VideoEffects>({
    blur: 0,
    sharpen: 0,
    grain: 0,
    vignette: 0,
    chromatic: 0,
  });

  const [transform, setTransform] = useState<TransformSettings>({
    rotation: 0,
    scale: 100,
    flipH: false,
    flipV: false,
    opacity: 100,
  });

  const [selectedTransition, setSelectedTransition] = useState("fade");
  const [transitionDuration, setTransitionDuration] = useState(1);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState("none");

  const colorPresets = [
    { name: "Ninguno", value: "none" },
    { name: "Cálido", value: "warm" },
    { name: "Frío", value: "cold" },
    { name: "Vintage", value: "vintage" },
    { name: "Cinematográfico", value: "cinematic" },
    { name: "Blanco y Negro", value: "bw" },
    { name: "Sepia", value: "sepia" },
    { name: "Vibrante", value: "vibrant" },
  ];

  const transitions = [
    { name: "Fade", value: "fade" },
    { name: "Dissolve", value: "dissolve" },
    { name: "Wipe", value: "wipe" },
    { name: "Slide", value: "slide" },
    { name: "Zoom", value: "zoom" },
    { name: "Rotate", value: "rotate" },
    { name: "Cross Fade", value: "crossfade" },
  ];

  const applyPreset = (preset: string) => {
    setSelectedPreset(preset);
    switch (preset) {
      case "warm":
        setColorFilters({ ...colorFilters, temperature: 20, tint: 10, saturation: 110 });
        break;
      case "cold":
        setColorFilters({ ...colorFilters, temperature: -20, tint: -10, saturation: 90 });
        break;
      case "vintage":
        setColorFilters({ ...colorFilters, saturation: 80, contrast: 110, exposure: 10 });
        setVideoEffects({ ...videoEffects, grain: 15, vignette: 30 });
        break;
      case "cinematic":
        setColorFilters({ ...colorFilters, contrast: 115, saturation: 95, shadows: -10, highlights: -5 });
        setVideoEffects({ ...videoEffects, vignette: 20 });
        break;
      case "bw":
        setColorFilters({ ...colorFilters, saturation: 0, contrast: 110 });
        break;
      case "sepia":
        setColorFilters({ ...colorFilters, saturation: 40, hue: 30, temperature: 25 });
        break;
      case "vibrant":
        setColorFilters({ ...colorFilters, saturation: 130, vibrance: 120, contrast: 105 });
        break;
      case "none":
        resetFilters();
        break;
    }
  };

  const resetFilters = () => {
    setColorFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      temperature: 0,
      tint: 0,
      exposure: 0,
      highlights: 0,
      shadows: 0,
      vibrance: 100,
    });
    setVideoEffects({
      blur: 0,
      sharpen: 0,
      grain: 0,
      vignette: 0,
      chromatic: 0,
    });
    setTransform({
      rotation: 0,
      scale: 100,
      flipH: false,
      flipV: false,
      opacity: 100,
    });
    setSelectedPreset("none");
  };

  const applyAllEffects = () => {
    const allEffects = {
      colorFilters,
      videoEffects,
      transform,
      transition: { type: selectedTransition, duration: transitionDuration },
      speed: speedMultiplier,
    };
    onApplyEffect?.(allEffects);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Efectos y Filtros</h3>
        </div>
        <Button onClick={resetFilters} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Resetear
        </Button>
      </div>

      <Tabs defaultValue="color" className="flex-1 overflow-hidden flex flex-col">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="color">
            <Palette className="w-4 h-4 mr-2" />
            Color
          </TabsTrigger>
          <TabsTrigger value="effects">
            <Sparkles className="w-4 h-4 mr-2" />
            Efectos
          </TabsTrigger>
          <TabsTrigger value="transform">
            <Video className="w-4 h-4 mr-2" />
            Transformar
          </TabsTrigger>
          <TabsTrigger value="transitions">
            <Zap className="w-4 h-4 mr-2" />
            Transiciones
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto mt-4">
          <TabsContent value="color" className="space-y-4 mt-0">
            {/* Presets */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <Label className="text-sm font-medium mb-3 block">Presets de Color</Label>
              <Select value={selectedPreset} onValueChange={applyPreset}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un preset" />
                </SelectTrigger>
                <SelectContent>
                  {colorPresets.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            {/* Brightness */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Brillo
                </Label>
                <span className="text-sm text-slate-400">{colorFilters.brightness}%</span>
              </div>
              <Slider
                value={[colorFilters.brightness]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, brightness: v[0] })}
                min={0}
                max={200}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Contrast */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Circle className="w-4 h-4" />
                  Contraste
                </Label>
                <span className="text-sm text-slate-400">{colorFilters.contrast}%</span>
              </div>
              <Slider
                value={[colorFilters.contrast]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, contrast: v[0] })}
                min={0}
                max={200}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Saturation */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Saturación
                </Label>
                <span className="text-sm text-slate-400">{colorFilters.saturation}%</span>
              </div>
              <Slider
                value={[colorFilters.saturation]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, saturation: v[0] })}
                min={0}
                max={200}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Hue */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Matiz</Label>
                <span className="text-sm text-slate-400">{colorFilters.hue}°</span>
              </div>
              <Slider
                value={[colorFilters.hue]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, hue: v[0] })}
                min={-180}
                max={180}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Temperature */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Temperatura</Label>
                <span className="text-sm text-slate-400">{colorFilters.temperature > 0 ? '+' : ''}{colorFilters.temperature}</span>
              </div>
              <Slider
                value={[colorFilters.temperature]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, temperature: v[0] })}
                min={-100}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Tint */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Tinte</Label>
                <span className="text-sm text-slate-400">{colorFilters.tint > 0 ? '+' : ''}{colorFilters.tint}</span>
              </div>
              <Slider
                value={[colorFilters.tint]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, tint: v[0] })}
                min={-100}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Exposure */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Exposición</Label>
                <span className="text-sm text-slate-400">{colorFilters.exposure > 0 ? '+' : ''}{colorFilters.exposure}</span>
              </div>
              <Slider
                value={[colorFilters.exposure]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, exposure: v[0] })}
                min={-100}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Highlights */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Luces Altas</Label>
                <span className="text-sm text-slate-400">{colorFilters.highlights > 0 ? '+' : ''}{colorFilters.highlights}</span>
              </div>
              <Slider
                value={[colorFilters.highlights]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, highlights: v[0] })}
                min={-100}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Shadows */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Sombras
                </Label>
                <span className="text-sm text-slate-400">{colorFilters.shadows > 0 ? '+' : ''}{colorFilters.shadows}</span>
              </div>
              <Slider
                value={[colorFilters.shadows]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, shadows: v[0] })}
                min={-100}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Vibrance */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Vibración</Label>
                <span className="text-sm text-slate-400">{colorFilters.vibrance}%</span>
              </div>
              <Slider
                value={[colorFilters.vibrance]}
                onValueChange={(v) => setColorFilters({ ...colorFilters, vibrance: v[0] })}
                min={0}
                max={200}
                step={1}
                className="mt-2"
              />
            </Card>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 mt-0">
            {/* Blur */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Desenfoque (Blur)</Label>
                <span className="text-sm text-slate-400">{videoEffects.blur}px</span>
              </div>
              <Slider
                value={[videoEffects.blur]}
                onValueChange={(v) => setVideoEffects({ ...videoEffects, blur: v[0] })}
                min={0}
                max={50}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Sharpen */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Nitidez (Sharpen)</Label>
                <span className="text-sm text-slate-400">{videoEffects.sharpen}%</span>
              </div>
              <Slider
                value={[videoEffects.sharpen]}
                onValueChange={(v) => setVideoEffects({ ...videoEffects, sharpen: v[0] })}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Grain */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Grano (Film Grain)</Label>
                <span className="text-sm text-slate-400">{videoEffects.grain}%</span>
              </div>
              <Slider
                value={[videoEffects.grain]}
                onValueChange={(v) => setVideoEffects({ ...videoEffects, grain: v[0] })}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Vignette */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Viñeta</Label>
                <span className="text-sm text-slate-400">{videoEffects.vignette}%</span>
              </div>
              <Slider
                value={[videoEffects.vignette]}
                onValueChange={(v) => setVideoEffects({ ...videoEffects, vignette: v[0] })}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Chromatic Aberration */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Aberración Cromática</Label>
                <span className="text-sm text-slate-400">{videoEffects.chromatic}%</span>
              </div>
              <Slider
                value={[videoEffects.chromatic]}
                onValueChange={(v) => setVideoEffects({ ...videoEffects, chromatic: v[0] })}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>
          </TabsContent>

          <TabsContent value="transform" className="space-y-4 mt-0">
            {/* Rotation */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  Rotación
                </Label>
                <span className="text-sm text-slate-400">{transform.rotation}°</span>
              </div>
              <Slider
                value={[transform.rotation]}
                onValueChange={(v) => setTransform({ ...transform, rotation: v[0] })}
                min={-180}
                max={180}
                step={1}
                className="mt-2"
              />
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={() => setTransform({ ...transform, rotation: transform.rotation - 90 })}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  -90°
                </Button>
                <Button
                  onClick={() => setTransform({ ...transform, rotation: 0 })}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  0°
                </Button>
                <Button
                  onClick={() => setTransform({ ...transform, rotation: transform.rotation + 90 })}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  +90°
                </Button>
              </div>
            </Card>

            {/* Scale */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Escala
                </Label>
                <span className="text-sm text-slate-400">{transform.scale}%</span>
              </div>
              <Slider
                value={[transform.scale]}
                onValueChange={(v) => setTransform({ ...transform, scale: v[0] })}
                min={10}
                max={200}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Flip Controls */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <Label className="text-sm font-medium block mb-3">Voltear</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="flip-h" className="text-sm">Horizontal</Label>
                  <Switch
                    id="flip-h"
                    checked={transform.flipH}
                    onCheckedChange={(checked) => setTransform({ ...transform, flipH: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="flip-v" className="text-sm">Vertical</Label>
                  <Switch
                    id="flip-v"
                    checked={transform.flipV}
                    onCheckedChange={(checked) => setTransform({ ...transform, flipV: checked })}
                  />
                </div>
              </div>
            </Card>

            {/* Opacity */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Opacidad
                </Label>
                <span className="text-sm text-slate-400">{transform.opacity}%</span>
              </div>
              <Slider
                value={[transform.opacity]}
                onValueChange={(v) => setTransform({ ...transform, opacity: v[0] })}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
            </Card>

            {/* Crop (Placeholder for future implementation) */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                <Crop className="w-4 h-4" />
                Recortar
              </Label>
              <Button variant="outline" className="w-full" disabled>
                Abrir Editor de Recorte
              </Button>
              <p className="text-xs text-slate-500 mt-2">Próximamente disponible</p>
            </Card>
          </TabsContent>

          <TabsContent value="transitions" className="space-y-4 mt-0">
            {/* Transition Type */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <Label className="text-sm font-medium mb-3 block">Tipo de Transición</Label>
              <Select value={selectedTransition} onValueChange={setSelectedTransition}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una transición" />
                </SelectTrigger>
                <SelectContent>
                  {transitions.map((transition) => (
                    <SelectItem key={transition.value} value={transition.value}>
                      {transition.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            {/* Transition Duration */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Duración</Label>
                <span className="text-sm text-slate-400">{transitionDuration.toFixed(1)}s</span>
              </div>
              <Slider
                value={[transitionDuration]}
                onValueChange={(v) => setTransitionDuration(v[0])}
                min={0.1}
                max={5}
                step={0.1}
                className="mt-2"
              />
            </Card>

            {/* Speed Controls */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <Label className="text-sm font-medium mb-3 block">Control de Velocidad</Label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Velocidad</span>
                <span className="text-sm text-slate-400">{speedMultiplier}x</span>
              </div>
              <Slider
                value={[speedMultiplier]}
                onValueChange={(v) => setSpeedMultiplier(v[0])}
                min={0.25}
                max={4}
                step={0.25}
                className="mt-2"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
                <Button
                  onClick={() => setSpeedMultiplier(0.5)}
                  variant="outline"
                  size="sm"
                >
                  0.5x
                </Button>
                <Button
                  onClick={() => setSpeedMultiplier(1)}
                  variant="outline"
                  size="sm"
                >
                  1x
                </Button>
                <Button
                  onClick={() => setSpeedMultiplier(2)}
                  variant="outline"
                  size="sm"
                >
                  2x
                </Button>
                <Button
                  onClick={() => setSpeedMultiplier(4)}
                  variant="outline"
                  size="sm"
                >
                  4x
                </Button>
              </div>
            </Card>

            {/* Preview Transition */}
            <Card className="p-4 bg-slate-800/30 border-slate-700">
              <Label className="text-sm font-medium mb-3 block">Vista Previa</Label>
              <div className="bg-slate-900/50 rounded-lg p-6 text-center">
                <div className="text-slate-400 mb-2">
                  {selectedTransition.charAt(0).toUpperCase() + selectedTransition.slice(1)}
                </div>
                <div className="text-xs text-slate-500">
                  Duración: {transitionDuration.toFixed(1)}s
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <Button onClick={applyAllEffects} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Wand2 className="w-4 h-4 mr-2" />
          Aplicar Todos los Efectos
        </Button>
      </div>
    </div>
  );
}