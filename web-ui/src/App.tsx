import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  Activity, Settings, LogOut, Play, ShieldAlert, Cpu, Layers, Link as LinkIcon, 
  CheckCircle2, XCircle, Clock, Search, History, Bell, FileText, Key, ChevronRight, 
  Download, X, Star, Copy, Trash2, Check, RefreshCw, Mic
} from 'lucide-react';
import './index.css';

// --- PRESENTATION SPEECH DATA ---

const SPEECH_MARKDOWN = `# 🎙️ Sentinel QA — Project Presentation & Pitch Speech

## ⏱️ Quick 30-Second Elevator Pitch
"Every time developers create a Pull Request, tests take hours to write, regressions slip into production, and analytics events break without anyone noticing.
Sentinel QA is an autonomous QA agent powered by Google Gemini. Whenever code changes, Sentinel analyzes the PR, automatically plans and generates test code, runs end-to-end tests across Web and Flutter mobile apps, and validates analytics data logs against strict specifications.
It turns what used to take QA teams days into a 2-minute autonomous check—saving developer time and ensuring zero broken features reach our users."

---

## 🎤 Full Presentation Speech (5 to 7 Minutes)

### 1. Opening Hook & Welcome (0:00 - 1:00)
"Good morning / afternoon everyone,
I'm excited to introduce Sentinel QA, our autonomous Quality Assurance and Data Log verification platform.
Let me start with a question every software team can relate to: How many times has a developer opened a Pull Request, merged it with confidence, only to discover hours later that a checkout button broke on mobile, or worse—that the analytics tracking stopped recording purchases?
In modern software engineering, teams move fast. But testing is still one of the biggest bottlenecks. Writing end-to-end tests manually takes hours. Maintaining them is painful. And verifying analytics events—what we call Data Log QA—is almost always done by hand or completely neglected.
That is why we built Sentinel QA."

### 2. What is Sentinel QA? (1:00 - 2:15)
"Sentinel QA is an autonomous testing agent that plugs directly into the developer workflow. Whenever a pull request is created or a target URL needs verification, Sentinel takes over.
Instead of requiring engineers to write hundreds of lines of boilerplate test scripts, Sentinel acts like a senior QA engineer on your team:
1. It reads the code diff and product requirements.
2. It understands what changed and what could break.
3. It writes real, executable test cases.
4. It runs those tests in real headless browsers or mobile runners.
5. And it reports the findings back with full logs and actionable Markdown reports.
Best of all, it doesn't just check if buttons click—it inspects network traffic to ensure analytics events like Firebase, Amplitude, and Mixpanel fire with the exact required parameters."

### 3. The 4-Stage Agent Pipeline (2:15 - 3:30)
"Under the hood, Sentinel operates through a 4-stage sequential pipeline:
Stage 1: Analyze — Sentinel gathers the PR diff, reads our app registry, loads UI selectors, and pulls analytics event contracts.
Stage 2: Plan — Using Google Gemini (gemini-3.8-flash), Sentinel generates targeted test cases and executable code, validated by an AST-based security checker.
Stage 3: Execute — Sentinel launches real engines: Playwright for Web and Patrol for Flutter mobile apps, capturing durations and error stack traces.
Stage 4: Report — Sentinel generates structured Markdown reports, posts to GitHub PRs, sends Slack alerts on failures, and archives results to disk."

### 4. Our Superpower: Data Log QA (3:30 - 4:30)
"One feature that sets Sentinel apart is Data Log QA. Most QA tools only verify visual clicks. But modern businesses run on data. If an e-commerce app changes its checkout button and forgets to pass user_id to Firebase Analytics, tracking breaks silently.
Sentinel intercepts analytics beacons during test execution and compares them against strict YAML schemas. If an event or parameter is missing, Sentinel flags it immediately."

### 5. Technologies Used (4:30 - 5:15)
"- Google Gemini API (@google/genai): Powers intelligent test planning and synthesis.
- Playwright & Patrol: Industry standard E2E test execution for Web and Flutter.
- TypeScript & Node.js: High-performance ESM runtime with Zod validation.
- AST Security Validator: Inspects AI code before execution.
- React & Vite: High-performance dark-themed engineering dashboard."

### 6. How It Helps Developers & Teams (5:15 - 6:00)
"1. Faster Releases: Automated validation on every PR saves days of manual QA.
2. Zero Tracking Regressions: Analytics contracts are strictly enforced.
3. 100% Transparency: Every test run is saved with full Markdown, execution logs, and JSON.
4. Cost Efficient: Powered by fast Gemini inference at a fraction of legacy QA suite costs."

### 7. Closing (6:00 - 6:30)
"Sentinel QA bridges the gap between rapid development and rock-solid software. It gives engineering teams the confidence to ship multiple times a day.
Thank you, let's explore the live dashboard!"`;

// --- AUTH PAGE ---

function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 300);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ background: '#1C1D26', border: '1px solid #2F3240', padding: '0.85rem', borderRadius: '10px' }}>
              <Cpu size={28} color="#FFFFFF" />
            </div>
          </div>
          <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p>{isLogin ? 'Access your Sentinel QA workspace' : 'Join the autonomous testing platform'}</p>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Jane Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="operator@sentinel.ai"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : (isLogin ? 'Sign In to Workspace' : 'Create Account')}
          </button>
        </form>
        
        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Need an account? " : "Already registered? "}
          <button 
            type="button" 
            style={{ background: 'none', border: 'none', color: '#FFFFFF', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SPEECH MODAL ---

function SpeechModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'speech' | 'pitch' | 'qa'>('speech');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SPEECH_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([SPEECH_MARKDOWN], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PROJECT_PRESENTATION_SPEECH.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '820px', width: '100%', height: '82vh' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-topbar)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Mic size={20} color="#FFFFFF" />
            <div>
              <h3 style={{ margin: 0 }}>Project Presentation & Speech Guide</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Saved file: <code>/PROJECT_PRESENTATION_SPEECH.md</code>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem' }} onClick={handleCopy}>
              {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Full Speech'}
            </button>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem' }} onClick={handleDownload}>
              <Download size={14} /> Download (.md)
            </button>
            <button className="icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: '#0D0E13', display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`filter-btn ${tab === 'speech' ? 'active' : ''}`}
            onClick={() => setTab('speech')}
          >
            Full Speech (5-7 Min)
          </button>
          <button 
            className={`filter-btn ${tab === 'pitch' ? 'active' : ''}`}
            onClick={() => setTab('pitch')}
          >
            30-Sec Elevator Pitch
          </button>
          <button 
            className={`filter-btn ${tab === 'qa' ? 'active' : ''}`}
            onClick={() => setTab('qa')}
          >
            Features & Q&A Notes
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: 'var(--bg-main)', lineHeight: 1.7 }}>
          {tab === 'pitch' && (
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-card)', marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem', fontSize: '1.1rem' }}>⏱️ The 30-Second Pitch</h4>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  "Every time developers create a Pull Request, tests take hours to write, regressions slip into production, and analytics events break without anyone noticing.
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  <strong>Sentinel QA</strong> is an autonomous QA agent powered by Google Gemini. Whenever code changes, Sentinel analyzes the PR, automatically plans and generates test code, runs end-to-end tests across Web and Flutter mobile apps, and validates analytics data logs against strict specifications.
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  It turns what used to take QA teams days into a 2-minute autonomous check—saving developer time and ensuring zero broken features reach our users."
                </p>
              </div>
            </div>
          )}

          {tab === 'speech' && (
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <section style={{ marginBottom: '2rem' }}>
                <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>0:00 - 1:00</span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '0.75rem' }}>1. Opening Hook & Welcome</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "Good morning / afternoon everyone. I'm excited to introduce <strong>Sentinel QA</strong>, our autonomous Quality Assurance and Data Log verification platform."
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "Let me start with a question every software team can relate to: How many times has a developer opened a Pull Request, merged it with confidence, only to discover hours later that a checkout button broke on mobile, or worse—that the analytics tracking stopped recording purchases?"
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "In modern software engineering, teams move fast. But testing is still one of the biggest bottlenecks. Writing end-to-end tests manually takes hours. Maintaining them is painful. And verifying analytics events—what we call <strong>Data Log QA</strong>—is almost always done by hand or completely neglected. That is why we built Sentinel QA."
                </p>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>1:00 - 2:15</span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '0.75rem' }}>2. What is Sentinel QA?</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "Sentinel QA is an autonomous testing agent that plugs directly into the developer workflow. Whenever a pull request is created or a target URL needs verification, Sentinel takes over."
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "Instead of requiring engineers to write hundreds of lines of boilerplate test scripts, Sentinel acts like a senior QA engineer on your team: It reads the code diff and product requirements, understands what changed, writes real executable test cases, executes them in real headless browsers or mobile runners, and reports the findings back with full logs."
                </p>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>2:15 - 3:30</span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '0.75rem' }}>3. The 4-Stage Agent Pipeline</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <div style={{ padding: '0.75rem', background: '#0D0E13', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>Stage 1: Analyze</strong> &mdash; Gathers PR diffs, app selectors, and analytics event contracts.
                  </div>
                  <div style={{ padding: '0.75rem', background: '#0D0E13', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>Stage 2: Plan</strong> &mdash; Google Gemini (gemini-3.8-flash) generates targeted test cases and executable code, verified by an AST security checker.
                  </div>
                  <div style={{ padding: '0.75rem', background: '#0D0E13', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>Stage 3: Execute</strong> &mdash; Launches Playwright for Web and Patrol for Flutter mobile apps, recording millisecond durations.
                  </div>
                  <div style={{ padding: '0.75rem', background: '#0D0E13', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>Stage 4: Report</strong> &mdash; Publishes Markdown reports, notifies Slack, and archives results to disk.
                  </div>
                </div>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>3:30 - 4:30</span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '0.75rem' }}>4. Our Secret Superpower: Data Log QA</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "Most QA frameworks only test visual elements—does the modal open? But businesses run on data. If an e-commerce app changes its checkout button and forgets to pass user_id to Firebase Analytics, tracking breaks silently."
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "Sentinel QA captures network requests in real-time during test execution. It matches those requests against our predefined YAML event specifications. If a required event is missing or a parameter has the wrong type, Sentinel flags it immediately before release."
                </p>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>5:15 - 6:30</span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '0.75rem' }}>5. Impact & Conclusion</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  "In summary, Sentinel QA delivers: 10x faster PR verification, zero silent tracking regressions, 100% transparent reports saved to disk, and huge developer time savings."
                </p>
              </section>
            </div>
          )}

          {tab === 'qa' && (
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', background: 'var(--bg-card)' }}>
                <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Q: Does Sentinel QA replace human QA engineers?</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  No, it empowers them! Sentinel takes over repetitive regression testing, DOM checks, and tedious analytics event audits so QA engineers can focus on exploratory testing and higher-level quality strategy.
                </p>
              </div>

              <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', background: 'var(--bg-card)' }}>
                <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Q: How does Sentinel prevent AI hallucination?</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  All generated test code passes through an AST security parser and actually runs against real browsers. If an assertion fails or an element doesn't exist, the failure is caught and documented with stack traces.
                </p>
              </div>

              <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', background: 'var(--bg-card)' }}>
                <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Q: What technologies are used?</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Google Gemini 3.8 Flash, Playwright (Web E2E), Patrol (Flutter Mobile), Node.js/TypeScript ESM, Zod validation, Vite + React for the dashboard.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- LAYOUT ---

function Footer() {
  return (
    <footer className="page-footer">
      <div>&copy; {new Date().getFullYear()} Sentinel QA. Autonomous Testing & Data Log QA.</div>
      <div className="footer-links">
        <a href="https://github.com/ahn283/sentinel-qa" target="_blank" rel="noreferrer">Documentation</a>
        <a href="#speech">Presentation Guide</a>
        <a href="#privacy">Privacy</a>
      </div>
    </footer>
  );
}

function Topbar({ onRefresh, onOpenSpeech }: { onRefresh?: () => void, onOpenSpeech: () => void }) {
  const location = useLocation();
  const pathNames = {
    '/': 'Dashboard',
    '/tests': 'Past Tests',
    '/reports': 'Reports',
    '/keys': 'API Keys & Environment',
    '/settings': 'Settings',
  };
  const currentPath = pathNames[location.pathname as keyof typeof pathNames] || 'Dashboard';

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        <span>Sentinel QA</span>
        <ChevronRight size={13} />
        <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{currentPath}</span>
      </div>

      <div className="topbar-actions">
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} 
          onClick={onOpenSpeech}
          title="Open Project Presentation & Pitch Speech"
        >
          <Mic size={13} color="#FFFFFF" /> Presentation Speech
        </button>

        {onRefresh && (
          <button className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={onRefresh} title="Refresh workspace data">
            <RefreshCw size={13} /> Refresh
          </button>
        )}
        <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 0.15rem' }}></div>
        <div className="user-profile">
          <div className="avatar">QA</div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Lead Operator</span>
        </div>
      </div>
    </header>
  );
}

function Layout({ children, onLogout, onRefresh, onOpenSpeech }: { children: React.ReactNode, onLogout: () => void, onRefresh?: () => void, onOpenSpeech: () => void }) {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Cpu size={20} /> Sentinel QA
          </div>
        </div>
        
        <nav className="sidebar-content">
          <div>
            <div className="nav-section-title">Main Menu</div>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <Activity size={16} /> Dashboard
            </Link>
            <Link to="/tests" className={`nav-link ${location.pathname === '/tests' ? 'active' : ''}`}>
              <History size={16} /> Past Tests
            </Link>
          </div>

          <div>
            <div className="nav-section-title">Reports & Data</div>
            <Link to="/reports" className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}>
              <FileText size={16} /> Reports Directory
            </Link>
            <Link to="/keys" className={`nav-link ${location.pathname === '/keys' ? 'active' : ''}`}>
              <Key size={16} /> API Keys & Status
            </Link>
          </div>

          <div>
            <div className="nav-section-title">Resources</div>
            <button 
              className="nav-link" 
              style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
              onClick={onOpenSpeech}
            >
              <Mic size={16} /> Presentation Speech
            </button>
            <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
              <Settings size={16} /> Settings
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button onClick={onLogout} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>
      
      <div className="content-wrapper">
        <Topbar onRefresh={onRefresh} onOpenSpeech={onOpenSpeech} />
        <main className="main-content">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}

// --- DASHBOARD PAGE ---

function Dashboard({ onReportGenerated }: { onReportGenerated?: () => void }) {
  const [stats, setStats] = useState<any>({
    totalTests: 0,
    totalRuns: 0,
    passedTests: 0,
    failedTests: 0,
    successRate: '100.0',
    registeredAppsCount: 0,
    savedReportsCount: 0,
    lastRun: null,
    agentStatus: 'Ready'
  });
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [runningTarget, setRunningTarget] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState('');
  const [logs, setLogs] = useState<{ text: string, type: string }[]>([]);
  const [lastGeneratedReportId, setLastGeneratedReportId] = useState<string | null>(null);

  const fetchWorkspaceData = async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/apps')
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (appsRes.ok) setApps(await appsRes.json());
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  const runTest = async (target: string) => {
    setRunning(true);
    setRunningTarget(target);
    setLastGeneratedReportId(null);
    setLogs([
      { text: `[sentinel-qa] Initializing QA Agent for target: ${target}...`, type: 'info' },
      { text: `[sentinel-qa] Stage 1: Analyze — resolving app registry & DOM contracts...`, type: 'info' }
    ]);

    try {
      const isUrl = target.startsWith('http://') || target.startsWith('https://');
      
      setTimeout(() => {
        setLogs(prev => [
          ...prev, 
          { text: `[sentinel-qa] Stage 2: Plan — generating targeted test cases via Gemini...`, type: 'info' },
          { text: `[sentinel-qa] Stage 3: Execute — running test assertions on ${isUrl ? 'live endpoint' : target}...`, type: 'info' }
        ]);
      }, 500);

      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });

      const data = await res.json();
      
      if (data.success && data.report) {
        const tests = data.report.json?.tests || [];
        tests.forEach((t: any) => {
          setLogs(prev => [
            ...prev,
            { 
              text: `  ${t.status === 'passed' ? '✓' : '✗'}  ${t.id}: ${t.title} (${t.duration}ms)`, 
              type: t.status === 'passed' ? 'success' : 'error' 
            }
          ]);
        });

        setLogs(prev => [
          ...prev,
          { text: `[sentinel-qa] Stage 4: Report — Generated and saved report to disk at reports/${data.report.app}/${data.report.date}/report.md`, type: 'info' },
          { text: `[sentinel-qa] Test execution finished. Result: ${data.report.summary.status.toUpperCase()}`, type: data.report.summary.status === 'passed' ? 'success' : 'warn' }
        ]);

        setLastGeneratedReportId(data.report.id);
        await fetchWorkspaceData();
        if (onReportGenerated) onReportGenerated();
      } else {
        setLogs(prev => [...prev, { text: `[sentinel-qa:error] Run failed: ${data.error || 'Unknown error'}`, type: 'error' }]);
      }
    } catch (err: any) {
      setLogs(prev => [...prev, { text: `[sentinel-qa:error] Communication error: ${err.message}`, type: 'error' }]);
    } finally {
      setRunning(false);
      setRunningTarget('');
    }
  };

  const handleCustomRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetUrl) {
      runTest(targetUrl);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1>Autonomous QA Dashboard</h1>
          <p style={{ margin: 0 }}>Live telemetry & verified test runs across registered web and mobile applications.</p>
        </div>
        <button className="btn btn-primary" onClick={() => document.getElementById('adhoc')?.scrollIntoView({ behavior: 'smooth' })}>
          <Play size={14} /> New Test Run
        </button>
      </div>

      <div className="grid-4">
        <div className="card stat-card">
          <Activity className="stat-icon" size={38} />
          <span className="stat-label">Total Tests Executed</span>
          <span className="stat-value">{stats.totalTests}</span>
          <span className="stat-trend" style={{ color: 'var(--text-muted)' }}>
            Across {stats.totalRuns} recorded test run{stats.totalRuns === 1 ? '' : 's'}
          </span>
        </div>
        <div className="card stat-card">
          <CheckCircle2 className="stat-icon" size={38} />
          <span className="stat-label">Success Rate</span>
          <span className="stat-value" style={{ color: parseFloat(stats.successRate) >= 90 ? 'var(--success)' : 'var(--error)' }}>
            {stats.successRate}%
          </span>
          <span className="stat-trend" style={{ color: 'var(--text-muted)' }}>
            {stats.passedTests} passed &bull; {stats.failedTests} failed
          </span>
        </div>
        <div className="card stat-card">
          <Layers className="stat-icon" size={38} />
          <span className="stat-label">Configured Applications</span>
          <span className="stat-value">{stats.registeredAppsCount}</span>
          <span className="stat-trend" style={{ color: 'var(--text-muted)' }}>
            Loaded from registry/apps.yaml
          </span>
        </div>
        <div className="card stat-card">
          <Cpu className="stat-icon" size={38} />
          <span className="stat-label">Agent State</span>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
            <div className={`status-dot ${running ? 'status-running' : 'status-passed'}`}></div>
            <span style={{ fontSize: '1.15rem' }}>{running ? 'Executing...' : 'Idle (Ready)'}</span>
          </div>
          <span className="stat-trend" style={{ color: 'var(--text-muted)' }}>
            {stats.lastRun ? `Latest run ${stats.lastRun.substring(0, 10)}` : 'Ready for execution'}
          </span>
        </div>
      </div>

      <div className="dashboard-top">
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3>Registered Applications</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{apps.length} APPS</span>
          </div>
          <p style={{ fontSize: '0.8125rem' }}>Managed applications configured in <code>registry/apps.yaml</code> with selector contracts and event specs.</p>
          
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading registry...</div>
          ) : (
            <div className="app-list">
              {apps.map((app) => (
                <div key={app.id} className="app-item">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{app.id}</h4>
                      <span className={`badge badge-${app.type}`}>{app.type}</span>
                      {app.lastStatus && (
                        <span style={{ fontSize: '0.75rem', color: app.lastStatus === 'passed' ? 'var(--success)' : 'var(--error)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span className={`status-dot ${app.lastStatus === 'passed' ? 'status-passed' : 'status-failed'}`}></span>
                          {app.lastStatus.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <span>{app.url || app.repo || 'Local Test Harness'}</span>
                      <span>&bull;</span>
                      <span>{app.lastRun ? `Last run ${app.lastRun.replace('T', ' ').substring(0, 16)}` : 'Awaiting first run'}</span>
                      <span>&bull;</span>
                      <span>{app.totalRuns} total run{app.totalRuns === 1 ? '' : 's'}</span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => runTest(app.id)} 
                    disabled={running}
                  >
                    <Play size={13} /> {running && runningTarget === app.id ? 'Running...' : 'Run Suite'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card adhoc-panel" id="adhoc" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Ad-Hoc Live Testing</h3>
          <p style={{ fontSize: '0.8125rem' }}>Benchmark and test any live public web URL without prior configuration. Measures TTFB, DOM headers, and connectivity, creating a real report.</p>
          
          <form onSubmit={handleCustomRun} style={{ marginTop: 'auto' }}>
            <label className="input-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Target URL</label>
            <div className="adhoc-input" style={{ margin: 0 }}>
              <input 
                type="url" 
                className="input-field" 
                placeholder="https://example.com" 
                value={targetUrl}
                onChange={e => setTargetUrl(e.target.value)}
                required
                style={{ flex: 1 }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.85rem' }} disabled={running}>
              <LinkIcon size={14} /> {running && runningTarget === targetUrl ? 'Testing Live Target...' : 'Execute Live Test'}
            </button>
          </form>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
              <Cpu size={16} color="#FFFFFF" />
              <span>Real Execution Console</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {lastGeneratedReportId && (
                <Link to="/reports" className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                  <FileText size={13} /> View Saved Report
                </Link>
              )}
              <button className="btn btn-ghost" style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem' }} onClick={() => setLogs([])}>
                Clear
              </button>
            </div>
          </div>
          <div className="console-window">
            {logs.map((log, i) => (
              <div key={i} className={`console-line console-${log.type}`}>
                {log.text}
              </div>
            ))}
            {running && <div className="console-line console-info" style={{ animation: 'pulse 1.4s infinite' }}>[sentinel agent executing assertions...]</div>}
          </div>
        </div>
      )}
    </>
  );
}

// --- PAST TESTS PAGE ---

function PastTests() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLogModal, setActiveLogModal] = useState<any | null>(null);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      if (res.ok) {
        setReports(await res.json());
      }
    } catch (err) {
      console.error('Failed to load past test runs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const toggleSave = async (reportId: string, currentSaved: boolean) => {
    try {
      const res = await fetch('/api/reports/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reportId, saved: !currentSaved })
      });
      if (res.ok) {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, saved: !currentSaved } : r));
      }
    } catch (err) {
      console.error('Failed to update save status', err);
    }
  };

  const filteredRuns = reports.filter(r => {
    const matchesSearch = r.app.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'All') return true;
    if (filter === 'Passed') return r.summary.status === 'passed';
    if (filter === 'Failed') return r.summary.status === 'failed';
    if (filter === 'Saved') return Boolean(r.saved);
    return true;
  });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Historical Test Runs</h1>
          <p style={{ margin: 0 }}>Every actual test execution recorded on disk in <code>./reports/</code>.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="topbar-search" style={{ width: '240px' }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search runs..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
          <button className="btn btn-outline" onClick={fetchReports} title="Reload runs from disk">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', minHeight: '500px' }}>
        <div className="filter-bar">
          <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>
            All Runs ({reports.length})
          </button>
          <button className={`filter-btn ${filter === 'Passed' ? 'active' : ''}`} onClick={() => setFilter('Passed')}>
            Passed ({reports.filter(r => r.summary.status === 'passed').length})
          </button>
          <button className={`filter-btn ${filter === 'Failed' ? 'active' : ''}`} onClick={() => setFilter('Failed')}>
            Failed ({reports.filter(r => r.summary.status === 'failed').length})
          </button>
          <button className={`filter-btn ${filter === 'Saved' ? 'active' : ''}`} onClick={() => setFilter('Saved')}>
            ⭐ Saved ({reports.filter(r => r.saved).length})
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Activity size={32} className="status-running" style={{ margin: '0 auto 1rem' }} />
            Loading runs from disk...
          </div>
        ) : filteredRuns.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <History size={40} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)' }}>No test runs found</p>
            <p>Run a test from the Dashboard to record results here.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: '36px' }}>Save</th>
                  <th>Application</th>
                  <th>Environment</th>
                  <th>Trigger</th>
                  <th>Status</th>
                  <th>Assertions</th>
                  <th>Duration</th>
                  <th>Date Recorded</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRuns.map((run) => (
                  <tr key={run.id}>
                    <td>
                      <button 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: run.saved ? '#F59E0B' : 'var(--text-subtle)', display: 'flex' }}
                        onClick={() => toggleSave(run.id, run.saved)}
                        title={run.saved ? 'Remove from saved' : 'Save report'}
                      >
                        <Star size={15} fill={run.saved ? '#F59E0B' : 'none'} />
                      </button>
                    </td>
                    <td style={{ fontWeight: 600 }}>{run.app}</td>
                    <td><span className={`badge badge-${run.summary.platform}`}>{run.summary.platform}</span></td>
                    <td><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{run.summary.trigger}</span></td>
                    <td>
                      <div className="status-indicator">
                        <div className={`status-dot ${run.summary.status === 'passed' ? 'status-passed' : 'status-failed'}`}></div>
                        <span style={{ textTransform: 'capitalize' }}>{run.summary.status}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
                        {run.summary.passed}/{run.summary.total} pass
                      </span>
                    </td>
                    <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{run.summary.duration}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {run.date.replace(/-/g, '/').replace('T', ' ').substring(0, 16)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.45rem' }}>
                        <button
                          className="btn btn-ghost"
                          style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem' }}
                          onClick={() => setActiveLogModal(run)}
                        >
                          View Log
                        </button>
                        <Link
                          to="/reports"
                          className="btn btn-outline"
                          style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem' }}
                        >
                          Report
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {activeLogModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '720px', width: '100%', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>Execution Details: {activeLogModal.app}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ID: <code>{activeLogModal.id}</code> &bull; Duration: {activeLogModal.summary.duration}
                </span>
              </div>
              <button className="icon-btn" onClick={() => setActiveLogModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.8125rem', marginBottom: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Assertions & Checks
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '180px', overflowY: 'auto' }}>
                {(activeLogModal.json?.tests || []).map((t: any) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.65rem', background: '#090A0E', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {t.status === 'passed' ? <CheckCircle2 size={13} color="var(--success)" /> : <XCircle size={13} color="var(--error)" />}
                      <span style={{ fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{t.id}:</span>
                      <span>{t.title}</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{t.duration}ms</span>
                  </div>
                ))}
              </div>
            </div>

            <h4 style={{ fontSize: '0.8125rem', marginBottom: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Report Markdown Output
            </h4>
            <pre className="console-window" style={{ whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto', fontSize: '0.75rem' }}>
              {activeLogModal.content}
            </pre>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
              <button
                className="btn btn-outline"
                style={{ padding: '0.45rem 0.85rem' }}
                onClick={() => {
                  toggleSave(activeLogModal.id, activeLogModal.saved);
                  setActiveLogModal({ ...activeLogModal, saved: !activeLogModal.saved });
                }}
              >
                <Star size={13} fill={activeLogModal.saved ? '#F59E0B' : 'none'} color={activeLogModal.saved ? '#F59E0B' : 'white'} />
                {activeLogModal.saved ? 'Saved in Library' : 'Save Report'}
              </button>
              <button className="btn btn-primary" onClick={() => setActiveLogModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// --- REPORTS PAGE ---

function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'saved' | 'passed' | 'failed'>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewTab, setViewTab] = useState<'formatted' | 'markdown' | 'json'>('formatted');
  const [copied, setCopied] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reports');
      if (res.ok) {
        const data = await res.json();
        setReports(data);
        if (data.length > 0 && !selectedReport) {
          setSelectedReport(data[0]);
        } else if (selectedReport) {
          const updatedSelected = data.find((r: any) => r.id === selectedReport.id);
          if (updatedSelected) setSelectedReport(updatedSelected);
        }
      }
    } catch (err) {
      console.error('Failed to load reports', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const toggleSaveReport = async (reportId: string, currentSaved: boolean) => {
    try {
      const res = await fetch('/api/reports/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reportId, saved: !currentSaved })
      });
      if (res.ok) {
        const nextState = !currentSaved;
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, saved: nextState } : r));
        if (selectedReport?.id === reportId) {
          setSelectedReport({ ...selectedReport, saved: nextState });
        }
        setActionSuccess(nextState ? 'Report saved to library!' : 'Report removed from saved');
        setTimeout(() => setActionSuccess(null), 2500);
      }
    } catch (err) {
      console.error('Failed to toggle save status', err);
    }
  };

  const deleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this test report from disk?')) return;
    try {
      const res = await fetch('/api/reports/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reportId })
      });
      if (res.ok) {
        const remaining = reports.filter(r => r.id !== reportId);
        setReports(remaining);
        if (selectedReport?.id === reportId) {
          setSelectedReport(remaining[0] || null);
        }
        setActionSuccess('Report deleted successfully');
        setTimeout(() => setActionSuccess(null), 2500);
      }
    } catch (err) {
      console.error('Failed to delete report', err);
    }
  };

  const downloadReportFile = (report: any, format: 'md' | 'json') => {
    const isJson = format === 'json';
    const content = isJson ? JSON.stringify(report.json, null, 2) : report.content;
    const type = isJson ? 'application/json' : 'text/markdown';
    const ext = isJson ? 'json' : 'md';

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.app}-${report.date}-report.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setActionSuccess(`Downloaded ${report.app} report as .${ext}`);
    setTimeout(() => setActionSuccess(null), 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.app.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.content.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'saved' && !r.saved) return false;
    if (filterType === 'passed' && r.summary.status !== 'passed') return false;
    if (filterType === 'failed' && r.summary.status !== 'failed') return false;

    if (platformFilter !== 'all' && r.summary.platform !== platformFilter) return false;

    return true;
  });

  const savedCount = reports.filter(r => r.saved).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Test Reports Directory</h1>
          <p style={{ margin: 0 }}>Actual Markdown & JSON test execution reports saved on disk in <code>./reports/</code>.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="btn btn-outline" onClick={fetchReports} title="Reload reports from disk">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div style={{ background: '#121F17', color: '#A7F3D0', padding: '0.65rem 1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #1A3828', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
          <Check size={14} color="var(--success)" /> {actionSuccess}
        </div>
      )}

      {loading ? (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <Activity size={32} className="status-running" style={{ margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>Loading reports from filesystem...</p>
        </div>
      ) : (
        <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr', gap: '1.25rem' }}>
          
          {/* LEFT LIST PANEL */}
          <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 230px)', minHeight: '640px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-topbar)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div className="topbar-search" style={{ flex: 1 }}>
                  <Search size={14} color="var(--text-muted)" />
                  <input 
                    type="text" 
                    placeholder="Search reports..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
                <select
                  value={platformFilter}
                  onChange={e => setPlatformFilter(e.target.value)}
                  style={{ background: '#121319', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0 0.5rem', fontSize: '0.75rem', outline: 'none' }}
                >
                  <option value="all">All</option>
                  <option value="web">Web</option>
                  <option value="flutter">Flutter</option>
                  <option value="adhoc">Ad-Hoc</option>
                </select>
              </div>

              {/* FILTER BUTTONS */}
              <div className="filter-bar" style={{ width: '100%', display: 'flex' }}>
                <button 
                  className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterType('all')}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  All ({reports.length})
                </button>
                <button 
                  className={`filter-btn ${filterType === 'saved' ? 'active' : ''}`}
                  onClick={() => setFilterType('saved')}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  ⭐ Saved ({savedCount})
                </button>
                <button 
                  className={`filter-btn ${filterType === 'passed' ? 'active' : ''}`}
                  onClick={() => setFilterType('passed')}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Passed
                </button>
                <button 
                  className={`filter-btn ${filterType === 'failed' ? 'active' : ''}`}
                  onClick={() => setFilterType('failed')}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Failed
                </button>
              </div>
            </div>

            {/* REPORT LIST */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredReports.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <FileText size={32} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                  <p>No reports match your filters.</p>
                </div>
              ) : (
                filteredReports.map(report => {
                  const isSelected = selectedReport?.id === report.id;
                  return (
                    <div 
                      key={report.id} 
                      onClick={() => setSelectedReport(report)}
                      style={{ 
                        padding: '0.9rem 1rem', 
                        borderBottom: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        background: isSelected ? '#181A22' : 'transparent',
                        borderLeft: isSelected ? '3px solid #FFFFFF' : '3px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? '#FFFFFF' : 'var(--text-main)' }}>
                          {report.app}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.7rem', color: report.summary.status === 'passed' ? 'var(--success)' : 'var(--error)', textTransform: 'uppercase', fontWeight: 600 }}>
                            {report.summary.status}
                          </span>
                          <button
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: report.saved ? '#F59E0B' : 'var(--text-subtle)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveReport(report.id, report.saved);
                            }}
                            title={report.saved ? 'Unsave report' : 'Save report'}
                          >
                            <Star size={14} fill={report.saved ? '#F59E0B' : 'none'} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        <span className={`badge badge-${report.summary.platform}`}>{report.summary.platform}</span>
                        <span>&bull;</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{report.summary.passed}/{report.summary.total} pass</span>
                        <span>&bull;</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{report.summary.duration}</span>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={11} />
                          {report.date.replace(/-/g, '/').replace('T', ' ').substring(0, 16)}
                        </span>
                        {report.saved && (
                          <span style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.68rem' }}>SAVED</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT DETAIL PANEL */}
          <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 230px)', minHeight: '640px', overflow: 'hidden' }}>
            {selectedReport ? (
              <>
                {/* DETAIL HEADER & ACTION TOOLBAR */}
                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-topbar)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{selectedReport.app} Test Report</h2>
                        <span className={`badge badge-${selectedReport.summary.platform}`}>{selectedReport.summary.platform}</span>
                        <span style={{ fontSize: '0.75rem', color: selectedReport.summary.status === 'passed' ? 'var(--success)' : 'var(--error)', fontWeight: 600, textTransform: 'uppercase' }}>
                          {selectedReport.summary.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                        Timestamp: <code style={{ color: 'var(--text-main)' }}>{selectedReport.date}</code> &bull; Suite: {selectedReport.json?.meta?.suite || 'autonomous-qa'}
                      </div>
                    </div>

                    {/* ACTIONS: SAVE, DOWNLOAD, COPY, DELETE */}
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-outline" 
                        onClick={() => toggleSaveReport(selectedReport.id, selectedReport.saved)}
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', color: selectedReport.saved ? '#F59E0B' : 'white' }}
                        title="Toggle save status for this report"
                      >
                        <Star size={13} fill={selectedReport.saved ? '#F59E0B' : 'none'} />
                        {selectedReport.saved ? 'Saved' : 'Save Report'}
                      </button>

                      <button 
                        className="btn btn-outline" 
                        onClick={() => downloadReportFile(selectedReport, 'md')} 
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
                        title="Download Markdown report file"
                      >
                        <Download size={13} /> .md
                      </button>

                      <button 
                        className="btn btn-outline" 
                        onClick={() => downloadReportFile(selectedReport, 'json')} 
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
                        title="Download JSON run result"
                      >
                        <Download size={13} /> .json
                      </button>

                      <button 
                        className="btn btn-outline" 
                        onClick={() => copyToClipboard(selectedReport.content)} 
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
                        title="Copy Markdown text"
                      >
                        {copied ? <Check size={13} color="var(--success)" /> : <Copy size={13} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>

                      <button 
                        className="btn btn-ghost" 
                        onClick={() => deleteReport(selectedReport.id)} 
                        style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem', color: 'var(--error)' }}
                        title="Delete report from disk"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* VIEW SWITCHER TABS */}
                  <div className="filter-bar" style={{ marginBottom: 0, padding: '0.15rem' }}>
                    <button 
                      className={`filter-btn ${viewTab === 'formatted' ? 'active' : ''}`}
                      onClick={() => setViewTab('formatted')}
                      style={{ fontSize: '0.75rem' }}
                    >
                      Formatted Summary
                    </button>
                    <button 
                      className={`filter-btn ${viewTab === 'markdown' ? 'active' : ''}`}
                      onClick={() => setViewTab('markdown')}
                      style={{ fontSize: '0.75rem' }}
                    >
                      Raw Markdown (.md)
                    </button>
                    <button 
                      className={`filter-btn ${viewTab === 'json' ? 'active' : ''}`}
                      onClick={() => setViewTab('json')}
                      style={{ fontSize: '0.75rem' }}
                    >
                      Result JSON
                    </button>
                  </div>
                </div>

                {/* DETAIL BODY */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.35rem', background: 'var(--bg-main)' }}>
                  
                  {viewTab === 'formatted' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {/* STATS TILES */}
                      <div className="grid-4" style={{ gap: '0.85rem' }}>
                        <div className="card" style={{ padding: '0.85rem', background: 'var(--bg-card)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Total Tests</span>
                          <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.2rem', fontFamily: 'JetBrains Mono, monospace' }}>
                            {selectedReport.summary.total}
                          </div>
                        </div>
                        <div className="card" style={{ padding: '0.85rem', background: 'var(--bg-card)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Passed Tests</span>
                          <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.2rem', color: 'var(--success)', fontFamily: 'JetBrains Mono, monospace' }}>
                            {selectedReport.summary.passed}
                          </div>
                        </div>
                        <div className="card" style={{ padding: '0.85rem', background: 'var(--bg-card)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Failures</span>
                          <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.2rem', color: selectedReport.summary.failed > 0 ? 'var(--error)' : 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                            {selectedReport.summary.failed}
                          </div>
                        </div>
                        <div className="card" style={{ padding: '0.85rem', background: 'var(--bg-card)' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Duration</span>
                          <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.2rem', fontFamily: 'JetBrains Mono, monospace' }}>
                            {selectedReport.summary.duration}
                          </div>
                        </div>
                      </div>

                      {/* TEST CASES TABLE */}
                      <div className="card" style={{ padding: '1.15rem', background: 'var(--bg-card)' }}>
                        <h4 style={{ marginBottom: '0.85rem', fontSize: '0.9375rem' }}>Assertions Breakdown</h4>
                        <div className="table-container">
                          <table className="modern-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Test ID</th>
                                <th>Description / Title</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(selectedReport.json?.tests || []).map((t: any, idx: number) => (
                                <tr key={t.id || idx}>
                                  <td style={{ color: 'var(--text-subtle)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{idx + 1}</td>
                                  <td style={{ fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{t.id}</td>
                                  <td style={{ fontSize: '0.8125rem' }}>{t.title}</td>
                                  <td>
                                    <span style={{ color: t.status === 'passed' ? 'var(--success)' : 'var(--error)', fontWeight: 600, fontSize: '0.72rem' }}>
                                      {t.status.toUpperCase()}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{t.duration}ms</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* FAILURES DETAILS IF ANY */}
                      {selectedReport.summary.failed > 0 && (
                        <div className="card" style={{ padding: '1.15rem', background: '#1A0E12', border: '1px solid #4D1A25' }}>
                          <h4 style={{ color: '#FB7185', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <ShieldAlert size={16} /> Failure Details & Stack Trace
                          </h4>
                          {(selectedReport.json?.tests || []).filter((t: any) => t.status === 'failed').map((t: any) => (
                            <div key={t.id} style={{ marginBottom: '0.75rem' }}>
                              <div style={{ fontWeight: 600, color: '#FDA4AF', fontSize: '0.8125rem' }}>{t.id}: {t.title}</div>
                              <pre style={{ background: '#090A0E', padding: '0.75rem', borderRadius: '6px', color: '#FB7185', fontSize: '0.75rem', marginTop: '0.4rem', whiteSpace: 'pre-wrap', border: '1px solid #36141D' }}>
                                {t.error || 'Assertion failed during run'}
                              </pre>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* EVENT VALIDATION (DATA LOG QA) */}
                      {selectedReport.json?.event_validation && (
                        <div className="card" style={{ padding: '1.15rem', background: 'var(--bg-card)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <h4 style={{ margin: 0, fontSize: '0.9375rem' }}>Data Log QA (Event Contracts)</h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontFamily: 'JetBrains Mono, monospace' }}>
                              {selectedReport.json.event_validation.matched}/{selectedReport.json.event_validation.total_expected} Events Matched
                            </span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {(selectedReport.json.event_validation.results || []).map((ev: any, idx: number) => (
                              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#090A0E', borderRadius: '6px', fontSize: '0.78rem', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                  <code style={{ color: '#FFFFFF', fontWeight: 600 }}>{ev.event_name}</code>
                                  <span style={{ color: 'var(--text-muted)' }}>Trigger: {ev.trigger}</span>
                                </div>
                                <span style={{ color: ev.status === 'matched' ? 'var(--success)' : 'var(--error)', fontWeight: 600, fontSize: '0.72rem' }}>
                                  {ev.status.toUpperCase()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* TOKEN USAGE */}
                      {selectedReport.json?.meta?.tokenUsage && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', display: 'flex', gap: '1rem', fontFamily: 'JetBrains Mono, monospace' }}>
                          <span>Gemini Tokens: {selectedReport.json.meta.tokenUsage.inputTokens} in / {selectedReport.json.meta.tokenUsage.outputTokens} out</span>
                          <span>&bull;</span>
                          <span>Path: ./reports/{selectedReport.app}/{selectedReport.date}/</span>
                        </div>
                      )}
                    </div>
                  )}

                  {viewTab === 'markdown' && (
                    <div className="console-window" style={{ maxHeight: 'none', background: '#08090C', border: '1px solid var(--border-color)' }}>
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-main)', margin: 0, fontSize: '0.8125rem' }}>
                        {selectedReport.content}
                      </pre>
                    </div>
                  )}

                  {viewTab === 'json' && (
                    <div className="console-window" style={{ maxHeight: 'none', background: '#08090C', border: '1px solid var(--border-color)' }}>
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace', color: '#D4D4D8', margin: 0, fontSize: '0.8125rem' }}>
                        {JSON.stringify(selectedReport.json || {}, null, 2)}
                      </pre>
                    </div>
                  )}

                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem', color: 'var(--text-muted)' }}>
                <FileText size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p>Select a report from the list to view its contents.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- API KEYS & ENVIRONMENT STATUS PAGE ---

function ApiKeysPage() {
  const [system, setSystem] = useState<any>({
    geminiConfigured: false,
    model: 'gemini-3.8-flash',
    slackConfigured: false
  });

  useEffect(() => {
    fetch('/api/system')
      .then(res => res.json())
      .then(data => setSystem(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>API Keys & System Environment</h1>
      <p>Actual status of integration credentials and LLM providers used by Sentinel QA.</p>
      
      <div className="grid-2" style={{ marginTop: '1.5rem', gap: '1.25rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="#FFFFFF" /> Google Gemini API
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="input-label">Model Target</label>
              <input type="text" className="input-field" value={system.model} readOnly />
            </div>
            <div>
              <label className="input-label">GEMINI_API_KEY Environment Binding</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 0.85rem', background: '#08090C', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div className={`status-dot ${system.geminiConfigured ? 'status-passed' : 'status-failed'}`}></div>
                <span style={{ fontWeight: 500, fontSize: '0.8125rem' }}>
                  {system.geminiConfigured ? 'Active & Injected from Environment' : 'Optional / Using Local Test Fallback'}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              To specify a custom key, define <code>GEMINI_API_KEY=...</code> in <code>.env</code>.
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={18} color="#FFFFFF" /> Notification Dispatchers
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="input-label">Slack Webhook (SLACK_WEBHOOK_URL)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 0.85rem', background: '#08090C', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div className={`status-dot ${system.slackConfigured ? 'status-passed' : 'status-failed'}`}></div>
                <span style={{ fontSize: '0.8125rem' }}>{system.slackConfigured ? 'Configured & Enabled' : 'Not Set (Optional)'}</span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Bug reports and failed test notifications are pushed to Slack when configured.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SETTINGS PAGE ---

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Configure agent preferences and LLM connection settings.</p>
      
      <div className="card" style={{ padding: '1.75rem', marginTop: '1.25rem', maxWidth: '640px' }}>
        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
          Sentinel QA Workspace Config
        </h3>
        
        <div className="input-group">
          <label className="input-label">LLM Provider</label>
          <input className="input-field" value="Google Gemini (gemini-3.8-flash)" readOnly />
        </div>

        <div className="input-group">
          <label className="input-label">Active Runners</label>
          <input className="input-field" value="Playwright (Web), Patrol (Flutter)" readOnly />
        </div>

        <div className="input-group">
          <label className="input-label">Reports Storage Path</label>
          <input className="input-field" value="./reports/<appId>/<timestamp>/" readOnly />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#E4E4E7', marginTop: '1.5rem', padding: '1rem', background: '#14151C', borderRadius: '8px', border: '1px solid #2B2D3C' }}>
          <ShieldAlert size={18} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#FFFFFF' }}>Configuration Managed</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              App specifications are defined in <code>registry/apps.yaml</code> and runtime parameters in <code>sentinel-qa.config.yaml</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- APP ROUTER ---

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showSpeechModal, setShowSpeechModal] = useState(false);

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Layout 
        onLogout={() => setIsAuthenticated(false)} 
        onRefresh={() => setRefreshTrigger(prev => prev + 1)}
        onOpenSpeech={() => setShowSpeechModal(true)}
      >
        <Routes>
          <Route path="/" element={<Dashboard key={refreshTrigger} onReportGenerated={() => setRefreshTrigger(p => p + 1)} />} />
          <Route path="/tests" element={<PastTests key={refreshTrigger} />} />
          <Route path="/reports" element={<ReportsPage key={refreshTrigger} />} />
          <Route path="/keys" element={<ApiKeysPage key={refreshTrigger} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>

      {showSpeechModal && (
        <SpeechModal onClose={() => setShowSpeechModal(false)} />
      )}
    </BrowserRouter>
  );
}

export default App;
