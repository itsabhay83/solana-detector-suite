
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EthereumWalletProvider } from "./components/wallet/EthereumWalletProvider";
import { SolanaWalletProvider } from "./components/wallet/SolanaWalletProvider";
import Index from "./pages/Index";
import ExploitsExplorer from "./pages/ExploitsExplorer";
import Analytics from "./pages/Analytics";
import Resources from "./pages/Resources";
import LiveHackTracker from "./pages/LiveHackTracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Buffer } from 'buffer';
if (!window.Buffer) window.Buffer = Buffer;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <EthereumWalletProvider>
        <SolanaWalletProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/exploits" element={<ExploitsExplorer />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/tracker" element={<LiveHackTracker />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </SolanaWalletProvider>
      </EthereumWalletProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
