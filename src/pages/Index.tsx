
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Calculator } from "@/components/Calculator";
import { AdminPanel } from "@/components/AdminPanel";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ProductGrid } from "@/components/ProductGrid";
import { OrderPanel } from "@/components/OrderPanel";
import { Category } from "@/components/CategoryForm";
import { Product } from "@/components/ProductForm";
import { toast } from "sonner";

export default function Index() {
  // State for categories and products
  const [categories, setCategories] = useState<Category[]>([
    { id: "all", name: "Tous les produits", color: "bg-gray-500" }
  ]);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [orderItems, setOrderItems] = useState<Array<{ id: string; quantity: number }>>([]);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  
  // Load saved data on component mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('cafeMoonlightCategories');
    const savedProducts = localStorage.getItem('cafeMoonlightProducts');
    
    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        // Always ensure "all" category exists
        if (!parsedCategories.some((cat: Category) => cat.id === "all")) {
          parsedCategories.unshift({ id: "all", name: "Tous les produits", color: "bg-gray-500" });
        }
        setCategories(parsedCategories);
      } catch (e) {
        console.error("Error parsing saved categories:", e);
      }
    }
    
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Error parsing saved products:", e);
      }
    }
  }, []);
  
  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('cafeMoonlightCategories', JSON.stringify(categories));
  }, [categories]);
  
  useEffect(() => {
    localStorage.setItem('cafeMoonlightProducts', JSON.stringify(products));
  }, [products]);

  const handleProductSelect = (productId: string) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };
  
  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    toast.success(`Catégorie ${newCategory.name} ajoutée`);
  };
  
  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId === "all") {
      toast.error("Impossible de supprimer la catégorie par défaut");
      return;
    }
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    toast.success("Catégorie supprimée");
  };
  
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    toast.success(`Produit ${newProduct.name} ajouté`);
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== productId));
    // Also remove from order if present
    setOrderItems((prev) => prev.filter((item) => item.id !== productId));
    toast.success("Produit supprimé");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-moonlight/10">
      <div className="parallax-bg" />
      <Header />
      
      <main className="container mx-auto pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - Categories */}
          <div className="md:col-span-3 space-y-6">
            <CategorySidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
            />
          </div>

          {/* Middle Column - Products */}
          <div className="md:col-span-6">
            <ProductGrid 
              products={products}
              selectedCategory={selectedCategory}
              onProductSelect={handleProductSelect}
            />
          </div>

          {/* Right Column - Order & Calculator */}
          <div className="md:col-span-3 space-y-6">
            <OrderPanel 
              products={products}
              orderItems={orderItems}
              setOrderItems={setOrderItems}
            />
            <Calculator />
          </div>
        </div>
      </main>
      
      <AdminPanel
        categories={categories}
        products={products}
        onAddCategory={handleAddCategory}
        onAddProduct={handleAddProduct}
        onDeleteCategory={handleDeleteCategory}
        onDeleteProduct={handleDeleteProduct}
        open={isAdminPanelOpen}
        onOpenChange={setIsAdminPanelOpen}
      />
    </div>
  );
}
