import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, FileUp, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface UploadedFile {
  name: string;
  url: string;
  key: string;
  size: number;
  type: string;
}

interface FileUploaderProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onUpload: (files: UploadedFile[]) => void;
  className?: string;
  hint?: string;
}

/**
 * FileUploader — componente de upload seguro de arquivos via S3.
 * Envia o arquivo para o endpoint /api/upload que usa storagePut() do servidor.
 * Suporta drag-and-drop, múltiplos arquivos e barra de progresso.
 */
export function FileUploader({
  label,
  accept = "image/*",
  multiple = false,
  maxSizeMB = 10,
  onUpload,
  className,
  hint,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const maxBytes = maxSizeMB * 1024 * 1024;
    const validFiles = Array.from(files).filter((f) => {
      if (f.size > maxBytes) {
        toast.error(`"${f.name}" excede o limite de ${maxSizeMB}MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    setProgress(0);

    const uploaded: UploadedFile[] = [];
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload falhou");
        const data = await res.json();
        uploaded.push({ name: file.name, url: data.url, key: data.key, size: file.size, type: file.type });
      } catch {
        toast.error(`Erro ao enviar "${file.name}". Tente novamente.`);
      }

      setProgress(Math.round(((i + 1) / validFiles.length) * 100));
    }

    setUploadedFiles((prev) => [...prev, ...uploaded]);
    onUpload([...uploadedFiles, ...uploaded]);
    setUploading(false);
    if (uploaded.length > 0) {
      toast.success(`${uploaded.length} arquivo(s) enviado(s) com sucesso.`);
    }
  };

  const removeFile = (key: string) => {
    const updated = uploadedFiles.filter((f) => f.key !== key);
    setUploadedFiles(updated);
    onUpload(updated);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30",
          uploading && "pointer-events-none opacity-60"
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <Loader2 size={28} className="animate-spin text-primary" />
          ) : (
            <Upload size={28} className="text-muted-foreground" />
          )}
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">
            {hint ?? `Arraste ou clique para selecionar${multiple ? " (múltiplos)" : ""}. Máx. ${maxSizeMB}MB.`}
          </p>
        </div>
      </div>

      {uploading && (
        <div className="flex flex-col gap-1">
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-muted-foreground text-right">{progress}%</p>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {uploadedFiles.map((f) => (
            <div key={f.key} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
              <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
              <span className="text-xs text-foreground flex-1 truncate">{f.name}</span>
              <span className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)}KB</span>
              <button onClick={() => removeFile(f.key)} className="text-muted-foreground hover:text-destructive transition-colors">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
