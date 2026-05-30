import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        
        <Image
  src="/les-aion-logo.svg"
  alt="LES AION Logo"
  width={180}
  height={180}
  className="mb-8"
/>

        <h1 className="mb-4 text-6xl font-bold tracking-wide">
          LES AION
        </h1>

        <p className="mb-2 text-xl text-amber-300">
          Artificial Intelligence One Network
        </p>

        <p className="mb-8 max-w-2xl text-lg text-slate-300">
          Human leads. AI amplifies. Together we create.
        </p>

        <h2 className="mb-4 text-4xl font-semibold">
          Return to YourSELF
        </h2>

        <p className="mb-10 max-w-3xl text-slate-400">
          The Human-AI Co-Creation Method
        </p>

        <div className="flex gap-4">
          

          <button className="rounded-full border border-amber-400 px-6 py-3 text-amber-400">
            Follow the Journey
          </button>
        </div>

      </section>
    </main>
  );
}