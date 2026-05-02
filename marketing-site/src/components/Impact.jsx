const STATS = [
  { val:'–50%', label:'Réduction eau', desc:'Irrigation ciblée uniquement quand nécessaire', odd:'ODD 6' },
  { val:'+20%', label:'Rendement',     desc:'Cultures mieux hydratées au bon moment',        odd:'ODD 2' },
  { val:'–40%', label:'Énergie',       desc:'Pompe protégée, cycles optimisés',              odd:'ODD 7' },
  { val:'1000+',label:'Agriculteurs',  desc:'Objectif déploiement Tunisie 2027',             odd:'ODD 1' },
];
const REGIONS = ['Kairouan 🫒','Sfax 🌳','Médenine 🥬','Siliana 🍎','Béja 🌾','Tataouine 🌴'];

export default function Impact({ onOrder }) {
  return (
    <section id="impacts" style={{ background: '#f8faf5', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'64px' }}>
          <span className="section-label">✦ Impact réel</span>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:800, color:'#1f2937' }}>
            Un impact <span style={{ color:'#15803d' }}>mesurable</span> pour la Tunisie
          </h2>
          <p style={{ color:'#6b7280', fontSize:'16px', marginTop:'12px' }}>Contribue aux Objectifs de Développement Durable des Nations Unies.</p>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'48px' }}>
          {STATS.map(s => (
            <div key={s.val} className="card" style={{ textAlign:'center' }}>
              <div style={{ fontSize:'36px', fontWeight:800, color:'#15803d', marginBottom:'6px' }}>{s.val}</div>
              <div style={{ fontWeight:700, fontSize:'15px', color:'#1f2937', marginBottom:'6px' }}>{s.label}</div>
              <div style={{ fontSize:'12px', color:'#9ca3af', marginBottom:'12px', lineHeight:1.5 }}>{s.desc}</div>
              <span style={{ fontSize:'11px', fontWeight:700, color:'#15803d', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'20px', padding:'3px 10px' }}>{s.odd}</span>
            </div>
          ))}
        </div>

        {/* Regions */}
        <div style={{ background:'#fff', borderRadius:'24px', padding:'40px', marginBottom:'48px', boxShadow:'0 2px 16px rgba(0,0,0,0.05)' }}>
          <h3 style={{ textAlign:'center', fontWeight:700, fontSize:'16px', color:'#1f2937', marginBottom:'24px' }}>🇹🇳 Régions ciblées en Tunisie</h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            {REGIONS.map(r => (
              <span key={r} style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'50px', padding:'8px 20px', fontSize:'14px', fontWeight:500, color:'#166534' }}>{r}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#166534,#15803d)', borderRadius:'24px', padding:'60px 40px', textAlign:'center' }}>
          <h3 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)', fontWeight:800, color:'#fff', marginBottom:'12px' }}>Rejoignez le mouvement</h3>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'16px', marginBottom:'32px' }}>Soyez parmi les premiers agriculteurs tunisiens à irriguer intelligemment.</p>
          <button id="impact-order-btn" onClick={onOrder} style={{ background:'#fff', color:'#166534', border:'none', padding:'16px 40px', borderRadius:'50px', fontSize:'16px', fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.2s' }}
            onMouseEnter={e=>e.target.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.target.style.transform='none'}>
            Commander — 1 200 DT
          </button>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){#impacts .stats-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:600px){#impacts{padding:60px 20px!important;}}
      `}</style>
    </section>
  );
}
