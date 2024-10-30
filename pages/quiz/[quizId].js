import { getAllQuizIds} from '../../lib/quiz';
import Quiz from '../../components/Quiz';

export async function getStaticProps({ params }) {
  let quizId = params.quizId;
  const response = await fetch(`http://localhost:3000/api/questions?category=${quizId}`);
  const questions = await response.json();
  return {
    props: {
      questions,
      quizId
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

export default function QuizPage({ questions, quizId }) {
  return(
    <Quiz questions={questions} quizId={quizId} />);
}