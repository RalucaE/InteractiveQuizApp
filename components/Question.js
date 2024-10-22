import styles from "@/styles/Question.module.css";
import Link from 'next/link';
import Head from "next/head";
import { useState, useEffect } from 'react';

const Question = ({ questionsLength, questionData, quizId, nextQuestion  }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [hasIncorrectAttempt, setHasIncorrectAttempt] = useState(false);
    const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const totalQuestions = questionsLength; 
    const currentQuestionIndex = Number(questionData.id); 
    const isLastQuestion = currentQuestionIndex > totalQuestions - 1;
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
    const handleSubmit = (e) => {
      if (hasCheckedAnswer === false) {
        setIsDisabled(true);
        setHasCheckedAnswer(true);
      }
      e.preventDefault(); 
      if (selectedOption === questionData.answer) {
        if (!hasIncorrectAttempt && isCorrect !== true) {
          setScore((prevScore) => prevScore + 1); // Increment score only if no previous incorrect attempt
        }
        setIsCorrect(true); 
      } 
      else {
        setIsCorrect(false); 
        setHasIncorrectAttempt(true);
      }
    };
    useEffect(() => {
      setIsCorrect(null); 
      setSelectedOption(null); 
      setHasIncorrectAttempt(false);
      setHasCheckedAnswer(false);
      setIsDisabled(false);
    }, [questionData]);

    return (
        <>
           <Head>
             <title>{quizId}</title>
           </Head>
           <div className={`${styles.page}`}>
             <main>
               <h1 className={`${styles.title}`}>{questionData.question}</h1>
               <p className={`${styles.score}`}>Score {score}</p>
               <>{isDisabled}</>
               <form onSubmit={handleSubmit}>
                 <div className={`${styles.container}`}>
                   {questionData.options.map((option, index) => (
                     <label className={`${styles.label} ${isDisabled ? styles.disabledLabel : ''}`} 
                     key={index}
                     style={isDisabled ? { pointerEvents: 'none' } : {}}>
                       <input
                         type="radio"
                         value={option}
                         checked={selectedOption === option}
                         onChange={handleOptionChange}
                       />
                       {` ${option}`}
                     </label>
                   ))}
                 </div>
                 <div>
                   <button type="submit">Check answer</button>
                   {hasCheckedAnswer === true && isLastQuestion === false && (
                     <Link href={`/quiz/${quizId}/question/${nextQuestion}`}>
                       <button className={`${styles.nextQuestionBtn}`}>Next question</button>
                     </Link>
                   )}
                   {hasCheckedAnswer === true && isLastQuestion === true && (
                     <Link href={`/quiz/${quizId}/results?totalQuestions=${totalQuestions}&correctAnswers=${score}`}>
                       <button className={`${styles.finishQuizBtn}`}>Finish Quiz</button>
                     </Link>
                   )}
                 </div>
               </form>   
               {isCorrect === true && <p className={`${styles.isCorrect}`}>Correct answer!</p>}
               {isCorrect === false && <p className={`${styles.isNotCorrect}`}>Incorrect answer. Correct answer is: {questionData.answer}</p>}
             </main>
           </div>
         </>
        );
    }
export default Question;