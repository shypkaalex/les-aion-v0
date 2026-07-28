import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/contact-cta";

const email = "les@alexlogos.consulting";

const realitySignals = [
  ["Знання застарівають швидше", "Те, що нещодавно було перевагою, стає базовою функцією або втрачає цінність."],
  ["Ролі змінюються раніше за професії", "Назва посади може залишитися, хоча її реальний зміст і спосіб створення цінності вже інші."],
  ["Можливостей більше. Орієнтирів менше.", "Проблемою стає не відсутність варіантів, а ціна несвоєчасного або неправильного вибору."],
  ["Інерція приховує масштаб змін", "Те, що стара система ще працює, не означає, що вона здатна привести у майбутнє."],
];

const transitionSteps = [
  ["01", "Сигнали", "Збираємо факти про досвід, рішення, здібності, ролі, середовище, джерела енергії та повторювані результати."],
  ["02", "Патерни", "Відокремлюємо випадкові епізоди від закономірностей, які визначають спосіб створення цінності."],
  ["03", "Поточна конфігурація", "Будуємо цілісну модель системи та визначаємо, де саме виник Adaptation Gap."],
  ["04", "Майбутній контекст", "Досліджуємо значущі зміни найближчих років і працюємо від майбутніх умов назад."],
  ["05", "Нова конфігурація", "Проєктуємо потрібне поєднання досвіду, ролей, компетенцій, середовища й способів дії."],
  ["06", "Перехід", "Створюємо маршрут практичних кроків, перевірок і рішень, які переводять систему в новий стан."],
];

const faqs = [
  ["Це коучинг?", "Ні. LES AION — структуроване інтелектуальне партнерство: системна декомпозиція, аналіз патернів, моделювання майбутнього контексту та дизайн переходу."],
  ["Ви скажете, ким мені стати?", "Ні. Ми допомагаємо побачити систему, розширити й структурувати поле рішень. Ви залишаєтеся автором вибору та переходу."],
  ["Яку роль відіграє ШІ?", "ШІ допомагає працювати з великим масивом сигналів, знаходити зв’язки та порівнювати сценарії. Він не визначає вашу ідентичність і не приймає рішення замість вас."],
  ["Що я отримаю?", "Повну персональну карту переходу у PDF: напрацьовані моделі, висновки, нову конфігурацію та практичний маршрут її реалізації."],
  ["Чому немає стандартної ціни?", "Кожен Adaptation Gap має власну структуру, а кожен перехід — різний масштаб, глибину й тривалість. Формат і ціна визначаються після особистої стратегічної розмови."],
];

function AdaptationGapDiagram() {
  return (
    <figure className="ag-diagram">
      <div className="diagram-heading">
        <span>Швидкість змін реальності</span>
        <span>Час →</span>
      </div>
      <svg viewBox="0 0 720 360" role="img" aria-labelledby="ag-title ag-desc">
        <title id="ag-title">Зростання Adaptation Gap у часі</title>
        <desc id="ag-desc">Лінія змін реальності віддаляється від лінії адаптації. Простір між ними з часом збільшується.</desc>
        <defs>
          <linearGradient id="gap-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#D4AF5A" stopOpacity=".05" />
            <stop offset="1" stopColor="#D4AF5A" stopOpacity=".32" />
          </linearGradient>
        </defs>
        <path className="grid-line" d="M40 75H680M40 155H680M40 235H680M40 315H680" />
        <path className="gap-area" d="M40 286 C180 260 310 190 680 45 L680 244 C420 247 230 272 40 286 Z" />
        <path className="world-line" d="M40 286 C180 260 310 190 680 45" />
        <path className="human-line" d="M40 286 C230 272 420 247 680 244" />
        <line className="gap-marker" x1="560" y1="90" x2="560" y2="246" />
        <text x="575" y="158">ADAPTATION</text>
        <text x="575" y="180">GAP</text>
        <circle className="kairos-dot" cx="560" cy="91" r="5" />
      </svg>
      <figcaption>
        <span><i className="legend-world" /> Реальність уже змінилася</span>
        <span><i className="legend-human" /> Поточна система продовжує діяти за старою логікою</span>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LES AION",
    url: "https://lesaion.world",
    email,
    description: "Оператор переходів. Персональне інтелектуальне партнерство для подолання Adaptation Gap.",
    founder: { "@type": "Person", name: "Лес Шипка" },
  };

  return (
    <main id="top">
      <a href="#content" className="skip-link">Перейти до змісту</a>
      <header className="site-header">
        <Link href="#top" className="brand" aria-label="LES AION — на початок">
          <span className="brand-mark" aria-hidden="true">LA</span>
          <span>LES AION<small>Operator of transitions</small></span>
        </Link>
        <nav aria-label="Головна навігація">
          <Link href="#problem">Adaptation Gap</Link>
          <Link href="#transition">Перехід</Link>
          <Link href="#operator">Оператор</Link>
          <ContactButton className="header-cta" />
        </nav>
      </header>

      <div id="content">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow">LES AION · Оператор переходів</p>
            <h1>Перехід неминучий.<br /><em>Ціна очікування зростає щодня.</em></h1>
            <p className="hero-lead">
              Світ змінюється швидше, ніж людина або організація встигає змінити власну конфігурацію.
              Так виникає <strong>Adaptation Gap — розрив адаптації.</strong>
            </p>
            <p className="hero-support">
              Бездіяльність не скасовує перехід. Вона відкладає його до моменту, коли вибору стає менше,
              а рахунок часу — більшим.
            </p>
            <div className="hero-action">
              <ContactButton />
              <p>30 хвилин · безкоштовно · конфіденційно</p>
            </div>
          </div>
          <AdaptationGapDiagram />
        </section>

        <section className="statement-band" aria-label="Головна теза">
          <p>Заплатити за перехід усе одно доведеться.</p>
          <strong>Питання — коли, скільки і на чиїх умовах.</strong>
        </section>

        <section id="problem" className="section-shell section-block">
          <div className="section-heading">
            <p className="eyebrow">Нова реальність</p>
            <h2>Досвід минулого більше не гарантує правильних рішень для майбутнього.</h2>
            <p>
              Технології, економіка, професійні ролі та способи створення цінності змінюються швидше,
              ніж ми встигаємо оновити власну карту світу.
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
            Найбільший ризик — не швидкість змін. Найбільший ризик — продовжувати приймати рішення
            за моделлю світу, якого більше не існує.
          </p>
        </section>

        <section className="gap-definition section-block">
          <div className="section-shell gap-layout">
            <div>
              <p className="eyebrow">Головний виклик нової епохи</p>
              <h2>Adaptation Gap</h2>
            </div>
            <div className="definition-copy">
              <p className="definition">
                Зростаючий розрив між швидкістю змін реальності та здатністю людини або організації
                своєчасно змінити власну конфігурацію відповідно до нових умов.
              </p>
              <p>
                Це не діагноз і не свідчення, що з вами щось не так. Ваша система могла бути
                ефективною — але формувалася для іншого контексту.
              </p>
            </div>
            <div className="configuration-model" aria-label="Модель переходу через Adaptation Gap">
              <div><small>01</small><strong>Поточна<br />конфігурація</strong><span>Створена минулим</span></div>
              <div className="gap-core"><small>Зростаючий розрив</small><strong>Adaptation<br />Gap</strong><span>Час збільшує ціну</span></div>
              <div><small>02</small><strong>Потрібна<br />конфігурація</strong><span>Відповідає майбутньому</span></div>
            </div>
          </div>
        </section>

        <section id="cost" className="section-shell section-block cost-section">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Хронос виставляє рахунок</p>
              <h2>Зволікання коштує дорожче з кожним днем.</h2>
            </div>
            <p>
              Поки рішення відкладається, світ не зупиняється. Розрив зростає, доступні варіанти
              звужуються, а добровільна адаптація поступово стає вимушеною.
            </p>
          </div>
          <div className="cost-layout">
            <div className="cost-curve">
              <div className="curve-labels">
                <span>Ціна переходу ↑</span><span>Хронос →</span>
              </div>
              <svg viewBox="0 0 660 390" role="img" aria-labelledby="cost-title cost-desc">
                <title id="cost-title">Ціна переходу зростає в часі</title>
                <desc id="cost-desc">Крива переходить від своєчасного рішення через відкладений до вимушеного переходу з меншою свободою вибору.</desc>
                <path className="cost-grid" d="M50 55V335H625M50 265H625M50 195H625M50 125H625" />
                <path className="curve-shadow" d="M55 315 C255 305 420 250 600 70" />
                <path className="curve-main" d="M55 315 C255 305 420 250 600 70" />
                <g className="curve-point"><circle cx="150" cy="304" r="7" /><text x="114" y="350">Сьогодні</text></g>
                <g className="curve-point"><circle cx="375" cy="263" r="7" /><text x="337" y="350">Пізніше</text></g>
                <g className="curve-point forced"><circle cx="565" cy="105" r="7" /><text x="495" y="350">Вимушено</text></g>
              </svg>
              <p>Чим пізніше починається перехід, тим більше ресурсів він може потребувати — і тим менше рішень може залишитися.</p>
            </div>
            <div className="cost-list">
              <article><span>01</span><div><h3>Cost of Delay</h3><p>Ціна кожного дня, місяця або року відкладеного рішення.</p></div></article>
              <article><span>02</span><div><h3>Opportunity Cost</h3><p>Цінність можливостей, які були доступні, але не могли бути використані.</p></div></article>
              <article><span>03</span><div><h3>Cost of Inaction</h3><p>Сукупний рахунок за збереження конфігурації, що вже не відповідає реальності.</p></div></article>
            </div>
          </div>
        </section>

        <section className="inevitable section-block">
          <div className="section-shell">
            <p className="eyebrow">Неминучість переходу</p>
            <blockquote>
              «Бездіяльність не зберігає поточний стан. Вона лише дозволяє часу й обставинам
              визначити майбутню ціну замість вас».
            </blockquote>
            <div className="choice-line">
              <div><small>Раніше</small><strong>Власне рішення</strong><span>Більше варіантів · менша ціна · ваші умови</span></div>
              <i aria-hidden="true" />
              <div><small>Пізніше</small><strong>Вимушена реакція</strong><span>Менше варіантів · більша ціна · зовнішній тиск</span></div>
            </div>
          </div>
        </section>

        <section id="transition" className="section-shell section-block transition-section">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Продукт — перехід</p>
              <h2>Не наздоганяти зміни. Перейти раніше — на власних умовах.</h2>
            </div>
            <div>
              <p>
                Клієнт LES AION не купує години консультацій, готову пораду чи автоматичний звіт.
                Він інвестує у персонально спроєктований перехід.
              </p>
              <ContactButton />
            </div>
          </div>
          <div className="transition-bridge">
            <div><small>Звідки</small><strong>Поточна конфігурація</strong><span>Дедалі менше відповідає реальності</span></div>
            <div className="bridge-span"><span>Інтелектуальне партнерство</span><i /><b>Перехід</b><i /></div>
            <div><small>Куди</small><strong>Нова конфігурація</strong><span>Готова використовувати можливості</span></div>
          </div>
        </section>

        <section id="operator" className="operator-section section-block">
          <div className="section-shell operator-layout">
            <div className="operator-title">
              <p className="eyebrow">Навіщо потрібен оператор</p>
              <h2>Системі важко перебудувати себе, не вийшовши за межі власної логіки.</h2>
            </div>
            <div className="operator-copy">
              <p className="large-copy">
                Ми оцінюємо майбутнє за допомогою тієї самої внутрішньої системи, яку потрібно змінити.
              </p>
              <p>
                Попередній досвід, ідентичність, ролі та критерії успіху одночасно допомагають нам
                мислити — і приховують припущення, що вже втратили актуальність.
              </p>
              <ul>
                <li><span>01</span>Симптоми видно раніше, ніж структуру проблеми</li>
                <li><span>02</span>Стара ідентичність захищає попередню конфігурацію</li>
                <li><span>03</span>Усвідомлення без оркестрації ще не створює переходу</li>
                <li><span>04</span>Майбутнє неможливо спроєктувати лише з досвіду минулого</li>
              </ul>
            </div>
            <div className="operator-role">
              <span>LES AION</span>
              <p>
                Зовнішній оператор утримує систему цілісно, виявляє сліпі зони, перевіряє припущення
                та допомагає спроєктувати реконфігурацію.
              </p>
              <strong>Клієнт залишається автором рішень.</strong>
            </div>
          </div>
        </section>

        <section id="method" className="section-shell section-block method-section">
          <div className="section-heading">
            <p className="eyebrow">Як працює LES AION</p>
            <h2>Спочатку зрозуміти систему.<br />Потім проєктувати перехід.</h2>
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
            <div><small>Людина</small><p>Надає контекст, розпізнає внутрішню правду, обирає та діє.</p></div>
            <div><small>LES AION</small><p>Структурує, синтезує, утримує цілісність і проєктує процес.</p></div>
            <div><small>Синтез людини і ШІ</small><p>Розширює поле аналізу, знаходить зв’язки й порівнює сценарії.</p></div>
          </div>
        </section>

        <section className="time-alchemy section-block">
          <div className="section-shell">
            <div className="alchemy-heading">
              <p className="eyebrow">Time Alchemy · Часова алхімія</p>
              <h2>Перетворити час із джерела накопичуваних втрат на джерело стратегічної цінності.</h2>
            </div>
            <div className="time-model">
              <article className="kairos">
                <span>K</span><small>Кайрос</small>
                <h3>Момент можливості</h3>
                <p>Можливість створює цінність лише тоді, коли зустрічається з готовністю.</p>
              </article>
              <div className="time-crossing" aria-hidden="true"><i /><b>Вікно<br />можливості</b><i /></div>
              <article className="chronos">
                <span>Χ</span><small>Хронос</small>
                <h3>Накопичення ціни</h3>
                <p>Час продовжує рух і щодня капіталізує вартість зволікання.</p>
              </article>
            </div>
            <p className="alchemy-conclusion">
              Ви не можете викликати Кайрос і не можете зупинити Хроноса.
              <strong> Але можете бути готовими до першого й не дозволити другому визначити ціну вашого переходу.</strong>
            </p>
          </div>
        </section>

        <section className="outcome-section section-shell section-block">
          <div className="outcome-copy">
            <p className="eyebrow">Що купує клієнт</p>
            <h2>Повну карту персонального переходу.</h2>
            <p>
              Не одну відповідь, а цілісну архітектуру: де ви є, чому стара система більше не веде
              вперед, якої конфігурації потребує майбутнє і як перейти до неї.
            </p>
            <ul>
              <li>модель поточної конфігурації;</li>
              <li>визначення структури Adaptation Gap;</li>
              <li>карта сигналів і стійких патернів;</li>
              <li>модель майбутнього контексту;</li>
              <li>проєкт нової конфігурації;</li>
              <li>практична карта переходу.</li>
            </ul>
          </div>
          <div className="deliverable">
            <div className="document-top"><span>LES AION</span><small>Personal transition architecture</small></div>
            <div className="document-title"><small>Персональний документ</small><strong>Карта<br />переходу</strong></div>
            <div className="document-lines"><i /><i /><i /><i /></div>
            <div className="document-bottom"><span>PDF</span><span>Конфіденційно</span></div>
          </div>
          <div className="deep-value">
            <p>Економічно</p><strong>Менша майбутня ціна неминучої адаптації.</strong>
            <p>Стратегічно</p><strong>Свобода вибору й готовність до майбутніх можливостей.</strong>
            <p>На найглибшому рівні</p><strong>Більше цінності в обмеженому часі вашого життя.</strong>
          </div>
        </section>

        <section className="format-section section-block">
          <div className="section-shell format-layout">
            <div>
              <p className="eyebrow">Індивідуальний преміум-консалтинг</p>
              <h2>Кожен Adaptation Gap має власну структуру. Кожен перехід — власну ціну.</h2>
            </div>
            <div className="format-copy">
              <p>
                LES AION не продає стандартні пакети. Масштаб, глибина, тривалість і формат
                партнерства залежать від вашої системи та переходу, який потрібно здійснити.
              </p>
              <ol>
                <li><span>01</span><div><strong>Стратегічна розмова</strong><p>30 хвилин, щоб зрозуміти ситуацію й визначити, чи може LES AION бути корисним.</p></div></li>
                <li><span>02</span><div><strong>Персональний дизайн роботи</strong><p>Узгоджуємо результат, артефакти, межі відповідальності, тривалість і ціну.</p></div></li>
                <li><span>03</span><div><strong>Перехід</strong><p>Проходимо декомпозицію, реконфігурацію та дизайн практичного маршруту.</p></div></li>
              </ol>
              <ContactButton />
              <small>Стратегічна розмова не створює зобов’язань для жодної зі сторін.</small>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell founder-section section-block">
          <div className="founder-image">
            <Image src="/les-alc.png" alt="Лес Шипка — засновник LES AION" width={900} height={600} priority={false} />
            <span>Les Shypka · Founder</span>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">Лес Шипка · Засновник LES AION</p>
            <h2>Метод виник із власного переходу — і пошуку способу не починати кожен новий етап із нуля.</h2>
            <p>
              LES AION поєднує системне мислення, стратегічний аналіз, дослідження людського
              потенціалу та практику синтезу людини і ШІ.
            </p>
            <blockquote>
              «Я не скажу вам, ким бути. Я допоможу побачити, з чого складається ваша система,
              де виник її Adaptation Gap і якою може бути конфігурація, потрібна вашому майбутньому».
            </blockquote>
          </div>
        </section>

        <section className="faq-section section-shell section-block">
          <div className="section-heading">
            <p className="eyebrow">Перед розмовою</p>
            <h2>Точні відповіді на важливі запитання.</h2>
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
            <p className="eyebrow">Час не зупиняється</p>
            <h2>Перехід можна відкладати.<br /><em>Його рахунок — ні.</em></h2>
            <p>
              Перший крок — не змінювати все. Перший крок — побачити розрив і повернути собі право
              визначити умови переходу.
            </p>
            <ContactButton />
            <small>30 хвилин · безкоштовно · конфіденційно · особисто з Лесем Шипкою</small>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div>
          <strong>LES AION</strong>
          <p>Оператор переходів.<br />Працюємо з вартістю часу.</p>
        </div>
        <div className="footer-links">
          <Link href="#problem">Adaptation Gap</Link>
          <Link href="#method">Метод</Link>
          <Link href="#about">Про LES AION</Link>
          <Link href="/privacy">Конфіденційність</Link>
          <Link href="/terms">Умови</Link>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <p className="copyright">© 2026 LES AION.<br />Усі права захищено.</p>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </main>
  );
}
