import { useLang } from '../i18n';
import styles from './Disclaimer.module.css';

export default function Disclaimer() {
  const { t } = useLang();
  return (
    <aside className={styles.banner} role="note" aria-label="Avís legal">
      <span className={styles.label}>{t.disclaimer.label}</span>
      <p>
        {t.disclaimer.text}
      </p>
    </aside>
  );
}
