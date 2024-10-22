import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    const quizDirectory = path.join(process.cwd(), 'public');
    const fullPath = path.join(quizDirectory, `questions.json`);
    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents);
      const { category } = req.query;

      if (!category || !data[category]) {
        return res.status(400).json({ message: 'Categoria specificată nu există.' });
      }
      res.status(200).json(data[category]);
    } catch (error) {
      res.status(500).json({ message: 'Eroare la citirea întrebărilor.' });
    }
  }