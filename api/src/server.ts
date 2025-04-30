import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
const app = express();
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3002;
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;

if (!HELIUS_API_KEY) {
    console.error("Error: HELIUS_API_KEY not found in environment variables.");
    process.exit(1); // Exit if the API key is not set
}

app.use(express.json());

interface TransactionDetails {
    sender: string;
    receiver: string;
    amount: number ; // Amount can be complex, so using number for simplicity
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

// Function to analyze transaction using Helius API
// Function to analyze transaction using Helius API
async function analyzeTransaction(signature: string): Promise<AnalysisResult> {
    console.log(`Analyzing transaction: ${signature}`);
    const heliusUrl = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_API_KEY}`;

    try {
        const response = await axios.post(heliusUrl, {
            transactions: [signature]
        });

        if (response.data && response.data.length > 0) {
            const txData = response.data[0];
            console.log("Helius Response Snippet:", JSON.stringify(txData).substring(0, 500));

            const details: TransactionDetails = {
                sender: txData.feePayer || 'unknown',
                receiver: txData.tokenTransfers?.[0]?.toUserAccount || txData.instructions?.[0]?.accounts?.[1] || 'unknown',
                amount: txData.tokenTransfers?.[0]?.tokenAmount || 0,
                token_mint: txData.tokenTransfers?.[0]?.mint || 'SOL',
                timestamp: new Date(txData.timestamp * 1000).toISOString() || new Date().toISOString(),
                description: txData.description || '',
                type: txData.type || 'unknown'
            };

            // Enhanced detection logic
            let classification: AnalysisResult['classification'] = 'UNKNOWN';
            let confidence_score = 0.0;
            let reasoning = ['Initial analysis complete.'];

            // Dusting detection (airdrop claims, small transactions)
            if (details.description.toLowerCase().includes('airdrop') || details.description.toLowerCase().includes('claim')) {
                classification = 'DUSTING_SUSPECTED';
                confidence_score = 0.7; // Increased confidence for suspected dusting
                reasoning.push('Transaction description mentions airdrop/claim.');
            }

            // Address poisoning detection (specific patterns or repeated small transfers to unknown addresses)
            if (details.amount <= 0.00001 && details.receiver === 'unknown') {
                classification = 'ADDRESS_POISONING_SUSPECTED';
                confidence_score = 0.8; // Higher confidence for suspected poisoning
                reasoning.push('Transaction amount is extremely small and receiver is unknown.');
            }

            // Return the analysis result
            return {
                classification: classification,
                confidence_score: confidence_score,
                reasoning: reasoning,
                details: details
            };
        } else {
            throw new Error('Transaction not found or Helius API returned empty data.');
        }
    } catch (error: any) {
        console.error(`Error fetching/parsing transaction ${signature} from Helius:`, error.response ? error.response.data : error.message);
        throw new Error(`Failed to analyze transaction via Helius: ${error.message}`);
    }
}


// Async handler for better error handling
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// POST endpoint to analyze a transaction
app.post('/api/analyze', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Received request to analyze:', req.body);
    
    const { transaction_signature } = req.body;

    // Validate the input
    if (!transaction_signature || typeof transaction_signature !== 'string') {
        return res.status(400).json({ 
            transaction_signature: transaction_signature || null,
            analysis: null,
            error: { message: 'Missing or invalid transaction_signature field in request body.' }
        });
    }

    try {
        const analysisResult = await analyzeTransaction(transaction_signature);
        res.json({
            transaction_signature: transaction_signature,
            analysis: analysisResult,
            error: null
        });
    } catch (error) {
        next(error); // Pass error to the centralized handler
    }
}));

// Centralized error handler to capture any errors in the request flow
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error in request handler:', err);
    const errorMessage = process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message;
    res.status(500).json({
        transaction_signature: req.body?.transaction_signature || null,
        analysis: null,
        error: { message: 'Internal server error during analysis.', details: errorMessage }
    });
});

// Test GET endpoint to check if API is running
app.get('/', (req: Request, res: Response) => {
    res.send('Solana Dusting & Poisoning Detection API is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});
