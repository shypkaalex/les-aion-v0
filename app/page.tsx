import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white flex items-center justify-center px-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)'}} />
      </div>
      <section className="relative flex flex-col items-center text-center max-w-3xl w-full">
        <Image src="/les-aion-logo.svg" alt="LES AION Logo" width={140} height={140} className="mb-6" />
        <h1 className="text-7xl font-bold tracking-[0.1em] mb-3" style={{color: '#c9a84c'}}>LES AION</h1>
        <div className="flex flex-col items-center gap-2 mb-3">
          <p className="text-xs tracking-[0.3em] uppercase" style={{color: 'rgba(255,255,255,0.35)'}}>Human & Artificial Intelligence One Network</p>
          <div className="w-64 h-px" style={{background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)'}} />
          <p className="text-xs tracking-[0.25em] uppercase" style={{color: 'rgba(201,168,76,0.75)'}}>the bridge between human and ai worlds</p>
        </div>
        <p className="text-sm tracking-wider mb-5" style={{color: 'rgba(255,255,255,0.35)'}}>Human leads. AI amplifies. Together we create.</p>
        <div className="w-16 h-px mb-5" style={{background: 'rgba(201,168,76,0.3)'}} />
        <h2 className="text-4xl font-semibold mb-2" style={{color: '#c9a84c'}}>Return to YourSELF</h2>
        <p className="text-sm leading-relaxed mb-8 max-w-md" style={{color: 'rgba(255,255,255,0.35)'}}>
          Unlock your full potential with AI
        </p>
        <a href="#" className="rounded-full px-7 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber-400/10 hover:text-white" style={{border: '1px solid rgba(201,168,76,0.6)', color: '#c9a84c'}}>
          Follow the Journey
        </a>
      </section>
    </main>
  );
}