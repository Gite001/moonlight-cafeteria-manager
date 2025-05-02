
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ImageUploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Category } from "./CategoryForm";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

interface ProductFormProps {
  categories: Category[];
  onAddProduct: (product: Product) => void;
  onClose: () => void;
}

export function ProductForm({ categories, onAddProduct, onClose }: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("/placeholder.svg");
  const [categoryId, setCategoryId] = useState(categories.length > 0 ? categories[0].id : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Veuillez saisir un nom de produit");
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      toast.error("Veuillez saisir un prix valide");
      return;
    }

    if (!categoryId) {
      toast.error("Veuillez sélectionner une catégorie");
      return;
    }

    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: name.trim(),
      price: priceNumber,
      image,
      category: categoryId,
    };

    onAddProduct(newProduct);
    toast.success(`Produit "${name}" ajouté`);
    
    setName("");
    setPrice("");
    setImage("/placeholder.svg");
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
    onClose();
  };

  const handleImageUploaded = (imageUrl: string) => {
    setImage(imageUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ajouter un produit</h2>
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
          <label className="block text-sm mb-1">Nom du produit</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du produit"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-1">Prix (MAD)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-1">Catégorie</label>
          {categories.length > 0 ? (
            <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="text-sm text-red-500">
              Veuillez d'abord créer une catégorie
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Image</label>
          <div className="space-y-2">
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border">
              <img 
                src={image} 
                alt="Aperçu du produit" 
                className="w-full h-full object-cover"
              />
            </div>
            <ImageUploader 
              onImageUploaded={handleImageUploaded} 
              buttonText="Télécharger une image"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-moonlight hover:bg-moonlight-dark"
          disabled={categories.length === 0}
        >
          <Plus className="mr-1 h-4 w-4" /> Ajouter
        </Button>
      </div>
    </form>
  );
}
