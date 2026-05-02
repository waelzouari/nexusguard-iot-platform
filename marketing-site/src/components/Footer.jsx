export default function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer id="contact" style={{ background:'#f5f0e8', borderTop:'1px solid #e5e7eb', padding:'60px 40px 32px' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'48px', marginBottom:'48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
              <img src="/assets/logo.png" alt="NexusGuard" style={{ width:'40px', height:'40px', objectFit:'contain', borderRadius:'50%' }} onError={e=>e.target.style.display='none'} />
              <div>
                <div style={{ fontWeight:800, color:'#166534', fontSize:'16px' }}>NexusGuard</div>
                <div style={{ fontSize:'12px', color:'#6b7280' }}>Village</div>
              </div>
            </div>
            <p style={{ fontSize:'14px', color:'#6b7280', lineHeight:1.7, marginBottom:'20px', maxWidth:'300px' }}>
              Solution IoT agricole intelligente pour le Nexus Eau–Énergie–Alimentation. Fabriqué en Tunisie.
            </p>
            <div style={{ display:'flex', gap:'12px' }}>
              <a href="https://facebook.com/nexusguardvillage" id="footer-facebook" target="_blank" rel="noopener noreferrer"
                style={{ width:'40px', height:'40px', background:'#fff', border:'1px solid #e5e7eb', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', textDecoration:'none' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='#15803d'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='#e5e7eb'}>
                <svg width="18" height="18" fill="#1877f2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/nexusguardvillage" id="footer-instagram" target="_blank" rel="noopener noreferrer"
                style={{ width:'40px', height:'40px', background:'#fff', border:'1px solid #e5e7eb', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', textDecoration:'none' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='#15803d'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='#e5e7eb'}>
                <svg width="18" height="18" fill="#e1306c" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontWeight:700, fontSize:'14px', color:'#1f2937', marginBottom:'16px' }}>Navigation</div>
            {[['#hero','Accueil'],['#produit','NexusGuard Mini'],['#comment','Comment ça marche'],['#impacts','Impacts']].map(([h,l])=>(
              <a key={l} href={h} style={{ display:'block', fontSize:'14px', color:'#6b7280', textDecoration:'none', marginBottom:'10px', transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#15803d'} onMouseLeave={e=>e.target.style.color='#6b7280'}>{l}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight:700, fontSize:'14px', color:'#1f2937', marginBottom:'16px' }}>Contact</div>
            {[['📧','contact@nexusguard.tn'],['📞','+216 XX XXX XXX'],['📍','Tunisie']].map(([ic,t])=>(
              <div key={t} style={{ display:'flex', gap:'8px', fontSize:'14px', color:'#6b7280', marginBottom:'12px' }}><span>{ic}</span><span>{t}</span></div>
            ))}
            <a href="http://localhost:5000/login" id="footer-dashboard-link" style={{ fontSize:'14px', color:'#15803d', fontWeight:600, textDecoration:'none' }}>🖥️ Accéder au Dashboard →</a>
          </div>
        </div>

        <div style={{ borderTop:'1px solid #e5e7eb', paddingTop:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontSize:'13px', color:'#9ca3af' }}>© {y} NexusGuard Village. Tous droits réservés.</p>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#9ca3af' }}>
            <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#15803d', animation:'pulse 2s infinite', display:'inline-block' }}/>
            Système opérationnel
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer > div > div:first-child{grid-template-columns:1fr!important;}footer{padding:48px 20px 24px!important;}}
      @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}`}</style>
    </footer>
  );
}
