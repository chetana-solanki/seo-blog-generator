"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { useBlogs } from "../hooks/useBlogs";

export default function Dashboard() {
  const { user, loading } = useAuth(); // Get user and loading from context
  const blogs = useBlogs(); // Get user's blogs using custom hook

  return (
    <>
      {/* Show loading screen while checking authentication */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
          Loading...
        </div>
      )}

      {/* Show dashboard content when not loading */}
      {!loading && (
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-100 px-6 py-10">
            <h1 className="text-3xl font-bold text-center">Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-center">
              {/* Total Blogs Count */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold">Blogs Generated</h3>
                <p className="text-3xl font-bold text-blue-600">{blogs.length}</p>
              </div>

              {/* Total Words Count - sum of all blog words */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold">Total Words</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {blogs.reduce((total, b) => total + (b.blog ? b.blog.split(" ").length : 0), 0)}
                </p>
              </div>

            </div>

            {/* Blog Cards Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4 text-center">Your Blogs</h2>

              {/* Show message if no blogs found */}
              {blogs.length === 0 && (
                <p className="text-gray-500 text-center py-4">No blogs found.</p>
              )}

              {/* Grid of blog cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((b) => (
                  <div key={b.id} className="bg-white shadow p-6 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                    {/* Blog keyword as title */}
                    <h3 className="text-2xl font-bold text-gray-800 text-center">{b.keyword.toUpperCase()}</h3>

                    {/* Created date with multiple fallbacks for different date formats */}
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      {b.createdAt
                        ? b.createdAt.toDate?.()?.toDateString?.() || new Date(b.createdAt.seconds * 1000).toDateString() || new Date(b.createdAt).toDateString() || "No date"
                        : "No date"}
                    </p>

                    {/* Full blog content */}
                    <div className="mt-4 border-t pt-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {b.blog}
                      </p>
                    </div>

                    {/* Word count for this blog */}
                    <div className="mt-4 pt-4 border-t flex justify-center items-center">
                      <p className="text-blue-600 font-semibold text-sm">
                        {b.blog ? b.blog.split(" ").length : 0} words
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      )}
    </>
  );
}
