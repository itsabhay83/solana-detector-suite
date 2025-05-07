
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

export default function StatsCard({ 
  title, 
  value, 
  change, 
  isPositive = false,
  icon,
  className
}: StatsCardProps) {
  return (
    <Card className={cn("p-6 card-gradient", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change && (
            <p className={cn(
              "text-xs mt-1.5 flex items-center",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              {isPositive ? "+" : "-"}{change}
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </p>
          )}
        </div>
        
        {icon && (
          <div className="h-10 w-10 rounded-md bg-purple bg-opacity-20 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
