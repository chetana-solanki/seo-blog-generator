// Check if user is logged in or not and provide user info to child components
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

// Create Auth Context, used to provide user info to child components
const AuthContext = createContext({});

// Auth Provider Component - provides user info to children components
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Current logged-in user
  const [loading, setLoading] = useState(true); // Auth check in progress

  // Listen for auth state changes (runs once on mount)
  useEffect(() => {
    // Single auth listener for entire app, runs on auth state change, page reload, auth token expiration, etc.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state on login/logout
      setLoading(false); // Auth check complete
    });

    // Cleanup listener on unmount (runs once on unmount)
    return () => unsubscribe();
  }, []);

  // Logout function - will be used by child components to logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Provide user, loading, and logout to all children components
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context in child components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

