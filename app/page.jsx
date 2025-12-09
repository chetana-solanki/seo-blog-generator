import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col text-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-white">

        {/* Left Side Text */}
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold leading-tight"> Generate <span className="text-blue-600">SEO-Optimized Blogs</span> in Seconds. </h2>
          <p className="mt-4 text-lg text-gray-600"> Turn your keywords into high-ranking, optimized blog posts using AI. Boost your website traffic instantly. </p>
          <div className="mt-6">
            <Link href="/generate-blog" className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow" > Generate Blog </Link>
          </div>
        </div>
        
        {/* Right Side Image */}
        <div className="mt-10 md:mt-0 border border-amber-300 p-4 rounded-lg shadow-lg">
          <img src="https://framerusercontent.com/images/RBpHBZtwSkU6uF9GENaXtaZ4ozU.png?width=1792&height=1024" alt="AI Blogging" className="w-72 md:w-96" />
        </div>
      </div>

      {/* Features div */}
      <div className="px-10 py-16">
        <h3 className="text-3xl font-bold text-center">Why Choose Our AI?</h3>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="p-6 border rounded-lg shadow-sm">
            <h4 className="text-xl font-bold mb-2">⚡ Fast Output</h4>
            <p className="text-gray-600">Get a full blog article in under 10 seconds.</p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h4 className="text-xl font-bold mb-2">📈 SEO-Optimized</h4>
            <p className="text-gray-600">Content that ranks higher on Google automatically.</p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h4 className="text-xl font-bold mb-2">💡 GPT-Powered</h4>
            <p className="text-gray-600">Uses GPT to generate high-quality content.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
