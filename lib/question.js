import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const questionsDirectory = path.join(process.cwd(), 'questions');

export function getAllQuestionsIds(quizId) {  
  const quizQuestionDir = path.join(questionsDirectory, quizId);
  
  // Check if the directory exists
  if (!fs.existsSync(quizQuestionDir)) {
    console.error(`Directory not found: ${quizQuestionDir}`);
    return [];
  }
  const fileNames = fs.readdirSync(quizQuestionDir);

  return fileNames.map((fileName) => {
    return {
      params: {
        questionId: fileName.replace(/\.md$/, ''),
      },
    };
  });
  }
  export async function getQuestionsData(quizId, questionId) {
    const fullPath = path.join(questionsDirectory,quizId, `${questionId}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      questionId,  
      ...matterResult.data,
    };
  }