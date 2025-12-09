"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

// Wrapper component to protect pages - only logged-in users can access
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // Get user and loading from context
  const router = useRouter(); // For redirecting to login page

  useEffect(() => {
    // Redirect to login if not authenticated (after rendering is complete)
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]); // Re-run when user or loading or router changes

  // Show loading while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Render children only if user is logged in
  return user && children;
}