import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Sun, 
  Contrast, 
  Droplets, 
  Sparkles,
  Palette,
  Layers,
  Gauge,
  Zap
} from "lucide-react";
import { useState } from "react";

export function EffectsPanel() {
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [blur, setBlur] = useState([0]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" />
          Ajustes de Color
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-purple-300 flex items-center gap-2">
                <Sun className="w-3 h-3" />
                Brillo
              </Label>
              <span className="text-xs text-purple-400">{brightness[0]}%</span>
            </div>
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              max={200}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-purple-300 flex items-center gap-2">
                <Contrast className="w-3 h-3" />
                Contraste
              </Label>
              <span className="text-xs text-purple-400">{contrast[0]}%</span>
            </div>
            <Slider
              value={contrast}
              onValueChange={setContrast}
              max={200}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-purple-300 flex items-center gap-2">
                <Droplets className="w-3 h-3" />
                Saturación
              </Label>
              <span className="text-xs text-purple-400">{saturation[0]}%</span>
            </div>
            <Slider
              value={saturation}
              onValueChange={setSaturation}
              max={200}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-purple-300 flex items-center gap-2">
                <Layers className="w-3 h-3" />
                Desenfoque
              </Label>
              <span className="text-xs text-purple-400">{blur[0]}px</span>
            </div>
            <Slider
              value={blur}
              onValueChange={setBlur}
              max={20}
              step={1}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-purple-800/30 pt-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Efectos Predefinidos
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Card className="bg-slate-900/50 border-purple-800/30 p-3 hover:bg-slate-900/70 cursor-pointer transition-all">
            <div className="aspect-video bg-gradient-to-br from-orange-600 to-yellow-600 rounded mb-2" />
            <p className="text-xs text-center text-white font-medium">Cálido</p>
          </Card>
          <Card className="bg-slate-900/50 border-purple-800/30 p-3 hover:bg-slate-900/70 cursor-pointer transition-all">
            <div className="aspect-video bg-gradient-to-br from-blue-600 to-cyan-600 rounded mb-2" />
            <p className="text-xs text-center text-white font-medium">Frío</p>
          </Card>
          <Card className="bg-slate-900/50 border-purple-800/30 p-3 hover:bg-slate-900/70 cursor-pointer transition-all">
            <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-500 rounded mb-2" />
            <p className="text-xs text-center text-white font-medium">B&N</p>
          </Card>
          <Card className="bg-slate-900/50 border-purple-800/30 p-3 hover:bg-slate-900/70 cursor-pointer transition-all">
            <div className="aspect-video bg-gradient-to-br from-amber-700 to-orange-900 rounded mb-2" />
            <p className="text-xs text-center text-white font-medium">Vintage</p>
          </Card>
          <Card className="bg-slate-900/50 border-purple-800/30 p-3 hover:bg-slate-900/70 cursor-pointer transition-all">
            <div className="aspect-video bg-gradient-to-br from-pink-600 to-purple-600 rounded mb-2" />
            <p className="text-xs text-center text-white font-medium">Vibrante</p>
          </Card>
          <Card className="bg-slate-900/50 border-purple-800/30 p-3 hover:bg-slate-900/70 cursor-pointer transition-all">
            <div className="aspect-video bg-gradient-to-br from-green-700 to-teal-700 rounded mb-2" />
            <p className="text-xs text-center text-white font-medium">Natural</p>
          </Card>
        </div>
      </div>

      <div className="border-t border-purple-800/30 pt-6">
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Zap className="w-4 h-4 mr-2" />
          Aplicar Efectos
        </Button>
      </div>
    </div>
  );
}