import styles from "@/styles/Question.module.css";
import { getAllQuestionsIds, getQuestionsData } from '../../../../lib/question';
import { getAllQuizIds } from '../../../../lib/quiz';
import { useState } from 'react';

export async function getStaticProps({ params }) {
  const questionData = await getQuestionsData(params.quizId, params.questionId);
  return {
    props: {
      questionData,
    },
  };
}

export async function getStaticPaths() {
  const quizIds = getAllQuizIds();

  const paths = quizIds.flatMap((quiz) => {
    const questionIds = getAllQuestionsIds(quiz.params.quizId);
    return questionIds.map((question) => ({
      params: {
        quizId: quiz.params.quizId,
        questionId: question.params.questionId,
      },
    }));
});
  return {
    paths,
    fallback: false,
  };
  
}
export default function Question({ questionData }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
   <>
    <div className={`${styles.page}`}>
    <main className={styles.main}>
      <h1>{questionData.title}</h1>
      <form>
        <label>
          <input
            type="radio"
            value="optiune1"
            checked={selectedOption === 'optiune1'}
            onChange={handleOptionChange}
          />
           {questionData.optiune1}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="optiune2"
            checked={selectedOption === 'optiune2'}
            onChange={handleOptionChange}
          />
           {questionData.optiune2}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="optiune3"
            checked={selectedOption === 'optiune3'}
            onChange={handleOptionChange}
          />
         {questionData.optiune3}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="optiune4"
            checked={selectedOption === 'optiune4'}
            onChange={handleOptionChange}
          />
           {questionData.optiune4}
        </label>
      </form>   
    
      </main>
      </div>
    </>
  );
}
  
