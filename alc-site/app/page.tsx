const gold = "#D4AF37";

export default function Home() {
  const services = [
    {
      title: "Strategic Clarity",
      text: "Every successful project begins with clarity. We help clients understand their current situation, define objectives, identify obstacles and uncover opportunities.",
    },
    {
      title: "Strategic Solution Blueprint",
      text: "We transform complexity into a clear, actionable plan including priorities, resources, stakeholders, opportunities and risks.",
    },
    {
      title: "Implementation Support",
      text: "When required, we help clients move from blueprint to reality through our network of partners, experts and organizations.",
    },
  ];

  const steps = ["Clarity", "Blueprint", "Orchestration", "Results"];

  return (
    <main className="min-h-screen bg-[#08111F] text-white">
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/60 text-xl font-semibold tracking-[0.2em] text-[#D4AF37]">
          ALC
        </div>

        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-slate-300">
          Powered by LES AION
        </p>

        <div className="mb-8 h-[2px] w-32 bg-[#D4AF37]" />

        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
          Alex Logos Consulting
        </h1>

        <h2 className="mb-8 text-2xl text-[#D4AF37] md:text-3xl">
          From Clarity to Results
        </h2>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">
          We help people, businesses and organizations transform complex
          challenges into clear strategies, actionable blueprints and measurable
          outcomes.
        </p>

        <p className="mt-8 text-xl font-medium text-[#D4AF37]">
          Human Clarity. AI-Powered Solution Design. Real-World Results.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-center text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          What We Do
        </p>

        <h2 className="mb-14 text-center text-4xl font-bold">
          From complexity to a clear path forward
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-[#101B2D] p-8 shadow-2xl shadow-black/20"
            >
              <div className="mb-6 h-[2px] w-14 bg-[#D4AF37]" />

              <h3 className="mb-4 text-2xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          How It Works
        </p>

        <h2 className="mb-16 text-4xl font-bold">
          Clarity. Blueprint. Orchestration. Results.
        </h2>

        <div className="grid gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-white/10 p-8">
              <p className="mb-4 text-5xl font-bold text-[#D4AF37]">
                {index + 1}
              </p>

              <p className="text-xl font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#101B2D] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-8 h-[2px] w-32 bg-[#D4AF37]" />

          <h2 className="mb-8 text-4xl font-bold">Powered by LES AION</h2>

          <p className="mb-8 text-lg leading-8 text-slate-300">
            LES AION is the AI Solution Design Engine developed by Alex Logos
            Consulting. It combines human insight, strategic thinking and AI
            orchestration to accelerate research, analysis, planning and
            solution development.
          </p>

          <p className="mb-4 text-xl">
            Human clarity remains at the center of every engagement.
          </p>

          <p className="mb-4 text-xl text-[#D4AF37]">
            Technology serves the mission.
          </p>

          <p className="text-xl">Results remain the objective.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="rounded-3xl border border-[#D4AF37]/40 bg-[#101B2D] p-10 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#D4AF37]/70 text-2xl font-semibold tracking-[0.2em] text-[#D4AF37]">
              OS
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Founder
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
              Meet the Bridge Builder
            </p>

            <h2 className="mb-4 text-4xl font-bold">Oleksandr Shypka</h2>

            <p className="mb-6 text-lg text-[#D4AF37]">
              Founder of Alex Logos Consulting
            </p>

            <p className="mb-6 text-slate-300">
              Bridge Builder | Strategic Advisor | Chief Clarity Officer
            </p>

            <p className="leading-8 text-slate-300">
              Oleksandr helps people and organizations gain clarity, connect
              the right stakeholders and transform ideas into actionable
              solutions. His work combines business, public affairs,
              international partnerships and AI-enabled solution design. With 22
              years of experience across business, government and civil society,
              he has learned that the most powerful solutions emerge when the
              right people gain clarity at the right moment.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-14 text-center">
        <h3 className="mb-2 text-2xl font-semibold">Alex Logos Consulting</h3>

        <p className="mb-2 text-[#D4AF37]">Powered by LES AION</p>

        <p className="mb-6 text-slate-300">From Clarity to Results</p>

        <p className="text-slate-400">les@alexlogos.consulting</p>
      </footer>
    </main>
  );
}