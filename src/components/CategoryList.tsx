import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryList({ categories, selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "ghost"}
          className={`category-button w-full justify-start ${
            selectedCategory === category.id ? "bg-moonlight text-white" : ""
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}