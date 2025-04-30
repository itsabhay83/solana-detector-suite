"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define interfaces matching the API response (can be shared in a types file later)
interface TransactionDetails {
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

interface AnalysisResultDisplayProps {
    result: ApiResponse;
}

function getBadgeVariant(type: string | undefined): "destructive" | "secondary" | "outline" | "default" {
    switch (type?.toLowerCase()) {
        case 'poisoning_suspected':
            return 'destructive';
        case 'dusting_suspected':
            return 'secondary';
        case 'legitimate':
            return 'default'; // Or maybe 'success' if you add a green variant
        default:
            return 'outline';
    }
}

export function AnalysisResultDisplay({ result }: AnalysisResultDisplayProps) {
    if (result.error) {
        // Error is already displayed below the button, maybe add a small note here if needed
        return null; 
    }

    if (!result.analysis) {
        return <p className="text-sm text-muted-foreground">No analysis data available for this signature.</p>;
    }

    const { classification, confidence_score, reasoning, details } = result.analysis;

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Analysis Result</span>
                    <Badge variant={getBadgeVariant(classification)}>{classification.replace('_', ' ')}</Badge>
                </CardTitle>
                <p className="text-xs text-muted-foreground font-mono pt-1">{result.transaction_signature}</p>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <h4 className="text-sm font-semibold mb-1">Confidence Score:</h4>
                    <p className="text-sm">{(confidence_score * 100).toFixed(1)}%</p>
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-1">Reasoning:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {reasoning.map((reason, index) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-1">Transaction Details:</h4>
                    <div className="text-sm space-y-1 bg-muted p-3 rounded-md">
                        <p><strong>Type:</strong> {details.type}</p>
                        <p><strong>Timestamp:</strong> {new Date(details.timestamp).toLocaleString()}</p>
                        <p><strong>Sender:</strong> <span className="font-mono text-xs">{details.sender}</span></p>
                        <p><strong>Receiver:</strong> <span className="font-mono text-xs">{details.receiver}</span></p>
                        <p><strong>Amount:</strong> {details.amount} {details.token_mint}</p>
                        {details.description && <p><strong>Description:</strong> {details.description}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

