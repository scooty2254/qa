import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Activity, Settings, LogOut, Play, ShieldAlert, Cpu, Layers, Link as LinkIcon, CheckCircle2, XCircle, Clock, Search, History, Bell, FileText, Key, ChevronRight, User, ArrowUpRight, ArrowDownRight, Download, Eye, X } from 'lucide-react';
import './index.css';

// --- AUTH CONTEXT & COMPONENTS ---

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
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '12px' }}>
              <Cpu size={32} color="white" />
            </div>
          </div>
          <h1>{isLogin ? 'Welcome back' : 'Create an account'}</h1>
          <p>{isLogin ? 'Sign in to your Sentinel QA dashboard' : 'Join the autonomous testing platform'}</p>
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
              placeholder="agent@sentinel.ai"
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.875rem' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up for free' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- LAYOUT ---

function Footer() {
  return (
    <footer className="page-footer">
      <div>&copy; {new Date().getFullYear()} Sentinel QA. All rights reserved.</div>
      <div className="footer-links">
        <a href="#">Documentation</a>
        <a href="#">Support</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </footer>
  );
}

function Topbar() {
  const location = useLocation();
  const pathNames = {
    '/': 'Dashboard',
    '/tests': 'Past Tests',
    '/reports': 'Reports',
    '/keys': 'API Keys',
    '/settings': 'Settings',
  };
  const currentPath = pathNames[location.pathname as keyof typeof pathNames] || 'Dashboard';

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        <span>Sentinel QA</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)' }}>{currentPath}</span>
      </div>
      
      <div className="topbar-search">
        <Search size={16} color="var(--text-muted)" />
        <input type="text" placeholder="Search across workspace (Ctrl+K)..." />
      </div>

      <div className="topbar-actions">
        <button className="icon-btn">
          <Bell size={18} />
        </button>
        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 0.5rem' }}></div>
        <div className="user-profile" style={{ cursor: 'pointer' }}>
          <div className="avatar">JD</div>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Jane Doe</span>
        </div>
      </div>
    </header>
  );
}

function Layout({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Cpu size={24} /> Sentinel QA
          </div>
        </div>
        
        <nav className="sidebar-content">
          <div>
            <div className="nav-section-title">Main Menu</div>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <Activity size={18} /> Dashboard
            </Link>
            <Link to="/tests" className={`nav-link ${location.pathname === '/tests' ? 'active' : ''}`}>
              <History size={18} /> Past Tests
            </Link>
          </div>

          <div>
            <div className="nav-section-title">Resources</div>
            <Link to="/reports" className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}>
              <FileText size={18} /> Reports
            </Link>
            <Link to="/keys" className={`nav-link ${location.pathname === '/keys' ? 'active' : ''}`}>
              <Key size={18} /> API Keys
            </Link>
          </div>

          <div>
            <div className="nav-section-title">System</div>
            <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
              <Settings size={18} /> Settings
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button onClick={onLogout} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>
            <LogOut size={16} /> Logout Account
          </button>
        </div>
      </aside>
      
      <div className="content-wrapper">
        <Topbar />
        <main className="main-content">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}

// --- PAGES ---

function Dashboard() {
  const [running, setRunning] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  const [logs, setLogs] = useState<{ text: string, type: string }[]>([]);

  const runTest = async (target: string) => {
    setRunning(true);
    setLogs([{ text: `[sentinel-qa] Initiating QA Agent for target: ${target}...`, type: 'info' }]);
    
    // Simulate real URL checking
    let isValid = true;
    try {
      if (target.startsWith('http')) {
        await fetch(target, { mode: 'no-cors' });
      } else if (!['arden-web', 'fridgify', 'my-backend-api'].includes(target)) {
        isValid = false; // unknown target
      }
    } catch (error) {
      isValid = false;
    }

    if (!isValid) {
      const sequence = [
        { t: 800, msg: `[sentinel-qa] Stage 1: Analyze — collecting context...`, type: 'info' },
        { t: 1600, msg: `[sentinel-qa:error] Failed to resolve target URL (${target}). Target does not exist or is unreachable.`, type: 'error' },
        { t: 2400, msg: `[sentinel-qa] Task aborted due to target validation failure.`, type: 'error' }
      ];
      sequence.forEach(({ t, msg, type }) => {
        setTimeout(() => {
          setLogs(prev => [...prev, { text: msg, type }]);
        }, t);
      });
      setTimeout(() => {
        setRunning(false);
      }, 3000);
      return;
    }

    const sequence = [
      { t: 800, msg: `[sentinel-qa] Stage 1: Analyze — collecting context...`, type: 'info' },
      { t: 1600, msg: `[sentinel-qa] Analysis complete: extracted DOM tree, selectors loaded`, type: 'info' },
      { t: 2400, msg: `[sentinel-qa] Stage 2: Plan — generating test cases...`, type: 'info' },
      { t: 3200, msg: `[sentinel-qa] Calling Gemini API (model: gemini-3.8-flash)...`, type: 'info' },
      { t: 4800, msg: `[sentinel-qa] Stage 3: Execute — Running Playwright tests...`, type: 'info' },
      { t: 5600, msg: `[playwright] Running 3 tests using 1 worker`, type: 'info' },
      { t: 6500, msg: `  ✓  should successfully load main UI (900ms)`, type: 'success' },
      { t: 7500, msg: `  ✓  should navigate to login page (1000ms)`, type: 'success' },
      { t: 8500, msg: `  ✓  should handle form submission correctly (1000ms)`, type: 'success' },
      { t: 9500, msg: `[sentinel-qa] Stage 4: Report — Generating markdown report...`, type: 'info' },
      { t: 10500, msg: `[sentinel-qa] Task complete. All simulated tests passed!`, type: 'success' },
    ];

    sequence.forEach(({ t, msg, type }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { text: msg, type }]);
      }, t);
    });

    setTimeout(() => {
      setRunning(false);
    }, 11000);
  };

  const handleCustomRun = (e: React.FormEvent) => {
    e.preventDefault();
    if(targetUrl) runTest(targetUrl);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1>Dashboard</h1>
          <p style={{ margin: 0 }}>Overview of your autonomous testing environment across all platforms.</p>
        </div>
        <button className="btn btn-primary" onClick={() => document.getElementById('adhoc')?.scrollIntoView({ behavior: 'smooth' })}>
          <Play size={16} /> New Test Run
        </button>
      </div>

      <div className="grid-4">
        <div className="card stat-card">
          <Activity className="stat-icon" size={48} />
          <span className="stat-label">Total Tests Run</span>
          <span className="stat-value">12,482</span>
          <span className="stat-trend trend-up"><ArrowUpRight size={14}/> 14.5% vs last month</span>
        </div>
        <div className="card stat-card">
          <CheckCircle2 className="stat-icon" size={48} />
          <span className="stat-label">Success Rate</span>
          <span className="stat-value" style={{ color: 'var(--success)' }}>98.2%</span>
          <span className="stat-trend trend-up"><ArrowUpRight size={14}/> 1.2% vs last month</span>
        </div>
        <div className="card stat-card">
          <Layers className="stat-icon" size={48} />
          <span className="stat-label">Registered Apps</span>
          <span className="stat-value">2</span>
          <span className="stat-trend" style={{ color: 'var(--text-muted)' }}>No change</span>
        </div>
        <div className="card stat-card">
          <Cpu className="stat-icon" size={48} />
          <span className="stat-label">Agent Status</span>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
            <div className="status-dot status-passed" style={{ width: 12, height: 12 }}></div> Ready
          </div>
          <span className="stat-trend" style={{ color: 'var(--text-muted)' }}>Last active 2m ago</span>
        </div>
      </div>

      <div className="dashboard-top">
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Configured Applications</h3>
            <button className="btn btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => alert('View All applications clicked')}>View All</button>
          </div>
          <p style={{ fontSize: '0.875rem' }}>These applications are registered in your workspace and can be tested against PRs or specific branches automatically.</p>
          
          <div className="app-list">
            <div className="app-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>arden-web</h4>
                  <span className="badge badge-web">web</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Layers size={14} /> https://arden.app</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> Last run 45 mins ago</span>
                </div>
              </div>
              <button className="btn btn-outline" onClick={() => runTest('arden-web')} disabled={running}>
                <Play size={14} /> Run Suite
              </button>
            </div>

            <div className="app-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>fridgify</h4>
                  <span className="badge badge-flutter">flutter</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Layers size={14} /> github.com/eodin/fridgify</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> Last run yesterday</span>
                </div>
              </div>
              <button className="btn btn-outline" onClick={() => runTest('fridgify')} disabled={running}>
                <Play size={14} /> Run Suite
              </button>
            </div>
          </div>
        </div>

        <div className="card adhoc-panel" id="adhoc" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Ad-Hoc Testing</h3>
          <p style={{ fontSize: '0.875rem' }}>Run Sentinel QA dynamically against any public URL without adding it to the registry first.</p>
          
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
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={running}>
              <LinkIcon size={16} /> Start Testing Target
            </button>
          </form>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="console-window">
          {logs.map((log, i) => (
            <div key={i} className={`console-line console-${log.type}`}>
              {log.text}
            </div>
          ))}
          {running && <div className="console-line console-info" style={{ animation: 'pulse 1.5s infinite' }}>_</div>}
        </div>
      )}
    </>
  );
}

function PastTests() {
  const [filter, setFilter] = useState('All');

  return (
    <>
      <div>
        <h1>Past Tests</h1>
        <p>Review historical test runs, debugging logs, and LLM generated reports.</p>
      </div>

      <div className="card" style={{ padding: '1.5rem', minHeight: '600px' }}>
        <div className="filter-bar">
          <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All Runs</button>
          <button className={`filter-btn ${filter === 'Passed' ? 'active' : ''}`} onClick={() => setFilter('Passed')}>Passed</button>
          <button className={`filter-btn ${filter === 'Failed' ? 'active' : ''}`} onClick={() => setFilter('Failed')}>Failed</button>
          <button className={`filter-btn ${filter === 'Running' ? 'active' : ''}`} onClick={() => setFilter('Running')}>Running</button>
        </div>

        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Target App</th>
                <th>Environment</th>
                <th>Trigger</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Date executed</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 500 }}>arden-web</td>
                <td><span className="badge badge-web">web</span></td>
                <td><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PR #124</span></td>
                <td><div className="status-indicator"><div className="status-dot status-passed"></div> Passed</div></td>
                <td>45s</td>
                <td>10 mins ago</td>
                <td style={{ textAlign: 'right' }}><button className="btn btn-ghost" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => alert('Viewing logs for arden-web')}>View Log</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>https://stripe.com</td>
                <td><span className="badge badge-neutral">adhoc</span></td>
                <td><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manual User</span></td>
                <td><div className="status-indicator"><div className="status-dot status-passed"></div> Passed</div></td>
                <td>1m 12s</td>
                <td>1 hour ago</td>
                <td style={{ textAlign: 'right' }}><button className="btn btn-ghost" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => alert('Viewing logs for stripe.com')}>View Log</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>fridgify</td>
                <td><span className="badge badge-flutter">flutter</span></td>
                <td><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PR #123</span></td>
                <td><div className="status-indicator"><div className="status-dot status-failed" style={{ background: 'var(--error)' }}></div> Failed (1)</div></td>
                <td>28s</td>
                <td>Yesterday</td>
                <td style={{ textAlign: 'right' }}><button className="btn btn-ghost" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => alert('Viewing logs for fridgify')}>View Log</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>arden-web</td>
                <td><span className="badge badge-web">web</span></td>
                <td><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cron (Nightly)</span></td>
                <td><div className="status-indicator"><div className="status-dot status-passed"></div> Passed</div></td>
                <td>44s</td>
                <td>Yesterday</td>
                <td style={{ textAlign: 'right' }}><button className="btn btn-ghost" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => alert('Viewing logs for arden-web')}>View Log</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>my-backend-api</td>
                <td><span className="badge badge-api">api</span></td>
                <td><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PR #89</span></td>
                <td><div className="status-indicator"><div className="status-dot status-passed"></div> Passed</div></td>
                <td>12s</td>
                <td>Oct 05, 2026</td>
                <td style={{ textAlign: 'right' }}><button className="btn btn-ghost" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => alert('Viewing logs for my-backend-api')}>View Log</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>fridgify</td>
                <td><span className="badge badge-flutter">flutter</span></td>
                <td><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PR #121</span></td>
                <td><div className="status-indicator"><div className="status-dot status-passed"></div> Passed</div></td>
                <td>56s</td>
                <td>Oct 02, 2026</td>
                <td style={{ textAlign: 'right' }}><button className="btn btn-ghost" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => alert('Viewing logs for fridgify')}>View Log</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Configure agent preferences and LLM connection settings.</p>
      
      <div className="card" style={{ padding: '2rem', marginTop: '1.5rem', maxWidth: '600px' }}>
        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>LLM Configuration</h3>
        
        <div className="input-group">
          <label className="input-label">Provider</label>
          <select className="input-field" disabled>
            <option>Google Gemini (gemini-3.8-flash)</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">API Key</label>
          <input type="password" value="*************************" readOnly className="input-field" />
        </div>

        <div className="input-group">
          <label className="input-label">Max Tokens Per Run</label>
          <input type="number" value={100000} readOnly className="input-field" />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#92400E', marginTop: '2rem', padding: '1rem', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
          <ShieldAlert size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Read-only mode</div>
            <div style={{ fontSize: '0.875rem' }}>Configuration is locked by the workspace administrator. Check your <code style={{ background: 'rgba(0,0,0,0.05)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>sentinel-qa.config.yaml</code> file to make adjustments to these parameters.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>This module is currently under development. Check back later.</p>
      
      <div className="card" style={{ padding: '3rem', marginTop: '2rem', textAlign: 'center', background: '#FAFAFA' }}>
        <Activity size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ color: 'var(--text-muted)' }}>Coming Soon</h3>
        <p style={{ maxWidth: '400px', margin: '0 auto' }}>We are actively building out this section of the platform. You will be notified when it becomes available in the next release.</p>
      </div>
    </div>
  );
}

function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load reports", err);
        setLoading(false);
      });
  }, []);

  const downloadReport = (report: any) => {
    const blob = new Blob([report.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.app}-${report.date}-report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1>Generated Reports</h1>
          <p style={{ margin: 0 }}>View and save complete test execution reports generated by Sentinel QA.</p>
        </div>
      </div>
      
      {loading ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Activity size={32} className="status-running" style={{ margin: '0 auto 1rem' }} />
          <p>Loading reports...</p>
        </div>
      ) : (
        <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-topbar)' }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>All Reports ({reports.length})</h3>
            </div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {reports.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No reports found.</div>
              ) : reports.map(report => (
                <div 
                  key={report.id} 
                  onClick={() => setSelectedReport(report)}
                  style={{ 
                    padding: '1rem 1.25rem', 
                    borderBottom: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    background: selectedReport?.id === report.id ? 'var(--border-color)' : 'transparent',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                    {report.app}
                    <span className="badge badge-neutral">MD</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} />
                    {/* The date string comes directly from the folder name e.g. 2026-10-08T15-38-31-842Z */}
                    {report.date.replace(/-/g, '/').replace('T', ' ').substring(0, 19)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px' }}>
            {selectedReport ? (
              <>
                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-topbar)' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{selectedReport.app} Test Report</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Date: {selectedReport.date}
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => downloadReport(selectedReport)} style={{ padding: '0.5rem 1rem' }}>
                    <Download size={14} /> Save Report
                  </button>
                </div>
                <div className="console-window" style={{ margin: '1.5rem', flex: 1, maxHeight: 'none', background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: 'var(--text-main)', margin: 0 }}>
                    {selectedReport.content}
                  </pre>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem', color: 'var(--text-muted)' }}>
                <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>Select a report from the list to view its contents.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- APP ROUTER ---

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Layout onLogout={() => setIsAuthenticated(false)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tests" element={<PastTests />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/keys" element={<PlaceholderPage title="API Keys" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
