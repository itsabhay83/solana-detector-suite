
import { Home, Search, PieChart, Bell, BookOpen, Github } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavItemProps = {
  icon: React.ElementType;
  text: string;
  to: string;
};

const NavItem = ({ icon: Icon, text, to }: NavItemProps) => {
  let isActive = false;
  
  try {
    const location = useLocation();
    isActive = location.pathname === to;
  } catch (error) {
    console.error("NavItem component used outside of a Router context");
  }
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
        isActive 
          ? "bg-purple text-white" 
          : "text-gray-300 hover:bg-purple-light/10 hover:text-white"
      )}
    >
      <Icon size={20} />
      <span>{text}</span>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full min-w-64 bg-navy border-r border-border">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md purple-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">ST</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple to-white bg-clip-text text-transparent">
            Superteam Security
          </h1>
        </div>
      </div>
      
      <div className="mt-6 px-2 flex-1">
        <nav className="space-y-1">
          <NavItem 
            icon={Home} 
            text="Dashboard" 
            to="/"
          />
          <NavItem 
            icon={Search} 
            text="Exploits Explorer" 
            to="/exploits"
          />
          <NavItem 
            icon={PieChart} 
            text="Analytics" 
            to="/analytics"
          />
          <NavItem 
            icon={Bell} 
            text="Live Hack Tracker" 
            to="/tracker"
          />
          <NavItem 
            icon={BookOpen} 
            text="Resources" 
            to="/resources"
          />
        </nav>
      </div>
      
      <div className="p-4 border-t border-border mt-auto">
        <a 
          href="https://github.com/itsabhay83/solana-detector-suite"
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <Github size={16} />
          <span>Contribute on GitHub</span>
        </a>
      </div>
    </div>
  );
}
