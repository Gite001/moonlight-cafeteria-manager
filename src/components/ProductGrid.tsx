
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/components/ProductForm";

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onProductSelect: (productId: string) => void;
}

export function ProductGrid({ products, selectedCategory, onProductSelect }: ProductGridProps) {
  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory
  );

  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Produits</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onSelect={() => onProductSelect(product.id)}
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
  );
}
