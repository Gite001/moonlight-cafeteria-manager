import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryList } from "@/components/CategoryList";
import { ProductCard } from "@/components/ProductCard";
import { Calculator } from "@/components/Calculator";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "Tous les produits", color: "bg-gray-500" },
  { id: "hot-drinks", name: "Boissons chaudes", color: "bg-red-500" },
  { id: "cold-drinks", name: "Boissons froides", color: "bg-blue-500" },
  { id: "desserts", name: "Desserts", color: "bg-pink-500" },
  { id: "snacks", name: "Snacks", color: "bg-yellow-500" },
];

const products = [
  {
    id: "1",
    name: "Café Expresso",
    price: 15,
    image: "/placeholder.svg",
    category: "hot-drinks",
  },
  {
    id: "2",
    name: "Cappuccino",
    price: 20,
    image: "/placeholder.svg",
    category: "hot-drinks",
  },
  {
    id: "3",
    name: "Thé à la menthe",
    price: 12,
    image: "/placeholder.svg",
    category: "hot-drinks",
  },
  {
    id: "4",
    name: "Jus d'orange",
    price: 18,
    image: "/placeholder.svg",
    category: "cold-drinks",
  },
  {
    id: "5",
    name: "Smoothie fruits",
    price: 25,
    image: "/placeholder.svg",
    category: "cold-drinks",
  },
  {
    id: "6",
    name: "Gâteau chocolat",
    price: 30,
    image: "/placeholder.svg",
    category: "desserts",
  },
  {
    id: "7",
    name: "Croissant",
    price: 8,
    image: "/placeholder.svg",
    category: "snacks",
  },
  {
    id: "8",
    name: "Sandwich",
    price: 35,
    image: "/placeholder.svg",
    category: "snacks",
  },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [orderItems, setOrderItems] = useState<Array<{ id: string; quantity: number }>>([]);

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

  const total = orderItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-moonlight/10">
      <div className="parallax-bg" />
      <Header />
      
      <main className="container mx-auto pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - Categories */}
          <div className="md:col-span-3 space-y-6">
            <div className="glass-panel rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4">Catégories</h2>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order & Calculator */}
          <div className="md:col-span-3 space-y-6">
            <div className="glass-panel rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4">Commande</h2>
              <div className="space-y-4">
                {orderItems.map((item) => {
                  const product = products.find((p) => p.id === item.id);
                  return product ? (
                    <div key={item.id} className="flex justify-between items-center">
                      <span>
                        {product.name} x{item.quantity}
                      </span>
                      <span>{(product.price * item.quantity).toFixed(2)} MAD</span>
                    </div>
                  ) : null;
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} MAD</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-moonlight hover:bg-moonlight-dark">
                    Valider
                  </Button>
                  <Button variant="outline" className="w-full">
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
            <Calculator />
          </div>
        </div>
      </main>
    </div>
  );
}