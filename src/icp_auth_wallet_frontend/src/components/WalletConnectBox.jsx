import React from 'react';

function WalletConnectBox({ connected, principal, onPlugConnect, onInternetIdentityConnect }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRadius: '1rem',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#1e293b' }}>
        Connect to Privy-ICP
      </h2>

      {!connected ? (
        <>
          <button
            onClick={onPlugConnect}
            style={walletButtonStyle('#f97316')}
          >
            🧩 Connect with Plug Wallet
          </button>

          <button
            onClick={onInternetIdentityConnect}
            style={walletButtonStyle('#6366f1')}
          >
            🔐 Connect with Internet Identity
          </button>
        </>
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ color: '#475569', fontWeight: 500 }}>Connected as:</p>
          <code style={{
            display: 'block',
            marginTop: '0.5rem',
            wordBreak: 'break-word',
            fontSize: '0.9rem',
            color: '#0f172a',
            backgroundColor: '#e2e8f0',
            padding: '0.5rem',
            borderRadius: '0.5rem'
          }}>{principal}</code>
        </div>
      )}
    </div>
  );
}

function walletButtonStyle(bgColor) {
  return {
    width: '100%',
    padding: '0.9rem',
    marginBottom: '1rem',
    backgroundColor: bgColor,
    color: '#fff',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    letterSpacing: '0.5px'
  };
}

export default WalletConnectBox;
