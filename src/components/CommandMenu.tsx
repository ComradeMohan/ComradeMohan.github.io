import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  User,
  Laptop,
  FolderGit,
  FileCheck,
  Mail,
  Sun,
  Moon,
  Github,
  Linkedin,
  Instagram,
  FileDown,
  Sparkles,
  BookOpen
} from "lucide-react";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CommandMenu = ({ open: customOpen, onOpenChange }: CommandMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Support both controlled and uncontrolled states
  const isOpen = customOpen !== undefined ? customOpen : open;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setOpen;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };
    document.addEventListener("keydown", down);
    window.addEventListener("toggle-command-menu", handleToggle);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("toggle-command-menu", handleToggle);
    };
  }, [setIsOpen]);

  const handleNavigation = (hash: string) => {
    setIsOpen(false);
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const handleRoute = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const applyTheme = (t: "dark" | "light" | "midnight" | "violet") => {
    setIsOpen(false);
    localStorage.setItem("theme", t);
    document.documentElement.classList.remove("light", "midnight", "violet");
    if (t !== "dark") {
      document.documentElement.classList.add(t);
    }
    const meta = document.querySelector("meta[name='theme-color']");
    const map = {
      dark: "hsl(289, 65%, 10%)",
      light: "hsl(12, 65%, 88%)",
      midnight: "hsl(205, 90%, 12%)",
      violet: "hsl(286, 80%, 12%)",
    };
    meta?.setAttribute("content", map[t]);
    // Dispatch local storage change event to sync Navbar and theme switchers
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("local-storage"));
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="font-grotesk">
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Navigation Group */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleRoute("/")}>
            <Home className="mr-2 h-4 w-4 text-primary" />
            <span>Go to Homepage</span>
          </CommandItem>
          <CommandItem onSelect={() => handleRoute("/about")}>
            <User className="mr-2 h-4 w-4 text-primary" />
            <span>Go to About Page (Biography)</span>
          </CommandItem>
          <CommandItem onSelect={() => handleRoute("/blog")}>
            <BookOpen className="mr-2 h-4 w-4 text-primary" />
            <span>Go to Blog Articles</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigation("#skills")}>
            <Laptop className="mr-2 h-4 w-4 text-primary" />
            <span>Go to Skills Section</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigation("#projects")}>
            <FolderGit className="mr-2 h-4 w-4 text-primary" />
            <span>Go to Projects Section</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigation("#certifications")}>
            <FileCheck className="mr-2 h-4 w-4 text-primary" />
            <span>Go to Certifications</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigation("#contact")}>
            <Mail className="mr-2 h-4 w-4 text-primary" />
            <span>Go to Contact Form</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Case Studies */}
        <CommandGroup heading="Case Studies">
          <CommandItem onSelect={() => handleRoute("/saveethahub")}>
            <BookOpen className="mr-2 h-4 w-4 text-accent" />
            <span>SaveethaHub Case Study</span>
          </CommandItem>
          <CommandItem onSelect={() => handleRoute("/univault")}>
            <BookOpen className="mr-2 h-4 w-4 text-accent" />
            <span>UniVault Case Study</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Themes Switching */}
        <CommandGroup heading="Theme Customization">
          <CommandItem onSelect={() => applyTheme("dark")}>
            <Moon className="mr-2 h-4 w-4 text-indigo-400" />
            <span>Switch to Dark Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => applyTheme("midnight")}>
            <Sparkles className="mr-2 h-4 w-4 text-sky-400" />
            <span>Switch to Midnight Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => applyTheme("violet")}>
            <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
            <span>Switch to Violet Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => applyTheme("light")}>
            <Sun className="mr-2 h-4 w-4 text-amber-500" />
            <span>Switch to Light Theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* External Actions */}
        <CommandGroup heading="Links & Downloads">
          <CommandItem onSelect={() => window.open("/mohan_resume_.pdf", "_blank")}>
            <FileDown className="mr-2 h-4 w-4 text-emerald-400" />
            <span>Download Resume (PDF)</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open("https://github.com/comrademohan", "_blank")}>
            <Github className="mr-2 h-4 w-4 text-foreground" />
            <span>GitHub Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open("https://www.linkedin.com/in/mmohanreddy", "_blank")}>
            <Linkedin className="mr-2 h-4 w-4 text-sky-500" />
            <span>LinkedIn Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open("https://www.instagram.com/comrade_mohan666/", "_blank")}>
            <Instagram className="mr-2 h-4 w-4 text-pink-500" />
            <span>Instagram Profile</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
