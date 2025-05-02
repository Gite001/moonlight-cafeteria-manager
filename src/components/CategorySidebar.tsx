
import { Button } from "@/components/ui/button";
import { CategoryList } from "@/components/CategoryList";
import { Category } from "@/components/CategoryForm";
import { ImageUploader } from "@/components/ImageUploader";
import { useState, useEffect } from "react";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  onOpenAdminPanel: () => void;
}

export function CategorySidebar({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  onOpenAdminPanel 
}: CategorySidebarProps) {
  const [sidebarImage, setSidebarImage] = useState<string>("/placeholder.svg");

  // Load saved sidebar image on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('cafeMoonlightSidebarImage');
    if (savedImage) {
      setSidebarImage(savedImage);
    }
  }, []);

  const handleImageUploaded = (imageUrl: string) => {
    setSidebarImage(imageUrl);
    localStorage.setItem('cafeMoonlightSidebarImage', imageUrl);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Catégories</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onOpenAdminPanel}
          >
            Admin
          </Button>
        </div>
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </div>
      <div className="glass-panel rounded-xl p-4">
        <div className="space-y-3">
          <div className="relative">
            <img
              src={sidebarImage}
              alt="Café ambiance"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="w-full">
            <ImageUploader
              onImageUploaded={handleImageUploaded}
              buttonText="Changer l'image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
