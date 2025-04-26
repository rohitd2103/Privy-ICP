import { AuthClient } from "@dfinity/auth-client";

let authClient = null;

export const initAuthClient = async () => {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
};

export const loginWithNFID = async () => {
  await initAuthClient();

  await authClient.login({
    identityProvider: "https://nfid.one/authenticate/?applicationName=PrivyICP",
    onSuccess: () => {
      console.log("✅ NFID login successful");
    },
    onError: (err) => {
      console.error("❌ NFID login error:", err);
    },
  });
};

export const logoutNFID = async () => {
  if (authClient) {
    await authClient.logout();
    console.log("👋 Logged out from NFID");
  }
};

export const getPrincipalFromNFID = () => {
  return authClient ? authClient.getIdentity().getPrincipal().toText() : null;
};

export const isNFIDAuthenticated = async () => {
  await initAuthClient();
  return await authClient.isAuthenticated();
};

export const getDIDFromNFID = () => {
    if (!authClient) return null;
  
    const principal = authClient.getIdentity().getPrincipal().toText();
    return `did:icp:${principal}`;
  };
  