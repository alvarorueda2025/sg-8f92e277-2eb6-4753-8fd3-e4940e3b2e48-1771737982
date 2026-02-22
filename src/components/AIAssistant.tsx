import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  Scissors, 
  Wand2, 
  Volume2, 
  Subtitles,
  Zap,
  TrendingUp,
  Eye
} from "lucide-react";

export function AIAssistant() {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-300" />
          <h3 className="text-sm font-bold text-white">Asistente IA</h3>
        </div>
        <p className="text-xs text-purple-200">
          Potencia tu edición con inteligencia artificial. Selecciona una herramienta para comenzar.
        </p>
      </div>

      <div className="space-y-3">
        <Card className="bg-slate-900/50 border-purple-800/30 p-4 hover:bg-slate-900/70 cursor-pointer transition-all group">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">Corte Inteligente</h4>
              <p className="text-xs text-purple-200">
                La IA detecta y elimina silencios automáticamente
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-800/30 p-4 hover:bg-slate-900/70 cursor-pointer transition-all group">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">Mejora Automática</h4>
              <p className="text-xs text-purple-200">
                Optimiza color, luz y estabilización en un clic
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-800/30 p-4 hover:bg-slate-900/70 cursor-pointer transition-all group">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Volume2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">Limpieza de Audio</h4>
              <p className="text-xs text-purple-200">
                Elimina ruido de fondo y mejora la voz
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-800/30 p-4 hover:bg-slate-900/70 cursor-pointer transition-all group">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Subtitles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">Subtítulos Auto</h4>
              <p className="text-xs text-purple-200">
                Genera subtítulos precisos automáticamente
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-800/30 p-4 hover:bg-slate-900/70 cursor-pointer transition-all group">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">Detección de Rostros</h4>
              <p className="text-xs text-purple-200">
                Enfoca y sigue rostros automáticamente
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-800/30 p-4 hover:bg-slate-900/70 cursor-pointer transition-all group">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white mb-1">Optimizar para Redes</h4>
              <p className="text-xs text-purple-200">
                Formatos óptimos para cada plataforma
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="pt-4">
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Zap className="w-4 h-4 mr-2" />
          Aplicar Todas las IA
        </Button>
      </div>
    </div>
  );
}