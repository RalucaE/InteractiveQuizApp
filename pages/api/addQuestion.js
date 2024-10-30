import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    console.log("data");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'POST') {
    const { category, question, options, answer } = req.body;
    const quizDirectory = path.join(process.cwd(), 'public');
    const fullPath = path.join(quizDirectory, `questions.json`);
    const filePath = path.join(process.cwd(), 'public', 'questions.json');
    
    
    try {
      // Read the existing data from questions.json
      const data = fs.readFileSync(fullPath, 'utf8');
      const jsonData = JSON.parse(data);

      // Create a new question object
      const newQuestion = {
        id: jsonData[category] ? (jsonData[category].length + 1).toString() : '1',
        question,
        options,
        answer,
      };

      // Add the new question to the appropriate category or create the category
      if (!jsonData[category]) {
        jsonData[category] = [newQuestion];
      } else {
        jsonData[category].push(newQuestion);
      }

      // Write the updated data back to questions.js
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      
      res.status(200).json({ message: 'Question added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error adding question' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
