"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false); // Mobile menu toggle state (open/close)
  const { user, loading, logout } = useAuth(); // Get user, loading, and logout from context

  const handleLogout = async () => {
    await logout(); // Use logout from context
    setOpen(false); // Close mobile menu on logout
  };

  return (
    <header className="bg-black w-full shadow-sm fixed top-0 left-0 z-50 text-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">SEO Blog Generator</Link>
        {/* Desktop Menu - hidden on mobile, shown on md and up */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li><Link href="/view-plan">View Plans</Link></li>
          <li><Link href="/generate-blog">Generate Blog</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>

        {/* Desktop Login/Logout Button - hidden on mobile, shown on md and up */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Show user info and logout button when logged in */}
          {!loading && user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">Welcome, {user.displayName}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer">Logout</button>
              </div>
          )} 
          {/* Show login button when not logged in */}
          {!loading && !user && <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</Link>}
        </div>

        {/* Mobile Menu Icon - shown on mobile, hidden on md and up */}
        <button className="md:hidden text-3xl text-white" onClick={() => setOpen(!open)}>☰</button>
      </nav>

      {/* Mobile Dropdown Menu - shown on mobile, hidden on md and up */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4">
          <ul className="flex flex-col space-y-4 mt-4 text-gray-700">
            <li><Link href="/view-plan" onClick={() => setOpen(false)}>View Plans</Link></li>
            <li><Link href="/generate-blog" onClick={() => setOpen(false)}>Generate Blog</Link></li>
            <li><Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
            {/* Show user info and logout button when logged in */}
            {!loading && user && (
              <li className="flex flex-col space-y-2">
                <span className="text-sm text-gray-300">Welcome, {user.displayName}</span>
                <button onClick={handleLogout} className="block w-full text-center py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
              </li>
            )}
            {/* Show login button when not logged in */}
            {!loading && !user && (
              <li><Link href="/login" className="block w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => setOpen(false)}>Login</Link></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}