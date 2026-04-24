import { useState, useEffect, useRef } from 'react';
import './Home.css';

// ── CAROUSEL PHOTOS (CSS gradient placeholders) ──────────
const PHOTOS = [
  { src: '/img/photo_test_1.jpg', label: 'Volume Russe' },
  { src: '/img/photo_test_2.png', label: 'Cil à Cil' },
  { gradient: 'linear-gradient(120deg, #E0C8B0 0%, #C0987A 50%, #906850 100%)', label: 'Œil de Biche' },
  { gradient: 'linear-gradient(145deg, #C0A888 0%, #A0806A 40%, #705040 100%)', label: 'Pose Mixte' },
  { gradient: 'linear-gradient(130deg, #D8C0A0 0%, #B89070 50%, #886050 100%)', label: 'Œil de Poupée' },
  { gradient: 'linear-gradient(150deg, #CDB898 0%, #AA8868 40%, #7A5848 100%)', label: 'Volume Russe' },
  { gradient: 'linear-gradient(115deg, #E0C8A8 0%, #C09878 50%, #906858 100%)', label: 'Cil à Cil Naturel' },
  { gradient: 'linear-gradient(155deg, #C8B088 0%, #A88060 40%, #785040 100%)', label: 'Look Dramatique' },
];

// ── NAV ───────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.35s ease, box-shadow 0.3s'
    }}>
      <a className="nav-logo" href="#hero">Beauté <span>Signée S</span></a>
      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#realisations">Réalisations</a></li>
        <li><a href="#tarifs">Tarifs</a></li>
        <li><a href="#fidelite">Fidélité</a></li>
        <li><a href="#reglement">Règlement</a></li>
        <li><a href="#contact" className="nav-cta">Contact</a></li>
      </ul>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────
function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = () => {
      if (bgRef.current) {
        const y = window.scrollY * 0.4;
        bgRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-overlay" />
      <div className="hero-eye">
        <svg viewBox="0 0 700 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="350" cy="100" rx="340" ry="90" stroke="white" strokeWidth="1.5"/>
          <circle cx="350" cy="100" r="52" stroke="white" strokeWidth="1.5"/>
          <circle cx="350" cy="100" r="22" fill="white"/>
          {[...Array(18)].map((_, i) => {
            const angle = (i / 18) * Math.PI * 2;
            const x1 = 350 + Math.cos(angle) * 55;
            const y1 = 100 + Math.sin(angle) * 55;
            const x2 = 350 + Math.cos(angle) * 85;
            const y2 = 100 + Math.sin(angle) * 72;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1"/>;
          })}
        </svg>
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">Safines Mouss — Marseille</p>
        <h1 className="hero-title">Beauté<br/><em>Signée S</em></h1>
        <p className="hero-tagline">Révélez votre regard, sublimez votre beauté.</p>
        <a className="hero-cta" href="#services">Découvrir les prestations</a>
      </div>
      <div className="hero-scroll">
        <span>Défiler</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────────────────
const SERVICES = [
  { num: '01', name: 'Cil à Cil', desc: 'Extension naturelle, une à une. Légèreté et discrétion pour un regard lumineux au quotidien.', icon: '✦' },
  { num: '02', name: 'Pose Mixte', desc: 'Alliance du cil à cil et du volume pour un résultat dense et naturellement glamour.', icon: '✦' },
  { num: '03', name: 'Volume Russe', desc: 'Bouquets ultra-légers en éventail pour un volume intense et un regard envoûtant.', icon: '✦' },
  { num: '04', name: 'Œil de Biche', desc: 'Technique sculptante qui allonge et étire le regard vers l\'extérieur pour un effet félin.', icon: '✦' },
  { num: '05', name: 'Œil de Poupée', desc: 'Extensions concentrées au centre pour ouvrir et agrandir le regard façon poupée.', icon: '✦' },
];

function Services() {
  return (
    <section id="services">
      <div className="container">
        <p className="section-eyebrow">Nos Prestations</p>
        <h2 className="section-title">L'art de sublimer<br/><em>votre regard</em></h2>
        <div className="divider" />
        <p className="section-subtitle">Chaque prestation est réalisée avec soin, en utilisant des extensions de qualité professionnelle, adaptées à la morphologie de vos yeux.</p>
      </div>
      <div className="services-grid">
        {SERVICES.map(s => (
          <div key={s.num} className="service-card">
            <span className="service-num">{s.num}</span>
            <h3 className="service-name">{s.name}</h3>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── LIGHTBOX ──────────────────────────────────────────────
function Lightbox({ photoIdx, onClose, onPrev, onNext }: {
  photoIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = PHOTOS[photoIdx];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <button className="lightbox-nav lightbox-nav--prev" onClick={e => { e.stopPropagation(); onPrev(); }}>←</button>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        {'src' in photo
          ? <img className="lightbox-img" src={photo.src} alt={photo.label} style={{ objectFit: 'cover' }} />
          : <div className="lightbox-img" style={{ background: photo.gradient }} />
        }
        <div className="lightbox-label">{photo.label}</div>
        <div className="lightbox-counter">{photoIdx + 1} / {PHOTOS.length}</div>
      </div>
      <button className="lightbox-nav lightbox-nav--next" onClick={e => { e.stopPropagation(); onNext(); }}>→</button>
    </div>
  );
}

// ── CAROUSEL ──────────────────────────────────────────────
function Carousel() {
  const [idx, setIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const total = PHOTOS.length;
  const visible = 3;
  const maxIdx = total - visible;

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(maxIdx, i + 1));

  const offset = idx * (320 + 16);

  return (
    <section id="realisations">
      <div className="container">
        <p className="section-eyebrow">Galerie</p>
        <h2 className="section-title">Nos <em>Réalisations</em></h2>
        <div className="divider" />
        <p className="section-subtitle">Chaque pose est unique. Voici quelques-unes de nos créations — des regards transformés avec passion.</p>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-track" style={{ transform: `translateX(calc(-${offset}px))` }}>
          {PHOTOS.map((photo, i) => (
            <div key={i} className="carousel-item" onClick={() => setLightboxIdx(i)} style={{ cursor: 'zoom-in' }}>
              {'src' in photo
                ? <img className="ci-bg" src={photo.src} alt={photo.label} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                : <div className="ci-bg" style={{ background: photo.gradient }} />
              }
              <div className="ci-label">{photo.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={prev} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1 }}>←</button>
        <button className="carousel-btn" onClick={next} disabled={idx >= maxIdx} style={{ opacity: idx >= maxIdx ? 0.4 : 1 }}>→</button>
        <div className="carousel-dots">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button key={i} className={`carousel-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          photoIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => (i! + total - 1) % total)}
          onNext={() => setLightboxIdx(i => (i! + 1) % total)}
        />
      )}
    </section>
  );
}

// ── TARIFS ────────────────────────────────────────────────
const TARIFS = [
  {
    service: 'Cil à Cil',
    desc: 'Pose complète naturelle et légère',
    price: '60', duration: '1h30 — Pose complète',
    includes: ['Bilan visuel offert', 'Extensions soie premium', 'Conseils d\'entretien'],
    featured: false,
  },
  {
    service: 'Pose Mixte',
    desc: 'Le meilleur des deux techniques',
    price: '75', duration: '2h — Pose complète',
    includes: ['Bilan visuel offert', 'Extensions mixtes premium', 'Kit entretien offert'],
    featured: true,
  },
  {
    service: 'Volume Russe',
    desc: 'Volume exceptionnel, légèreté absolue',
    price: '90', duration: '2h30 — Pose complète',
    includes: ['Bilan visuel offert', 'Extensions mega volume', 'Retouche sous 3 semaines'],
    featured: false,
  },
  {
    service: 'Œil de Biche',
    desc: 'Regard félin et allongé',
    price: '70', duration: '1h45 — Pose complète',
    includes: ['Bilan morphologie', 'Extensions courbure L+', 'Conseils personnalisés'],
    featured: false,
  },
  {
    service: 'Œil de Poupée',
    desc: 'Regard grand ouvert et expressif',
    price: '70', duration: '1h45 — Pose complète',
    includes: ['Bilan morphologie', 'Extensions effet doll', 'Conseils d\'entretien'],
    featured: false,
  },
];

function Tarifs() {
  return (
    <section id="tarifs">
      <div className="container">
        <p className="section-eyebrow">Nos Tarifs</p>
        <h2 className="section-title">Des prestations<br/><em>d'exception</em></h2>
        <div className="divider" />
        <p className="section-subtitle">Tous nos tarifs incluent la consultation initiale et les conseils d'entretien personnalisés.</p>
        <div className="tarifs-grid">
          {TARIFS.map(t => (
            <div key={t.service} className={`tarif-card ${t.featured ? 'featured' : ''}`}>
              {t.featured && <span className="tarif-badge">Le plus demandé</span>}
              <h3 className="tarif-service">{t.service}</h3>
              <p className="tarif-desc">{t.desc}</p>
              <div className="tarif-price"><sup>€</sup>{t.price}</div>
              <p className="tarif-duration">{t.duration}</p>
              <div className="tarif-hr" />
              <ul className="tarif-includes">
                {t.includes.map(inc => <li key={inc}>{inc}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FIDÉLITÉ ──────────────────────────────────────────────
function Fidelite() {
  return (
    <section id="fidelite">
      <div className="fidelite-inner">
        <div className="fidelite-text">
          <p className="section-eyebrow">Programme Fidélité</p>
          <h2 className="section-title">Votre beauté<br/><em>récompensée</em></h2>
          <p className="fidelite-body">
            Collectez des tampons à chaque prestation grâce à l'application <strong>Winstamp</strong> et profitez d'avantages exclusifs. Après 5 visites, bénéficiez d'une remise spéciale.
          </p>
          <a className="btn-accent" href="https://apps.apple.com/fr/app/winstamp-carte-de-fid%C3%A9lit%C3%A9/id1521626266" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l4 4 4-4M12 8v8"/>
            </svg>
            Télécharger Winstamp
          </a>
        </div>
        <div className="fidelite-visual">
          <div className="loyalty-card">
            <div className="loyalty-card-title">Beauté Signée</div>
            <div className="loyalty-card-sub">Carte de fidélité</div>
            <div className="loyalty-stamps">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`stamp ${i < 3 ? 'filled' : ''}`}>{i < 3 ? '✦' : ''}</div>
              ))}
            </div>
            <div className="loyalty-note">3 / 10 tampons — Offre spéciale à 10 ✦</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── RÈGLEMENT ─────────────────────────────────────────────
const REGLES = [
  { num: '01', title: 'Rendez-vous & Ponctualité', text: 'Merci d\'arriver à l\'heure. Tout retard de plus de 15 minutes pourra entraîner l\'annulation du rendez-vous, sans remboursement si l\'acompte a été versé.' },
  { num: '02', title: 'Annulation & Acompte', text: 'Un acompte de 20 € est demandé à la réservation. Toute annulation doit être effectuée au minimum 24h à l\'avance pour être remboursée.' },
  { num: '03', title: 'Contre-indications', text: 'Les extensions sont déconseillées en cas d\'allergie aux adhésifs, de traitement médical oculaire ou de chimiothérapie en cours. Une consultation préalable est possible.' },
  { num: '04', title: 'Entretien & Retouches', text: 'Pour une durée optimale, évitez l\'eau les 24h suivant la pose et utilisez uniquement les produits recommandés. Les retouches sont à prévoir toutes les 3 à 4 semaines.' },
  { num: '05', title: 'Hygiène & Respect', text: 'Le salon est un espace de bien-être. La propreté des cils (sans mascara ni résidu) est exigée avant chaque prestation. Merci de respecter la tranquillité des autres clients.' },
  { num: '06', title: 'Photos & Réseaux', text: 'Des photos peuvent être prises avec votre accord pour illustrer notre portfolio Instagram. Vous restez libre de refuser à tout moment.' },
];

function Reglement() {
  return (
    <section id="reglement">
      <div className="container">
        <p className="section-eyebrow">À Savoir</p>
        <h2 className="section-title">Règlement<br/><em>du salon</em></h2>
        <div className="divider" />
        <p className="section-subtitle" style={{ marginBottom: 48 }}>Pour que chaque visite se passe dans les meilleures conditions, voici ce qu'il faut savoir.</p>
        <div className="reglement-grid">
          {REGLES.map(r => (
            <div key={r.num} className="regle-item">
              <div className="regle-num">{r.num}</div>
              <div className="regle-content">
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────
const FORMSPREE_ID = 'REMPLACE_PAR_TON_ID'; // 👉 à remplacer après inscription sur formspree.io

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setSent(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact">
      <div className="container">
        <p className="section-eyebrow">Prenez Contact</p>
        <h2 className="section-title">Réservez votre<br/><em>rendez-vous</em></h2>
        <div className="divider" />
        <p className="section-subtitle" style={{ marginBottom: 60 }}>Je suis disponible pour répondre à toutes vos questions et planifier votre prochaine séance.</p>
        <div className="contact-grid">
          <div>
            {[
              { icon: '✉', label: 'Email', value: 'safines.mouss@gmail.com', href: 'mailto:safines.mouss@gmail.com' },
              { icon: '✆', label: 'Téléphone', value: '06 30 73 50 09', href: 'tel:+33630735009' },
              { icon: '◎', label: 'Adresse', value: '6 impasse Broussier, 13016 Marseille', href: 'https://maps.google.com/?q=6+impasse+Broussier+13016+Marseille' },
            ].map(c => (
              <div key={c.label} className="contact-info-item">
                <div className="contact-icon">{c.icon}</div>
                <div>
                  <p className="contact-label">{c.label}</p>
                  <a className="contact-value" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{c.value}</a>
                </div>
              </div>
            ))}
            <div className="social-links">
              <a className="social-link" href="https://www.instagram.com/beaute.signee.s/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a className="social-link" href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.17a8.16 8.16 0 0 0 4.77 1.52V7.25a4.85 4.85 0 0 1-1-.56z"/>
                </svg>
              </a>
              <a className="social-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
            <div className="contact-map" style={{ marginTop: 32 }}>
              <iframe
                title="Adresse Beauté Signée"
                src="https://www.openstreetmap.org/export/embed.html?bbox=5.3400,43.3600,5.3700,43.3800&layer=mapnik&marker=43.3700,5.3550"
                allowFullScreen
              />
            </div>
          </div>
          <div>
            {sent ? (
              <div style={{ padding: '60px 40px', textAlign: 'center', border: '1px solid var(--hr)' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, color: 'var(--accent)', marginBottom: 16 }}>✦</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: 'var(--text)', marginBottom: 12 }}>Message envoyé</h3>
                <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>Merci pour votre message. Safines vous répondra dans les plus brefs délais.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Prénom</label>
                    <input className="form-input" name="prenom" type="text" placeholder="Votre prénom" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Nom</label>
                    <input className="form-input" name="nom" type="text" placeholder="Votre nom" required />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input className="form-input" name="email" type="email" placeholder="votre@email.com" required />
                </div>
                <div className="form-field">
                  <label className="form-label">Téléphone</label>
                  <input className="form-input" name="telephone" type="tel" placeholder="06 XX XX XX XX" />
                </div>
                <div className="form-field">
                  <label className="form-label">Prestation souhaitée</label>
                  <select className="form-input" name="prestation" defaultValue="">
                    <option value="" disabled>Choisir une prestation</option>
                    {SERVICES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" name="message" placeholder="Votre message ou question..." />
                </div>
                <button className="form-submit" type="submit" disabled={loading}>
                  {loading ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
                {error && (
                  <p style={{ marginTop: 12, fontSize: 13, color: '#c0392b' }}>
                    Une erreur est survenue. Réessaie ou contacte-nous par téléphone.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TWEAKS ────────────────────────────────────────────────
const TWEAKS_DEFAULTS = {
  theme: 'nuit',
  heroStyle: 'classique',
};

function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(TWEAKS_DEFAULTS.theme);

  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.data?.type === '__activate_edit_mode') setOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', listener);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', listener);
  }, []);

  const applyTheme = (t: string) => {
    setTheme(t);
    document.body.setAttribute('data-theme', t);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: t } }, '*');
  };

  const themes = [
    { id: 'sable', label: 'Sable & Crème', color1: '#B8986A', color2: '#FAF8F4' },
    { id: 'nuit', label: 'Nuit & Or', color1: '#C9A86C', color2: '#18120D' },
    { id: 'rose', label: 'Rose Poudré', color1: '#C09090', color2: '#FDF8F7' },
  ];

  return (
    <div className={`tweaks-panel ${open ? 'open' : ''}`}>
      <div className="tweaks-title">Tweaks</div>
      <div className="tweak-group">
        <span className="tweak-label">Palette de couleurs</span>
        <div className="tweak-options">
          {themes.map(t => (
            <div key={t.id} className={`tweak-option ${theme === t.id ? 'active' : ''}`} onClick={() => applyTheme(t.id)}>
              <div className="tweak-swatch" style={{ background: `linear-gradient(135deg, ${t.color1} 50%, ${t.color2} 50%)`, border: '1px solid rgba(0,0,0,0.1)' }} />
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────
function App() {
  useEffect(() => {
    document.body.setAttribute('data-theme', TWEAKS_DEFAULTS.theme);
  }, []);
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Carousel />
      <Tarifs />
      <Fidelite />
      <Reglement />
      <Contact />
      <footer>
        <div className="footer-logo">Beauté Signée</div>
        <p className="footer-note">© 2026 Safines Mouss — Technicienne en Extensions de Cils — Marseille 13016</p>
      </footer>
      <TweaksPanel />
    </>
  );
}

export default App;
