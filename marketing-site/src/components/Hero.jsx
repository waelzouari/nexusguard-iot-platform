export default function Hero({ onOrder }) {
  return (
    <section id="hero" style={{ background: '#fff', padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

        {/* Left */}
        <div>
          <span className="section-label">🌿 Solution IoT Agricole · Tunisie</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, color: '#166534', marginBottom: '20px' }}>
            Irriguer moins,<br />
            <span style={{ color: '#1f2937' }}>produire plus.</span>
          </h1>
          <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.7, marginBottom: '36px', maxWidth: '440px' }}>
            NexusGuard Mini surveille votre sol, votre eau et la température — et décide d'irriguer automatiquement, au bon moment.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button id="hero-discover-btn" className="btn-primary" onClick={() => document.getElementById('produit').scrollIntoView({ behavior:'smooth' })}>
              Découvrir le produit
            </button>
            <button id="hero-order-btn" className="btn-outline" onClick={onOrder}>
              Commander — 1 200 DT
            </button>
          </div>

          {/* Mini stats */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { val: '–50%', label: "Eau économisée" },
              { val: '24/7', label: "Surveillance" },
              { val: '30 min', label: "Installation" },
            ].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#15803d' }}>{s.val}</div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — product image */}
        <div style={{ position: 'relative' }}>
          <div style={{
            background: '#f0fdf4', borderRadius: '28px',
            padding: '8px', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(21,128,61,0.12)'
          }}>
            <img
              src="/assets/Nexus_mini1.png"
              alt="NexusGuard Mini dans le champ"
              style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '22px', display: 'block' }}
              onError={e => { e.target.style.background='#f0fdf4'; e.target.alt='NexusGuard Mini'; }}
            />
          </div>
          {/* Badge */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '20px',
            background: '#fff', borderRadius: '14px', padding: '14px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#15803d', flexShrink: 0, animation: 'pulse 2s infinite' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>Système actif</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Irrigation optimisée</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #hero > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #hero { padding: 60px 20px 40px !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
      `}</style>
    </section>
  );
}
