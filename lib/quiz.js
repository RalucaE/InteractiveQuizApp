import fs from 'fs';
import path from 'path';

const quizDirectory = path.join(process.cwd(), 'public');

export function getAllQuizIds() {
  const fullPath = path.join(quizDirectory, `questions.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const quizzes = JSON.parse(fileContents);

  return Object.keys(quizzes).map(quizId => {
      return quizzes[quizId].map(question => ({
          params: {
              quizId: quizId,        
              questionId: question.id 
          }
      }));
  }).flat(); 
}
export async function getCategories() {
  const fullPath = path.join(quizDirectory, `questions.json`); 
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const quizzes = JSON.parse(fileContents); 

  return Object.keys(quizzes).map(quizId => ({
      params: {
        quizId: quizId,     
      }
  }));
}