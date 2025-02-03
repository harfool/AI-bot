import {Route , Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Navbar from "./components/Navbar"
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={ <HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterPage/> } />
    </Routes>
    </>
  )
}

export default App
