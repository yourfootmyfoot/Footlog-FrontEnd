import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <li className={styles.navItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/test">test</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="com">com</Link>
        </li>
      </nav>
    </div>
  );
}

export default Footer;
