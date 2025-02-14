import {Route , Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Navbar from "./components/Navbar"
import { useMemo } from "react"
import { themeSettings } from "./pages/Theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast"
import Paragraph from "./pages/ParagraphPage"
import Summary from "./pages/Summary"
function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <>
    <ThemeProvider  theme={theme}>
      <CssBaseline/>
    <Navbar/>
    <Toaster/>
    <Routes>
      <Route path="/" element={ <HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterPage/> } />
      <Route path="/paragraph" element={<Paragraph/> } />
      <Route path="/summary" element={<Summary/> } />
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
