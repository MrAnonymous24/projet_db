
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom"; // Single import
import { DataGrid } from '@mui/x-data-grid';
import {randomCreatedDate,randomTraderName,randomUpdatedDate} from '@mui/x-data-grid-generator';

// Navigation configuration
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

// Theme configuration
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

// DataGrid columns and rows
const columns = [
  { field: 'id', 
    headerName: 'ID', 
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  { field: 'nom', 
    headerName: 'Nom', 
    width: 280, 
  },
  { field: 'classe', 
    headerName: 'Classe', 
    width: 100, 
  },
  {
    field: 'notes',
    headerName: 'Notes',
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'dateTime',
    width: 220,
  },
];

const rows = [
  {
    id: 1,
    nom: randomTraderName(),
    classe: 'L3SRT',
    notes: 25,
    date: randomUpdatedDate(),
  },
  {
    id: 2,
    nom: randomTraderName(),
    classe: 'L3SRT',
    notes: 36,
    date: randomUpdatedDate(),
  },
  {
    id: 3,
    nom: randomTraderName(),
    classe: 'L3SRT',
    notes: 19,
    date: randomUpdatedDate(),
  },
  {
    id: 4,
    nom: randomTraderName(),
    classe: 'L3SRT',
    notes: 28,
    date: randomUpdatedDate(),
  },
  {
    id: 5,
    nom: randomTraderName(),
    classe: 'L3SRT',
    notes: 23,
    date: randomUpdatedDate(),
  },
];

// DemoPageContent component
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Le note des etudients
      </Typography>
      <section>
        <div style={{ height: 'auto', width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </section>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// ResultsPage component
function ResultsPage({ window }) {
  const navigate = useNavigate();
  const location = useLocation(); // Correct usage
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
          <Route path="/results" element={<DemoPageContent pathname={location.pathname} />} />
          <Route path="*" element={<DemoPageContent pathname={location.pathname} />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

ResultsPage.propTypes = {
  window: PropTypes.func,
};

export default ResultsPage;

