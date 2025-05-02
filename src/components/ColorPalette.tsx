
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette } from "lucide-react";
import { toast } from "sonner";

// Définition des palettes de couleurs
const palettes = {
  primary: [
    { name: "Moonlight", value: "#C4B08A", dark: "#A69472", light: "#E2D1A9" },
    { name: "Rouge Café", value: "#A63A3A", dark: "#7A2C2C", light: "#D25050" },
    { name: "Bleu Nuit", value: "#3A5A7A", dark: "#2C4559", light: "#4E7BA6" },
    { name: "Vert Olive", value: "#7A8A3A", dark: "#5C672C", light: "#A6BA50" },
    { name: "Orange Chaleur", value: "#D97C2B", dark: "#A65F21", light: "#F0994D" },
    { name: "Violet Rêve", value: "#8A3A9D", dark: "#672C75", light: "#BA50D2" },
    { name: "Turquoise", value: "#2BA6A6", dark: "#217D7D", light: "#3DD4D4" },
    { name: "Rose Doux", value: "#D93A7D", dark: "#A62C5F", light: "#F050A6" }
  ],
  background: [
    { name: "Crème", value: "#F5F3EF", dark: "#1A1814", light: "#F5F3EF" },
    { name: "Gris Perle", value: "#E5E5E5", dark: "#1A1A1A", light: "#E5E5E5" },
    { name: "Beige", value: "#F0E6D8", dark: "#1F1C17", light: "#F0E6D8" },
    { name: "Bleu Ciel", value: "#E1F0F5", dark: "#141B1F", light: "#E1F0F5" },
    { name: "Vert Menthe", value: "#E2F0E6", dark: "#141F17", light: "#E2F0E6" },
    { name: "Lavande", value: "#E9E1F0", dark: "#17141B", light: "#E9E1F0" },
    { name: "Pêche", value: "#F5E6E1", dark: "#1F1714", light: "#F5E6E1" },
    { name: "Vanille", value: "#F5F0E1", dark: "#1F1C14", light: "#F5F0E1" }
  ]
};

interface ColorPaletteProps {
  onColorSelected: (type: string, color: { value: string; dark: string; light: string }) => void;
}

export function ColorPalette({ onColorSelected }: ColorPaletteProps) {
  const [open, setOpen] = useState(false);

  const handleColorSelect = (type: string, color: { name: string; value: string; dark: string; light: string }) => {
    onColorSelected(type, color);
    toast.success(`Couleur ${color.name} appliquée`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          Palette de couleurs
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs defaultValue="primary">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="primary">Couleur principale</TabsTrigger>
            <TabsTrigger value="background">Arrière-plan</TabsTrigger>
          </TabsList>
          <TabsContent value="primary" className="space-y-4">
            <h3 className="font-medium text-sm">Sélectionnez une couleur principale</h3>
            <div className="grid grid-cols-4 gap-2">
              {palettes.primary.map((color) => (
                <div
                  key={color.value}
                  className="aspect-square rounded-md cursor-pointer hover:scale-105 transition-all"
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelect("primary", color)}
                  title={color.name}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="background" className="space-y-4">
            <h3 className="font-medium text-sm">Sélectionnez une couleur d'arrière-plan</h3>
            <div className="grid grid-cols-4 gap-2">
              {palettes.background.map((color) => (
                <div
                  key={color.value}
                  className="aspect-square rounded-md cursor-pointer hover:scale-105 transition-all border"
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelect("background", color)}
                  title={color.name}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
