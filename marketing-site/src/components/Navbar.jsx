import { useState, useEffect } from 'react';

export default function Navbar({ onOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { href: '#hero', label: 'Accueil' },
    { href: '#produit', label: 'Produit' },
    { href: '#comment', label: 'Comment ça marche' },
    { href: '#impacts', label: 'Impacts' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none' }}>
      <a href="#hero" className="nav-logo">
        <img src="/assets/logo.png" alt="NexusGuard" onError={e => e.target.style.display='none'} />
        <div className="nav-logo-text">
          <div className="name">NexusGuard</div>
          <div className="sub">Village</div>
        </div>
      </a>

      <div className="nav-links">
        {links.map(l => <a key={l.label} href={l.href}>{l.label}</a>)}
      </div>

      <div className="nav-right" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button id="nav-order-btn" className="btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }} onClick={onOrder}>
          Commander
        </button>
        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }} className="hamburger">
          <svg width="22" height="22" fill="none" stroke="#1f2937" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      <style>{`
        @media(max-width:768px){
          .nav-links{display:none!important;}
          .hamburger{display:flex!important;}
        }
      `}</style>
    </nav>
  );
}
