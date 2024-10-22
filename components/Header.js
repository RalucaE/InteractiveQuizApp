import styles from '@/styles/Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/addQuestion">Add Question</Link>  
      </nav>
    </header>
  );
}
