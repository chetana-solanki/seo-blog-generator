"use client";
import Link from "next/link";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthForm } from "../hooks/useAuthForm";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState(""); // Name input state (unique to signup)
  const { email, password, loading, setEmail, setPassword, setLoading } = useAuthForm();

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent reload on form submission
    setLoading(true); // Show loading state

    try {
      // Create user account with email and password
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      // Update user profile with display name
      await updateProfile(userCred.user, { displayName: name });
      toast.success("Account created successfully!"); // Show success toast notification
    } catch (error) {
      toast.error("Error creating account. Please try again."); // Show error toast
      console.log(error);
    }

    setLoading(false); // Hide loading state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { marginTop: '70px' } }} />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 outline-none" placeholder="Your name" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 outline-none" placeholder="Enter email" />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 outline-none" placeholder="Create password" />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md text-lg">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
