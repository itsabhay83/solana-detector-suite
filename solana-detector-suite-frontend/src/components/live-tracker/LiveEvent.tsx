
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type LiveEventProps = {
  title: string;
  timestamp: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  isNew?: boolean;
};

export default function LiveEvent({
  title,
  timestamp,
  description,
  severity,
  isNew = false
}: LiveEventProps) {
  const [highlight, setHighlight] = useState(isNew);
  
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isNew]);
  
  const severityColors = {
    critical: "bg-severity-critical text-white",
    high: "bg-severity-high text-white",
    medium: "bg-severity-medium text-navy",
    low: "bg-severity-low text-navy",
  };
  
  return (
    <Card className={cn(
      "border border-border p-4 transition-all duration-500",
      highlight ? "bg-navy-light/80 border-purple" : "card-gradient"
    )}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge className={cn("font-medium", severityColors[severity])}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </Badge>
          
          {isNew && (
            <Badge className="bg-purple text-white">New</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>{timestamp}</span>
        </div>
      </div>
      
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
      
      <div className="flex items-center gap-2 mt-3">
        <Info size={14} className="text-purple" />
        <span className="text-xs text-muted-foreground">Tracking event updates</span>
      </div>
    </Card>
  );
}
