import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const quizDirectory = path.join(process.cwd(), 'quiz');
const questionsDirectory = path.join(process.cwd(), 'questions');
export function getAllQuizIds() {
    const fileNames = fs.readdirSync(quizDirectory);
    
    return fileNames.map((fileName) => {
      return {
        params: {
          quizId: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }

  export async function getQuizData(quizId) {
    const fullPath = path.join(quizDirectory, `${quizId}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const questions = getQuestionsForQuiz(quizId);
    const matterResult = matter(fileContents);

    return {
      quizId, 
      questions, 
      ...matterResult.data,
    };
  }
  export function getQuestionsForQuiz(quizId) {
    const quizQuestionDir = path.join(questionsDirectory, quizId);
    const questionFiles = fs.readdirSync(quizQuestionDir);

    const questions = questionFiles.map((fileName) => {
      const fullPath = path.join(quizQuestionDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
          questionId: fileName.replace(/\.md$/, ''),
          ...matterResult.data,
      };
    });
    return questions;
  }