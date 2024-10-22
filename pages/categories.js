import Head from "next/head";
import styles from "@/styles/Categories.module.css";
import Link from 'next/link';

export default function Categories() {
  let categories = ['Cultura-generala', 'Istorie'];
    return (
      <>
        <Head>
          <title>Categorii</title>
        </Head>
        <div className={`${styles.page}  `}>
          <main className={styles.main}>
            <h1>Categorii</h1>
            <ul>
             {categories.map((category) => (
              <li>               
                <Link href={`/quiz/${category}`}> <h3>{category}</h3></Link>
              </li>
            ))}
            </ul>
          </main>
        </div>
      </>
    );
  }