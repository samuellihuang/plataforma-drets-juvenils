import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const links = [
  { to: '/',          label: 'Inici' },
  { to: '/simulador', label: 'Simulador' },
  { to: '/xat',       label: 'Assessor IA' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      </div>
    </header>
  );
}
