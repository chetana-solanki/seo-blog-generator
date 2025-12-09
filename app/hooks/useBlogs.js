"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

/**
 * Custom hook to fetch user's blogs from Firestore in real-time
 * Returns blogs array that automatically updates when data changes
 */
export function useBlogs() {
  const { user } = useAuth(); // Get current user from context
  const [blogs, setBlogs] = useState([]); // Store user's blogs

  // Fetch user's blogs from Firestore, runs when user changes
  useEffect(() => {
    // If no user logged in, clear blogs and exit
    if (!user) {
      setBlogs([]);
      return;
    }

    // Create Firestore query - get data from blogs collection where userId matches current user's ID
    const q = query(
      collection(db, "blogs"),
      where("userId", "==", user.uid)
    );

    // Real-time listener - automatically updates when data changes
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Transform Firestore documents to JavaScript objects
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id, // Document ID
          ...d, // All other fields (keyword, blog, createdAt, etc.)
        };
      });
      setBlogs(data); // Update state with fetched blogs
    }, (error) => {
      console.error("Firestore error:", error); // Log error to console
    });

    // Cleanup: Remove listener when component unmounts or user changes
    return () => unsubscribe();
  }, [user]); // Re-run when user changes (login/logout)

  return blogs; // Return blogs array
}

