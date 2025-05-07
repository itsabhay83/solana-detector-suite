
import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAccount, useDisconnect } from 'wagmi';
import { toast } from 'sonner';

export function WalletConnectors() {
  // Ethereum wallet state
  const { isConnected: isEthConnected, address: ethAddress } = useAccount();
  const { disconnect: disconnectEth } = useDisconnect();

  // Solana wallet state
  const { connected: isSolConnected, publicKey: solPublicKey, disconnect: disconnectSol } = useWallet();

  // Handle Ethereum wallet connection changes
  useEffect(() => {
    if (isEthConnected) {
      toast.success('Ethereum wallet connected!');
    }
  }, [isEthConnected]);

  // Handle Solana wallet connection changes
  useEffect(() => {
    if (isSolConnected) {
      toast.success('Solana wallet connected!');
    }
  }, [isSolConnected]);

  // Format addresses for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Ethereum Wallet */}
      <div>
        <ConnectButton 
          chainStatus="icon" 
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </div>

      {/* Solana Wallet */}
      <div className="wallet-adapter-dropdown">
        <WalletMultiButton />
      </div>
    </div>
  );
}
