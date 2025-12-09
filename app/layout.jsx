import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "SEO Blog Generator",
  description: "Generate SEO-Optimized Blogs using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-20">
        {/* Wrap entire app with AuthProvider - makes user/loading available everywhere */}
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
