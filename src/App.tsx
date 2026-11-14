import React, { useState, useEffect } from 'react';
import './App.css';

type Stage = 'entering' | 'welcoming' | 'grabbing' | 'ready' | 'verifying' | 'error' | 'success';

export default function App() {
  const [stage, setStage] = useState<Stage>('entering');
  const [speechText, setSpeechText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const VALID_EMAIL = 'admin@royal.edu';
  const VALID_PASSWORD = '1234';

  const runChoreography = () => {
    setEmail('');
    setPassword('');
    setSpeechText('');
    setStage('entering');

    const t1 = setTimeout(() => {
      setStage('welcoming');
      setSpeechText('Welcome to the portal! Please wait a second while I pull in the login page.');
    }, 1800);

    const t2 = setTimeout(() => {
      setStage('grabbing');
      setSpeechText('');
    }, 4500);

    const t3 = setTimeout(() => {
      setStage('ready');
      setSpeechText('Enter your credentials here.');
    }, 7100);

    return [t1, t2, t3];
  };

  useEffect(() => {
    const timers = runChoreography();
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setStage('verifying');
    setSpeechText('Verifying credentials...');

    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        setStage('success');
        setSpeechText('Password is correct!');
      } else {
        setStage('error');
        setSpeechText('Incorrect password! Try again.');
        setTimeout(() => {
          setStage('ready');
          setSpeechText('Enter your credentials here.');
        }, 2800);
      }
    }, 1200);
  };

  return (
    <div className={`stage-viewport ${stage}`}>
      <div className="ambient-grid" />
      <div className="glow-orb orb-left" />
      <div className="glow-orb orb-right" />
      <div className="floor-horizon" />

      {/* Dust Cloud kicked up when hauling the card */}
      <div className={`dust-cloud ${stage}`}>
        <span className="dust d1" />
        <span className="dust d2" />
        <span className="dust d3" />
        <span className="dust d4" />
        <span className="dust d5" />
        <span className="dust d6" />
      </div>

      {/* Realistic Human Character */}
      <div className={`character-actor ${stage}`}>
        {speechText && (
          <div className="speech-bubble" key={speechText}>
            <p>{speechText}</p>
            <div className="bubble-tail" />
          </div>
        )}

        {/* Tension Cable connecting character's hands to the login card */}
        <svg className={`pull-cable-svg ${stage}`} viewBox="0 0 180 60" fill="none">
          <path
            d="M 8 36 Q 90 48 172 32"
            stroke="#94a3b8"
            strokeWidth="4"
            strokeLinecap="round"
            className="cable-strand"
          />
          <path
            d="M 8 36 Q 90 48 172 32"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="cable-highlight"
          />
          <rect x="164" y="25" width="14" height="14" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
        </svg>

        {/* Realistic Articulated Human SVG */}
        <svg className="character-svg" viewBox="0 0 220 270" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ground Shadow */}
          <ellipse cx="110" cy="256" rx="44" ry="8" fill="rgba(0, 0, 0, 0.55)" />

          {/* Back Arm (Left) */}
          <g className="limb-arm-back">
            <path d="M98 106 C95 122 95 136 98 148" stroke="#1e3a8a" strokeWidth="15" strokeLinecap="round" />
            <g className="forearm-back">
              <path d="M98 148 C100 162 103 174 106 184" stroke="#d97706" strokeWidth="12" strokeLinecap="round" />
              <ellipse cx="107" cy="187" rx="7" ry="6" fill="#d97706" />
            </g>
          </g>

          {/* Back Leg (Left) */}
          <g className="limb-leg-back">
            <path d="M101 176 L98 214" stroke="#0f172a" strokeWidth="18" strokeLinecap="round" />
            <g className="calf-back">
              <path d="M98 214 L96 247" stroke="#1e293b" strokeWidth="15" strokeLinecap="round" />
              <path d="M89 245 H114 C119 245 122 248 122 252 V255 H89 V245 Z" fill="#0f172a" />
              <path d="M89 253 H122 V255 H89 Z" fill="#64748b" />
            </g>
          </g>

          {/* Front Leg (Right - Kicks card on success) */}
          <g className="limb-leg-front">
            <path d="M115 176 L118 214" stroke="#1e293b" strokeWidth="19" strokeLinecap="round" />
            <g className="calf-front">
              <path d="M118 214 L118 247" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
              <path d="M110 245 H136 C141 245 144 248 144 252 V255 H110 V245 Z" fill="#1e293b" />
              <path d="M110 253 H144 V255 H110 Z" fill="#94a3b8" />
            </g>
          </g>

          {/* Torso */}
          <g className="body-torso">
            <path
              d="M88 102 C88 94 96 90 110 90 C124 90 132 94 132 102 L135 178 C135 182 130 184 110 184 C90 184 85 182 85 178 L88 102 Z"
              fill="url(#blazerGrad)"
            />
            <path d="M102 90 L110 132 L118 90 Z" fill="#f8fafc" />
            <path d="M108 93 L112 93 L113 124 L110 129 L107 124 Z" fill="#0284c7" />
            <path d="M102 90 L96 116 L110 132" stroke="#1d4ed8" strokeWidth="2.5" fill="none" />
            <path d="M118 90 L124 116 L110 132" stroke="#1d4ed8" strokeWidth="2.5" fill="none" />

            {/* Head & Neck */}
            <g className="body-head">
              <rect x="103" y="75" width="14" height="18" rx="6" fill="#eab308" />
              <path d="M103 82 C107 85 113 85 117 82" stroke="#ca8a04" strokeWidth="2" fill="none" />
              <ellipse cx="91" cy="54" rx="4" ry="7" fill="#eab308" />
              <path
                d="M92 42 C92 26 100 20 113 20 C125 20 132 28 132 42 C132 56 128 72 114 75 C101 77 92 66 92 42 Z"
                fill="url(#skinGrad)"
              />
              <path
                d="M90 46 C89 27 98 16 114 16 C127 16 135 24 134 36 C128 29 118 27 107 28 C98 29 94 36 90 46 Z"
                fill="#1e293b"
              />
              <path d="M116 42 Q122 40 127 42" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
              <ellipse cx="122" cy="47" rx="3.2" ry="2.2" fill="#ffffff" />
              <circle cx="123" cy="47" r="1.6" fill="#0f172a" />
              <path d="M128 46 L131 55 L126 57" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path
                d="M117 63 Q122 66 127 62"
                stroke="#9a3412"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>

          {/* Front Arm (Right) */}
          <g className="limb-arm-front">
            <path d="M112 106 C110 122 110 136 112 148" stroke="#2563eb" strokeWidth="16" strokeLinecap="round" />
            <g className="forearm-front">
              <path d="M112 148 C114 162 116 174 118 184" stroke="#facc15" strokeWidth="13" strokeLinecap="round" />
              <ellipse cx="119" cy="187" rx="8" ry="6.5" fill="#facc15" />
            </g>
          </g>

          <defs>
            <linearGradient id="blazerGrad" x1="88" y1="90" x2="132" y2="184" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="92" y1="20" x2="132" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde047" />
              <stop offset="1" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Login Card */}
      <main className={`login-card-container ${stage}`}>
        <div className="cable-anchor-ring">
          <div className="ring-inner" />
        </div>

        {stage !== 'success' ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="card-header">
              <span className="pill-tag">PORTAL ACCESS</span>
              <h1>Sign In</h1>
              <p>
                Test credentials: <strong>admin@royal.edu</strong> / <strong>1234</strong>
              </p>
            </div>

            <div className="field-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="admin@royal.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={stage !== 'ready' && stage !== 'error'}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={stage !== 'ready' && stage !== 'error'}
                required
              />
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={stage !== 'ready' && stage !== 'error'}
            >
              {stage === 'verifying' ? <span className="loader-ring" /> : 'Sign In →'}
            </button>
          </form>
        ) : (
          <div className="success-panel">
            <div className="check-badge">✓</div>
            <h2>Access Granted</h2>
            <p>Password is correct! Card kicked off-screen.</p>
            <button type="button" className="secondary-btn" onClick={runChoreography}>
              Replay Full Sequence
            </button>
          </div>
        )}
      </main>
    </div>
  );
}