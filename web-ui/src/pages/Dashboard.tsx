import { useState } from 'react';
import { Play, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');

  const handleRunTests = () => {
    setIsRunning(true);
    setStatus('running');
    
    // Simulate the Gemini API failing after 3 seconds
    setTimeout(() => {
      setIsRunning(false);
      setStatus('error');
    }, 3000);
  };

  return (
    <div className="container animate-slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ margin: 0 }}>QA Dashboard</h2>
          <p style={{ margin: '8px 0 0 0' }}>Test your applications using Sentinel-QA Agent.</p>
        </div>
        <button 
          className="btn" 
          onClick={handleRunTests}
          disabled={isRunning}
          style={{ opacity: isRunning ? 0.7 : 1 }}
        >
          {isRunning ? <Clock className="animate-spin" size={18} /> : <Play size={18} />}
          {isRunning ? 'Analyzing Diff & Planning...' : 'Run QA Tests'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3>Recent Test Runs</h3>
          
          {status === 'error' && (
            <div className="animate-slide-up" style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid var(--error)', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '24px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <AlertTriangle color="var(--error)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: 'var(--error)' }}>LLM Generation Failed</h4>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
                  ApiError: This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later. (HTTP 503)
                </p>
                <div style={{ marginTop: '12px' }}>
                  <span className="badge badge-warning">Using Placeholders / Fallbacks</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Mocked Item 1 */}
            <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <CheckCircle2 color="var(--success)" size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>Arden Web - Home Page Authentication</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>HEAD~1 • 2 mins ago • Playwright Runner</div>
                </div>
              </div>
              <span className="badge badge-success">Passed (130/130)</span>
            </div>

            {/* Mocked Item 2 */}
            <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <XCircle color="var(--error)" size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>Fridgify - Event Specs Validation</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>PR #42 • 1 hour ago • Patrol Runner</div>
                </div>
              </div>
              <span className="badge badge-error">Failed (1/24)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3>App Registry</h3>
          <p style={{ fontSize: '14px', marginBottom: '24px' }}>Select an app to target for the next QA run.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', border: '1px solid var(--primary)', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)' }}>
              <div style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                arden-web
                <span className="badge badge-success">Web</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>https://arden.app</div>
            </div>

            <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                fridgify
                <span className="badge" style={{ background: 'var(--surface-hover)' }}>Flutter</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>github.com/eodin/fridgify</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
