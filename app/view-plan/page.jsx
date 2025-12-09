"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { useBlogs } from "../hooks/useBlogs";
import toast, { Toaster } from "react-hot-toast";

export default function ViewPlan() {
  const { user } = useAuth(); // Get current user from context
  const blogs = useBlogs(); // Get user's blogs using custom hook
  const [loading, setLoading] = useState(false); // Checkout loading state
  const [userStats, setUserStats] = useState({ // User's blog usage stats
    blogsGenerated: 0,
    blogLimit: 30,
  });
  const [statsLoading, setStatsLoading] = useState(true); // Stats loading state

  // Fetch user stats when component mounts
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) {
        setStatsLoading(false); // Hide loading state
        return;
      }

      try {
        setStatsLoading(true); // Show loading
        const userDocRef = doc(db, "users", user.uid); // Reference to user document
        const userDoc = await getDoc(userDocRef); // Fetch user document

        if (userDoc.exists()) {
          const data = userDoc.data(); // Get document data
          setUserStats({ // Update state with fetched stats
            blogsGenerated: data.blogsGenerated || 0,
            blogLimit: data.blogLimit || 30,
          });
        } else {
          setUserStats({ blogsGenerated: 0, blogLimit: 30 }); // Use defaults
        }
      } catch (err) {
        toast.error("Failed to load user stats. Please try again."); // Show error toast
      } finally {
        setStatsLoading(false); // Hide loading
      }
    };

    fetchUserStats(); // Call function on mount
  }, [user]);

  // Handle subscription checkout
  const handleSubscribe = async (priceId) => {
    if (!priceId) return; // Free plan has no priceId

    setLoading(true); // Show loading state

    try {
      // Call checkout API to create Stripe session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json(); // Parse response

      if (!response.ok || data.error) {
        throw new Error(data.error || "Checkout failed");
      }

      const { url } = data; // Get Stripe checkout URL
      if (!url) throw new Error("No checkout URL in response");

      toast.success("Redirecting to checkout..."); // Show success toast notification
      window.location.href = url; // Redirect to Stripe
    } catch (err) {
      const errorMsg = err?.message || String(err);
      toast.error(errorMsg || "Checkout failed. Please try again."); // Show error toast
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Calculate remaining blogs for a plan using actual blogs count
  const getRemainingBlogs = (limit) => {
    return Math.max(0, limit - blogs.length);
  };

  // Plan configurations with pricing and features
  const plans = [
    {
      name: "Free",
      price: "₹0",
      priceId: null, // No Stripe price ID for free plan
      features: ["📝 30 Blogs / Month", "⏱ AI Generate"],
      buttonText: "Start Free",
      limit: 30, // Blog limit per month
    },
    {
      name: "Pro",
      price: "₹99 / month",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO, // Stripe price ID from env
      features: ["📝 100 Blogs / Month", "⚡ Faster AI Generation"],
      buttonText: "Get Pro",
      featured: true, // Highlighted plan
      limit: 100,
    },
    {
      name: "Enterprise",
      price: "₹499 / month",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
      features: ["Unlimited Blogs", "⚡ Faster AI Generation"],
      buttonText: "Get Enterprise",
      limit: 999999, // Effectively unlimited
    },
  ];

  return (
    <ProtectedRoute>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { marginTop: '70px' } }} />
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600">Select the perfect plan to generate SEO-optimized blogs using AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isCurrentPlan = userStats.blogLimit === plan.limit; // Check if this is user's current plan
            const remainingForPlan = getRemainingBlogs(plan.limit); // Calculate remaining blogs

            return (
              <div key={plan.name} className={`bg-white shadow p-8 rounded-lg text-center ${plan.featured ? "border-2 border-blue-600 transform scale-105" : "border border-gray-200" }`} >
                <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
                <p className="text-gray-500 mb-6">
                  {plan.name === "Free"
                    ? "Try it out with limited blogs"
                    : plan.name === "Pro"
                      ? "Best for regular bloggers"
                      : "For agencies & teams"}
                </p>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>

                <ul className="text-gray-600 mb-6 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                {/* Blog Count Info - Updated */}
                <div className="mb-4 p-3 bg-gray-100 rounded">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Limit:</strong> {plan.limit === 999999 ? "Unlimited" : plan.limit} blogs/month
                  </p>
                  {isCurrentPlan && (
                    <div>
                      <p className="text-xs text-green-600 mb-1">
                        ✓ Current plan
                      </p>
                      <p className="text-xs text-blue-600">
                        📊 {remainingForPlan} blogs remaining
                      </p>
                    </div>
                  )}
                  {!isCurrentPlan && (
                    <p className="text-xs text-gray-600">
                      After upgrade: {plan.limit === 999999 ? "Unlimited" : plan.limit} blogs available
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.priceId)}
                  disabled={loading || !plan.priceId}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
                >
                  {loading ? "Processing..." : plan.buttonText}
                </button>
                {!plan.priceId && (
                  <p className="text-xs text-gray-400 mt-2">
                    Free tier - no payment required
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}
