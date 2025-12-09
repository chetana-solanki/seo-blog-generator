"use client";

import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function GenerateBlog() {
  const { user, loading } = useAuth(); // Get user and loading from AuthContext
  const [keyword, setKeyword] = useState(""); // Blog keyword input
  const [length, setLength] = useState("100"); // Blog length selection
  const [generating, setGenerating] = useState(false); // generating state during generation
  const [blog, setBlog] = useState(""); // Generated blog content

  // Main function to generate and save blog
  async function generateBlog() {
    if (!keyword) {
      toast.error("Please enter a keyword!"); // Show error toast
      return;
    }

    setGenerating(true); // Show loading state
    setBlog(""); // Clear previous blog

    try {
      // Call API to generate blog using OpenAI :- it will call /api/generate-blog route
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, length }),
      });
      const data = await res.json(); // Parse response
      setBlog(data.blog); // Display generated blog
      toast.success("Blog generated successfully!"); // Show success toast

      try {
        // Save blog details(keyword, blog, createdAt, userId) to Firestore
        await addDoc(collection(db, "blogs"), {
          userId: user.uid,
          keyword,
          blog: data.blog,
          createdAt: serverTimestamp(),
        });
        toast.success("Blog saved to database!"); // Show save success toast
      } catch (saveErr) {
        console.error("Save error:", saveErr);
        toast.error("Failed to save blog. Please try again."); // Show error toast
      }
    } catch (err) {
      console.error("Generate error:", err);
      toast.error("Failed to generate blog. Please try again."); // Show error toast
    } finally {
      setGenerating(false); // Hide loading state
    }
  }

  return (
    <ProtectedRoute>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { marginTop: '70px' } }} />
      <div className="bg-gray-50 px-6 py-10">
        <h1 className="text-3xl font-bold mb-5 text-center">Generate SEO Blog</h1>

        <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto">
          <label className="font-semibold">Enter Keyword</label>
          <input className="w-full border p-3 rounded mb-4" value={keyword} onChange={(e) => setKeyword(e.target.value)} />

          <label className="font-semibold">Select Blog Length</label>
          <select className="w-full border p-3 rounded mb-6" value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="100">Short (100 words)</option>
            <option value="300">Medium (300 words)</option>
            <option value="500">Long (500 words)</option>
            <option value="1000">Very Long (1000 words)</option>
          </select>

          <button onClick={generateBlog} className="w-full bg-blue-600 text-white py-3 rounded" disabled={generating || loading}>
            {generating ? "Generating..." : "Generate Blog"}
          </button>
        </div>

        {blog && (
          <div className="bg-white p-6 rounded-lg shadow mt-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Generated Blog</h2>
            <pre className="whitespace-pre-wrap text-gray-800">{blog}</pre>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
