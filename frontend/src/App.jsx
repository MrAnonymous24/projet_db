import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/AuthPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/ResultsPage";
import EtudientsPage from "./pages/EtudientsPage";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Faire une requête GET vers le backend
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<HomePage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/etudients/:examId" element={<EtudientsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
