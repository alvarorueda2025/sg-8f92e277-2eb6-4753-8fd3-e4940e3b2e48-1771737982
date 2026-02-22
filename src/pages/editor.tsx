import { SEO } from "@/components/SEO";
import { VideoEditor } from "@/components/VideoEditor";

export default function EditorPage() {
  return (
    <>
      <SEO 
        title="Editor - VDCCSG"
        description="Edita tus videos con nuestro editor profesional potenciado por IA"
      />
      <VideoEditor />
    </>
  );
}