
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryForm, Category } from "./CategoryForm";
import { ProductForm, Product } from "./ProductForm";
import { Plus, Folder, Image as ImageIcon } from "lucide-react";

interface AdminPanelProps {
  categories: Category[];
  products: Product[];
  onAddCategory: (category: Category) => void;
  onAddProduct: (product: Product) => void;
  onDeleteCategory: (categoryId: string) => void;
  onDeleteProduct: (productId: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminPanel({
  categories,
  products,
  onAddCategory,
  onAddProduct,
  onDeleteCategory,
  onDeleteProduct,
  open,
  onOpenChange
}: AdminPanelProps) {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleDeleteCategory = (categoryId: string) => {
    // Check if category has products
    const hasProducts = products.some(product => product.category === categoryId);
    if (hasProducts) {
      alert("Cette catégorie contient des produits. Veuillez supprimer tous les produits de cette catégorie d'abord.");
      return;
    }
    
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      onDeleteCategory(categoryId);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      onDeleteProduct(productId);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Configuration Admin
          </SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="categories" className="mt-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="mt-4 space-y-4">
            {!showCategoryForm && (
              <Button 
                onClick={() => setShowCategoryForm(true)} 
                className="w-full bg-moonlight hover:bg-moonlight-dark mb-4"
              >
                <Plus className="mr-1 h-4 w-4" /> Ajouter une catégorie
              </Button>
            )}
            
            {showCategoryForm && (
              <CategoryForm 
                onAddCategory={onAddCategory} 
                onClose={() => setShowCategoryForm(false)} 
              />
            )}
            
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Catégories existantes:</h3>
              {categories.length > 0 ? (
                <div className="space-y-2">
                  {categories.map(category => (
                    <div 
                      key={category.id} 
                      className="flex items-center justify-between glass-panel p-2 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        <span>{category.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Folder className="mx-auto h-10 w-10 opacity-50" />
                  <p>Aucune catégorie disponible</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="mt-4 space-y-4">
            {!showProductForm && (
              <Button 
                onClick={() => setShowProductForm(true)} 
                className="w-full bg-moonlight hover:bg-moonlight-dark mb-4"
                disabled={categories.length === 0}
              >
                <Plus className="mr-1 h-4 w-4" /> Ajouter un produit
              </Button>
            )}
            
            {showProductForm && (
              <ProductForm 
                categories={categories} 
                onAddProduct={onAddProduct} 
                onClose={() => setShowProductForm(false)} 
              />
            )}
            
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Produits existants:</h3>
              {products.length > 0 ? (
                <div className="space-y-2">
                  {products.map(product => {
                    const category = categories.find(c => c.id === product.category);
                    return (
                      <div 
                        key={product.id} 
                        className="flex items-center justify-between glass-panel p-2 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <span className="block">{product.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {category?.name} - {product.price.toFixed(2)} MAD
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Supprimer
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <ImageIcon className="mx-auto h-10 w-10 opacity-50" />
                  <p>Aucun produit disponible</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
