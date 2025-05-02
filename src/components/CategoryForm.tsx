
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ImageUploader";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export type Category = {
  id: string;
  name: string;
  color: string;
};

interface CategoryFormProps {
  onAddCategory: (category: Category) => void;
  onClose: () => void;
}

const colors = [
  { name: "Rouge", value: "bg-red-500" },
  { name: "Bleu", value: "bg-blue-500" },
  { name: "Vert", value: "bg-green-500" },
  { name: "Jaune", value: "bg-yellow-500" },
  { name: "Rose", value: "bg-pink-500" },
  { name: "Violet", value: "bg-purple-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Gris", value: "bg-gray-500" },
];

export function CategoryForm({ onAddCategory, onClose }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Veuillez saisir un nom de catégorie");
      return;
    }

    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: name.trim(),
      color: selectedColor,
    };

    onAddCategory(newCategory);
    toast.success(`Catégorie "${name}" ajoutée`);
    
    setName("");
    setSelectedColor(colors[0].value);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ajouter une catégorie</h2>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nom de la catégorie</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la catégorie"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Couleur</label>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <div 
                key={color.value}
                className={`w-full aspect-square rounded-md cursor-pointer ${color.value} ${
                  selectedColor === color.value ? "ring-2 ring-moonlight" : ""
                }`}
                onClick={() => setSelectedColor(color.value)}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full bg-moonlight hover:bg-moonlight-dark">
          <Plus className="mr-1 h-4 w-4" /> Ajouter
        </Button>
      </div>
    </form>
  );
}
