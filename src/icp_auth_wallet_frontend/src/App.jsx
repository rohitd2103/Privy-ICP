import React, { useState, useEffect } from 'react';
import WalletConnectBox from './components/WalletConnectBox';
import { AuthClient } from '@dfinity/auth-client';
import { isNFIDAuthenticated, getPrincipalFromNFID } from './nfidLogin'; // ⬅️ import this


function App() {
  const [principal, setPrincipal] = useState(null);
  const [connected, setConnected] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [loading, setLoading] = useState({
    wallet: false,
    internetIdentity: false,
    google: false,
    github: false
  });
  const [availableWallets, setAvailableWallets] = useState([]);
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Detect available wallets on component mount
  useEffect(() => {
    detectAvailableWallets();
  }, []);

  const detectAvailableWallets = () => {
    const wallets = [];
    
    // Check for Plug wallet
    if (window.ic?.plug) {
      wallets.push({
        id: 'PLUG',
        name: 'Plug Wallet',
        icon: '🔌' 
      });
    }
    
    // Check for MetaMask wallet
    if (window.ethereum?.isMetaMask) {
      wallets.push({
        id: 'METAMASK',
        name: 'MetaMask',
        icon: '🦊' 
      });
    }
    
    // Check for Phantom wallet
    if (window.solana?.isPhantom) {
      wallets.push({
        id: 'PHANTOM',
        name: 'Phantom',
        icon: '👻' 
      });
    }
    
    // Check for Petra Aptos wallet
    if (window.aptos) {
      wallets.push({
        id: 'PETRA',
        name: 'Petra (Aptos)',
        icon: '🔷' 
      });
    }
    
    setAvailableWallets(wallets);
  };

  const openWalletSelector = () => {
    if (availableWallets.length === 0) {
      alert('No supported wallets detected. Please install a wallet extension.');
      return;
    }
    
    if (availableWallets.length === 1) {
      // If only one wallet is available, connect directly
      connectWallet(availableWallets[0].id);
    } else {
      // Show wallet selection modal
      setShowWalletModal(true);
    }
  };

  const connectWallet = async (walletId) => {
    try {
      setLoading(prev => ({ ...prev, wallet: true }));
      
      switch (walletId) {
        case 'PLUG':
          await connectPlug();
          setWalletName('Plug Wallet');
          break;
          
        case 'METAMASK':
          if (!window.ethereum?.isMetaMask) {
            alert('MetaMask not found. Please install the MetaMask extension.');
            return;
          }
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts[0]) {
            setPrincipal(accounts[0]);
            setConnected(true);
            setWalletName('MetaMask');
          }
          break;
          
        case 'PHANTOM':
          if (!window.solana?.isPhantom) {
            alert('Phantom wallet not found. Please install the Phantom extension.');
            return;
          }
          try {
            const resp = await window.solana.connect();
            setPrincipal(resp.publicKey.toString());
            setConnected(true);
            setWalletName('Phantom');
          } catch (error) {
            console.error("Error connecting to Phantom wallet:", error);
            alert("Failed to connect to Phantom wallet");
          }
          break;
          
        case 'PETRA':
          if (!window.aptos) {
            alert('Petra wallet not found. Please install the Petra extension.');
            return;
          }
          try {
            const response = await window.aptos.connect();
            setPrincipal(response.address);
            setConnected(true);
            setWalletName('Petra (Aptos)');
          } catch (error) {
            console.error("Error connecting to Petra wallet:", error);
            alert("Failed to connect to Petra wallet");
          }
          break;
          
        default:
          alert('Unknown wallet type');
          return;
      }
      
      // Close the modal after successful connection
      setShowWalletModal(false);
      
    } catch (err) {
      console.error('Wallet connection error:', err);
      alert('Failed to connect wallet: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(prev => ({ ...prev, wallet: false }));
    }
  };

  const connectPlug = async () => {
    if (!window.ic?.plug) {
      alert('Plug Wallet not found. Please install the Plug extension.');
      return;
    }

    const isConnected = await window.ic.plug.requestConnect({ whitelist: [] });
    if (isConnected) {
      const principal = await window.ic.plug.getPrincipal();
      setPrincipal(principal.toText ? principal.toText() : principal);
      setConnected(true);
    }
  };

  const connectInternetIdentity = async () => {
    try {
      setLoading(prev => ({ ...prev, internetIdentity: true }));
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          setPrincipal(principal);
          setConnected(true);
          setWalletName('Internet Identity');
        },
        windowOpenerFeatures: '_self'
      });
    } catch (err) {
      console.error('Internet Identity connection error:', err);
    } finally {
      setLoading(prev => ({ ...prev, internetIdentity: false }));
    }
  };

  // restore NFID session on reload
  useEffect(() => {
    const checkNFID = async () => {
      const authenticated = await isNFIDAuthenticated();
      if (authenticated) {
        const principal = getPrincipalFromNFID();
        setPrincipal(principal);
        setConnected(true);
        console.log("🔄 Restored NFID session:", principal);
      }
    };
    checkNFID();
  }, []);

 
  const disconnect = () => {
    setPrincipal(null);
    setConnected(false);
    setWalletName('');
  };

  return (
    <div className="app-container">
      <WalletConnectBox
        connected={connected}
        principal={principal}
        walletName={walletName}
        loading={loading}
        onWalletConnect={openWalletSelector}
        onInternetIdentityConnect={connectInternetIdentity}
        onDisconnect={disconnect}
        availableWallets={availableWallets}
        showWalletModal={showWalletModal}
        setShowWalletModal={setShowWalletModal}
        onSelectWallet={connectWallet}
      />
    </div>
  );
}

export default App;