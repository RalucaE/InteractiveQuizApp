import Head from "next/head";
import styles from "@/styles/Quiz.module.css";
import Link from 'next/link';
import { getAllQuizIds, getQuizData } from '../../lib/quiz';

export async function getStaticProps({ params }) {
  const quizData = await getQuizData(params.quizId);
 
  return {
    props: {
      quizData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllQuizIds();
  return {
    paths,
    fallback: false,
  };
}
export default function Quiz({quizData}) {
    return ( 
   <>
    <Head>
      <title>{quizData.title}</title>
    </Head>
    <div className={`${styles.page}`}>
      <main className={styles.main}>
       <h1> Intrebari {quizData.title} </h1>
        <ul>
        {quizData.questions && quizData.questions.length > 0 ? (
          quizData.questions.map((question, index) => (   
            <li key={question.questionId}>
              <Link href={`/quiz/${quizData.quizId}/question/${question.questionId}`}>
                Intrebare {index + 1}: {question.title} 
              </Link>
            </li>
          ))
          ) : (
              <p>No questions available for this quiz.</p>
          )}
        </ul>
      </main>
    </div>
    </>
)}