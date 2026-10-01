export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "oracle-java-se-17-certification-guide",
    title: "How I Passed the Oracle Certified Professional Java SE 17 (1Z0-829) Exam as an Undergrad",
    description: "A complete preparation roadmap for the Oracle Certified Professional Java SE 17 Developer exam (1Z0-829): core syllabus breakdown, switch pattern matching, sealed classes, and concurrency tips.",
    date: "September 24, 2026",
    readTime: "8 min read",
    category: "Java & Backend",
    tags: ["Java", "Oracle OCP", "JVM Architecture"],
    coverImage: "/certifications/Oracle Certified Professional_ Java SE 17 Developer.webp",
    content: `
      <h2>Why Pursue OCP Java SE 17 (1Z0-829)?</h2>
      <p>The Oracle Certified Professional (OCP) Java SE 17 Developer certification (Exam 1Z0-829) is widely recognized as one of the most rigorous developer certifications in the software industry. Unlike beginner multiple-choice tests, 1Z0-829 tests your nuanced understanding of memory models, class design, stream pipeline laziness, and edge-case exceptions.</p>
      <p>Fewer than 1% of undergraduate computer science engineers take this certification before graduating. Achieving it demonstrates not just an ability to write Java code, but deep expertise in writing robust, enterprise-grade, memory-efficient software.</p>

      <h2>Core Exam Topics &amp; Weightage</h2>
      <p>Java 17 is a Long-Term Support (LTS) release packed with language enhancements. The exam is structured around key domains:</p>
      <ul>
        <li><strong>Modern Language Enhancements:</strong> Sealed classes, records, text blocks, and pattern matching for <code>instanceof</code> and <code>switch</code>.</li>
        <li><strong>Collections and Generics:</strong> Wildcard bounds (<code>? extends T</code> vs <code>? super T</code>), stream reduction operations, and collector pipelines.</li>
        <li><strong>Concurrency &amp; Multithreading:</strong> ExecutorService lifecycle, ForkJoinPool, Atomic primitives, Lock frameworks, and concurrent collection implementations.</li>
        <li><strong>I/O and NIO.2:</strong> Path operations, Files streams, serialization rules, and custom channel handling.</li>
        <li><strong>Secure Coding &amp; Modularization:</strong> Java Platform Module System (JPMS), module declarations (<code>exports</code>, <code>opens</code>, <code>provides ... with</code>), and defense against deserialization attacks.</li>
      </ul>

      <h2>Key Modern Java Features You Must Master</h2>

      <h3>1. Sealed Classes and Interfaces</h3>
      <p>Sealed classes allow developers to restrict which classes or interfaces may extend or implement them. This is essential for domain modeling where domain states must be finite.</p>
      <pre><code>// Defining a sealed hierarchy
public sealed interface PaymentStatus 
    permits PaymentSuccess, PaymentFailed, PaymentPending {}

public final record PaymentSuccess(String transactionId, double amount) implements PaymentStatus {}
public final record PaymentFailed(String reason, int errorCode) implements PaymentStatus {}
public final record PaymentPending(long timestamp) implements PaymentStatus {}</code></pre>
      <p>Because the compiler knows all permitted subtypes, exhaustive pattern matching in <code>switch</code> expressions eliminates the need for a default clause.</p>

      <h3>2. Records and Canonical Constructors</h3>
      <p>Records provide a compact syntax for declaring classes that are transparent holders for immutable data. The exam tests tricky edge cases around compact constructors and custom getters.</p>
      <pre><code>// Compact constructor validation
public record StudentRecord(String id, String name, double gpa) {
    public StudentRecord {
        if (gpa &lt; 0.0 || gpa &gt; 10.0) {
            throw new IllegalArgumentException("Invalid CGPA score");
        }
        name = name.trim();
    }
}</code></pre>

      <h3>3. Stream Pipelines &amp; Collector Nuances</h3>
      <p>A frequent stumbling block on the 1Z0-829 exam is stream termination and short-circuiting behavior. Questions often pair <code>peek()</code> with non-terminal steps or parallel streams where reduction order is non-deterministic.</p>

      <h2>My 30-Day Preparation Strategy</h2>
      <p>To pass the exam with high marks while balancing university coursework, I followed a disciplined 4-week cycle:
        <ul>
          <li><strong>Week 1:</strong> Foundations, OOP edge cases, Polymorphism, Exception hierarchies, and Nested/Inner classes.</li>
          <li><strong>Week 2:</strong> Generics, Collections, Functional Interfaces (Function, Predicate, Consumer, Supplier), and Streams.</li>
          <li><strong>Week 3:</strong> Concurrency, Locks, Atomic types, NIO.2 File systems, and JDBC transactions.</li>
          <li><strong>Week 4:</strong> Mock exams under strict 90-minute timers, reviewing every incorrect option and reading Java Language Specification (JLS) documentation.</li>
        </ul>
      </p>

      <h2>Conclusion</h2>
      <p>Preparing for the OCP Java SE 17 certification fundamentally leveled up my engineering capabilities. It forces you to transition from thinking like someone who merely uses Java libraries to thinking like an engineer who understands how the Java Virtual Machine (JVM) executes code under the hood.</p>
    `
  },
  {
    slug: "scaling-univault-offline-first-architecture",
    title: "Architecting UniVault: Scaling an Offline-First Android & Web Platform to 50,000+ Students",
    description: "A system design deep-dive into how we built UniVault's local-first sync pipeline using Room Database, Kotlin Coroutines, and Firebase Firestore to serve 50,000+ students during peak semester exams.",
    date: "September 28, 2026",
    readTime: "7 min read",
    category: "System Architecture",
    tags: ["Android", "Kotlin", "System Design"],
    coverImage: "/univault_mobile.webp",
    content: `
      <h2>The Problem: Campus Network Failures During Exam Week</h2>
      <p>During end-semester examinations, thousands of students simultaneously attempt to download question blueprints, lecture notes, and syllabus guides. On campus networks with spotty Wi-Fi and congested cellular coverage, typical client-server architectures fail immediately. Students encounter infinite loading spinners, timed-out connections, and inaccessible study resources right before entering examination halls.</p>
      <p>We built UniVault from the ground up to solve this exact bottleneck through a resilient, <strong>offline-first architecture</strong>.</p>

      <h2>The Offline-First Architectural Philosophy</h2>
      <p>In UniVault, the local database is not an auxiliary cache—it is the single source of truth for the user interface. The UI observes local database tables, and all remote sync processes occur asynchronously in the background.</p>

      <h3>1. Local Persistence Layer: Android Room &amp; SQLite</h3>
      <p>We modeled all core academic data using Room entities. By utilizing Flow and LiveData wrappers, the UI updates instantly whenever local data changes without waiting for network round-trips.</p>
      <pre><code>// Room Entity with offline sync metadata
@Entity(tableName = "academic_resources")
data class AcademicResourceEntity(
    @PrimaryKey val id: String,
    val subjectCode: String,
    val title: String,
    val fileUrl: String,
    val localFilePath: String?,
    val isDownloaded: Boolean = false,
    val lastSyncedTimestamp: Long = System.currentTimeMillis()
)</code></pre>

      <h3>2. Background Synchronization with WorkManager</h3>
      <p>To keep local repositories updated without draining device batteries, we utilized Android's <code>WorkManager</code> with battery-not-low and unmetered network constraints. WorkManager guarantees execution even if the user forces close the application or reboots their device.</p>

      <h2>Optimizing Cloud Firestore: Slashing Read Costs by 80%</h2>
      <p>Firebase Firestore charges per document read. When serving 50,000+ active students during exam week, naive querying patterns can generate millions of document reads in hours, creating massive cloud bills.</p>
      <p>We engineered a delta-sync mechanism:
        <ul>
          <li>Each client stores a <code>last_sync_timestamp</code> locally in EncryptedSharedPreferences.</li>
          <li>When syncing, the client only queries resources where <code>updatedAt &gt; last_sync_timestamp</code>.</li>
          <li>Static document collections (such as syllabus schemas) are bundled as compressed pre-populated SQLite assets within the APK, eliminating initial download overhead entirely.</li>
        </ul>
      </p>

      <h2>Key Metrics and Real-World Impact</h2>
      <table class="w-full border-collapse border border-border my-6">
        <thead>
          <tr class="bg-muted">
            <th class="border border-border p-3 text-left">Metric</th>
            <th class="border border-border p-3 text-left">Before UniVault</th>
            <th class="border border-border p-3 text-left">With UniVault Architecture</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-border p-3">Resource Load Latency</td>
            <td class="border border-border p-3">3,200ms (Network dependent)</td>
            <td class="border border-border p-3"><strong>&lt; 45ms (Local disk instant)</strong></td>
          </tr>
          <tr>
            <td class="border border-border p-3">Offline Usability</td>
            <td class="border border-border p-3">0% (Threw network errors)</td>
            <td class="border border-border p-3"><strong>100% full offline study support</strong></td>
          </tr>
          <tr>
            <td class="border border-border p-3">Active Student Reach</td>
            <td class="border border-border p-3">Fragmented WhatsApp groups</td>
            <td class="border border-border p-3"><strong>50,000+ registered student users</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>Building for users in resource-constrained environments requires rethinking default architectural assumptions. Prioritizing local-first caching, disciplined background syncing, and defensive cloud data fetching transformed UniVault into a battle-tested product trusted by tens of thousands of engineering students.</p>
    `
  },
  {
    slug: "ethereum-fraud-detection-xgboost",
    title: "Detecting Ethereum Fraud with XGBoost: Achieving 94% Accuracy on Imbalanced Blockchain Data",
    description: "How we developed an automated fraud detection pipeline for Ethereum transactions using machine learning, addressing severe class imbalance with SMOTE and outperforming legacy tree ensembles.",
    date: "October 01, 2026",
    readTime: "9 min read",
    category: "AI & Machine Learning",
    tags: ["Machine Learning", "XGBoost", "FinTech"],
    coverImage: "/object_detection_comparison.webp",
    content: `
      <h2>The Challenge of Illicit Activity on Decentralized Networks</h2>
      <p>Public blockchains like Ethereum process hundreds of millions of peer-to-peer financial transactions each year. While transparency and pseudo-anonymity are core tenets of decentralized finance (DeFi), they also attract bad actors conducting phishing attacks, ponzi schemes, flash loan exploits, and money laundering.</p>
      <p>Detecting fraudulent accounts manually is impossible given transaction velocities. In this project, we designed a machine learning pipeline using <strong>XGBoost (Extreme Gradient Boosting)</strong> that flags high-risk accounts with <strong>94% accuracy</strong>.</p>

      <h2>The Severe Class Imbalance Problem</h2>
      <p>In real-world blockchain data, fraudulent accounts constitute less than 2% of total transaction volume. A naive classifier that predicts "Legitimate" for every transaction would achieve 98% accuracy while being completely useless for security.</p>
      <p>To combat this, we implemented a dual mitigation strategy:
        <ul>
          <li><strong>SMOTE (Synthetic Minority Over-sampling Technique):</strong> Generates synthetic feature instances along the feature space line segments joining k-nearest minority neighbors.</li>
          <li><strong>Cost-Sensitive Loss Optimization:</strong> Tuning the <code>scale_pos_weight</code> parameter in XGBoost to penalize false negatives far more heavily than false positives.</li>
        </ul>
      </p>

      <h2>Feature Engineering: Extracting Behavioral Signatures</h2>
      <p>Raw transaction hashes tell you little on their own. We engineered composite behavioral features from wallet transaction histories:</p>
      <ul>
        <li><strong>Time Delta Variance:</strong> Fraudulent accounts often demonstrate bursty activity—rapid high-frequency fund distributions followed by permanent dormancy.</li>
        <li><strong>ERC-20 Token Velocity:</strong> Ratio of ERC-20 token movements relative to base Ether transfers.</li>
        <li><strong>Value In/Out Skewness:</strong> Difference between maximum Ether received versus minimum Ether sent.</li>
        <li><strong>Unique Interaction Ratio:</strong> Total distinct smart contract addresses interacted with per 100 transactions.</li>
      </ul>

      <h2>Model Evaluation and Comparison</h2>
      <table class="w-full border-collapse border border-border my-6">
        <thead>
          <tr class="bg-muted">
            <th class="border border-border p-3 text-left">Model</th>
            <th class="border border-border p-3 text-left">Accuracy</th>
            <th class="border border-border p-3 text-left">Precision</th>
            <th class="border border-border p-3 text-left">Recall</th>
            <th class="border border-border p-3 text-left">F1-Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-border p-3">Decision Tree</td>
            <td class="border border-border p-3">86.4%</td>
            <td class="border border-border p-3">0.82</td>
            <td class="border border-border p-3">0.81</td>
            <td class="border border-border p-3">0.81</td>
          </tr>
          <tr>
            <td class="border border-border p-3">Random Forest</td>
            <td class="border border-border p-3">91.2%</td>
            <td class="border border-border p-3">0.89</td>
            <td class="border border-border p-3">0.87</td>
            <td class="border border-border p-3">0.88</td>
          </tr>
          <tr>
            <td class="border border-border p-3">AdaBoost</td>
            <td class="border border-border p-3">89.7%</td>
            <td class="border border-border p-3">0.86</td>
            <td class="border border-border p-3">0.85</td>
            <td class="border border-border p-3">0.85</td>
          </tr>
          <tr class="bg-primary/10 font-semibold">
            <td class="border border-border p-3 text-primary">XGBoost (Optimized)</td>
            <td class="border border-border p-3 text-primary"><strong>94.2%</strong></td>
            <td class="border border-border p-3 text-primary"><strong>0.93</strong></td>
            <td class="border border-border p-3 text-primary"><strong>0.92</strong></td>
            <td class="border border-border p-3 text-primary"><strong>0.93</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>Pipeline Architecture</h2>
      <pre><code># Core model training snippet
import xgboost as xgb
from sklearn.model_selection import StratifiedKFold
from imblearn.over_sampling import SMOTE

# Balance dataset
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

# Initialize XGBoost with tuned hyper-parameters
model = xgb.XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    scale_pos_weight=1.5,
    eval_metric="logloss",
    random_state=42
)
model.fit(X_resampled, y_resampled)</code></pre>

      <h2>Conclusion &amp; Production Deployability</h2>
      <p>By transforming raw blockchain transaction graphs into nuanced temporal and behavioral features, XGBoost proved uniquely adept at cutting through noise in decentralized transaction ledgers. This model serves as the backbone for automated AML (Anti-Money Laundering) transaction scoring in next-generation Web3 payment gateways.</p>
    `
  },
  {
    slug: "react-state-management",
    title: "Advanced State Management in React 18: Beyond Redux",
    description: "Explore modern state management paradigms in React 18, including Zustand, Recoil, and Signals, comparing performance and developer experience.",
    date: "July 02, 2026",
    readTime: "6 min read",
    category: "Frontend Engineering",
    tags: ["React", "Zustand", "Performance"],
    coverImage: "/saveetha_hub_screenshot.webp",
    content: `
      <h2>Introduction</h2>
      <p>React 18 introduced powerful features like Concurrent Rendering, automatic batching, and transition APIs. With these advancements, traditional global state management solutions like Redux often feel overly verbose and heavy. Developers are increasingly moving towards lightweight, decentralized, or atomic state libraries. In this article, we'll dive deep into Zustand, Recoil, and the emerging Signals paradigm.</p>
      
      <h2>Why Redux is Losing Ground</h2>
      <p>Redux has been the industry standard for years, providing a highly predictable state container. However, its boilerplate—actions, reducers, action creators, and dispatch loops—increases cognitive load. For modern, fast-paced applications, the developer experience (DX) and build size are critical constraints. Modern alternatives provide equivalent capabilities with a fraction of the setup.</p>
      
      <h2>1. Zustand: Simple, Fast, and Flux-based</h2>
      <p>Zustand (German for "state") is a small, fast, and scalable state-management solution. It uses a simplified Flux pattern without the boilerplate, utilizing hooks as the primary interface.</p>
      <pre><code>// Creating a store in Zustand
import { create } from 'zustand';

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useBearStore = create&lt;BearState&gt;((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));</code></pre>
      <p>Zustand solves the zombie child problem, React concurrency, and mixed-state rendering out of the box. It doesn't wrap your app in context providers, meaning no unnecessary re-renders for children that do not consume the state.</p>

      <h2>2. Recoil and Jotai: Atomic State Management</h2>
      <p>Atomic state libraries break state down into micro-pieces called "atoms". Atoms can be combined and modified via "selectors" (pure functions that derive state). This allows highly granular rendering. If Atom A updates, only components listening to Atom A re-render, leaving the rest of the tree unaffected.</p>

      <h2>3. Signals: Direct Reactivity</h2>
      <p>Popularized by SolidJS and now integrated into Preact and standard React utilities, Signals bypass the React virtual DOM diffing process for state updates. By passing getter/setter references directly to the elements, Signals write values directly to the DOM nodes. This results in blistering performance, though it requires a shift in how developers think about React's rendering lifecycle.</p>

      <h2>Comparison Table</h2>
      <table class="w-full border-collapse border border-white/10 my-6">
        <thead>
          <tr class="bg-white/5">
            <th class="border border-white/10 p-2 text-left">Library</th>
            <th class="border border-white/10 p-2 text-left">Paradigm</th>
            <th class="border border-white/10 p-2 text-left">Boilerplate</th>
            <th class="border border-white/10 p-2 text-left">Bundle Size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-white/10 p-2 font-mono">Redux Toolkit</td>
            <td class="border border-white/10 p-2">Flux (Centralized)</td>
            <td class="border border-white/10 p-2">Medium</td>
            <td class="border border-white/10 p-2">~10kb</td>
          </tr>
          <tr class="bg-white/5">
            <td class="border border-white/10 p-2 font-mono">Zustand</td>
            <td class="border border-white/10 p-2">Flux (Decentralized)</td>
            <td class="border border-white/10 p-2">Minimal</td>
            <td class="border border-white/10 p-2">~1.5kb</td>
          </tr>
          <tr>
            <td class="border border-white/10 p-2 font-mono">Jotai / Recoil</td>
            <td class="border border-white/10 p-2">Atomic</td>
            <td class="border border-white/10 p-2">Low</td>
            <td class="border border-white/10 p-2">~2kb - 20kb</td>
          </tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>For most React 18 applications, <strong>Zustand</strong> represents the sweet spot of Flux architecture and hook simplicity. If your app handles complex graphical layouts or relational nodes, atomic state libraries like <strong>Jotai</strong> shine. Selecting the correct library can improve both Core Web Vitals (specifically Interaction to Next Paint - INP) and developer productivity.</p>
    `
  }
];
