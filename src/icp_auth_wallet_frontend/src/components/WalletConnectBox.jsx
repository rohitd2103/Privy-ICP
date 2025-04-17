import React from 'react';

export default function WalletConnectBox({ connected, principal, onPlugConnect, onEmailConnect }) {
  return (
    <div
      style={{
        width: '360px',
        margin: '4rem auto',
        padding: '2rem',
        borderRadius: '1rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
      }}
    >
      <h3 style={{ marginBottom: '1rem', color: '#111' }}>Log in or sign up</h3>

      

      {connected ? (
        <>
          <p style={{ fontSize: '0.9rem', margin: '1rem 0', color: '#333' }}>
            Connected as:
          </p>
          <code
            style={{
              display: 'block',
              fontSize: '0.8rem',
              color: '#666',
              background: '#f4f4f4',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              wordBreak: 'break-all',
            }}
          >
            {principal}
          </code>
        </>
      ) : (
        <>
          <button
            onClick={onPlugConnect}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: '#f97316',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Link via Plug Wallet
          </button>

    

        
        </>
      )}

    </div>
  );
}
