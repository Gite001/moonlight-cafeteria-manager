import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-1" />
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-moonlight-dark via-moonlight to-moonlight-light bg-clip-text text-transparent animate-float">
          CAFE MOONLIGHT
        </h1>
        <div className="flex-1 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}