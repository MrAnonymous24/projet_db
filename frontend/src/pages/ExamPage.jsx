import * as React from "react";
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Card, CardContent, Button, TextField, Typography } from '@mui/material';

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "teacher-dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "exam",
    title: "Examen",
    icon: <DescriptionIcon />,
  },
  {
    segment: "results",
    title: "Notes",
    icon: <DescriptionIcon />,
  },
  {
    segment: "connexion",
    title: "Deconnexion",
    icon: <LogoutIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function ExamForm({ onSubmit }) {
  const [examDetails, setExamDetails] = useState({
    subject: '',
    date: '',
    time: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(examDetails);
    }}>
      <TextField
        label="Matière"
        name="matiere"
        value={examDetails.matiere}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Sujet"
        name="sujet"
        value={examDetails.sujet}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={examDetails.date}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Heure"
        name="time"
        type="time"
        value={examDetails.time}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Lieu"
        name="location"
        value={examDetails.location}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Niveau de difficulté (1-10)"
        name="difficulty"
        type="number"
        value={examDetails.difficulty}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        inputProps={{ min: 1, max: 10 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '1rem' }}>
        Planifier l'examen
      </Button>
    </form>
  );
}

function ExamDetails({ examDetails }) {
  const generateExamLink = () => {
    const baseUrl = "/etudients";
    const { matiere, sujet, date } = examDetails;

    // Crée un identifiant unique pour l'examen, par exemple en utilisant un hash ou un ID généré
    const examId = encodeURIComponent(`${matiere}-${sujet}-${date}`);
    
    return `${baseUrl}/${examId}`;
  };

  const handleShareLink = () => {
    const examLink = generateExamLink();
    navigator.clipboard.writeText(examLink); // Copie le lien dans le presse-papiers
    alert("Lien d'examen copié dans le presse-papiers !");
  };

  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Détails de l'examen planifié
      </Typography>
      <Typography>
        <strong>Matière :</strong> {examDetails.matiere}
      </Typography>
      <Typography>
        <strong>Sujet :</strong> {examDetails.sujet}
      </Typography>
      <Typography>
        <strong>Date :</strong> {examDetails.date}
      </Typography>
      <Typography>
        <strong>Heure :</strong> {examDetails.time}
      </Typography>
      <Typography>
        <strong>Lieu :</strong> {examDetails.location}
      </Typography>
      <Typography>
        <strong>Niveau de difficulté (1-10) :</strong> {examDetails.difficulty}
      </Typography>
      <Button
        onClick={handleShareLink}
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ marginTop: '1rem' }}
      >
        Partager le lien d'examen
      </Button>
      <Typography
        component="a"
        href={generateExamLink()}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          marginTop: '10rem',
          textAlign: 'center',
          wordWrap: 'break-word',
          color: 'blue',
          cursor: 'pointer',
        }}
      >
        {generateExamLink()}
      </Typography>
    </div>
  );
}


function DemoPageContent({ pathname }) {
  const [examDetails, setExamDetails] = useState({
    subject: '',
    date: '',
    time: '',
    location: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [cardHeight, setCardHeight] = useState(window.innerHeight * 0.8); // Initialisation dynamique à 80% de la fenêtre

  const handleResize = () => {
    setCardHeight(window.innerHeight * 0.8); // Ajuste à 80% de la fenêtre visible
  };

  useEffect(() => {
    // Ajouter un écouteur pour redimensionner la fenêtre
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur à la désactivation du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (details) => {
    setExamDetails(details);
    setSubmitted(true);
  };

  const resetForm = () => {
    setExamDetails({
      subject: '',
      date: '',
      time: '',
      location: '',
    });
    setSubmitted(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: 3,
        maxHeight: `${cardHeight}px`, // Hauteur dynamique basée sur la fenêtre
        overflow: 'hidden', // Cache le contenu débordant
      }}
    >
      <CardContent
        sx={{
          maxHeight: `${cardHeight - 50}px`, // Ajustement pour les marges internes
          overflowY: 'auto', // Active le défilement vertical si nécessaire
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Planification d'un examen
        </Typography>
        {!submitted ? (
          <ExamForm onSubmit={handleSubmit} />
        ) : (
          <ExamDetails examDetails={examDetails} onReset={resetForm} />
        )}
      </CardContent>
    </Card>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const ResultsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const score = params.get("score");

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Vos Résultats
      </Typography>
      <Typography variant="h5">Score : {score}</Typography>
    </Box>
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigationClick = (item) => {
    if (item.segment) {
      navigate(`/${item.segment}`);
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => handleNavigationClick(item),
      }))}
      branding={{
        title: "Dashboard",
      }}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/exam" element={<DemoPageContent pathname={location.pathname} />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/" element={<DemoPageContent pathname={location.pathname} />} /> {/* Default route */}
          <Route path="*" element={<Typography variant="h4">Page non trouvée</Typography>} /> {/* 404 route */}
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

export default App;