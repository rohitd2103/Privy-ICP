import React, { useState, useEffect } from 'react';
import WalletConnectBox from './components/WalletConnectBox';
import { AuthClient } from '@dfinity/auth-client';
import { isNFIDAuthenticated, getPrincipalFromNFID } from './nfidLogin'; // ⬅️ import this


function App() {
  const [principal, setPrincipal] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectPlug = async () => {
    if (!window.ic?.plug) {
      alert('Plug Wallet not found. Please install the Plug extension.');
      return;
    }

    try {
      const connected = await window.ic.plug.requestConnect({
        whitelist: [],
      });

      if (connected) {
        const principal = await window.ic.plug.getPrincipal();
        setPrincipal(principal.toText ? principal.toText() : principal);
        setConnected(true);
      }
    } catch (err) {
      console.error('Plug connection error:', err);
    }
  };

  const connectInternetIdentity = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        setPrincipal(principal);
        setConnected(true);
      },
      windowOpenerFeatures: '_self',
    });

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
    setConnected(false);
    setPrincipal(null);
  };

  return (
    <WalletConnectBox
      connected={connected}
      principal={principal}
      onPlugConnect={connectPlug}
      onInternetIdentityConnect={connectInternetIdentity}
      onNFIDConnect={(principal) => {
        setPrincipal(principal);
        setConnected(true);
      }}
      onDisconnect={disconnect}
    />

  );
}

export default App;