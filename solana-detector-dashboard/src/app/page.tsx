"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OverviewChart } from "@/components/overview-chart"; 
import { RecentDetectionsTable } from "@/components/recent-detections-table"; 
import { AnalysisResultDisplay } from '@/components/analysis-result-display'; // New component for displaying single analysis

// Define interfaces matching the API response
interface TransactionDetails {
    signature: string;
    sender: string;
    receiver: string;
    amount: number | string;
    token_mint: string;
    timestamp: string;
    description: string;
    type: string;
}

interface AnalysisResult {
    classification: 'LEGITIMATE' | 'DUSTING_SUSPECTED' | 'ADDRESS_POISONING_SUSPECTED' | 'UNKNOWN';
    confidence_score: number;
    reasoning: string[];
    details: TransactionDetails;
}

interface ApiResponse {
    transaction_signature: string;
    analysis: AnalysisResult | null;
    error: { message: string; details?: string } | null;
}

export default function DashboardPage() {
  // --- State Variables ---
  const [transactionSignature, setTransactionSignature] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Placeholder data for overview - API doesn't provide this yet
  const overviewStats = {
    dusting24h: 15,
    poisoning24h: 5,
    targeted24h: 18,
    attackers24h: 3,
  };
  // Placeholder data for charts/tables - API doesn't provide this yet
  const recentDetectionsPlaceholder: AnalysisResult[] = [
      // ... (keep placeholder data for RecentDetectionsTable for now)
       {
            classification: 'ADDRESS_POISONING_SUSPECTED',
            confidence_score: 0.85,
            reasoning: ['Placeholder reason'],
            details: {
                signature: "5a63V...GTTJQVVXTtcGVRz", // Add signature to details for table key
                sender: "FakeWallet...123",
                receiver: "VictimWallet...456",
                amount: 0.00001,
                token_mint: "SOL",
                timestamp: "2025-04-30T11:30:00Z",
                description: "",
                type: "TRANSFER"
            }
        },
        {
            classification: 'DUSTING_SUSPECTED',
            confidence_score: 0.60,
            reasoning: ['Placeholder reason'],
            details: {
                signature: "4bN2e...kL9wA7xPqRtUioYz",
                sender: "DustSender...789",
                receiver: "VictimWallet...456",
                amount: 0.000001,
                token_mint: "DUST",
                timestamp: "2025-04-30T11:25:15Z",
                description: "Claim your airdrop!",
                type: "TRANSFER"
            }
        },
        // Add more placeholder items if needed
  ];

  // --- API Call Function ---
  const handleAnalyze = async () => {
    if (!transactionSignature) {
      setApiError('Please enter a transaction signature.');
      return;
    }
    setIsLoading(true);
    setApiError(null);
    setAnalysisResult(null); // Clear previous result

    try {
      // NOTE: Using http://localhost:3000 - Ensure API is running!
      const response = await axios.post<ApiResponse>('/api/analyze', {
        transaction_signature: transactionSignature,
      });
      setAnalysisResult(response.data);
      if (response.data.error) {
          setApiError(`API Error: ${response.data.error.message}${response.data.error.details ? ` (${response.data.error.details})` : ''}`);
      }
    } catch (error: any) {
      console.error('Error calling analysis API:', error);
      const message = error.response?.data?.error?.message || error.message || 'Failed to fetch analysis.';
      const details = error.response?.data?.error?.details;
      setApiError(`Network/Server Error: ${message}${details ? ` (${details})` : ''}`);
      setAnalysisResult({ // Set a result structure even on error for consistency
          transaction_signature: transactionSignature,
          analysis: null,
          error: { message: message, details: details }
      }); 
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Logic ---
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Solana Attack Dashboard</h2>
      </div>

      {/* Transaction Input Section */}
      <Card>
        <CardHeader>
            <CardTitle>Analyze Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="flex w-full max-w-lg items-center space-x-2">
                <Input 
                    type="text" 
                    placeholder="Enter Solana Transaction Signature" 
                    value={transactionSignature}
                    onChange={(e) => setTransactionSignature(e.target.value)}
                    disabled={isLoading}
                />
                <Button onClick={handleAnalyze} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                </Button>
            </div>
            {apiError && <p className="text-sm text-red-600">{apiError}</p>}
            {analysisResult && (
                <AnalysisResultDisplay result={analysisResult} />
            )}
        </CardContent>
      </Card>

      {/* Overview and Details Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview (Placeholder Data)</TabsTrigger>
          {/* <TabsTrigger value="details">Details</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {/* Overview Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dusting (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewStats.dusting24h}</div>
                <p className="text-xs text-muted-foreground">Suspected transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Poisoning (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewStats.poisoning24h}</div>
                <p className="text-xs text-muted-foreground">Suspected transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Targets (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewStats.targeted24h}</div>
                <p className="text-xs text-muted-foreground">Unique addresses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attackers (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewStats.attackers24h}</div>
                <p className="text-xs text-muted-foreground">Unique addresses</p>
              </CardContent>
            </Card>
          </div>
          {/* Charts and Tables */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Attack Trends</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart /> { /* Uses its own placeholder data */}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Detections</CardTitle>
              </CardHeader>
              <CardContent>
                 <RecentDetectionsTable detections={recentDetectionsPlaceholder} /> { /* Pass placeholder data */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* 
        <TabsContent value="details" className="space-y-4">
           <p>Detailed view coming soon...</p>
        </TabsContent>
        */}
      </Tabs>
    </div>
  );
}

