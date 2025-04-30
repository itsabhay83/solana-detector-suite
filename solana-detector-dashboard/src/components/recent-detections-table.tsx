"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Placeholder data - replace with actual data fetched from API
const detections = [
  {
    signature: "5a63V...GTTJQVVXTtcGVRz",
    type: "Poisoning",
    confidence: 0.85,
    from: "FakeWallet...123",
    to: "VictimWallet...456",
    timestamp: "2025-04-30T11:30:00Z",
  },
  {
    signature: "4bN2e...kL9wA7xPqRtUioYz",
    type: "Dusting",
    confidence: 0.60,
    from: "DustSender...789",
    to: "VictimWallet...456",
    timestamp: "2025-04-30T11:25:15Z",
  },
   {
    signature: "3zXyW...mN8oP9qRsTuVwXy",
    type: "Dusting",
    confidence: 0.72,
    from: "DustSender...789",
    to: "AnotherVictim...abc",
    timestamp: "2025-04-30T11:20:05Z",
  },
   {
    signature: "2aBcD...hIjKlMnOpQrStU",
    type: "Legitimate",
    confidence: 0.99, // Example of a legitimate tx for context
    from: "AliceWallet...def",
    to: "BobWallet...ghi",
    timestamp: "2025-04-30T11:15:50Z",
  },
   {
    signature: "1vWxY...oPqRsTuVwXyZaB",
    type: "Poisoning",
    confidence: 0.91,
    from: "ScammerLookalike...jkl",
    to: "VictimWallet...456",
    timestamp: "2025-04-30T11:10:30Z",
  },
];

function formatTimestamp(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleString(); // Adjust format as needed
}

function getBadgeVariant(type: string): "destructive" | "secondary" | "outline" | "default" {
    switch (type.toLowerCase()) {
        case 'poisoning':
            return 'destructive';
        case 'dusting':
            return 'secondary';
        default:
            return 'outline';
    }
}

export function RecentDetectionsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Signature</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Confidence</TableHead>
          
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Timestamp</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {detections.map((detection) => (
          <TableRow key={detection.signature}>
            <TableCell className="font-mono text-xs">{detection.signature.substring(0, 10)}...</TableCell>
            <TableCell>
                <Badge variant={getBadgeVariant(detection.type)}>{detection.type}</Badge>
            </TableCell>
            <TableCell>{(detection.confidence * 100).toFixed(0)}%</TableCell>
            <TableCell className="text-xs">{detection.from}</TableCell>
            <TableCell className="text-xs">{detection.to}</TableCell>
            <TableCell className="text-xs">{formatTimestamp(detection.timestamp)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

