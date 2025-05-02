import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "@shared/schema";

// Create a simplified mock user type for our auth context
// This doesn't need to match the exact schema since we're just mocking for design
type MockUser = Partial<User> & {
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
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock functions for now
  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock successful login
      console.log("Logging in with email:", email);
      
      // Mock user data - setting onboardingComplete to true for existing users
      const mockUser: MockUser = {
        id: 1,
        username: email.split('@')[0],
        email: email,
        displayName: email.split('@')[0],
        role: "parent",
        onboardingComplete: true, // Existing users (login) should have completed onboarding
        createdAt: new Date(),
        password: null,
        phone: null,
        address: null,
        authProvider: null,
        providerId: null
      };
      
      setUser(mockUser);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmail = async (email: string, username: string, password: string, displayName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock registration
      console.log("Registering user:", { email, username, displayName });
      
      // Mock user data
      const mockUser: MockUser = {
        id: 1,
        username,
        email,
        displayName,
        role: "parent",
        onboardingComplete: false,
        createdAt: new Date(),
        password: null,
        phone: null,
        address: null,
        authProvider: null,
        providerId: null
      };
      
      setUser(mockUser);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Logging in with Google");
      
      // Mock user data
      const mockUser: MockUser = {
        id: 1,
        username: "googleuser",
        email: "user@gmail.com",
        displayName: "Google User",
        role: "parent",
        onboardingComplete: true, // Existing users should have completed onboarding
        createdAt: new Date(),
        authProvider: "google",
        password: null,
        phone: null,
        address: null,
        providerId: null
      };
      
      setUser(mockUser);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Logging in with Apple");
      
      // Mock user data
      const mockUser: MockUser = {
        id: 1,
        username: "appleuser",
        email: "user@icloud.com",
        displayName: "Apple User",
        role: "parent",
        onboardingComplete: true, // Existing users should have completed onboarding
        createdAt: new Date(),
        authProvider: "apple",
        password: null,
        phone: null,
        address: null,
        providerId: null
      };
      
      setUser(mockUser);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Logging in with Facebook");
      
      // Mock user data
      const mockUser: MockUser = {
        id: 1,
        username: "fbuser",
        email: "user@facebook.com",
        displayName: "Facebook User",
        role: "parent",
        onboardingComplete: true, // Existing users should have completed onboarding
        createdAt: new Date(),
        authProvider: "facebook",
        password: null,
        phone: null,
        address: null,
        providerId: null
      };
      
      setUser(mockUser);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      console.log("Logging out");
      setUser(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
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
        logout
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