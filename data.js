// Hallucination Hunter - Scenario Dataset & Recombination Engine

const SCENARIOS = [
  // ==========================================
  // SAFE CATEGORY (12 Scenarios)
  // ==========================================
  {
    id: "safe_01",
    type: "statistics",
    contentCategory: "Safe",
    text: "According to the U.S. Bureau of Labor Statistics, employment of software developers is projected to grow 25 percent from 2022 to 2032, much faster than the average for all occupations.",
    correctAnswer: "Safe",
    difficulty: "easy",
    redFlags: ["None"],
    explanation: "This statement references a reputable, real government agency (U.S. Bureau of Labor Statistics) and cites a standard, realistic growth projection (25%) over a typical 10-year period.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "safe_02",
    type: "quotes",
    contentCategory: "Safe",
    text: "In his 1995 book 'The Road Ahead', Bill Gates wrote: 'The Internet is a tidal wave. It rules the rules.'",
    correctAnswer: "Safe",
    difficulty: "easy",
    redFlags: ["None"],
    explanation: "The quote is historically accurate. Bill Gates wrote 'The Road Ahead' in 1995 and wrote a famous internal memo comparing the Internet to a tidal wave that year.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "safe_03",
    type: "source references",
    contentCategory: "Safe",
    text: "Research published in Nature (2021) suggests that deep learning models can assist radiologists in detecting microcalcifications in mammography scans, though human verification remains essential.",
    correctAnswer: "Safe",
    difficulty: "easy",
    redFlags: ["None"],
    explanation: "This references a well-known scientific journal ('Nature'), notes a modest, realistic claim ('can assist' rather than 'replaces'), and includes a realistic qualifier ('human verification is essential').",
    points: 100,
    timeLimit: 15
  },
  {
    id: "safe_04",
    type: "product claims",
    contentCategory: "Safe",
    text: "Our email marketing platform offers up to 99% uptime, automated list segmentation, and API integration. Individual deliverability rates depend on user sender reputation and domain setup.",
    correctAnswer: "Safe",
    difficulty: "easy",
    redFlags: ["None"],
    explanation: "The uptime is realistic (99% instead of 100%), and the disclaimer openly states that success depends on external variables, which is standard for credible products.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "safe_05",
    type: "customer testimonials",
    contentCategory: "Safe",
    text: "Developer feedback: 'Implementing this library reduced our API latency by about 15% on average, though we had to adjust our caching headers to make it work smoothly.'",
    correctAnswer: "Safe",
    difficulty: "medium",
    redFlags: ["None"],
    explanation: "A standard, balanced testimonial. A 15% speed improvement is highly plausible, and mentioning a minor technical challenge adds to its credibility.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "safe_06",
    type: "expert statements",
    contentCategory: "Safe",
    text: "Dr. Aris Thorne, Professor of Computer Science at Carnegie Mellon, noted: 'While transformer architectures have drastically improved language modeling, they remain prone to generating incorrect information.'",
    correctAnswer: "Safe",
    difficulty: "medium",
    redFlags: ["None"],
    explanation: "This references a real university, a real concept (transformer architecture), and makes a scientifically accepted, neutral statement about language models.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "safe_07",
    type: "news snippets",
    contentCategory: "Safe",
    text: "European regulators today announced a preliminary antitrust investigation into several prominent cloud hosting providers regarding data egress fees and contract lock-ins.",
    correctAnswer: "Safe",
    difficulty: "medium",
    redFlags: ["None"],
    explanation: "This is a realistic regulatory action. It is stated objectively and describes standard issues in cloud infrastructure (egress fees and lock-ins) without sensationalism.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "safe_08",
    type: "performance metrics",
    contentCategory: "Safe",
    text: "Under peak synthetic load (10,000 concurrent websocket connections), the system CPU usage averaged 72% with a p99 response time of 142ms.",
    correctAnswer: "Safe",
    difficulty: "medium",
    redFlags: ["None"],
    explanation: "The metrics are engineering-appropriate. Response times and CPU utilization are listed within realistic performance bounds under load.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "safe_09",
    type: "research snippets",
    contentCategory: "Safe",
    text: "A double-blind study of 250 participants published in the Journal of Sleep Research found that screen time within 30 minutes of sleeping correlated with an average 12-minute delay in sleep onset.",
    correctAnswer: "Safe",
    difficulty: "hard",
    redFlags: ["None"],
    explanation: "The sample size (250) is realistic, the journal is appropriate, and the result (12 minutes delay) is modest and statistically plausible rather than an exaggerated claim.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "safe_10",
    type: "blog claims",
    contentCategory: "Safe",
    text: "While static site generators improve load times and simplify hosting, developers should keep in mind that dynamic features like comments and searches require client-side APIs or serverless functions.",
    correctAnswer: "Safe",
    difficulty: "hard",
    redFlags: ["None"],
    explanation: "A technically sound statement that weighs pros and cons accurately, acknowledging both the benefits and limitations of static sites.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "safe_11",
    type: "expert statements",
    contentCategory: "Safe",
    text: "A panel of cybersecurity experts at the RSA Conference concluded that while multi-factor authentication (MFA) stops over 90% of automated account takeover attacks, it remains vulnerable to targeted session hijacking.",
    correctAnswer: "Safe",
    difficulty: "hard",
    redFlags: ["None"],
    explanation: "This states realistic security statistics (90% rather than 100% protection) and identifies a known vulnerability (session hijacking) without exaggeration.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "safe_12",
    type: "statistics",
    contentCategory: "Safe",
    text: "A survey of 1,200 remote knowledge workers conducted by McKinsey & Company in 2023 indicated that 58% of respondents reported working from home at least one day a week.",
    correctAnswer: "Safe",
    difficulty: "hard",
    redFlags: ["None"],
    explanation: "The sample size (1,200) is standard, the surveyor (McKinsey) is reputable, and the percentage (58%) is inline with public trends for remote work during that year.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "safe_13",
    type: "research snippets",
    contentCategory: "Safe",
    text: "A study in environmental science journals found that modern carbon-capture units can filter 85% to 90% of CO2 emissions from power plant exhaust under steady-state laboratory conditions.",
    correctAnswer: "Safe",
    difficulty: "easy",
    redFlags: ["None"],
    explanation: "The filter rate (85-90%) is realistic for industrial capture technologies and explicitly bounds the claim to 'steady-state laboratory conditions' rather than asserting 100% field effectiveness.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "safe_14",
    type: "product claims",
    contentCategory: "Safe",
    text: "Version 4.2 of our open-source routing library contains benchmark updates showing an average 12% improvement in serialization throughput for JSON payloads under 50KB.",
    correctAnswer: "Safe",
    difficulty: "easy",
    redFlags: ["None"],
    explanation: "This release claim is moderate (12% increase) and specifies a constraint (JSON payloads under 50KB) which is common for legitimate technical performance disclosures.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "safe_15",
    type: "standards references",
    contentCategory: "Safe",
    text: "The W3C Web Content Accessibility Guidelines (WCAG) 2.1 recommend a minimum contrast ratio of 4.5:1 for normal text to satisfy AA compliance requirements.",
    correctAnswer: "Safe",
    difficulty: "medium",
    redFlags: ["None"],
    explanation: "This matches the official W3C standards document for AA accessibility rating, citing a real organization and correct numerical standards.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "safe_16",
    type: "blog claims",
    contentCategory: "Safe",
    text: "While hosting static sites on content delivery networks (CDNs) improves raw page load latency, developers must implement serverless functions or API gateways to handle dynamic form processing.",
    correctAnswer: "Safe",
    difficulty: "medium",
    redFlags: ["None"],
    explanation: "This is a balanced technical blog claim that accurately outlines architectural trade-offs between static CDN hosting and dynamic form features.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "safe_17",
    type: "news snippets",
    contentCategory: "Safe",
    text: "The National Institute of Standards and Technology (NIST) released updated guidelines for password policy, suggesting organizations focus on length and stop requiring arbitrary character changes.",
    correctAnswer: "Safe",
    difficulty: "medium",
    redFlags: ["None"],
    explanation: "This is a factually correct news/policy snippet. The NIST Special Publication 800-63B indeed advises length over complexity rules.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "safe_18",
    type: "historical statements",
    contentCategory: "Safe",
    text: "In 1951, computer pioneer Grace Hopper wrote the A-0 compiler, which translated symbolic mathematical code into binary machine instructions on the UNIVAC I.",
    correctAnswer: "Safe",
    difficulty: "hard",
    redFlags: ["None"],
    explanation: "This statement is historically accurate. Grace Hopper designed the A-0 system (often called the first compiler/linker) in the early 1950s for the UNIVAC computer.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "safe_19",
    type: "hardware specifications",
    contentCategory: "Safe",
    text: "The latest PCI Express Gen 4 solid-state drive lists a maximum sequential read speed of 7,300 megabytes per second (MB/s) under synthetic benchmark conditions.",
    correctAnswer: "Safe",
    difficulty: "hard",
    redFlags: ["None"],
    explanation: "This is within the physical performance limits of PCIe Gen 4 x4 storage controllers, and accurately notes that speeds are measured under synthetic benchmark conditions.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "safe_20",
    type: "research snippets",
    contentCategory: "Safe",
    text: "Pew Research Center's 2023 survey indicated that roughly 72% of U.S. adults report using some form of social media, with usage distribution skewed by age groups.",
    correctAnswer: "Safe",
    difficulty: "hard",
    redFlags: ["None"],
    explanation: "The statistic (72%) aligns with real public data reports from Pew Research, and the qualifier about age demographics indicates standard statistical modeling.",
    points: 300,
    timeLimit: 7
  },

  // ==========================================
  // FAKE STAT CATEGORY (12 Scenarios)
  // ==========================================
  {
    id: "stat_01",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A comprehensive market analysis shows that 127% of modern organizations have adopted cloud-native databases to store their system telemetry.",
    correctAnswer: "Fake Stat",
    difficulty: "easy",
    redFlags: ["Mathematically impossible percentage (127%)"],
    explanation: "A percentage cannot exceed 100% in a context measuring adoption rate within a finite set of companies.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "stat_02",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A 2024 global survey discovered that exactly 74.83910294% of all internet users prefer dark mode because it decreases eye strain by precisely 80%.",
    correctAnswer: "Fake Stat",
    difficulty: "easy",
    redFlags: ["Suspiciously precise decimal (8 decimal places)", "Implausibly round health claim (precisely 80%)"],
    explanation: "Over-precision in survey statistics (8 decimal places) is a common hallucination/fabrication trait. Real statistical surveys account for margins of error and round to 1 or 2 decimals.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "stat_03",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "Our developer productivity report found that introducing our new keyboard layout reduces typing fatigue by -40% globally.",
    correctAnswer: "Fake Stat",
    difficulty: "easy",
    redFlags: ["Negative percentage representing a reduction in a negative state"],
    explanation: "Saying a reduction of -40% mathematically means fatigue *increased* by 40% (a double negative). This is an algebraic or semantic error common in generated statistics.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "stat_04",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "Research indicates that 0.00003% of businesses generate 99.99997% of all online revenue, leaving exactly 0.00% for the remaining millions of companies.",
    correctAnswer: "Fake Stat",
    difficulty: "easy",
    redFlags: ["Extreme, mathematically absurd wealth distribution values", "Assertion that millions of companies make exactly 0.00%"],
    explanation: "While wealth distribution is uneven, stating that millions of businesses make exactly 0.00% is mathematically and factually absurd.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "stat_05",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A study conducted on 5 active users revealed that 95% of software developers experience severe burnout before their second year in the industry.",
    correctAnswer: "Fake Stat",
    difficulty: "medium",
    redFlags: ["Sample size is too small to yield the claimed percentage"],
    explanation: "A sample size of 5 users can only yield percentages in increments of 20% (e.g. 0%, 20%, 40%, 60%, 80%, 100%). It is mathematically impossible to get 95% from 5 users.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "stat_06",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "By switching to our microservices pipeline, client sites observed a 10,000% decrease in server response latency, reducing average response times from 200ms to 2ms.",
    correctAnswer: "Fake Stat",
    difficulty: "medium",
    redFlags: ["Mathematical latency percentage mismatch", "Decrease exceeding 100%"],
    explanation: "A decrease of 10,000% is impossible for positive metrics like latency. A 100% decrease would mean latency is exactly 0ms. Going from 200ms to 2ms is a 99% decrease.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "stat_07",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "An internal audit showed that our AI search engine answers queries in 0.00000001 seconds, which is 100 times faster than the speed of light in optical fibers.",
    correctAnswer: "Fake Stat",
    difficulty: "medium",
    redFlags: ["Physical impossibility (exceeding the speed of light)"],
    explanation: "No computer network or processor can transmit or compute queries faster than the speed of light. 0.01 nanoseconds is faster than light can cross a computer chip.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "stat_08",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "According to a hardware review, the new processor contains 40 billion transistors per square nanometer, allowing it to run at 750 GHz without cooling.",
    correctAnswer: "Fake Stat",
    difficulty: "medium",
    redFlags: ["Impossible transistor density", "Absurd clock speed (750 GHz) with passive cooling"],
    explanation: "Silicon atoms are about 0.2 nanometers in diameter. Storing 40 billion transistors in one square nanometer violates the fundamental physics of matter. Current top CPUs run around 5-6 GHz.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "stat_09",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A telecom survey reported that 88% of people own an iPhone, 45% own an Android, and 27% own a basic phone, indicating a total market adoption of 160% in the region.",
    correctAnswer: "Fake Stat",
    difficulty: "hard",
    redFlags: ["Exclusive choice percentages summing to over 100% without explanation"],
    explanation: "If the survey asks about primary phone ownership, the sum cannot exceed 100%. Even if multi-ownership is allowed, stating it indicates a 'market adoption of 160%' reveals a logical error.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "stat_10",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A security firm estimated that 11 out of 10 commercial websites suffer from basic cross-site scripting vulnerabilities in their search bars.",
    correctAnswer: "Fake Stat",
    difficulty: "hard",
    redFlags: ["Mathematically impossible fraction (11 out of 10)"],
    explanation: "A subset (vulnerable sites) cannot be larger than the total set of commercial websites (11 cannot be chosen out of 10).",
    points: 300,
    timeLimit: 7
  },
  {
    id: "stat_11",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "Data centers consumed 105% of all electricity generated in Ireland last year, forcing the country to import additional power to run basic municipal grids.",
    correctAnswer: "Fake Stat",
    difficulty: "hard",
    redFlags: ["Logically impossible consumption share of total generation"],
    explanation: "Data centers cannot consume 105% of the total electricity generated *in* a country unless there is a massive export/import calculation error. Even with imports, the consumption is a fraction of the *available* power, not over 100% of generated power.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "stat_12",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "Our data compression algorithm achieves a 102% file size reduction, turning a 10MB image file into a -200KB index structure.",
    correctAnswer: "Fake Stat",
    difficulty: "hard",
    redFlags: ["Reduction exceeding 100%", "Negative file size (-200KB)"],
    explanation: "A file cannot have a negative size. A 100% reduction would reduce the file to 0 bytes; going beyond 100% is mathematically impossible in storage science.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "stat_13",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A cloud provider's marketing campaign promises a database cluster with exactly 100.0000000000% absolute uptime, guaranteed by zero hardware decay.",
    correctAnswer: "Fake Stat",
    difficulty: "easy",
    redFlags: ["Suspiciously precise decimal precision (10 decimals)", "Asserting absolute zero hardware decay"],
    explanation: "No physical computer network can achieve absolute 100.0000000000% uptime indefinitely. High precision decimals in marketing claims indicate an artificial or simulated stat.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "stat_14",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A survey of modern developers reports that 9 out of 8 software teams prefer using Git over SVN for project version control.",
    correctAnswer: "Fake Stat",
    difficulty: "easy",
    redFlags: ["Mathematically impossible fraction (9 out of 8)"],
    explanation: "A fraction expressing subset representation cannot have a numerator larger than the denominator (you cannot select 9 teams out of a total pool of 8).",
    points: 100,
    timeLimit: 15
  },
  {
    id: "stat_15",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "By utilizing our predictive optimization algorithms, your client-side mobile network latency will decrease to -5ms.",
    correctAnswer: "Fake Stat",
    difficulty: "medium",
    redFlags: ["Physical/logical impossibility (negative latency)"],
    explanation: "Latency represents time elapsed. A negative latency value (-5ms) implies receiving data before it was sent, violating causality physics.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "stat_16",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "Our global census report states that exactly 150% of the world's population currently owns a smartphone with active cellular data plans.",
    correctAnswer: "Fake Stat",
    difficulty: "medium",
    redFlags: ["Mathematically impossible percentage (exceeding 100% of a population)"],
    explanation: "While individuals can own multiple devices, smartphone ownership rate as a percentage of the total human population cannot exceed 100% (everyone owning a device is 100%).",
    points: 200,
    timeLimit: 10
  },
  {
    id: "stat_17",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "Upgrading to the new server compiler resulted in a 1,000,000% reduction in source compilation time, turning minutes into microseconds.",
    correctAnswer: "Fake Stat",
    difficulty: "medium",
    redFlags: ["Reduction percentage exceeding 100%"],
    explanation: "A percentage reduction of a positive quantity like time cannot exceed 100%. A 100% reduction would mean it takes exactly zero seconds; a 1,000,000% reduction is mathematically nonsensical.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "stat_18",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "A hardware startup claims that their graphene-based battery prototype can charge from 0% to 100% in -10 minutes using a standard charger.",
    correctAnswer: "Fake Stat",
    difficulty: "hard",
    redFlags: ["Time duration cannot be negative (-10 minutes)"],
    explanation: "Charging duration is a physical time interval. Expressing it as a negative value (-10 minutes) is physically impossible.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "stat_19",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "In a user study consisting of 4 active focus testers, exactly 88.5% of the developers reported a noticeable decrease in context-switching overhead.",
    correctAnswer: "Fake Stat",
    difficulty: "hard",
    redFlags: ["Percentage fraction mismatch with small sample size"],
    explanation: "With a sample size of 4 testers, possible percentage increments are restricted to 25% steps (0%, 25%, 50%, 75%, 100%). Getting 88.5% is mathematically impossible.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "stat_20",
    type: "statistics",
    contentCategory: "Fake Stat",
    text: "Our test unit achieved a temperature of 0 Kelvin while simultaneously outputting a continuous 500 Watts of thermal energy into the exhaust environment.",
    correctAnswer: "Fake Stat",
    difficulty: "hard",
    redFlags: ["Violates laws of thermodynamics"],
    explanation: "An object at absolute zero (0 Kelvin) has zero thermal energy and cannot heat or output thermal energy to its surroundings.",
    points: 300,
    timeLimit: 7
  },

  // ==========================================
  // FAKE QUOTE CATEGORY (12 Scenarios)
  // ==========================================
  {
    id: "quote_01",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "As Abraham Lincoln remarked in an 1862 letter: 'The main trouble with internet testimonials is that people accept them as absolute truth without verification.'",
    correctAnswer: "Fake Quote",
    difficulty: "easy",
    redFlags: ["Anachronistic reference (Lincoln talking about the internet in 1862)"],
    explanation: "Abraham Lincoln died in 1865. The internet was not invented until the late 20th century.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "quote_02",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "In a 1994 keynote, Steve Jobs warned developers: 'Make sure your web apps are optimized for mobile viewports, or you will lose the TikTok generation.'",
    correctAnswer: "Fake Quote",
    difficulty: "easy",
    redFlags: ["Anachronistic terms (web apps, mobile viewports, TikTok in 1994)"],
    explanation: "In 1994, mobile viewports did not exist as standard concepts, and TikTok was founded in 2016.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "quote_03",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Albert Einstein once stated: 'If your business does not leverage quantum computing algorithms by 1945, you will be left behind by the atomic age.'",
    correctAnswer: "Fake Quote",
    difficulty: "easy",
    redFlags: ["Anachronistic tech reference (quantum computing algorithms in 1945)"],
    explanation: "Einstein never made business statements regarding quantum computing algorithms, which did not exist as a commercial concern in 1945.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "quote_04",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Julius Caesar famously declared to the Roman Senate: 'Veni, vidi, vici—and always ensure your database queries are fully indexed to avoid slow joins.'",
    correctAnswer: "Fake Quote",
    difficulty: "easy",
    redFlags: ["Absurd anachronism (databases in ancient Rome)"],
    explanation: "Julius Caesar lived in the 1st century BC and did not speak about relational database indexing.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "quote_05",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Ada Lovelace wrote in her notes: 'My mechanical analytical engine operates on a binary clock speed of 4.2 Gigahertz, which allows it to process Bernoulli numbers instantly.'",
    correctAnswer: "Fake Quote",
    difficulty: "medium",
    redFlags: ["Anachronistic unit (Gigahertz in the 1840s)", "Physical impossibility for mechanical gear systems"],
    explanation: "Ada Lovelace worked on Babbage's Analytical Engine, which was mechanical (gears and pegs) and could not run at electronic Gigahertz speeds.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "quote_06",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "In a 2010 panel discussion, Mark Zuckerberg claimed: 'Within three years, Facebook will migrate all operations to decentralized blockchain ledgers.'",
    correctAnswer: "Fake Quote",
    difficulty: "medium",
    redFlags: ["Fabricated strategic statement", "Blockchain hype attribution"],
    explanation: "Mark Zuckerberg never claimed Facebook would migrate completely to decentralized blockchain ledgers in 2010; this is a fabricated tech quote.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "quote_07",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Winston Churchill observed during WWII: 'The greatest weapon in modern warfare is a well-designed firewall that prevents packet sniffing.'",
    correctAnswer: "Fake Quote",
    difficulty: "medium",
    redFlags: ["Anachronistic networking terms (firewall, packet sniffing in the 1940s)"],
    explanation: "Firewalls and computer packets did not exist in WWII. Churchill's speeches focused on physical and ideological battlegrounds.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "quote_08",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Socrates argued: 'The unexamined life is not worth living, especially if you spend it debugging JavaScript without source maps.'",
    correctAnswer: "Fake Quote",
    difficulty: "medium",
    redFlags: ["Anachronistic joke mixed with classic philosophy"],
    explanation: "Socrates lived in ancient Greece (469–399 BC). JavaScript was created in 1995 AD by Brendan Eich.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "quote_09",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Tim Berners-Lee remarked in 1989: 'I invented the World Wide Web so that humans could share Cat GIFs in real time across the globe.'",
    correctAnswer: "Fake Quote",
    difficulty: "hard",
    redFlags: ["Anachronistic file format reference (GIFs were not popular or supported in original WWW proposals)"],
    explanation: "While Berners-Lee proposed the WWW in 1989, his focus was academic research sharing. The GIF format was young and not supported on the initial text-only web.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "quote_10",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Nikola Tesla wrote in his diaries: 'My wireless power transmitter operates by tapping into the earth's natural 5G radio frequencies, which carry energy.'",
    correctAnswer: "Fake Quote",
    difficulty: "hard",
    redFlags: ["Anachronistic standard (5G wireless technology in the early 1900s)"],
    explanation: "Tesla worked on wireless energy transmission, but '5G' is a 21st-century cellular telecommunication standard that has nothing to do with Tesla's resonant transformer theories.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "quote_11",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Alan Turing famously stated in 1950: 'By the year 2000, we will have digital computers with 128 Gigabytes of RAM capable of defeating the Turing Test in 5 minutes.'",
    correctAnswer: "Fake Quote",
    difficulty: "hard",
    redFlags: ["Anachronistic memory scale (Gigabytes in 1950)", "Incorrect paraphrasing of his paper"],
    explanation: "In his 1950 paper 'Computing Machinery and Intelligence', Turing estimated that computers in 2000 would have about 10^9 bits of storage (approx 120 Megabytes), not 128 Gigabytes.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "quote_12",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "In a 2018 interview, Jeff Bezos noted: 'Amazon's retail infrastructure was built on COBOL because it provides the best memory protection features.'",
    correctAnswer: "Fake Quote",
    difficulty: "hard",
    redFlags: ["Technical mismatch (COBOL does not have memory protection features)", "Factually incorrect tech stack claim"],
    explanation: "Amazon was built primarily on C++, Java, and Perl. COBOL is a legacy mainframe language that is notoriously weak in modern memory safety features compared to what Bezos would boast about.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "quote_13",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "George Washington warned in his 1789 address: 'Guard against the impostures of pretended patriotism, and always encrypt your home Wi-Fi routers.'",
    correctAnswer: "Fake Quote",
    difficulty: "easy",
    redFlags: ["Anachronism (Wi-Fi routers in 1789)"],
    explanation: "George Washington lived in the 18th century. Wi-Fi and digital networking did not exist for another two hundred years.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "quote_14",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "In an 1837 paper, Charles Babbage argued: 'My mechanical Analytical Engine performs best when code changes are integrated continuously using GitHub Actions.'",
    correctAnswer: "Fake Quote",
    difficulty: "easy",
    redFlags: ["Severe historical mismatch (GitHub Actions in 1837)"],
    explanation: "Charles Babbage proposed mechanical computers in the 19th century. GitHub was founded in 2008 and Actions launched in 2018.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "quote_15",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Marie Curie noted in her research diaries: 'I am concerned about the long-term impact of radioactive elements on Lithium-Ion smartphone batteries.'",
    correctAnswer: "Fake Quote",
    difficulty: "medium",
    redFlags: ["Anachronistic product reference (smartphones and Li-ion batteries in early 1900s)"],
    explanation: "Marie Curie died in 1934. Smartphone tech and commercial Lithium-Ion batteries were developed in the late 20th century.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "quote_16",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "William Shakespeare wrote in Hamlet: 'To code callback hell, or not to code: that is the question; write promise chains or face JavaScript errors.'",
    correctAnswer: "Fake Quote",
    difficulty: "medium",
    redFlags: ["Anachronistic technical joke inside classic text"],
    explanation: "William Shakespeare died in 1616. JavaScript was created in 1995. This is a humorously fabricated quote.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "quote_17",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Mahatma Gandhi remarked: 'Decentralization is the key to true liberty; that is why I advise using peer-to-peer crypto ledger technologies.'",
    correctAnswer: "Fake Quote",
    difficulty: "medium",
    redFlags: ["Fictional tech stance attributed to historical figure"],
    explanation: "Gandhi passed away in 1948. Relational databases, decentralized blockchains, and cryptography-driven currencies were developed decades later.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "quote_18",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Grace Hopper advised in a 1955 lecture: 'TypeScript offers stronger type safety than standard JavaScript, which prevents structural database mapping errors.'",
    correctAnswer: "Fake Quote",
    difficulty: "hard",
    redFlags: ["Anachronistic languages (JavaScript and TypeScript in 1955)"],
    explanation: "Grace Hopper created the first compilers in the 50s. JavaScript was released in 1995 and TypeScript in 2012.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "quote_19",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Napoleon Bonaparte declared: 'A soldier will fight long and hard for a bit of colored ribbon; a developer fights for automated Kubernetes failovers.'",
    correctAnswer: "Fake Quote",
    difficulty: "hard",
    redFlags: ["Hybrid quote swapping physical terms for modern developer jargon"],
    explanation: "Napoleon Bonaparte lived in the late 18th/early 19th century and obviously had no knowledge of software containers or Kubernetes.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "quote_20",
    type: "quotes",
    contentCategory: "Fake Quote",
    text: "Nikola Tesla predicted in 1905: 'My Wardenclyffe Tower will broadcast unlimited, free Wi-Fi signals at 6G speeds directly to your wireless handheld receivers.'",
    correctAnswer: "Fake Quote",
    difficulty: "hard",
    redFlags: ["Anachronistic terminology (Wi-Fi, 6G speeds in 1905)"],
    explanation: "Tesla envisioned global wireless power and messaging, but modern standards like 'Wi-Fi' and '6G' are 21st-century specifications.",
    points: 300,
    timeLimit: 7
  },

  // ==========================================
  // FAKE SOURCE CATEGORY (12 Scenarios)
  // ==========================================
  {
    id: "source_01",
    type: "source references",
    contentCategory: "Fake Source",
    text: "According to the official investigative report at www.nasa.gov.security-leak-files.net.ru, astronauts discovered alien satellites in orbit.",
    correctAnswer: "Fake Source",
    difficulty: "easy",
    redFlags: ["Sketchy domain structure", "Subdomain masquerading as main domain", ".ru country code on NASA claim"],
    explanation: "The primary domain is `security-leak-files.net.ru`, not `nasa.gov`. The creator set up subdomains to trick inattentive readers.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "source_02",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A security advisory at http://paypal.com-login-verify-account-update.xyz warns that all users must re-enter their passwords within 1 hour.",
    correctAnswer: "Fake Source",
    difficulty: "easy",
    redFlags: ["Phishing style domain", "Insecure HTTP protocol", "Aggressive urgency trigger"],
    explanation: "The domain is `com-login-verify-account-update.xyz`, which is a classic phishing URL template, not the legitimate `paypal.com` site.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "source_03",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A study from the Harvard Institute of Absolute Certainty shows that coding for 10 hours straight improves cognitive capacity.",
    correctAnswer: "Fake Source",
    difficulty: "easy",
    redFlags: ["Fake institutional name designed to sound authoritative"],
    explanation: "There is no such department as the 'Harvard Institute of Absolute Certainty'. Academic institutions deal in probabilities and research, not 'absolute certainty'.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "source_04",
    type: "source references",
    contentCategory: "Fake Source",
    text: "Breaking updates from the global news agency CNN-REAL-NEWS-ALERTS.wordpress.com reveal that major financial stock markets are closing forever.",
    correctAnswer: "Fake Source",
    difficulty: "easy",
    redFlags: ["Free hosting subdomain representing a major news outlet"],
    explanation: "CNN is a multi-billion dollar corporation that hosts on its own domain `cnn.com`, not on a free `wordpress.com` blog site.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "source_05",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A whitepaper on www.w3-standards-association.org claims that HTML6 is dropping support for the `<div>` tag entirely in favor of `<box>`.",
    correctAnswer: "Fake Source",
    difficulty: "medium",
    redFlags: ["Lookalike organization name", "Absurd technical claim"],
    explanation: "The standard body for web tech is the World Wide Web Consortium (W3C), located at `w3.org`, not the fake 'W3 Standards Association'. Additionally, HTML6 is not a formally defined standard dropping `<div>`.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "source_06",
    type: "source references",
    contentCategory: "Fake Source",
    text: "According to research by the Federal Bureau of Web Standards, all commercial websites are required to migrate to Web3 technologies by next spring.",
    correctAnswer: "Fake Source",
    difficulty: "medium",
    redFlags: ["Invented regulatory body name"],
    explanation: "There is no agency called the 'Federal Bureau of Web Standards'. Standards are set by non-governmental consortiums like W3C and WHATWG.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "source_07",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A leaked internal memo from Apple, hosted on apple-developer-beta-archives.blogspot.com, details plans to release a phone with an active holographic display.",
    correctAnswer: "Fake Source",
    difficulty: "medium",
    redFlags: ["Major tech leak hosted on a free blogspot domain"],
    explanation: "Apple internal memos are highly confidential. A leak wouldn't be hosted on a public blogspot subdomain as its primary reference source.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "source_08",
    type: "source references",
    contentCategory: "Fake Source",
    text: "Statistics published by the Global Economic Association of Swiss Bankers (GEASB) claim that gold will replace all digital fiat currencies by Christmas.",
    correctAnswer: "Fake Source",
    difficulty: "medium",
    redFlags: ["Impressive but fictional acronym", "Sensationalist financial prediction"],
    explanation: "The 'Global Economic Association of Swiss Bankers' is a fictional entity. Real banking syndicates do not release predictions that fiat money will end by Christmas.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "source_09",
    type: "source references",
    contentCategory: "Fake Source",
    text: "Research from the University of London-East (ULE) reports that eating dark chocolate cures programming syntax errors by increasing focus.",
    correctAnswer: "Fake Source",
    difficulty: "hard",
    redFlags: ["Invented university with a name mimicking real institutions"],
    explanation: "There is no 'University of London-East'. There is a 'University of East London' (UEL), but scammers often swap word order to create plausible-sounding fake institutions.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "source_10",
    type: "source references",
    contentCategory: "Fake Source",
    text: "According to a hardware review on wirecutter-reviews-today.com, the new model of wireless headphones is 10x better than the competitor.",
    correctAnswer: "Fake Source",
    difficulty: "hard",
    redFlags: ["Hyphenated typo-squatting domain"],
    explanation: "The official product review site is `nytimes.com/wirecutter` (or historically `thewirecutter.com`). The domain `wirecutter-reviews-today.com` is a lookalike domain created to capture search traffic.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "source_11",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A peer-reviewed paper in the International Journal of Advanced Computer Science and Systems Engineering (IJACSSE) reports a breakthrough in P=NP solutions.",
    correctAnswer: "Fake Source",
    difficulty: "hard",
    redFlags: ["Bloated, predatory-sounding journal title", "Claiming a major unsolved math solution in an obscure journal"],
    explanation: "The title is characteristic of 'predatory journals' that publish anything for a fee. A genuine breakthrough solving the P=NP problem (one of the Millennium Prize Problems) would be published in top-tier journals like Annals of Mathematics or ACM, and would be global news.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "source_12",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A security notice on support.microsoft.com-security-alert-04921.info urges users to run a terminal command to patch a critical kernel bug.",
    correctAnswer: "Fake Source",
    difficulty: "hard",
    redFlags: ["Fake domain appending info suffix", "Urging terminal commands directly"],
    explanation: "The domain is `com-security-alert-04921.info`, not `microsoft.com`. Running arbitrary terminal commands from untrusted sites is a major security risk.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "source_13",
    type: "source references",
    contentCategory: "Fake Source",
    text: "Apple Support confirms that users must reset their iCloud credentials immediately at http://www.apple-support-service-override.security-check.xyz to prevent locking.",
    correctAnswer: "Fake Source",
    difficulty: "easy",
    redFlags: ["Phishing style lookalike URL", "Insecure HTTP protocol"],
    explanation: "The domain is `security-check.xyz`, not `apple.com`. Scammers use prefix subdomains to make URLs look official.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "source_14",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A peer-reviewed study by the Intergalactic Academy of Advanced Science & Teleportation demonstrates a functional prototype of a quantum warp drive.",
    correctAnswer: "Fake Source",
    difficulty: "easy",
    redFlags: ["Fictional/absurd organization name"],
    explanation: "The 'Intergalactic Academy of Advanced Science & Teleportation' is a fictional, sci-fi sounding organization rather than a real academic institution.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "source_15",
    type: "source references",
    contentCategory: "Fake Source",
    text: "The CDC announced a new safety warning at http://cdc.gov-health-advisories-warnings.org.ru stating that drinking raw potato juice completely cures food poisoning.",
    correctAnswer: "Fake Source",
    difficulty: "medium",
    redFlags: ["Phishing domain masquerading as government portal", ".ru country code on US government claim"],
    explanation: "The official CDC domain is `cdc.gov`. The website in the claim is `org.ru`, which is a foreign domain registration.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "source_16",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A breaking market report hosted on https://bloomberg-stock-market-updates.blogspot.com states that Apple has filed for Chapter 11 bankruptcy protection.",
    correctAnswer: "Fake Source",
    difficulty: "medium",
    redFlags: ["Major business alert hosted on free blogging platform"],
    explanation: "Bloomberg reports on its own domain `bloomberg.com`, not on a free Google Blogger subdomain (`blogspot.com`). A massive story like Apple bankruptcy would be major news worldwide.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "source_17",
    type: "source references",
    contentCategory: "Fake Source",
    text: "Internal server documents hosted on https://github-com-leaked-source-files.netlify.app show a major back-door exploit in Microsoft's Azure cloud framework.",
    correctAnswer: "Fake Source",
    difficulty: "medium",
    redFlags: ["Leaked enterprise files on free hosting platform", "Hyphenated domain mimicking GitHub"],
    explanation: "The domain is `netlify.app`, which is a free static web hosting service, not GitHub. A major security leak wouldn't use this as its official root domain.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "source_18",
    type: "source references",
    contentCategory: "Fake Source",
    text: "An official mandate from the Federal Commission of Internet Routing Protocols (FCIRP) commands all local ISPs to cease operations for maintenance.",
    correctAnswer: "Fake Source",
    difficulty: "hard",
    redFlags: ["Fictional regulatory commission"],
    explanation: "There is no regulatory commission called the 'Federal Commission of Internet Routing Protocols'. Internet routing protocols are maintained by standard groups like IETF.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "source_19",
    type: "source references",
    contentCategory: "Fake Source",
    text: "A hardware review on http://amazon-official-reviews-and-specifications.info says that this converter cable changes digital HDMI outputs to pure water.",
    correctAnswer: "Fake Source",
    difficulty: "hard",
    redFlags: ["Physically absurd claim", "Typo-squatting domain info suffix"],
    explanation: "An HDMI signal is digital electricity. You cannot convert it to water. Furthermore, the domain `amazon-official-reviews-and-specifications.info` is a scam domain, not Amazon.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "source_20",
    type: "source references",
    contentCategory: "Fake Source",
    text: "Google Security warns that your account is about to be deleted unless you log in immediately at https://google-password-recovery-portal.com.co to verify identity.",
    correctAnswer: "Fake Source",
    difficulty: "hard",
    redFlags: ["Urgent warning trigger", "Phishing domain with Colombian country code .co"],
    explanation: "The domain is `com.co` (Colombia registration), not Google's official domains. This is a classic credential harvesting site.",
    points: 300,
    timeLimit: 7
  },

  // ==========================================
  // MISLEADING CLAIM CATEGORY (12 Scenarios)
  // ==========================================
  {
    id: "claim_01",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Our new AI writing assistant guarantees 100% original, plagiarism-free, factually correct content in every language with zero human review needed.",
    correctAnswer: "Misleading Claim",
    difficulty: "easy",
    redFlags: ["Guarantee of absolute perfection (100%)", "No-review claim for AI models which are prone to hallucinating"],
    explanation: "No software can guarantee 100% factual correctness or originality, especially generative language models that are known to hallucinate facts.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "claim_02",
    type: "customer testimonials",
    contentCategory: "Misleading Claim",
    text: "Customer review: 'After installing the QuantumSpeed optimizer, our database queries became 500 times faster in just 3 seconds of installation!'",
    correctAnswer: "Misleading Claim",
    difficulty: "easy",
    redFlags: ["Absurd speed factor (500x)", "Impossible immediate performance change without architecture changes"],
    explanation: "While software caching can improve speeds, a 500x speedup instantly across all database queries is physically implausible without major database schema and indexing re-designs.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "claim_03",
    type: "ad copy",
    contentCategory: "Misleading Claim",
    text: "Earn $15,000 per month passively after completing our 2-hour video course on AI prompt engineering! No coding experience required, guaranteed placement.",
    correctAnswer: "Misleading Claim",
    difficulty: "easy",
    redFlags: ["Get-rich-quick claim", "Low effort requirement (2 hours) for extreme output ($15,000/mo)"],
    explanation: "Passive income claims that guarantee high revenues for minimal time investments are classic misleading advertisements and scams.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "claim_04",
    type: "blog claims",
    contentCategory: "Misleading Claim",
    text: "A new framework has been released that compiles Python code into native hardware circuits, speeding up application runtimes by 200,000%.",
    correctAnswer: "Misleading Claim",
    difficulty: "easy",
    redFlags: ["Absurd speed multiplier (200,000%)", "Technical mismatch in compilation expectations"],
    explanation: "While compiling code to hardware (like FPGAs) increases speeds, Python's dynamic typing and garbage collection cannot be converted directly into static circuitry in a way that yields a general 200,000% speedup.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "claim_05",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Deploy our database system and never worry about losing data again. It is 100% secure against all hardware failures, power outages, and hacker attacks.",
    correctAnswer: "Misleading Claim",
    difficulty: "medium",
    redFlags: ["Absolute safety claims ('never worry', '100% secure against all')"],
    explanation: "No software or database is completely secure against all forms of failure, physical disasters, or zero-day security vulnerabilities.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "claim_06",
    type: "news snippets",
    contentCategory: "Misleading Claim",
    text: "A breakthrough study reveals that drinking coffee completely eliminates the risk of heart disease in adults who work at desks.",
    correctAnswer: "Misleading Claim",
    difficulty: "medium",
    redFlags: ["Simplistic medical cure claim ('completely eliminates')"],
    explanation: "Coffee has antioxidants, but claiming it 'completely eliminates' a complex disease like heart disease is a highly exaggerated and misleading representation of scientific studies.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "claim_07",
    type: "customer testimonials",
    contentCategory: "Misleading Claim",
    text: "CEO Testimonial: 'Our company migrated to AutoBiz and immediately laid off our entire engineering and QA departments, saving 100% of engineering costs with zero impact on product quality.'",
    correctAnswer: "Misleading Claim",
    difficulty: "medium",
    redFlags: ["Extreme corporate reduction claim", "Plausibility failure (completely replacing engineering with zero product quality issues)"],
    explanation: "Replacing entire development and testing staff with an automated tool without any drop in software product quality is a fictional marketing exaggeration.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "claim_08",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Our cybersecurity software blocks all incoming zero-day exploits before they are discovered by security researchers, guaranteeing complete system immunity.",
    correctAnswer: "Misleading Claim",
    difficulty: "medium",
    redFlags: ["Absolute defense claims against unknown threats ('zero-day exploits before they are discovered')"],
    explanation: "Zero-days are by definition unknown to the system. While heuristic analysis helps, no tool can guarantee complete immunity from unknown exploits.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "claim_09",
    type: "performance metrics",
    contentCategory: "Misleading Claim",
    text: "Testing proves that developers who use our monitoring dashboard write code that has 80% fewer bugs and gets deployed 10 times faster than those who don't.",
    correctAnswer: "Misleading Claim",
    difficulty: "hard",
    redFlags: ["Correlating dashboard usage directly with human typing quality and deployment bottlenecks"],
    explanation: "A monitoring dashboard helps with post-deployment visibility, but claiming it directly causes developers to write 80% fewer bugs is a misleading correlation presented as direct causation.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "claim_10",
    type: "research snippets",
    contentCategory: "Misleading Claim",
    text: "A sociological study found a direct correlation between eating spicy food and high salaries, concluding that eating hot peppers causes promotions.",
    correctAnswer: "Misleading Claim",
    difficulty: "hard",
    redFlags: ["Confusing correlation with causation", "Unlikely causal link"],
    explanation: "Correlation does not imply causation. There might be confounding variables (e.g., regional cuisines, age demographics), but hot peppers do not directly cause corporate promotions.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "claim_11",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "This compression algorithm operates at mathematical infinity, allowing you to compress any dataset, regardless of size, down to a single byte of metadata.",
    correctAnswer: "Misleading Claim",
    difficulty: "hard",
    redFlags: ["Violates Shannon's information theory limits", "Absurd claim ('compress any dataset... to a single byte')"],
    explanation: "According to information theory, data has a minimum entropy limit. Compressing arbitrary datasets down to a single byte is mathematically impossible, as you would lose the information required to decompress it.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "claim_12",
    type: "expert statements",
    contentCategory: "Misleading Claim",
    text: "The chief technology analyst at TechGlow stated that businesses using cloud-hosted Kubernetes clusters are immune to data center outages due to automatic failover.",
    correctAnswer: "Misleading Claim",
    difficulty: "hard",
    redFlags: ["Misrepresenting high-availability configurations as absolute immunity to physical outages"],
    explanation: "Kubernetes manages containers, but if all availability zones of a cloud region go down (as has happened in real disasters), automatic failover fails unless complex, multi-region architecture is actively maintained. Immunity is a misleading claim.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "claim_13",
    type: "ad copy",
    contentCategory: "Misleading Claim",
    text: "Invest in CryptoShield tokens and secure a 100% risk-free return of 50% weekly on your capital, backed by zero market volatility guarantees.",
    correctAnswer: "Misleading Claim",
    difficulty: "easy",
    redFlags: ["Guarantee of absolute returns (100% risk-free)", "Absurd rate of return (50% weekly)"],
    explanation: "Financial assets are subject to market conditions. No investment can guarantee high weekly yields (50%) with zero volatility or zero risk.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "claim_14",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Wearing our specialized blue-light lenses completely cures myopia, permanently restoring 20/20 vision and eliminating the need for eye exams.",
    correctAnswer: "Misleading Claim",
    difficulty: "easy",
    redFlags: ["Guarantee of medical cure ('completely cures myopia')", "Absolute claim to skip medical checks"],
    explanation: "Blue-light glasses reduce glare, but they cannot structurally modify the shape of the eyeball to cure myopia or eliminate the need for eye exams.",
    points: 100,
    timeLimit: 15
  },
  {
    id: "claim_15",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Our cloud database provider features infinite write speeds and unlimited storage capacity on standard commercial 1TB server arrays.",
    correctAnswer: "Misleading Claim",
    difficulty: "medium",
    redFlags: ["Fictional capacity limit ('infinite write speeds', 'unlimited storage')", "Hardware contradiction (unlimited storage on 1TB array)"],
    explanation: "Standard storage hardware has strict write speed limits and cannot store unlimited data on a finite 1TB physical array.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "claim_16",
    type: "ad copy",
    contentCategory: "Misleading Claim",
    text: "Use our optimized landing page template and guarantee a 100% conversion rate for any retail product in any global market instantly.",
    correctAnswer: "Misleading Claim",
    difficulty: "medium",
    redFlags: ["Guarantee of perfect business conversions (100%)", "No allowance for product value or pricing differences"],
    explanation: "Conversion rates depend heavily on product quality, price, demand, and traffic source. No landing page design can guarantee 100% conversions.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "claim_17",
    type: "ad copy",
    contentCategory: "Misleading Claim",
    text: "Our daily 5-second isometric workout program burns 5,000 calories instantly, letting you lose weight without dieting or sweating.",
    correctAnswer: "Misleading Claim",
    difficulty: "medium",
    redFlags: ["Low-effort, extreme-result claim (5 seconds to burn 5,000 calories)"],
    explanation: "Burning 5,000 calories requires hours of high-intensity physical output. A 5-second workout cannot burn that energy.",
    points: 200,
    timeLimit: 10
  },
  {
    id: "claim_18",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Install our AI linting utility to automatically identify and correct 100% of logical bugs in your program codebase before running compiling scripts.",
    correctAnswer: "Misleading Claim",
    difficulty: "hard",
    redFlags: ["Guarantee of flawless software detection (100% logic bugs)", "Theoretical computer science mismatch (Halting Problem limits)"],
    explanation: "Finding all runtime/logic bugs statically is theoretically bounded by the Halting Problem, and no AI can guarantee 100% bug resolution.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "claim_19",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Our cloud hosting servers are immune to physical disasters and earthquakes because all application data is stored in the cloud.",
    correctAnswer: "Misleading Claim",
    difficulty: "hard",
    redFlags: ["Conflating abstract 'cloud' hosting with physical immunity to disasters"],
    explanation: "The cloud consists of physical data centers built on land. Earthquakes, fires, or power grid failures can take data centers offline.",
    points: 300,
    timeLimit: 7
  },
  {
    id: "claim_20",
    type: "product claims",
    contentCategory: "Misleading Claim",
    text: "Our compiler optimization pass speeds up execution 10x for all binaries without modifying instructions or upgrading hardware architecture.",
    correctAnswer: "Misleading Claim",
    difficulty: "hard",
    redFlags: ["Logical impossibility (speeding up binary without modifying instructions or hardware resources)"],
    explanation: "To speed up a binary's execution, you must either modify the machine instructions to be more efficient or run them on faster hardware.",
    points: 300,
    timeLimit: 7
  },
];

// ==========================================
// FALLBACK PROCEDURAL CONTENT GENERATOR
// ==========================================
// This generator acts as a dynamic backup system, generating an infinite pool
// of claims using structured grammatical rules and randomized templates.
const FALLBACK_GENERATOR = {
  nouns: ["startup", "enterprise", "crypto database", "AI engine", "microservice", "smart contract", "agile framework", "cloud node"],
  verbs: ["increases", "boosts", "improves", "accelerates", "scales", "optimizes"],
  metrics: ["efficiency", "throughput", "developer velocity", "caching speed", "database stability", "code execution time"],
  domains: ["global-telemetry-reports.net", "tech-science-journal-now.org", "verify-news-feed.cc", "secure-api-portal.info"],
  people: ["Nikola Tesla", "Steve Jobs", "Ada Lovelace", "Charles Babbage", "Alan Turing", "Grace Hopper"],

  generate: function(category, difficulty) {
    const id = "gen_" + Math.random().toString(36).substr(2, 9);
    let text = "";
    let redFlags = [];
    let explanation = "";
    let points = difficulty === "easy" ? 100 : (difficulty === "medium" ? 200 : 300);
    let timeLimit = difficulty === "easy" ? 15 : (difficulty === "medium" ? 10 : 7);

    const noun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
    const verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
    const metric = this.metrics[Math.floor(Math.random() * this.metrics.length)];
    const domain = this.domains[Math.floor(Math.random() * this.domains.length)];
    const person = this.people[Math.floor(Math.random() * this.people.length)];

    if (category === "Safe") {
      text = `A technical review of our ${noun} indicated that it ${verb} average ${metric} by roughly 12% in multi-threaded configurations.`;
      redFlags = ["None"];
      explanation = "This procedural claim states a realistic, moderate improvement of 12% under specific configurations and carries no logical or domain issues.";
    } 
    else if (category === "Fake Stat") {
      const absurdPercent = Math.random() > 0.5 ? "148%" : "89.237498192%";
      text = `Data analytics confirm that ${absurdPercent} of remote software engineers achieved ${verb} ${metric} using our layout.`;
      redFlags = [absurdPercent.includes(".") ? "Suspiciously over-precise decimal precision" : "Mathematically impossible percentage (exceeding 100%)"];
      explanation = `The statistic is structurally broken. A value of ${absurdPercent} is either mathematically impossible (exceeding 100%) or shows generated decimal over-precision.`;
    } 
    else if (category === "Fake Quote") {
      const year = Math.floor(Math.random() * 80) + 1850; // 1850 - 1930
      text = `As ${person} stated in ${year}: 'I always ensure that my browser caching configurations are optimized for mobile cellular networks.'`;
      redFlags = ["Severe historical anachronism (talking about mobile networks and browsers)"];
      explanation = `Historical figure ${person} died before the invention of browser cache, mobile networks, or modern computing systems.`;
    } 
    else if (category === "Fake Source") {
      const sketchyUrl = `http://www.${domain}-login-alert.net.ru`;
      text = `A critical server vulnerability update published on ${sketchyUrl} advises all system administrators to run custom binaries.`;
      redFlags = ["Phishing pattern lookalike URL structure", "Insecure HTTP protocol", ".ru top-level suffix on generic tech claim"];
      explanation = `The source URL '${sketchyUrl}' is formatted like a phishing URL with combined subdomains and uses the insecure HTTP protocol.`;
    } 
    else if (category === "Misleading Claim") {
      text = `Our software suite ${verb} team ${metric} by 4,000% instantly, guaranteeing 100% bug-free releases for life with zero testing effort.`;
      redFlags = ["Absurd productivity multiplier (4,000%)", "Absolute perfection guarantee ('100% bug-free... for life')", "No-testing claim"];
      explanation = "No software tool can guarantee absolute bug-free output forever or increase productivity by 4,000% instantly without testing effort.";
    }

    return {
      id: id,
      type: "procedural",
      contentCategory: category,
      text: text,
      correctAnswer: category,
      difficulty: difficulty,
      redFlags: redFlags,
      explanation: explanation,
      points: points,
      timeLimit: timeLimit
    };
  }
};

// Export to window object for browser access
window.SCENARIOS = SCENARIOS;
window.FALLBACK_GENERATOR = FALLBACK_GENERATOR;
