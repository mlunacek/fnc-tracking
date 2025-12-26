
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import AboutPage from "./pages/about";
import CheckInPage from './checkin/page';

function App() {
  return (
    <Box>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<CheckInPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Box>
  );
}

export default App;
