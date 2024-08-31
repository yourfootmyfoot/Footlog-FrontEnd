import Footer from './footer';
import Header from './header';
import styles from './rootLayout.module.css';

// eslint-disable-next-line react/prop-types
function RootLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default RootLayout;
