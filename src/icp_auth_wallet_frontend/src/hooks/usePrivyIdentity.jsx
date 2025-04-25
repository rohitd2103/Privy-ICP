// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { AuthClient } from '@dfinity/auth-client';
// import { loginWithNFID, logoutNFID, getPrincipalFromNFID, isNFIDAuthenticated } from '../nfidLogin';
// import { auth } from '../firebase';

// const IdentityContext = createContext();

// export const IdentityProvider = ({ children }) => {
//   const [principal, setPrincipal] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // 🔹 Plug Login
//   const loginWithPlug = async () => {
//     if (window.ic?.plug) {
//       const connected = await window.ic.plug.requestConnect({ whitelist: [] });
//       if (connected) {
//         const principal = await window.ic.plug.getPrincipal();
//         setPrincipal(principal.toText());
//         setProvider("plug");
//         setIsAuthenticated(true);
//       }
//     }
//   };

//   // 🔹 Internet Identity Login
//   const loginWithII = async () => {
//     const authClient = await AuthClient.create();
//     await authClient.login({
//       identityProvider: 'https://identity.ic0.app',
//       onSuccess: () => {
//         const principal = authClient.getIdentity().getPrincipal().toText();
//         setPrincipal(principal);
//         setProvider("ii");
//         setIsAuthenticated(true);
//       },
//     });
//   };

//   // 🔹 NFID Login
//   const loginWithNFIDHandler = async () => {
//     await loginWithNFID();
//     const principal = getPrincipalFromNFID();
//     setPrincipal(principal);
//     setProvider("nfid");
//     setIsAuthenticated(true);
//   };

//   // 🔹 Logout (works for all)
//   const logout = async () => {
//     await logoutNFID(); // safe even if NFID wasn't used
//     setPrincipal(null);
//     setProvider(null);
//     setIsAuthenticated(false);
//   };

//   // 🔹 Restore session on reload
//   useEffect(() => {
//     const restore = async () => {
//       if (await isNFIDAuthenticated()) {
//         const principal = getPrincipalFromNFID();
//         setPrincipal(principal);
//         setProvider("nfid");
//         setIsAuthenticated(true);
//       }
//     };
//     restore();
//   }, []);

//   return (
//     <IdentityContext.Provider value={{
//       principal,
//       provider,
//       isAuthenticated,
//       loginWithPlug,
//       loginWithII,
//       loginWithNFID: loginWithNFIDHandler,
//       logout,
//     }}>
//       {children}
//     </IdentityContext.Provider>
//   );
// };

// // 🧵 Step 4: Create the Hook
// export const usePrivyIdentity = () => {
//   return useContext(IdentityContext);
// };
