
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Clock, Calendar, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ImageUploader } from "./ImageUploader";
import { toast } from "sonner";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cafeName, setCafeName] = useState("CAFE MOONLIGHT");
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  // Load saved data on component mount
  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('cafeMoonlightTheme');
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
    
    // Load cafe name
    const savedCafeName = localStorage.getItem('cafeMoonlightName');
    if (savedCafeName) {
      setCafeName(savedCafeName);
    }
    
    // Load background image
    const savedBackground = localStorage.getItem('cafeMoonlightBackground');
    if (savedBackground) {
      setBackgroundImage(savedBackground);
      document.documentElement.style.setProperty('--bg-image', `url(${savedBackground})`);
    }
    
    // Update clock
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Save theme when it changes
  useEffect(() => {
    localStorage.setItem('cafeMoonlightTheme', theme);
  }, [theme]);
  
  // Save cafe name when it changes
  useEffect(() => {
    localStorage.setItem('cafeMoonlightName', cafeName);
  }, [cafeName]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };
  
  const handleSaveName = () => {
    setIsEditingName(false);
    toast.success("Nom de la cafétéria mis à jour");
  };
  
  const handleBackgroundImageUploaded = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    document.documentElement.style.setProperty('--bg-image', `url(${imageUrl})`);
    localStorage.setItem('cafeMoonlightBackground', imageUrl);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Clock className="h-5 w-5 text-moonlight" />
            <span className="text-sm font-medium">
              {format(currentDate, "HH:mm:ss")}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Calendar className="h-5 w-5 text-moonlight" />
            <span className="text-sm font-medium">
              {format(currentDate, "dd/MM/yyyy")}
            </span>
          </div>
        </div>
        
        <div className="flex-1 text-center">
          {isEditingName ? (
            <div className="inline-flex items-center">
              <Input
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                className="max-w-xs bg-transparent text-center border-moonlight focus:border-moonlight text-xl md:text-3xl font-bold"
                autoFocus
                onBlur={handleSaveName}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
              />
              <Button variant="ghost" size="sm" onClick={handleSaveName}>
                Enregistrer
              </Button>
            </div>
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-moonlight-dark via-moonlight to-moonlight-light bg-clip-text text-transparent animate-float flex items-center justify-center gap-2">
              {cafeName}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditingName(true)}
                className="rounded-full p-1"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ImageUploader 
              onImageUploaded={handleBackgroundImageUploaded}
              buttonText="Image de fond"
            />
          </div>
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
