import styles from './layout.module.css';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <main>{children}</main> 
    </div>
  );
}