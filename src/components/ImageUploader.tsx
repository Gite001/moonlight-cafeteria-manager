
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  buttonText: string;
}

export function ImageUploader({ onImageUploaded, buttonText }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      setIsUploading(false);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image est trop volumineuse (max 5MB)");
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        setPreviewUrl(imageUrl);
        onImageUploaded(imageUrl);
        toast.success("Image téléchargée avec succès");
      }
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      toast.error("Erreur lors du téléchargement de l'image");
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        id="image-upload" 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label htmlFor="image-upload" className="w-full">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          disabled={isUploading}
          type="button"
        >
          {isUploading ? (
            <span className="animate-pulse">Téléchargement...</span>
          ) : (
            <>
              {previewUrl ? <Image className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
              {buttonText}
            </>
          )}
        </Button>
      </label>
    </div>
  );
}
