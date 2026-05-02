import { useState } from 'react';

function genPass() {
  const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'Nexus'+Array.from({length:4},()=>c[Math.floor(Math.random()*c.length)]).join('');
}
function genLogin(email){ return email.split('@')[0].replace(/[^a-zA-Z0-9]/g,'').toLowerCase(); }

export default function OrderModal({ isOpen, onClose }) {
  const [step, setStep] = useState('form');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState(null);
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function reset(){ setStep('form');setEmail('');setPhone('');setChecked(false);setCreds(null);setError(''); }
  function close(){ reset(); onClose(); }

  async function submit(e){
    e.preventDefault(); setError('');
    if(!email||!email.includes('@')){ setError('Email invalide.'); return; }
    if(!phone||phone.replace(/\D/g,'').length<8){ setError('Numéro de téléphone invalide.'); return; }
    if(!checked){ setError('Acceptez le paiement à la livraison.'); return; }
    setLoading(true);
    await new Promise(r=>setTimeout(r,1500));
    const login=genLogin(email), password=genPass();
    setCreds({login,password,email,phone});
    console.log('%c📧 NexusGuard — Email simulé','color:#15803d;font-weight:bold');
    console.log(`À: ${email}\nLogin: ${login}\nMot de passe: ${password}\nURL: http://[RaspberryPi-IP]:5000/login`);
    setLoading(false); setStep('success');
  }

  function copy(val,field){
    navigator.clipboard.writeText(val);
    setCopied(field); setTimeout(()=>setCopied(''),2000);
  }

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>

        {/* Close */}
        <button onClick={close} style={{ position:'absolute',top:'16px',right:'20px',background:'none',border:'none',fontSize:'22px',cursor:'pointer',color:'#9ca3af',lineHeight:1 }}>×</button>

        {step==='form' ? (
          <>
            <div style={{ textAlign:'center', marginBottom:'28px' }}>
              <div style={{ width:'56px',height:'56px',background:'#f0fdf4',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',margin:'0 auto 12px' }}>🛒</div>
              <h2 style={{ fontSize:'22px',fontWeight:800,color:'#1f2937',marginBottom:'6px' }}>Commander NexusGuard Mini</h2>
              <p style={{ fontSize:'13px',color:'#9ca3af' }}>Notre équipe vous rappelle sous 48h pour confirmer</p>
            </div>

            {/* Price reminder */}
            <div style={{ background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:'14px',padding:'16px',textAlign:'center',marginBottom:'24px' }}>
              <span style={{ fontSize:'28px',fontWeight:800,color:'#166534' }}>1 200 DT</span>
              <span style={{ fontSize:'13px',color:'#6b7280',display:'block',marginTop:'2px' }}>Paiement à la livraison · + 180 DT/an cloud</span>
            </div>

            {error && <div className="error-box">⚠️ {error}</div>}

            <form id="order-form" onSubmit={submit}>
              <div className="form-field">
                <label className="form-label">📧 Adresse email *</label>
                <input id="order-email" type="email" className="form-input" placeholder="votre@email.com" value={email} onChange={e=>setEmail(e.target.value)} required />
              </div>
              <div className="form-field">
                <label className="form-label">📞 Numéro de téléphone *</label>
                <input id="order-phone" type="tel" className="form-input" placeholder="+216 XX XXX XXX" value={phone} onChange={e=>setPhone(e.target.value)} required />
              </div>

              <div className={`checkbox-row${checked?' checked':''}`} onClick={()=>setChecked(!checked)}>
                <div className={`checkbox-box${checked?' checked':''}`}>
                  {checked && <span style={{color:'#fff',fontSize:'12px',fontWeight:'bold'}}>✓</span>}
                </div>
                <div>
                  <div style={{fontSize:'14px',fontWeight:600,color:'#1f2937'}}>💳 Paiement à la livraison — 1 200 DT</div>
                  <div style={{fontSize:'12px',color:'#9ca3af',marginTop:'3px'}}>Payez uniquement à la réception de votre appareil</div>
                </div>
              </div>

              <button id="order-submit-btn" type="submit" className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px',opacity:loading?0.7:1}} disabled={loading}>
                {loading ? '⏳ Traitement...' : '✓ Confirmer ma commande'}
              </button>
            </form>
            <p style={{textAlign:'center',fontSize:'11px',color:'#d1d5db',marginTop:'16px'}}>🔒 Aucun paiement en ligne requis. Données confidentielles.</p>
          </>
        ) : (
          <>
            <div style={{textAlign:'center',marginBottom:'24px'}}>
              <div style={{width:'64px',height:'64px',background:'#f0fdf4',border:'2px solid #bbf7d0',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',margin:'0 auto 16px'}}>✅</div>
              <h2 style={{fontSize:'22px',fontWeight:800,color:'#1f2937',marginBottom:'6px'}}>Commande confirmée !</h2>
              <p style={{fontSize:'13px',color:'#9ca3af'}}>Nous vous contactons au <strong style={{color:'#1f2937'}}>{creds?.phone}</strong> dans 48h</p>
            </div>

            <div className="cred-box">
              <div style={{fontSize:'14px',fontWeight:700,color:'#166534',marginBottom:'6px'}}>🔑 Vos identifiants Dashboard</div>
              <p style={{fontSize:'12px',color:'#6b7280',marginBottom:'16px'}}>Notez ces identifiants — ils servent à accéder à votre tableau de bord NexusGuard Mini.</p>

              {[{label:'Login',val:creds?.login,id:'cred-login'},{label:'Mot de passe',val:creds?.password,id:'cred-pass'}].map(c=>(
                <div key={c.label} className="cred-row">
                  <div>
                    <div className="cred-label">{c.label}</div>
                    <div id={c.id} className="cred-value">{c.val}</div>
                  </div>
                  <button className={`copy-btn${copied===c.label?' done':''}`} onClick={()=>copy(c.val,c.label)}>
                    {copied===c.label?'✓ Copié':'Copier'}
                  </button>
                </div>
              ))}

              <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:'10px',padding:'12px 16px',marginTop:'4px'}}>
                <div className="cred-label">URL Dashboard</div>
                <div style={{fontFamily:'monospace',fontSize:'13px',color:'#15803d',fontWeight:600}}>http://[RaspberryPi-IP]:5000/login</div>
              </div>
            </div>

            <div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:'12px',padding:'12px 16px',marginTop:'16px',fontSize:'13px',color:'#92400e',textAlign:'center'}}>
              📧 Email de confirmation envoyé à <strong>{creds?.email}</strong>
            </div>
            <button className="btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'20px'}} onClick={close}>Fermer</button>
          </>
        )}
      </div>
    </div>
  );
}
