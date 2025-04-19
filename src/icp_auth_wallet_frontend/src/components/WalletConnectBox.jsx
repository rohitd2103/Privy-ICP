import React from 'react';
import { motion } from 'framer-motion';
import './WalletConnectBox.css';

const WalletConnectBox = ({
  connected,
  principal,
  loading,
  onPlugConnect,
  onInternetIdentityConnect,
  onDisconnect
}) => {
  // Wallet options configuration for easy future additions
  const walletOptions = [
    {
      id: 'plug',
      name: 'Plug Wallet',
      icon: '🧩',
      color: '#f97316',
      hoverColor: '#ea580c',
      onClick: onPlugConnect,
      loading: loading.plug
    },
    {
      id: 'internetIdentity',
      name: 'Internet Identity',
      icon: '🔐',
      color: '#6366f1',
      hoverColor: '#4f46e5',
      onClick: onInternetIdentityConnect,
      loading: loading.internetIdentity
    }
    // Add more wallet options here in the future
  ];

  return (
    <motion.div 
      className="wallet-connect-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="wallet-connect-card">
        <div className="wallet-connect-header">
          <h2>Connect Your Wallet</h2>
          <p>Choose your preferred wallet to access the platform</p>
        </div>

        {!connected ? (
          <div className="wallet-options">
            {walletOptions.map((wallet) => (
              <motion.button
                key={wallet.id}
                className="wallet-button"
                style={{ 
                  '--bg-color': wallet.color,
                  '--hover-color': wallet.hoverColor
                }}
                onClick={wallet.onClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={wallet.loading}
              >
                {wallet.loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span className="wallet-icon">{wallet.icon}</span>
                    {wallet.name}
                  </>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="connected-state">
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Wallet Connected</h3>
            </div>
            
            <div className="principal-display">
              <label>Principal ID:</label>
              <code>{principal}</code>
            </div>

            <button 
              className="disconnect-button"
              onClick={onDisconnect}
            >
              Disconnect Wallet
            </button>
          </div>
        )}

        <div className="wallet-help">
          <p>Don't have a wallet? <a href="#" target="_blank" rel="noopener noreferrer">Learn more</a></p>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletConnectBox;
