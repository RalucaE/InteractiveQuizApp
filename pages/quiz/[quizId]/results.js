import Link from 'next/link';
import Head from "next/head";
import styles from "@/styles/Results.module.css";
import { useRouter } from 'next/router';


export default function Results() {
  const router = useRouter();
  const total = Number(router.query.totalQuestions);
  const correct = Number(router.query.correctAnswers);
  const feedbackMessage = correct >= total / 2 
    ? "Great job! You did really well!" 
    : "Keep trying! You can improve!";

  return (
    <>
     <Head>
        <title>Results</title>  
      </Head>
      <div className={`${styles.page}`}>
        <h1 className={`${styles.title}`}>Your Results</h1>
        <div className={`${styles.container}`}>
          <p className={`${styles.list}`}>Total Questions: {total}</p>
          <p className={`${styles.list}`}>Correct Answers: {correct}</p>
        </div>
        <h2 className={`${styles.feedback}`}>{feedbackMessage}</h2>
        <Link href="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </>
  );
}
