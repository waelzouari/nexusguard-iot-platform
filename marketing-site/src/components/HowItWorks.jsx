const STEPS = [
  { num:'01', icon:'📦', title:'Installation rapide', desc:'Connectez les capteurs à votre champ et à votre pompe en moins de 30 minutes.' },
  { num:'02', icon:'📶', title:'Connexion WiFi', desc:'Accédez au tableau de bord depuis votre téléphone sur le réseau local.' },
  { num:'03', icon:'🤖', title:'Irrigation auto', desc:'La logique Nexus WEF décide : sol sec + eau disponible + température OK = irrigation.' },
  { num:'04', icon:'📊', title:'Suivi temps réel', desc:'Graphiques, alertes et contrôle manuel — partout sur votre exploitation.' },
];

export default function HowItWorks({ onOrder }) {
  return (
    <section id="comment" style={{ background: '#fff', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">✦ Simplicité d'usage</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#1f2937' }}>
            Comment ça <span style={{ color: '#15803d' }}>marche ?</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', marginTop: '12px' }}>4 étapes, 30 minutes, une exploitation transformée.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '64px' }}>
          {STEPS.map((s, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '36px 24px', position: 'relative' }}>
              <div style={{ width: '48px', height: '48px', background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '11px', fontWeight: 800, color: '#15803d' }}>{s.num}</div>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* WEF Banner */}
        <div style={{ background: '#f0fdf4', borderRadius: '24px', padding: '48px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#166534', marginBottom: '8px' }}>La logique Nexus WEF</h3>
          <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '32px', maxWidth: '560px', margin: '8px auto 32px' }}>
            Eau, Énergie, Alimentation — les trois ressources analysées simultanément pour une irrigation 100% pertinente.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {[['💧','Eau','Niveau réservoir surveillé'],['⚡','Énergie','Température pompe protégée'],['🌾','Alimentation','Humidité sol précise']].map(([ic,t,d]) => (
              <div key={t} style={{ textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>{ic}</div>
                <div style={{ fontWeight: 700, color: '#166534', fontSize: '15px' }}>{t}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{d}</div>
              </div>
            ))}
          </div>
          <button id="hiw-order-btn" className="btn-primary" onClick={onOrder}>Obtenir mon NexusGuard Mini</button>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ #comment .steps-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media(max-width:600px){ #comment{padding:60px 20px!important;} }
      `}</style>
    </section>
  );
}
