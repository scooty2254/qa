import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    if (email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="container animate-slide-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Lock size={32} color="var(--primary)" />
          </div>
          <h2>Welcome Back</h2>
          <p style={{ margin: 0 }}>Sign in to continue to Sentinel</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                className="input" 
                placeholder="you@example.com" 
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                className="input" 
                placeholder="••••••••" 
                style={{ paddingLeft: '40px' }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn" style={{ marginTop: '8px' }}>
            <LogIn size={18} /> Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
