
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CategoryList } from "@/components/CategoryList";
import { ProductCard } from "@/components/ProductCard";
import { Calculator } from "@/components/Calculator";
import { Button } from "@/components/ui/button";
import { AdminPanel } from "@/components/AdminPanel";
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

  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory
  );

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

  const total = orderItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);
  
  const clearOrder = () => {
    setOrderItems([]);
    toast.info("Commande annulée");
  };
  
  const validateOrder = () => {
    // For now, just show a success message
    if (orderItems.length === 0) {
      toast.error("La commande est vide");
      return;
    }
    
    toast.success("Commande validée avec succès");
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-moonlight/10">
      <div className="parallax-bg" />
      <Header />
      
      <main className="container mx-auto pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - Categories */}
          <div className="md:col-span-3 space-y-6">
            <div className="glass-panel rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Catégories</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAdminPanelOpen(true)}
                >
                  Admin
                </Button>
              </div>
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
            <div className="glass-panel rounded-xl p-4">
              <img
                src="/placeholder.svg"
                alt="Café ambiance"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Middle Column - Products */}
          <div className="md:col-span-6">
            <div className="glass-panel rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4">Produits</h2>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onSelect={() => handleProductSelect(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {products.length === 0 ? (
                    <p>Aucun produit disponible. Veuillez ajouter des produits depuis le panneau Admin.</p>
                  ) : (
                    <p>Aucun produit dans cette catégorie.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order & Calculator */}
          <div className="md:col-span-3 space-y-6">
            <div className="glass-panel rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4">Commande</h2>
              <div className="space-y-4">
                {orderItems.length > 0 ? (
                  orderItems.map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    return product ? (
                      <div key={item.id} className="flex justify-between items-center">
                        <span>
                          {product.name} x{item.quantity}
                        </span>
                        <span>{(product.price * item.quantity).toFixed(2)} MAD</span>
                      </div>
                    ) : null;
                  })
                ) : (
                  <p className="text-center text-muted-foreground py-4">Aucun article dans la commande</p>
                )}
                
                {orderItems.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} MAD</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-moonlight hover:bg-moonlight-dark"
                    onClick={validateOrder}
                    disabled={orderItems.length === 0}
                  >
                    Valider
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearOrder}
                    disabled={orderItems.length === 0}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
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
