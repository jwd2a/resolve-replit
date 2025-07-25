import { createContext, ReactNode, useContext, useState } from "react";

// Simple mock user type for UI prototype
type MockUser = {
  id: number;
  username: string;
  email: string;
  displayName: string;
  role: string;
  onboardingComplete: boolean;
};

type AuthContextType = {
  user: MockUser | null;
  isLoading: boolean;
  error: Error | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, username: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>({
    id: 1,
    username: "demo-user",
    email: "demo@resolve.app",
    displayName: "Demo User",
    role: "user",
    onboardingComplete: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock login - always succeed for UI prototype
    setTimeout(() => {
      setUser({
        id: 1,
        username: "demo-user",
        email,
        displayName: "Demo User",
        role: "user",
        onboardingComplete: true,
      });
      setIsLoading(false);
    }, 1000);
  };

  const registerWithEmail = async (email: string, username: string, password: string, displayName: string) => {
    setIsLoading(true);
    // Mock registration - always succeed for UI prototype
    setTimeout(() => {
      setUser({
        id: 1,
        username,
        email,
        displayName,
        role: "user",
        onboardingComplete: false,
      });
      setIsLoading(false);
    }, 1000);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: 1,
        username: "google-user",
        email: "google@resolve.app",
        displayName: "Google User",
        role: "user",
        onboardingComplete: true,
      });
      setIsLoading(false);
    }, 1000);
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: 1,
        username: "apple-user",
        email: "apple@resolve.app",
        displayName: "Apple User",
        role: "user",
        onboardingComplete: true,
      });
      setIsLoading(false);
    }, 1000);
  };

  const loginWithFacebook = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: 1,
        username: "facebook-user",
        email: "facebook@resolve.app",
        displayName: "Facebook User",
        role: "user",
        onboardingComplete: true,
      });
      setIsLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginWithApple,
        loginWithFacebook,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}