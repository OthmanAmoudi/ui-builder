import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Welcome to UI Builder
        </h1>
        <p className="mt-4 text-lg font-medium">Build, Try, and Innovate</p>
      </header>

      <main className="flex flex-col items-center text-center">
        <div className="w-full max-w-3xl bg-white p-10 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-3xl font-bold">Why use UI Builder?</h2>
          <p className="mt-4 text-lg">
            Unlock a world of fast with our comprehensive builder platform.
            Whether youre a beginner or a pro, we have something for everyone.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Pre-made elements</h3>
              <p className="mt-2 text-sm">
                Engage with realtime drag & drop elements and interactive
                canvas.
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Highly customizable</h3>
              <p className="mt-2 text-sm">
                Apply your styles, the way you need it to be.
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Built for Designers</h3>
              <p className="mt-2 text-sm">
                You dont need to learn to code, just bring your set of design
                tokens
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16">
        <Link
          href="/builder"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started Now
        </Link>
      </footer>
    </div>
  );
}
