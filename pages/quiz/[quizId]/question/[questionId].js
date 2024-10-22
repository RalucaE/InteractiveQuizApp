import { getAllQuizIds } from '../../../../lib/quiz';
import Question from '../../../../components/Question';

export async function getStaticProps({ params }) {
  let quizId = params.quizId;
  const response = await fetch(`http://localhost:3000/api/questions?category=${quizId}`);
  const questions = await response.json();
  const questionsLength = questions.length;
  let questionData = [];
  questions.forEach((question) => {
    if(question.id == params.questionId) {
      questionData = question;
    } 
  });

let nextQuestion = Number(questionData.id) + 1;
  return {
    props: {
      questionsLength,
      questionData,
      quizId,
      nextQuestion
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

export default function QuestionPage({ questionsLength, questionData, quizId, nextQuestion }) {
  return(
    <Question
      questionsLength={questionsLength}
      questionData={questionData}
      quizId={quizId}
      nextQuestion={nextQuestion}
    />
  );
}