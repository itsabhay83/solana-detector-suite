
import { useState } from "react";
import { Search, Bell, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { WalletConnectors } from "../wallet/WalletConnectors";

// Mock authentication state - in a real app, you would use a proper auth provider
const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (email: string) => {
    setUser({ email });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, user, login, logout };
};

export default function Header({ title = "Dashboard" }: { title?: string }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { isLoggedIn, user, logout } = useAuthState();

  // For demo purposes - in a real app this would be connected to your authentication system
  const handleLogin = () => {
    // Simulating login for demo
    const mockUser = { email: "user@example.com" };
    localStorage.setItem("user", JSON.stringify(mockUser));
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // In a real app, you would implement actual theme switching here
    toast.success(`Switched to ${newTheme} theme`);
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-navy/50 backdrop-blur-sm sticky top-0 z-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search exploits..." 
            className="pl-10 bg-card border-border focus-visible:ring-purple" 
          />
        </div>
        
        {/* Wallet Connectors */}
        <div className="hidden lg:flex">
          <WalletConnectors />
        </div>
        
        <Button variant="outline" size="icon" className="relative" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full"></span>
        </Button>
        
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
