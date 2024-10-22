import Head from "next/head";
import styles from "@/styles/Categories.module.css";
import Link from 'next/link';
import { getCategories } from '../lib/quiz';

export async function getStaticProps() {
  const quizData = await getCategories();
  let categories = [];
  quizData.forEach(quiz => {
    categories.push(quiz.params.quizId);
  });
  return {
    props: {
      categories,
    },
  };
}
export default function Categories({categories}) {
  return (
    <>   
      <Head>
        <title>Categories</title>  
      </Head>
      <div className={`${styles.page}`}>
        <h1 className={`${styles.title}`}>Categories</h1>
        <ul className={`${styles.ulList}`}>
          {categories.map((category) => (
            <li className={`${styles.list}`} key={category}>               
              <Link href={`/quiz/${category}`}> <h3>{category}</h3></Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}