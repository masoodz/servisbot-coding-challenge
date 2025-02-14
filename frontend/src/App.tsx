import React from "react";
import { CssBaseline, Container, Box, Paper } from "@mui/material";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100vw", 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", 
        backgroundColor: "#f5f5f5", 
        py: 4,
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
        <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
          <Dashboard />
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
