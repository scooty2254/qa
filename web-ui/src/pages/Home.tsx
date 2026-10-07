import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Server } from 'lucide-react';

export default function Home() {
  return (
    <div className="container animate-slide-up">
      <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '48px', margin: '0 0 20px 0', background: 'linear-gradient(to right, #3b82f6, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Autonomous QA Agent
        </h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Stop writing tests manually. Let our AI agent read your PRs, plan the execution, and automatically generate E2E Playwright tests using Gemini API.
        </p>
        <Link to="/dashboard" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', padding: '14px 28px', fontSize: '16px' }}>
          <Zap size={20} /> Try Dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <ShieldCheck size={32} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h3>Self-Critiquing AI</h3>
          <p>The agent dynamically generates code, validates via AST, critiques its own selectors, and guarantees zero bad-evals.</p>
        </div>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <Server size={32} color="var(--success)" style={{ marginBottom: '16px' }} />
          <h3>Event Validation</h3>
          <p>Analytics logging interceptor. We automatically listen for GA4, Amplitude, and Mixpanel requests on every tap.</p>
        </div>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <Zap size={32} color="#f59e0b" style={{ marginBottom: '16px' }} />
          <h3>Modern Speed</h3>
          <p>Powered by Vite + React for the frontend, and fast node bindings for AST test validation. Quick feedback loop on every PR.</p>
        </div>
      </div>
    </div>
  );
}
