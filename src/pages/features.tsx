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
  Settings,
  Zap,
  FileVideo,
  Layers,
  Clock,
  Shield,
  Sliders,
  Brain,
  Palette,
  Music
} from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <>
      <SEO 
        title="Características - VDCCSG"
        description="Descubre todas las características y herramientas profesionales de edición de video con IA que ofrece VDCCSG."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Header */}
        <header className="border-b border-purple-800/30 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">VDCCSG</span>
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/editor" className="text-purple-200 hover:text-white transition-colors font-medium">
                  Editor
                </Link>
                <Link href="/features" className="text-white font-medium">
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
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Características
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Poderosas</span>
            </h1>
            <p className="text-xl text-purple-200 leading-relaxed">
              Herramientas profesionales de edición de video potenciadas por inteligencia artificial para llevar tu contenido al siguiente nivel.
            </p>
          </div>
        </section>

        {/* Main Features */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Edición con IA</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Scissors className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Corte Inteligente</h3>
              <p className="text-purple-200 leading-relaxed">
                La IA analiza tu video y detecta automáticamente las mejores escenas, eliminando partes innecesarias y creando una narrativa fluida.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Detección de Escenas</h3>
              <p className="text-purple-200 leading-relaxed">
                Identifica automáticamente cambios de escena, transiciones y momentos clave en tu video para una edición más rápida.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Corrección de Color IA</h3>
              <p className="text-purple-200 leading-relaxed">
                Ajusta automáticamente el balance de blancos, saturación y contraste para obtener colores perfectos y profesionales.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Music className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mejora de Audio</h3>
              <p className="text-purple-200 leading-relaxed">
                Elimina ruido de fondo, normaliza volumen y mejora la claridad del audio con tecnología de IA avanzada.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Efectos Generativos</h3>
              <p className="text-purple-200 leading-relaxed">
                Aplica efectos visuales impresionantes generados por IA que se adaptan al contenido de tu video.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Estabilización</h3>
              <p className="text-purple-200 leading-relaxed">
                Elimina el movimiento de cámara no deseado y estabiliza tus tomas para resultados profesionales.
              </p>
            </Card>
          </div>

          {/* Professional Tools */}
          <h2 className="text-3xl font-black text-white mb-8 text-center">Herramientas Profesionales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Timeline Multipista</h3>
              <p className="text-purple-200 leading-relaxed">
                Trabaja con múltiples capas de video, audio y efectos en una línea de tiempo profesional e intuitiva.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Sliders className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Controles Avanzados</h3>
              <p className="text-purple-200 leading-relaxed">
                Accede a controles precisos de color, audio, velocidad y efectos para ajustes profesionales detallados.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <FileVideo className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Formatos Universales</h3>
              <p className="text-purple-200 leading-relaxed">
                Importa y exporta en todos los formatos principales: MP4, MOV, AVI, WebM y más con configuración personalizable.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Renderizado Rápido</h3>
              <p className="text-purple-200 leading-relaxed">
                Exporta tus videos hasta 10x más rápido con nuestro motor de renderizado optimizado y aceleración por hardware.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vista Previa en Tiempo Real</h3>
              <p className="text-purple-200 leading-relaxed">
                Ve todos tus cambios instantáneamente sin esperar renderizado. Lo que ves es lo que obtienes.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-purple-800/30 p-8 hover:bg-slate-900/70 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Guardado Automático</h3>
              <p className="text-purple-200 leading-relaxed">
                Tu trabajo se guarda automáticamente cada pocos segundos. Nunca pierdas tu progreso de edición.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50 p-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">
              Comienza a crear videos increíbles
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Accede a todas estas características y más. Sin límites, sin marcas de agua.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/editor">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 text-lg px-8 h-14 font-bold">
                  Ir al Editor
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-purple-700 text-purple-300 hover:bg-purple-900/30 text-lg px-8 h-14">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
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