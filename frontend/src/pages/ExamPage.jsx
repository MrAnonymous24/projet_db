import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';

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
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
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

function DemoPageContent({ pathname }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = 85; // Exemple de score simulé
    navigate(`/results?score=${score}`);
  };

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
        Page actuelle : {pathname}
      </Typography>
      <section>
        <Typography variant="h5">Examen de Mathématiques</Typography>
        <form onSubmit={handleSubmit}>
          <Box className="question" mb={2}>
            <Typography>1. Quelle est la racine carrée de 16?</Typography>
            <input type="radio" name="q1" value="4" /> 4<br />
            <input type="radio" name="q1" value="5" /> 5<br />
            <input type="radio" name="q1" value="6" /> 6<br />
          </Box>
          <Box className="question" mb={2}>
            <Typography>2. Combien font 2 + 2?</Typography>
            <input type="radio" name="q2" value="3" /> 3<br />
            <input type="radio" name="q2" value="4" /> 4<br />
            <input type="radio" name="q2" value="5" /> 5<br />
          </Box>
          <Button type="submit" variant="contained">Soumettre l'examen</Button>
        </form>
      </section>
    </Box>
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

function App({ window }) {
  const navigate = useNavigate();
  const location = useLocation();
  const demoWindow = window !== undefined ? window() : undefined;

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
      window={demoWindow}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/exam" element={<DemoPageContent pathname={location.pathname} />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<DemoPageContent pathname={location.pathname} />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

App.propTypes = {
  window: PropTypes.func,
};

export default App;
