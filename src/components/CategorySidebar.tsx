
import { Button } from "@/components/ui/button";
import { CategoryList } from "@/components/CategoryList";
import { Category } from "@/components/CategoryForm";

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
        <img
          src="/placeholder.svg"
          alt="Café ambiance"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
