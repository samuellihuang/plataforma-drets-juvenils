import styles from './Disclaimer.module.css';

export default function Disclaimer() {
  return (
    <aside className={styles.banner} role="note" aria-label="Avís legal">
      <span className={styles.label}>Avís</span>
      <p>
        Aquesta plataforma és <strong>educativa</strong> i no substitueix assessorament legal professional.
        Si tens una situació real, consulta un/a advocat/ada o el teu servei d&apos;orientació jurídica local.
      </p>
    </aside>
  );
}
