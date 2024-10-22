import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';



export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}  `}>
        <main className={styles.main}>
          <h1>Bine ati venit!</h1>
          <h2><Link href={`/categories`}>Alegeti o categorie</Link></h2>
        </main>
      </div>
    </>
  );
}
