import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="bg-black text-white py-10 shadow-xl">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="bg-[#1877F2] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl hover:opacity-80 transition"><FaFacebookF/></a>
          <a href="#" className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl hover:opacity-80 transition"><FaInstagram /></a>
          <a href="#" className="bg-[#1DA1F2] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl hover:opacity-80 transition"><FaTwitter /></a>
          <a href="#" className="bg-[#0A66C2] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl hover:opacity-80 transition"><FaLinkedin /></a>
          <a href="#" className="bg-[#FF0000] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl hover:opacity-80 transition"><FaYoutube /></a>
        </div>
        
        <div className="flex justify-center space-x-10 text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/view-plan" className="hover:text-white transition">View Plans</Link>
          <Link href="/generate-blog" className="hover:text-white transition">Generate Blog</Link>
          <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
        </div>
      </div>
      
      <div className="bg-black py-3 text-center text-gray-300 text-sm"> Copyright ©{new Date().getFullYear()} | Designed by Chetana Solanki</div>
    </footer>
  );
}
