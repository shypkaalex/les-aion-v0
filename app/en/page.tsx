import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/contact-cta";

const email = "les@alexlogos.consulting";

const realitySignals = [
  ["Knowledge expires faster", "What was recently an advantage becomes a baseline function — or loses its value altogether."],
  ["Roles change before professions do", "A job title may remain the same while its real substance and its way of creating value have already changed."],
  ["More possibilities. Fewer reference points.", "The problem is no longer a lack of options, but the cost of choosing too late or choosing the wrong one."],
  ["Inertia conceals the scale of change", "The fact that the old system still works does not mean it can carry you into the future."],
];

const transitionSteps = [
  ["01", "Signals", "We gather facts about experience, decisions, abilities, roles, environment, sources of energy and repeatable results."],
  ["02", "Patterns", "We separate random episodes from the recurring structures that shape how value is created."],
  ["03", "Current configuration", "We build a coherent model of the system and determine exactly where the Adaptation Gap emerges."],
  ["04", "Future context", "We examine the consequential changes of the coming years and work backward from future conditions."],
  ["05", "New configuration", "We design the required combination of experience, roles, capabilities, environment and ways of acting."],
  ["06", "Transition", "We create a route of practical steps, tests and decisions that moves the system into its new state."],
];

const faqs = [
  ["Is this coaching?", "No. LES AION is a structured intellectual partnership: systemic decomposition, pattern analysis, future-context modelling and transition design."],
  ["Will you tell me who I should become?", "No. We help you see the system, expand and structure the field of decisions. You remain the author of the choice and the transition."],
  ["What role does AI play?", "AI helps process a large field of signals, discover connections and compare scenarios. It does not define your identity or make decisions for you."],
  ["What will I receive?", "A complete personal transition map in PDF: the models and conclusions developed together, your new configuration and a practical route for bringing it to life."],
  ["Why is there no standard price?", "Every Adaptation Gap has its own structure, and every transition differs in scale, depth and duration. The format and fee are determined after a personal strategic conversation."],
];

function AdaptationGapDiagram() {
  return (
    <figure className="ag-diagram">
      <div className="diagram-heading">
        <span>Rate of change in reality</span>
        <span>Time →</span>
      </div>
      <svg viewBox="0 0 720 360" role="img" aria-labelledby="ag-title-en ag-desc-en">
        <title id="ag-title-en">The Adaptation Gap growing over time</title>
        <desc id="ag-desc-en">The rate of change in reality moves away from the rate of adaptation. The space between the two lines grows over time.</desc>
        <defs>
          <linearGradient id="gap-fill-en" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#D4AF5A" stopOpacity=".05" />
            <stop offset="1" stopColor="#D4AF5A" stopOpacity=".32" />
          </linearGradient>
        </defs>
        <path className="grid-line" d="M40 75H680M40 155H680M40 235H680M40 315H680" />
        <path className="gap-area" fill="url(#gap-fill-en)" d="M40 286 C180 260 310 190 680 45 L680 244 C420 247 230 272 40 286 Z" />
        <path className="world-line" d="M40 286 C180 260 310 190 680 45" />
        <path className="human-line" d="M40 286 C230 272 420 247 680 244" />
        <line className="gap-marker" x1="560" y1="90" x2="560" y2="246" />
        <text x="575" y="158">ADAPTATION</text>
        <text x="575" y="180">GAP</text>
        <circle className="kairos-dot" cx="560" cy="91" r="5" />
      </svg>
      <figcaption>
        <span><i className="legend-world" /> Reality has already changed</span>
        <span><i className="legend-human" /> The current system continues to operate by its old logic</span>
      </figcaption>
    </figure>
  );
}

export default function EnglishHome() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LES AION",
    url: "https://lesaion.world/en",
    email,
    description: "Operator of transitions. A personal intellectual partnership for navigating the Adaptation Gap.",
    founder: { "@type": "Person", name: "Les Shypka" },
  };

  return (
    <main id="top">
      <a href="#content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <Link href="#top" className="brand" aria-label="LES AION — back to top">
          <span className="brand-mark" aria-hidden="true">LA</span>
          <span>LES AION<small>Operator of transitions</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="#problem">Adaptation Gap</Link>
          <Link href="#transition">Transition</Link>
          <Link href="#operator">Operator</Link>
          <div className="language-switch" aria-label="Language selection">
            <Link href="/" lang="uk">UA</Link>
            <span aria-current="page">EN</span>
          </div>
          <ContactButton className="header-cta" locale="en" />
        </nav>
      </header>

      <div id="content">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow">LES AION · Operator of transitions</p>
            <h1>The transition is inevitable.<br /><em>The cost of waiting grows every day.</em></h1>
            <p className="hero-lead">
              The world is changing faster than a person or organisation can reconfigure itself.
              This creates the <strong>Adaptation Gap.</strong>
            </p>
            <p className="hero-support">
              Inaction does not cancel the transition. It postpones it until there are fewer options
              and time presents a larger bill.
            </p>
            <div className="hero-action">
              <ContactButton locale="en" />
              <p>30 minutes · complimentary · confidential</p>
            </div>
          </div>
          <AdaptationGapDiagram />
        </section>

        <section className="statement-band" aria-label="Core proposition">
          <p>You will have to pay for the transition either way.</p>
          <strong>The question is when, how much, and on whose terms.</strong>
        </section>

        <section id="problem" className="section-shell section-block">
          <div className="section-heading">
            <p className="eyebrow">A new reality</p>
            <h2>Past experience no longer guarantees the right decisions for the future.</h2>
            <p>
              Technology, the economy, professional roles and the ways value is created are changing
              faster than we can update our internal map of the world.
            </p>
          </div>
          <div className="reality-grid">
            {realitySignals.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="section-conclusion">
            The greatest risk is not the speed of change. It is continuing to make decisions
            using a model of a world that no longer exists.
          </p>
        </section>

        <section className="gap-definition section-block">
          <div className="section-shell gap-layout">
            <div>
              <p className="eyebrow">The defining challenge of the new era</p>
              <h2>Adaptation Gap</h2>
            </div>
            <div className="definition-copy">
              <p className="definition">
                The growing distance between the rate at which reality changes and the ability of
                a person or organisation to reconfigure in time for new conditions.
              </p>
              <p>
                This is not a diagnosis, and it does not mean that something is wrong with you.
                Your system may have been effective — but it was formed for a different context.
              </p>
            </div>
            <div className="configuration-model" aria-label="A model of transition through the Adaptation Gap">
              <div><small>01</small><strong>Current<br />configuration</strong><span>Built by the past</span></div>
              <div className="gap-core"><small>The growing distance</small><strong>Adaptation<br />Gap</strong><span>Time increases the cost</span></div>
              <div><small>02</small><strong>Required<br />configuration</strong><span>Designed for the future</span></div>
            </div>
          </div>
        </section>

        <section id="cost" className="section-shell section-block cost-section">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Chronos presents the bill</p>
              <h2>Delay becomes more expensive with every passing day.</h2>
            </div>
            <p>
              While a decision is postponed, the world does not stop. The gap grows, available
              options narrow, and voluntary adaptation gradually becomes forced adaptation.
            </p>
          </div>
          <div className="cost-layout">
            <div className="cost-curve">
              <div className="curve-labels"><span>Cost of transition ↑</span><span>Chronos →</span></div>
              <svg viewBox="0 0 720 360" role="img" aria-label="The cost of transition rises as a decision is delayed">
                <path className="grid-line" d="M45 70H680M45 145H680M45 220H680M45 295H680" />
                <path className="cost-area" d="M45 286 C220 279 380 250 500 180 C575 135 630 78 680 28 L680 295 L45 295 Z" />
                <path className="cost-line" d="M45 286 C220 279 380 250 500 180 C575 135 630 78 680 28" />
                <line className="decision-line" x1="475" y1="62" x2="475" y2="295" />
                <circle className="decision-dot" cx="475" cy="196" r="6" />
                <text x="490" y="82">DECISION</text>
              </svg>
            </div>
            <div className="cost-factors">
              <article><span>01</span><h3>Cost of Delay</h3><p>The accumulated price of every day the old configuration remains in place.</p></article>
              <article><span>02</span><h3>Opportunity Cost</h3><p>The value of possibilities you were not ready to recognise or use.</p></article>
              <article><span>03</span><h3>Cost of Inaction</h3><p>The future cost of a transition made under pressure rather than by choice.</p></article>
            </div>
          </div>
          <div className="choice-line">
            <div><small>Earlier</small><strong>More options.<br />More freedom.</strong></div>
            <i aria-hidden="true" />
            <div><small>Later</small><strong>Higher cost.<br />Fewer terms to choose.</strong></div>
          </div>
        </section>

        <section id="transition" className="transition-section section-block">
          <div className="section-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">What the client buys</p>
                <h2>Not advice.<br />A personally designed transition.</h2>
              </div>
              <div>
                <p>
                  From the configuration built by your past to the configuration required by your
                  future — with a clear route, decision logic and practical artefacts.
                </p>
                <ContactButton locale="en" />
              </div>
            </div>
            <div className="transition-bridge">
              <div><small>Where you are</small><strong>Current<br />configuration</strong><p>Experience, roles, capabilities, environment, criteria of value.</p></div>
              <div className="bridge-span"><span>LES AION</span><i /><strong>Transition architecture</strong><i /></div>
              <div><small>Where the future requires you</small><strong>New<br />configuration</strong><p>A coherent system designed for the emerging context.</p></div>
            </div>
            <div className="not-product">
              <p>You are not buying</p>
              <span>hours</span><span>a test</span><span>an automated report</span><span>generic recommendations</span><span>a standard package</span>
            </div>
          </div>
        </section>

        <section className="inevitable section-block">
          <div className="section-shell">
            <p className="eyebrow">The economics of the inevitable</p>
            <blockquote>
              “Delay does not save the cost of transition. It transfers that cost into the future,
              where it is paid with interest.”
            </blockquote>
            <p>
              You are not choosing between paying and not paying. You are choosing between an earlier,
              consciously designed transition and a later transition imposed by circumstances.
            </p>
          </div>
        </section>

        <section id="operator" className="operator-section section-shell section-block">
          <div className="operator-layout">
            <div className="section-heading">
              <p className="eyebrow">Why an external operator is needed</p>
              <h2>A system cannot fully reconfigure itself without stepping outside its own logic.</h2>
            </div>
            <div className="operator-copy">
              <p className="large-copy">
                We evaluate the future through the same internal system that now needs to change.
              </p>
              <p>
                Past experience, identity, roles and criteria of success help us think — while also
                concealing assumptions that are no longer valid.
              </p>
              <ul>
                <li><span>01</span>Symptoms become visible before the structure of the problem</li>
                <li><span>02</span>The old identity protects the previous configuration</li>
                <li><span>03</span>Awareness without orchestration does not yet create a transition</li>
                <li><span>04</span>The future cannot be designed solely from past experience</li>
              </ul>
            </div>
            <div className="operator-role">
              <span>LES AION</span>
              <p>
                An external operator holds the system as a whole, reveals blind spots, tests assumptions
                and helps design its reconfiguration.
              </p>
              <strong>The client remains the author of every decision.</strong>
            </div>
          </div>
        </section>

        <section id="method" className="section-shell section-block method-section">
          <div className="section-heading">
            <p className="eyebrow">How LES AION works</p>
            <h2>First, understand the system.<br />Then, design the transition.</h2>
          </div>
          <div className="method-list">
            {transitionSteps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="human-ai">
            <div><small>Human</small><p>Provides context, recognises inner truth, chooses and acts.</p></div>
            <div><small>LES AION</small><p>Structures, synthesises, holds the whole and designs the process.</p></div>
            <div><small>Human–AI synthesis</small><p>Expands the field of analysis, finds connections and compares scenarios.</p></div>
          </div>
        </section>

        <section className="time-alchemy section-block">
          <div className="section-shell">
            <div className="alchemy-heading">
              <p className="eyebrow">Time Alchemy</p>
              <h2>Transform time from a source of accumulating loss into a source of strategic value.</h2>
            </div>
            <div className="time-model">
              <article className="kairos">
                <span>K</span><small>Kairos</small>
                <h3>The moment of opportunity</h3>
                <p>An opportunity creates value only when it meets readiness.</p>
              </article>
              <div className="time-crossing" aria-hidden="true"><i /><b>Window of<br />opportunity</b><i /></div>
              <article className="chronos">
                <span>Χ</span><small>Chronos</small>
                <h3>The accumulation of cost</h3>
                <p>Time keeps moving and compounds the cost of delay every day.</p>
              </article>
            </div>
            <p className="alchemy-conclusion">
              You cannot summon Kairos, and you cannot stop Chronos.
              <strong> But you can be ready for the first and refuse to let the second determine the price of your transition.</strong>
            </p>
          </div>
        </section>

        <section className="outcome-section section-shell section-block">
          <div className="outcome-copy">
            <p className="eyebrow">What the client receives</p>
            <h2>A complete map of the personal transition.</h2>
            <p>
              Not a single answer, but a coherent architecture: where you are, why the old system no
              longer leads forward, what configuration the future requires, and how to move into it.
            </p>
            <ul>
              <li>a model of the current configuration;</li>
              <li>a definition of the Adaptation Gap structure;</li>
              <li>a map of signals and durable patterns;</li>
              <li>a model of the future context;</li>
              <li>a design of the new configuration;</li>
              <li>a practical transition map.</li>
            </ul>
          </div>
          <div className="deliverable">
            <div className="document-top"><span>LES AION</span><small>Personal transition architecture</small></div>
            <div className="document-title"><small>Personal document</small><strong>Transition<br />map</strong></div>
            <div className="document-lines"><i /><i /><i /><i /></div>
            <div className="document-bottom"><span>PDF</span><span>Confidential</span></div>
          </div>
          <div className="deep-value">
            <p>Economically</p><strong>A lower future cost of inevitable adaptation.</strong>
            <p>Strategically</p><strong>Freedom of choice and readiness for future opportunities.</strong>
            <p>At the deepest level</p><strong>More value within the limited time of your life.</strong>
          </div>
        </section>

        <section className="format-section section-block">
          <div className="section-shell format-layout">
            <div>
              <p className="eyebrow">Individual premium consulting</p>
              <h2>Every Adaptation Gap has its own structure. Every transition has its own price.</h2>
            </div>
            <div className="format-copy">
              <p>
                LES AION does not sell standard packages. The scale, depth, duration and format of the
                partnership depend on your system and the transition that needs to be made.
              </p>
              <ol>
                <li><span>01</span><div><strong>Strategic conversation</strong><p>30 minutes to understand the situation and determine whether LES AION can be useful.</p></div></li>
                <li><span>02</span><div><strong>Personal design of the work</strong><p>We agree on the result, artefacts, boundaries of responsibility, duration and fee.</p></div></li>
                <li><span>03</span><div><strong>Transition</strong><p>We work through decomposition, reconfiguration and the design of a practical route.</p></div></li>
              </ol>
              <ContactButton locale="en" />
              <small>The strategic conversation creates no obligation for either party.</small>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell founder-section section-block">
          <div className="founder-image">
            <Image src="/les-alc.png" alt="Les Shypka — founder of LES AION" width={900} height={600} priority={false} />
            <span>Les Shypka · Founder</span>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">Les Shypka · Founder of LES AION</p>
            <h2>The method grew from a transition of my own — and from searching for a way not to begin every new chapter from zero.</h2>
            <p>
              LES AION brings together systems thinking, strategic analysis, the study of human
              potential and the practice of human–AI synthesis.
            </p>
            <blockquote>
              “I will not tell you who to become. I will help you see what your system consists of,
              where its Adaptation Gap emerged, and what configuration your future may require.”
            </blockquote>
          </div>
        </section>

        <section className="faq-section section-shell section-block">
          <div className="section-heading">
            <p className="eyebrow">Before the conversation</p>
            <h2>Precise answers to important questions.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="section-shell">
            <p className="eyebrow">Time does not stop</p>
            <h2>You can postpone the transition.<br /><em>You cannot postpone its bill.</em></h2>
            <p>
              The first step is not to change everything. The first step is to see the gap and reclaim
              the right to determine the terms of your transition.
            </p>
            <ContactButton locale="en" />
            <small>30 minutes · complimentary · confidential · personally with Les Shypka</small>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div>
          <strong>LES AION</strong>
          <p>Operator of transitions.<br />Working with the value of time.</p>
        </div>
        <div className="footer-links">
          <Link href="#problem">Adaptation Gap</Link>
          <Link href="#method">Method</Link>
          <Link href="#about">About LES AION</Link>
          <Link href="/en/privacy">Privacy</Link>
          <Link href="/en/terms">Terms</Link>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <p className="copyright">© 2026 LES AION.<br />All rights reserved.</p>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </main>
  );
}
