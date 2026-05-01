import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLang } from '../i18n';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/',          label: t.nav.home },
    { to: '/simulador', label: t.nav.simulator },
    { to: '/xat',       label: t.nav.chat },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandMark}>DJ</span>
          <span className={styles.brandText}>Drets Juvenils</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Navegació principal">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className={styles.langBtn}
          onClick={() => setLang(lang === 'ca' ? 'es' : 'ca')}
          aria-label="Canviar idioma"
        >
          {t.nav.langLabel}
        </button>
      </div>
    </header>
  );
}
