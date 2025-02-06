import { useState } from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  onSelect: (id: string) => void;
}

export function ProductCard({ id, name, price, image, category, onSelect }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(id)}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-300"
          style={{
            transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
          }}
        />
      </div>
      <div className="text-center">
        <h3 className="font-medium text-lg mb-1">{name}</h3>
        <p className="text-moonlight font-bold">{price.toFixed(2)} MAD</p>
      </div>
    </motion.div>
  );
}