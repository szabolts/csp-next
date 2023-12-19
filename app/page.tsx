import Link from "next/link";


export default function Home() {
  return (
    <main>
      <div
        id="home"
        className="flex flex-col justify-center items-center h-screen"
      >
        <h1 className="text-9xl text-center font-bold  pb-6 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          Cutting Edge Optimizer
        </h1>
        <h3 className="max-w-4xl text-4xl text-center pb-6 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          In the world of precision and efficiency, our algorithm slices through
          complexity, redefining the art of optimal cutting solutions.
        </h3>
        <Link href="/csp">
        <button  className="text-2xl bg-gradient-to-tl from-purple-600 to-blue-500 hover:from-green-300 hover:via-blue-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
          Get started for Free
        </button>
        </Link>
      </div>
      <div
        id="features"
        className="flex flex-row justify-center items-center h-screen"
      >
        <h1 className="text-6xl">Szanaszét wág</h1>
      </div>
      <div
        id="pricing"
        className="flex flex-row justify-center items-center h-screen"
      >
        <h1 className="text-6xl">Kurvadrága</h1>
      </div>
      <div
        id="contactus"
        className="flex flex-row justify-center items-center h-screen"
      >
        <h1 className="text-6xl">Irsz kurva</h1>
      </div>
    </main>
  );
}
