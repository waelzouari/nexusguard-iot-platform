import { useState } from 'react';

const SPECS = [
  { icon: '🌱', label: 'Humidité Sol', desc: 'Capteur capacitif ADS1115' },
  { icon: '💧', label: 'Niveau Eau',   desc: 'HC-SR04 ultrasonique' },
  { icon: '🌡️', label: 'Température', desc: 'DHT22 ±0.5°C' },
  { icon: '⚡', label: 'Pompe',        desc: 'Relais auto/manuel' },
  { icon: '📡', label: 'WiFi',         desc: '802.11 b/g/n temps réel' },
  { icon: '📱', label: 'Dashboard',    desc: 'Accès smartphone & PC' },
];

export default function Product({ onOrder }) {
  const [active, setActive] = useState(0);
  const imgs = [
    { src: '/assets/Nexus_mini1.png', label: 'Prototype dans le champ' },
    { src: '/assets/Nexus_mini2.png', label: 'Composants sur table' },
  ];

  return (
    <section id="produit" style={{ background: '#f8faf5', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">✦ Notre produit</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#1f2937' }}>
            NexusGuard <span style={{ color: '#15803d' }}>Mini</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', marginTop: '12px', maxWidth: '480px', margin: '12px auto 0' }}>
            Le premier boîtier IoT agricole tunisien — compact, autonome et précis.
          </p>
        </div>

        {/* Product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start', marginBottom: '64px' }}>

          {/* Gallery */}
          <div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: '12px' }}>
              <img
                src={imgs[active].src}
                alt={imgs[active].label}
                style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s' }}
                onError={e => { e.target.style.background='#f0fdf4'; }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {imgs.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    flex: 1, height: '88px', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                    border: i === active ? '2px solid #15803d' : '2px solid transparent',
                    boxShadow: i === active ? '0 0 0 2px rgba(21,128,61,0.15)' : 'none',
                    transition: 'all 0.2s', opacity: i === active ? 1 : 0.6
                  }}
                >
                  <img src={img.src} alt={img.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{e.target.style.background='#f0fdf4';}} />
                </div>
              ))}
            </div>
            <p style={{ textAlign:'center', fontSize:'12px', color:'#9ca3af', marginTop:'8px' }}>{imgs[active].label}</p>
          </div>

          {/* Info + Price */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <img src="/assets/logo.png" alt="" style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '50%' }} onError={e=>e.target.style.display='none'} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#15803d' }}>NexusGuard Village</span>
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#1f2937', marginBottom: '8px' }}>NexusGuard Mini</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.65, marginBottom: '20px' }}>
                Surveillez humidité du sol, niveau d'eau et température. Automatisez l'irrigation selon la logique Nexus WEF. Économisez 30 à 50% d'eau dès la première saison.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Réduction eau 30–50% (ODD 6)', 'Alertes temps réel', 'Fonctionne sans internet (WiFi local)', 'Installation < 30 minutes', 'Garantie 1 an'].map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151' }}>
                    <span style={{ width: '20px', height: '20px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0, color: '#15803d' }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price card */}
            <div style={{ background: '#fff', border: '1.5px solid #d1fae5', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(21,128,61,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '42px', fontWeight: 800, color: '#166534' }}>1 200</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#15803d' }}>DT</span>
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Appareil + installation + support 3 mois</p>
              <p style={{ fontSize: '13px', color: '#15803d', fontWeight: 500, marginBottom: '20px' }}>+ 180 DT / an · Abonnement cloud (optionnel)</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>💳 Paiement à la livraison · Garantie 1 an</p>
              <button id="product-order-btn" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={onOrder}>
                Commander Maintenant
              </button>
            </div>
          </div>
        </div>

        {/* Specs grid */}
        <div>
          <h3 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 700, color: '#1f2937', marginBottom: '32px' }}>Spécifications techniques</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {SPECS.map(s => (
              <div key={s.label} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', background: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#1f2937' }}>{s.label}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #produit > div > div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important; gap:32px!important;}
          #produit > div > div:last-child{grid-template-columns:repeat(2,1fr)!important;}
          #produit{padding:60px 20px!important;}
        }
      `}</style>
    </section>
  );
}
