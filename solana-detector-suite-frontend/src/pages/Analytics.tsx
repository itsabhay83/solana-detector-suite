
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Loader } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the charts - in a real app this would come from an API
const fetchExploitData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    exploitTrends: [
      { month: 'Jan', count: 2 },
      { month: 'Feb', count: 4 },
      { month: 'Mar', count: 3 },
      { month: 'Apr', count: 7 },
      { month: 'May', count: 2 },
      { month: 'Jun', count: 5 },
      { month: 'Jul', count: 8 },
      { month: 'Aug', count: 12 },
      { month: 'Sep', count: 6 },
      { month: 'Oct', count: 14 },
      { month: 'Nov', count: 8 },
      { month: 'Dec', count: 11 },
    ],
    exploitTypes: [
      { type: 'Reentrancy', count: 24 },
      { type: 'Oracle Manipulation', count: 18 },
      { type: 'Flash Loan', count: 15 },
      { type: 'Access Control', count: 12 },
      { type: 'Logic Error', count: 22 },
      { type: 'Arithmetic', count: 8 },
      { type: 'Front-running', count: 5 },
    ],
    fundLoss: [
      { month: 'Jan', amount: 1.2 },
      { month: 'Feb', amount: 3.4 },
      { month: 'Mar', amount: 2.1 },
      { month: 'Apr', amount: 5.6 },
      { month: 'May', amount: 1.8 },
      { month: 'Jun', amount: 4.2 },
      { month: 'Jul', amount: 7.8 },
      { month: 'Aug', amount: 11.5 },
      { month: 'Sep', amount: 5.3 },
      { month: 'Oct', amount: 13.7 },
      { month: 'Nov', amount: 7.9 },
      { month: 'Dec', amount: 9.8 },
    ]
  };
};

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("trends");
  
  const { data, isLoading } = useQuery({
    queryKey: ['exploitData'],
    queryFn: fetchExploitData
  });

  return (
    <PageLayout title="Analytics">
      <div className="container mx-auto p-4 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Exploit Analytics</h1>
          <p className="text-muted-foreground">
            Visualizing exploit trends and statistics in the Solana ecosystem
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="flex flex-col items-center gap-2">
              <Loader className="h-8 w-8 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading analytics data...</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="trends" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="trends">Time Trends</TabsTrigger>
              <TabsTrigger value="types">Exploit Types</TabsTrigger>
              <TabsTrigger value="funds">Funds Lost</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends" className="mt-4">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Exploit Incidents Over Time</CardTitle>
                  <CardDescription>Monthly count of exploit incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data?.exploitTrends}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis 
                          dataKey="month" 
                          style={{ fontSize: '0.8rem' }}
                          tick={{ fill: '#8E9196' }}
                        />
                        <YAxis 
                          style={{ fontSize: '0.8rem' }}
                          tick={{ fill: '#8E9196' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1A1F2C', 
                            borderColor: '#2D3748',
                            borderRadius: '0.5rem' 
                          }} 
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          name="Exploit Count"
                          stroke="#9b87f5" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="types" className="mt-4">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Exploit Type Distribution</CardTitle>
                  <CardDescription>Frequency of different exploit categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data?.exploitTypes}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis 
                          dataKey="type" 
                          style={{ fontSize: '0.8rem' }}
                          tick={{ fill: '#8E9196' }}
                          angle={-45}
                          textAnchor="end"
                          height={70}
                        />
                        <YAxis 
                          style={{ fontSize: '0.8rem' }}
                          tick={{ fill: '#8E9196' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1A1F2C', 
                            borderColor: '#2D3748',
                            borderRadius: '0.5rem' 
                          }} 
                        />
                        <Legend />
                        <Bar 
                          dataKey="count" 
                          name="Frequency" 
                          fill="#7E69AB" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="funds" className="mt-4">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Total Funds Lost</CardTitle>
                  <CardDescription>Monthly funds lost to exploits (in millions USD)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data?.fundLoss}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis 
                          dataKey="month" 
                          style={{ fontSize: '0.8rem' }}
                          tick={{ fill: '#8E9196' }}
                        />
                        <YAxis 
                          style={{ fontSize: '0.8rem' }}
                          tick={{ fill: '#8E9196' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1A1F2C', 
                            borderColor: '#2D3748',
                            borderRadius: '0.5rem' 
                          }} 
                          formatter={(value) => [`$${value}M`, 'Funds Lost']}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          name="Funds Lost (Millions USD)"
                          stroke="#F97316" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageLayout>
  );
}
