import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Activity, Settings, LogOut, Play, ShieldAlert, Cpu, Layers, Link as LinkIcon, CheckCircle2, XCircle, Clock, Search } from 'lucide-react';
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
    // Fake auth
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Cpu size={40} color="var(--primary)" />
          </div>
          <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p>{isLogin ? 'Welcome back to Sentinel QA' : 'Join the autonomous testing platform'}</p>
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- LAYOUT ---

function Layout({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) {
  const location = useLocation();

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar-logo">
          <Cpu size={24} /> Sentinel QA
        </div>
        
        <nav style={{ flex: 1 }}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <Activity size={18} /> Dashboard
          </Link>
          <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <button onClick={onLogout} className="btn btn-outline" style={{ width: '100%', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

// --- PAGES ---

function Dashboard() {
  const [running, setRunning] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  const [logs, setLogs] = useState<{ text: string, type: string }[]>([]);

  const runTest = (target: string) => {
    setRunning(true);
    setLogs([{ text: `[sentinel-qa] Initiating QA Agent for target: ${target}...`, type: 'info' }]);
    
    // Simulate placeholder testing (Since LLM is 503)
    const sequence = [
      { t: 800, msg: `[sentinel-qa] Stage 1: Analyze — collecting context...`, type: 'info' },
      { t: 1600, msg: `[sentinel-qa] Analysis complete: extracted DOM tree, selectors loaded`, type: 'info' },
      { t: 2400, msg: `[sentinel-qa] Stage 2: Plan — generating test cases...`, type: 'info' },
      { t: 3200, msg: `[sentinel-qa] Calling Gemini API (model: gemini-3.8-flash)...`, type: 'info' },
      { t: 4000, msg: `[sentinel-qa:warn] LLM fallback placeholder triggered (LLM unavailable/mock mode)`, type: 'warn' },
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Dashboard</h2>
          <p style={{ margin: 0 }}>Overview of your autonomous testing environment</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '250px', padding: '0.5rem' }}>
            <Search size={16} color="var(--text-muted)" />
            <input type="text" placeholder="Search tests..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%' }} />
          </div>
        </div>
      </div>

      <div className="grid-4">
        <div className="card stat-card">
          <span className="stat-label">Total Tests Run</span>
          <span className="stat-value">1,248</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Passing Rate</span>
          <span className="stat-value" style={{ color: 'var(--success)' }}>94.2%</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Registered Apps</span>
          <span className="stat-value">2</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Agent Status</span>
          <span className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="status-dot status-passed"></div> Ready
          </span>
        </div>
      </div>

      <div className="dashboard-top">
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3>Registered Applications</h3>
          <div className="app-list">
            <div className="card app-item">
              <div className="app-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3>arden-web</h3>
                  <span className="badge badge-web">web</span>
                </div>
                <p><Layers size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/> https://arden.app</p>
              </div>
              <button className="btn btn-outline" onClick={() => runTest('arden-web')} disabled={running}>
                <Play size={16} /> Run QA Agent
              </button>
            </div>

            <div className="card app-item">
              <div className="app-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3>fridgify</h3>
                  <span className="badge badge-flutter">flutter</span>
                </div>
                <p><Layers size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/> github.com/eodin/fridgify</p>
              </div>
              <button className="btn btn-outline" onClick={() => runTest('fridgify')} disabled={running}>
                <Play size={16} /> Run QA Agent
              </button>
            </div>
          </div>
        </div>

        <div className="card adhoc-panel">
          <h3>Test from URL</h3>
          <p style={{ fontSize: '0.875rem' }}>Run Sentinel QA dynamically against any public URL without registry.</p>
          <form onSubmit={handleCustomRun}>
            <div className="adhoc-input">
              <input 
                type="url" 
                className="input-field" 
                placeholder="https://example.com" 
                value={targetUrl}
                onChange={e => setTargetUrl(e.target.value)}
                required
                style={{ flex: 1, border: 'none' }}
              />
              <button type="submit" className="btn" style={{ background: '#111827', color: 'white' }} disabled={running}>
                <LinkIcon size={16} /> Test
              </button>
            </div>
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

      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Recent Test Runs</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Target</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>arden-web</td>
              <td><span className="badge badge-web">web</span></td>
              <td><div className="status-indicator"><CheckCircle2 size={16} color="var(--success)" /> Passed</div></td>
              <td>45s</td>
              <td>10 mins ago</td>
            </tr>
            <tr>
              <td>https://stripe.com</td>
              <td><span className="badge badge-web">web</span></td>
              <td><div className="status-indicator"><CheckCircle2 size={16} color="var(--success)" /> Passed</div></td>
              <td>1m 12s</td>
              <td>1 hour ago</td>
            </tr>
            <tr>
              <td>fridgify</td>
              <td><span className="badge badge-flutter">flutter</span></td>
              <td><div className="status-indicator"><XCircle size={16} color="var(--error)" /> Failed (1)</div></td>
              <td>28s</td>
              <td>Yesterday</td>
            </tr>
            <tr>
              <td>arden-web</td>
              <td><span className="badge badge-web">web</span></td>
              <td><div className="status-indicator"><CheckCircle2 size={16} color="var(--success)" /> Passed</div></td>
              <td>44s</td>
              <td>Yesterday</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function SettingsPage() {
  return (
    <div>
      <h2>Settings</h2>
      <p>Configure agent preferences and LLM settings.</p>
      
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
          <input type="number" value="100000" readOnly className="input-field" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b45309', marginTop: '2rem', padding: '1rem', background: '#fef3c7', borderRadius: '6px' }}>
          <ShieldAlert size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Read-only mode (Configured via sentinel-qa.config.yaml)</span>
        </div>
      </div>
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
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
