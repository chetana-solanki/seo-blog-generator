"use client";

import Link from "next/link";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuthForm } from "../hooks/useAuthForm";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter(); // For navigation after login
  const { email, password, loading, setEmail, setPassword, setLoading } = useAuthForm();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent reload on form submission
    setLoading(true); // Show loading state

    try {
      // Firebase login with email and password
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!"); // Show success toast
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid email or password. Please try again."); // Show error toast
      console.log(error);
    }

    setLoading(false); // Hide loading state
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true); // Show loading state
    const provider = new GoogleAuthProvider(); // Create Google provider

    try {
      await signInWithPopup(auth, provider); // Open Google popup
      toast.success("Login successful!"); // Show success toast
      router.push("/dashboard"); // Redirect after success
    } catch (error) {
      toast.error("Google sign-in failed. Please try again."); // Show error toast
      console.log(error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="flex items-center justify-center px-4 pt-10">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { marginTop: '70px' } }} />
      <div className="w-full max-w-md p-8 rounded-xl shadow-md mt-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 outline-none" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 outline-none" placeholder="Enter password" />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md text-lg" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4">
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 py-3 border rounded-md hover:bg-gray-100" disabled={loading}>
            <FcGoogle className="w-5 h-5" />
            {loading ? "Please wait..." : "Continue with Google"}
          </button>
        </div>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
