import { useState } from 'react';
import Head from "next/head";
import styles from "@/styles/AddQuestion.module.css";

export default function AddQuestionForm() {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !question || options.some(opt => opt === '') || !correctAnswer) {
      alert('All fields must be completed');
      return;
    }
    
    const newQuestion = {
      category,
      question,
      options,
      answer: correctAnswer,
    };
    try {
      const response = await fetch('/api/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      console.log(response.body);
      if (response.ok) {
        alert('Question added successfully');
        setCategory('');
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add question');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <>
      <Head>
          <title>Add Question</title>
      </Head>
      <div className={`${styles.page}`}>
        <main>
          <h1 className={`${styles.title}`}>Add Question</h1>
          <form className={`${styles.form}`} onSubmit={handleSubmit}>
            <div className={`${styles.category}`}>
              <label>Category: </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.question}`}>
              <label>Question: </label>
              <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              />
            </div>
            <div className={`${styles.container}`}>
              <label>Options: </label>
              {options.map((option, index) => (
              <div key={index}>
                  <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                  />
              </div>
              ))}
            </div>
            <div className={`${styles.answer}`}>
              <label>Correct answer: </label>
              <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
              >
              <option value="">Select the correct answer</option>
              {options.map((option, index) => (
                  <option key={index} value={option}>
                  {option}
                  </option>
              ))}
              </select>
            </div>
            <button type="submit">Add Question</button>
          </form>
        </main>
      </div>
    </>
  );
}
