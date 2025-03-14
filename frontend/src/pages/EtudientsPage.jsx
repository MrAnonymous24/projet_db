import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, TextField, Typography } from '@mui/material';

export default function QcmPage() {
  const [step, setStep] = useState('info'); // info or quiz
  const [studentInfo, setStudentInfo] = useState({ name: '', className: '' });
  const [quizIndex, setQuizIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    {
      question: 'Quelle est la capitale de la France ?',
      options: ['Paris', 'Londres', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Quelle est la capitale de l\'Espagne ?',
      options: ['Rome', 'Madrid', 'Lisbonne', 'Paris'],
      correctAnswer: 'Madrid',
    },
    {
      question: 'Quelle est la capitale de l\'Allemagne ?',
      options: ['Berlin', 'Amsterdam', 'Bruxelles', 'Vienne'],
      correctAnswer: 'Berlin',
    },
  ];

  useEffect(() => {
    if (step === 'quiz' && !finished) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        handleNextQuestion();
      }
    }
  }, [timeLeft, step, finished]);

  const handleStartQuiz = () => {
    if (studentInfo.name && studentInfo.className) {
      setStep('quiz');
      setTimeLeft(60);
    } else {
      alert('Veuillez entrer votre nom et votre classe.');
    }
  };

  const handleNextQuestion = (selectedOption) => {
    if (selectedOption === questions[quizIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (quizIndex + 1 < questions.length) {
      setQuizIndex(quizIndex + 1);
      setTimeLeft(60);
    } else {
      setFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setFinished(false);
    setStep('info');
    setStudentInfo({ name: '', className: '' });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', borderRadius: '12px', boxShadow: 3 }}>
      <CardContent>
        {step === 'info' && (
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              Informations de l'étudiant
            </Typography>
            <TextField
              label="Nom"
              fullWidth
              margin="normal"
              value={studentInfo.name}
              onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
            />
            <TextField
              label="Classe"
              fullWidth
              margin="normal"
              value={studentInfo.className}
              onChange={(e) => setStudentInfo({ ...studentInfo, className: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleStartQuiz}
              sx={{ marginTop: '1rem' }}
            >
              Commencer le QCM
            </Button>
          </div>
        )}

        {step === 'quiz' && !finished && (
          <div>
            <Typography variant="h6" gutterBottom>
              Question {quizIndex + 1} / {questions.length}
            </Typography>
            <Typography gutterBottom>{questions[quizIndex].question}</Typography>
            {questions[quizIndex].options.map((option) => (
              <Button
                key={option}
                variant="outlined"
                fullWidth
                onClick={() => handleNextQuestion(option)}
                sx={{ marginBottom: '0.5rem' }}
              >
                {option}
              </Button>
            ))}
            <Typography align="right" color="textSecondary">
              Temps restant : {timeLeft} secondes
            </Typography>
          </div>
        )}

        {finished && (
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              Résultats du QCM
            </Typography>
            <Typography gutterBottom>
              {studentInfo.name} de la classe {studentInfo.className}, vous avez obtenu {score} / {questions.length} points.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleResetQuiz}
            >
              Recommencer le QCM
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
