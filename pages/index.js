import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';



export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz App</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Welcome to Quiz App!</h1>
        <Link href="/categories">
          <button className={styles.categoriesBtn}>See Categories</button>
        </Link>  
      </div>
    </>
  );
}
