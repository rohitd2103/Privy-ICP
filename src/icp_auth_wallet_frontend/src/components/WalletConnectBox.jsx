import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, googleProvider, githubProvider, signInWithPopup } from '../firebase';
import './WalletConnectBox.css';

// Wallet Selection Modal Component
const WalletModal = ({ wallets, onSelect, onClose }) => {
  return (
    <motion.div 
      className="wallet-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="wallet-modal"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wallet-modal-header">
          <h3>Select a Wallet</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="wallet-list">
          {wallets.map((wallet) => (
            <motion.button 
              key={wallet.id} 
              className="wallet-option" 
              onClick={() => onSelect(wallet.id)}
              whileHover={{ scale: 1.02, backgroundColor: "#f1f5f9" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="wallet-icon">{wallet.icon}</span>
              <span className="wallet-name">{wallet.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const WalletConnectBox = ({
  connected,
  principal,
  walletName,
  loading,
  onWalletConnect,
  onInternetIdentityConnect,
  onDisconnect,
  availableWallets,
  showWalletModal,
  setShowWalletModal,
  onSelectWallet
}) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google signed in:", user);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log("GitHub signed in:", user);
    } catch (error) {
      console.error("GitHub sign-in error:", error.message);
    }
  };

  const authOptions = [
    {
      id: 'walletConnect',
      name: 'Connect Wallet',
      icon: '💼',
      color: '#f97316',
      hoverColor: '#ea580c',
      onClick: onWalletConnect,
      loading: loading?.wallet
    },
    {
      id: 'internetIdentity',
      name: 'Internet Identity',
      icon: '🔐',
      color: '#6366f1',
      hoverColor: '#4f46e5',
      onClick: onInternetIdentityConnect,
      loading: loading?.internetIdentity
    },
    {
      id: 'google',
      name: 'Sign in with Google',
      icon: '🔍',
      color: '#22c55e',
      hoverColor: '#16a34a',
      onClick: handleGoogleLogin,
      loading: loading?.google
    },
    {
      id: 'github',
      name: 'Sign in with GitHub',
      icon: '🐙',
      color: '#333',
      hoverColor: '#000',
      onClick: handleGitHubLogin,
      loading: loading?.github
    }
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
          <h2>Connect to Privy-ICP</h2>
          <p>Choose your preferred wallet or sign-in provider</p>
        </div>

        {!connected ? (
          <div className="wallet-options">
            {authOptions.map((option) => (
              <motion.button
                key={option.id}
                className="wallet-button"
                style={{ 
                  '--bg-color': option.color,
                  '--hover-color': option.hoverColor
                }}
                onClick={option.onClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={option.loading}
              >
                {option.loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span className="wallet-icon">{option.icon}</span>
                    {option.name}
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
              <label>Connected with {walletName}:</label>
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
          <p>Don't have a wallet? <a href="https://internetcomputer.org/docs/current/developer-docs/build/install-wallet" target="_blank" rel="noopener noreferrer">Learn more</a></p>
        </div>
      </div>

      <AnimatePresence>
        {showWalletModal && (
          <WalletModal
            wallets={availableWallets}
            onSelect={onSelectWallet}
            onClose={() => setShowWalletModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WalletConnectBox;