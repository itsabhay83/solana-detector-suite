
import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import ExploitTimeline from "@/components/dashboard/ExploitTimeline";
import ExploitTypeChart from "@/components/dashboard/ExploitTypeChart";
import ExploitsOverTime from "@/components/dashboard/ExploitsOverTime";
import ExploitCard from "@/components/exploits/ExploitCard";
import LiveEvent from "@/components/live-tracker/LiveEvent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  BarChart3, 
  DollarSign,
  ShieldAlert
} from "lucide-react";

// Mock data for the dashboard
const exploitTypes = [
  { name: "Reentrancy", value: 28, color: "#9b87f5" },
  { name: "Oracle Manipulation", value: 22, color: "#7E69AB" },
  { name: "Flash Loan Attack", value: 17, color: "#6E59A5" },
  { name: "Access Control", value: 15, color: "#D6BCFA" },
  { name: "Other", value: 18, color: "#E5DEFF" },
];

const exploitsOverTime = [
  { date: "Jan", count: 7 },
  { date: "Feb", count: 9 },
  { date: "Mar", count: 5 },
  { date: "Apr", count: 12 },
  { date: "May", count: 8 },
  { date: "Jun", count: 14 },
  { date: "Jul", count: 11 },
  { date: "Aug", count: 16 },
  { date: "Sep", count: 19 },
  { date: "Oct", count: 13 },
  { date: "Nov", count: 10 },
  { date: "Dec", count: 7 },
];

const timelineEvents = [
  {
    id: "1",
    title: "Critical Vulnerability in SolProtocol",
    date: "May 7, 2025",
    time: "10:32 AM",
    status: "discovered" as const,
    description: "Security researchers identified a critical vulnerability in SolProtocol smart contracts.",
  },
  {
    id: "2",
    title: "MoonFinance Exploit Confirmed",
    date: "May 6, 2025",
    time: "03:15 PM",
    status: "confirmed" as const,
    description: "Exploit targeting MoonFinance lending protocol confirmed. Approximately $3.4M drained.",
  },
  {
    id: "3",
    title: "SolaSwap Reentrancy Exploit",
    date: "May 4, 2025",
    time: "11:48 AM",
    status: "ongoing" as const,
    description: "Investigating active reentrancy exploit targeting SolaSwap pools. Estimated $5.2M at risk.",
  },
  {
    id: "4",
    title: "SolFarm Oracle Manipulation Resolved",
    date: "May 2, 2025",
    time: "09:20 AM",
    status: "resolved" as const,
    description: "SolFarm oracle manipulation exploit has been patched. 70% of funds recovered.",
  },
];

const recentExploits = [
  {
    id: "ex1",
    title: "Mangolana DEX Exploit",
    date: "May 5, 2025",
    protocol: "Mangolana",
    amount: "$2.8M",
    description: "Precision error in AMM calculations allowed attackers to execute a flash loan attack.",
    category: "Flash loan",
    severity: "high" as const,
  },
  {
    id: "ex2",
    title: "SolStake Bridge Hack",
    date: "May 3, 2025",
    protocol: "SolStake",
    amount: "$12.4M",
    description: "Cross-chain bridge vulnerability exploited, allowing attackers to forge withdrawal proofs.",
    category: "Bridge security",
    severity: "critical" as const,
  },
  {
    id: "ex3",
    title: "LunaSol Lending Protocol",
    date: "Apr 29, 2025",
    protocol: "LunaSol",
    amount: "$850K",
    description: "Price oracle manipulation led to undercollateralized loans being issued.",
    category: "Oracle manipulation",
    severity: "medium" as const,
  },
];

const liveEvents = [
  {
    title: "AstroDEX Unusual Activity",
    timestamp: "Just now",
    description: "Unusual token price movements detected on AstroDEX. Investigating potential oracle manipulation.",
    severity: "medium" as const,
    isNew: true,
  },
  {
    title: "SolMoon Protocol Suspicious Transactions",
    timestamp: "5 min ago",
    description: "Large volume of suspicious transactions detected on SolMoon Protocol. Monitoring for potential exploit.",
    severity: "high" as const,
    isNew: false,
  },
  {
    title: "Luna Staking Protocol Under Analysis",
    timestamp: "28 min ago",
    description: "Security team analyzing unusual withdrawal patterns from Luna staking contract.",
    severity: "low" as const,
    isNew: false,
  },
];

export default function Index() {
  const [randomEvent, setRandomEvent] = useState<{
    title: string;
    timestamp: string;
    description: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
  } | null>(null);

  // Simulate new events coming in occasionally
  useEffect(() => {
    const events = [
      {
        title: "SolanaPrime Bridge Activity Alert",
        timestamp: "Just now",
        description: "Unusual transaction volume detected on SolanaPrime bridge. Security teams notified.",
        severity: "high" as const,
      },
      {
        title: "MoonDAO Governance Proposal Analysis",
        timestamp: "Just now",
        description: "Potentially malicious governance proposal submitted to MoonDAO. Reviewing for security implications.",
        severity: "medium" as const,
      },
      {
        title: "Critical Vulnerability Found in SolMint",
        timestamp: "Just now",
        description: "Zero-day vulnerability discovered in SolMint NFT platform. Developers working on emergency patch.",
        severity: "critical" as const,
      }
    ];

    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * events.length);
      setRandomEvent(events[randomIndex]);

      // Clear the event after 30 seconds
      setTimeout(() => {
        setRandomEvent(null);
      }, 30000);
    }, 30000);

    return () => clearTimeout(timer);
  }, [randomEvent]);

  return (
    <PageLayout title="Security Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Exploits" 
          value="132" 
          change="12%" 
          isPositive={false} 
          icon={<ShieldAlert size={20} className="text-purple" />}
        />
        <StatsCard 
          title="Funds Lost (Total)" 
          value="$418.7M" 
          change="8%" 
          isPositive={false}
          icon={<DollarSign size={20} className="text-purple" />}
        />
        <StatsCard 
          title="Active Incidents" 
          value="4" 
          change="1" 
          isPositive={false}
          icon={<AlertCircle size={20} className="text-purple" />}
        />
        <StatsCard 
          title="Avg Response Time" 
          value="4.2 hrs" 
          change="18%" 
          isPositive={true}
          icon={<BarChart3 size={20} className="text-purple" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ExploitsOverTime data={exploitsOverTime} />
        </div>
        <div>
          <ExploitTypeChart data={exploitTypes} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="recent">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">Recent Exploits</TabsTrigger>
              <TabsTrigger value="severe">Most Severe</TabsTrigger>
              <TabsTrigger value="recovered">Funds Recovered</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentExploits.map((exploit) => (
                <ExploitCard key={exploit.id} {...exploit} />
              ))}
            </TabsContent>
            <TabsContent value="severe">
              <p className="text-muted-foreground">Loading severe exploits...</p>
            </TabsContent>
            <TabsContent value="recovered">
              <p className="text-muted-foreground">Loading recovered funds data...</p>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Live Hacking Alerts</h3>
            <div className="space-y-4">
              {randomEvent && (
                <LiveEvent
                  title={randomEvent.title}
                  timestamp={randomEvent.timestamp}
                  description={randomEvent.description}
                  severity={randomEvent.severity}
                  isNew={true}
                />
              )}
              {liveEvents.map((event, idx) => (
                <LiveEvent
                  key={idx}
                  title={event.title}
                  timestamp={event.timestamp}
                  description={event.description}
                  severity={event.severity}
                  isNew={event.isNew}
                />
              ))}
            </div>
          </div>
          <ExploitTimeline events={timelineEvents} />
        </div>
      </div>
    </PageLayout>
  );
}
