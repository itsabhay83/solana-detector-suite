
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Mock data for live incidents
const initialIncidents = [
  {
    id: "incident1",
    name: "AstroDEX Unusual Activity",
    status: "Investigating",
    fundsAtRisk: "$2.3M",
    lastUpdated: new Date(Date.now() - 3 * 60000).toISOString(), // 3 minutes ago
    severity: "medium" as const,
  },
  {
    id: "incident2",
    name: "SolMoon Protocol Suspicious Transactions",
    status: "High Alert",
    fundsAtRisk: "$5.8M",
    lastUpdated: new Date(Date.now() - 12 * 60000).toISOString(), // 12 minutes ago
    severity: "high" as const,
  },
  {
    id: "incident3",
    name: "Luna Staking Protocol Under Analysis",
    status: "Monitoring",
    fundsAtRisk: "$850K",
    lastUpdated: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
    severity: "low" as const,
  },
  {
    id: "incident4",
    name: "SolanaPrime Bridge Activity Alert",
    status: "Critical",
    fundsAtRisk: "$11.2M",
    lastUpdated: new Date(Date.now() - 8 * 60000).toISOString(), // 8 minutes ago
    severity: "critical" as const,
  },
];

// Additional incidents that will randomly appear during refreshes
const potentialNewIncidents = [
  {
    id: "new1",
    name: "MoonDAO Governance Proposal Analysis",
    status: "Under Review",
    fundsAtRisk: "$3.7M",
    severity: "medium" as const,
  },
  {
    id: "new2",
    name: "SolMint NFT Platform Vulnerability",
    status: "Critical",
    fundsAtRisk: "$1.5M",
    severity: "critical" as const,
  },
  {
    id: "new3",
    name: "StableSol Algorithmic Stablecoin Fluctuation",
    status: "Investigating",
    fundsAtRisk: "$4.2M",
    severity: "high" as const,
  }
];

// Function to format relative time
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

// Function to get color based on severity
const getSeverityColor = (severity: "critical" | "high" | "medium" | "low") => {
  switch (severity) {
    case "critical": return "text-red-500";
    case "high": return "text-orange-500";
    case "medium": return "text-yellow-500";
    case "low": return "text-green-500";
    default: return "";
  }
};

export default function LiveHackTracker() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Function to refresh data
  const refreshData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update timestamps
      const updatedIncidents = incidents.map(incident => ({
        ...incident,
        lastUpdated: new Date().toISOString()
      }));
      
      // Randomly add a new incident (20% chance)
      if (Math.random() < 0.2 && potentialNewIncidents.length > 0) {
        const randomIndex = Math.floor(Math.random() * potentialNewIncidents.length);
        const newIncident = {
          ...potentialNewIncidents[randomIndex],
          lastUpdated: new Date().toISOString()
        };
        
        // Don't add if an incident with the same ID already exists
        if (!updatedIncidents.some(inc => inc.id === newIncident.id)) {
          updatedIncidents.unshift(newIncident);
          toast.success(`New incident detected: ${newIncident.name}`);
        }
      }
      
      setIncidents(updatedIncidents);
      setLastRefreshed(new Date());
      setIsLoading(false);
    }, 1000);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [incidents]);

  return (
    <PageLayout title="Live Hack Tracker">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Live Hack Tracker</h1>
            <p className="text-sm text-muted-foreground">
              Last refreshed: {lastRefreshed.toLocaleTimeString()}
            </p>
          </div>
          
          <Button 
            onClick={refreshData} 
            disabled={isLoading} 
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle size={18} className="text-red-500" />
              Active Security Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Funds at Risk</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.name}</TableCell>
                    <TableCell className={getSeverityColor(incident.severity)}>
                      {incident.status}
                    </TableCell>
                    <TableCell>{incident.fundsAtRisk}</TableCell>
                    <TableCell>{formatRelativeTime(incident.lastUpdated)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
