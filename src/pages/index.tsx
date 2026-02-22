import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Video, 
  Sparkles, 
  Scissors, 
  Wand2, 
  Upload, 
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SEO 
        title="VDCCSG - Editor de Video con IA"
        description="Editor de video profesional potenciado por inteligencia artificial. Edita, corta y mejora tus videos con tecnología de IA."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Header */}
        <header className="border-b border-purple-800/30 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">VDCCSG</span>
              </div>
              <nav className="flex items-center gap-6">
                <Link href="/editor" className="text-purple-200 hover:text-white transition-colors font-medium">
                  Editor
                </Link>
                <Link href="/features" className="text-purple-200 hover:text-white transition-colors font-medium">
                  Características
                </Link>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Comenzar
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-full text-purple-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Editor de Video con IA
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight">
              Edita Videos con el
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Poder de la IA</span>
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Transforma tus videos con tecnología de inteligencia artificial. Corta, edita y mejora con herramientas profesionales impulsadas por IA.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 h-14">
                <Upload className="w-5 h-5 mr-2" />
                Subir Video
              </Button>
              <Button size="lg" variant="outline" className="border-purple-700 text-purple-300 hover:bg-purple-900/30 text-lg px-8 h-14">
                Ver Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Scissors className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Corte Inteligente</h3>
              <p className="text-purple-200 leading-relaxed">
                La IA detecta automáticamente las mejores escenas y corta tu video de forma profesional.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mejora Automática</h3>
              <p className="text-purple-200 leading-relaxed">
                Optimización automática de color, luz y audio con un solo clic.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Efectos con IA</h3>
              <p className="text-purple-200 leading-relaxed">
                Aplica efectos profesionales generados por inteligencia artificial.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Control Total</h3>
              <p className="text-purple-200 leading-relaxed">
                Mantén el control completo con herramientas de edición manuales avanzadas.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Exportación Rápida</h3>
              <p className="text-purple-200 leading-relaxed">
                Exporta en múltiples formatos y resoluciones con procesamiento ultra rápido.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Play className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vista Previa en Tiempo Real</h3>
              <p className="text-purple-200 leading-relaxed">
                Ve los cambios instantáneamente mientras editas tu video.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50 p-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Únete a miles de creadores que ya están usando VDCCSG para crear videos increíbles.
            </p>
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 text-lg px-8 h-14 font-bold">
              Comenzar Gratis
            </Button>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-800/30 bg-slate-950/50 backdrop-blur-lg mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <p className="text-purple-300">© 2026 VDCCSG. Todos los derechos reservados.</p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-purple-300 hover:text-white transition-colors">
                  Privacidad
                </Link>
                <Link href="/terms" className="text-purple-300 hover:text-white transition-colors">
                  Términos
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}