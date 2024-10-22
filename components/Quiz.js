import Head from "next/head";
import styles from "@/styles/Quiz.module.css";
import Link from 'next/link';

const Quiz = ({ questions, quizId }) => {
  return (
    <>
      <Head>
        <title>{quizId}</title>
      </Head>
      <div className={`${styles.page}`}>
        <main>
          <h1 className={`${styles.title}`}>Quiz {quizId}</h1>
          <ul className={`${styles.ulList}`}>
            {questions.map((question, index) => (
              <li className={`${styles.list}`} key={question.id}>
                <Link href={`/quiz/${quizId}/question/${question.id}`}>
                  {index + 1}. {question.question}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/quiz/${quizId}/question/1`}>
            <button className={`${styles.startQuizBtn}`}>Start Quiz</button>
          </Link>
        </main>
      </div>
    </>
  );
};

export default Quiz;
