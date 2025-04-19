import React, { useState } from 'react';
import WalletConnectBox from './components/WalletConnectBox';
import { AuthClient } from '@dfinity/auth-client';

function App() {
  const [principal, setPrincipal] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState({
    plug: false,
    internetIdentity: false
  });

  const connectPlug = async () => {
    if (!window.ic?.plug) {
      alert('Plug Wallet not found. Please install the Plug extension.');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, plug: true }));
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
    } finally {
      setLoading(prev => ({ ...prev, plug: false }));
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
        },
        windowOpenerFeatures: '_self',
      });
    } catch (err) {
      console.error('Internet Identity connection error:', err);
    } finally {
      setLoading(prev => ({ ...prev, internetIdentity: false }));
    }
  };

  const disconnect = () => {
    setPrincipal(null);
    setConnected(false);
  };

  return (
    <div className="app-container">
      <WalletConnectBox
        connected={connected}
        principal={principal}
        loading={loading}
        onPlugConnect={connectPlug}
        onInternetIdentityConnect={connectInternetIdentity}
        onDisconnect={disconnect}
      />
    </div>
  );
}

export default App;
