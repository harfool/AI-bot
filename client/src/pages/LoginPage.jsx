import {
  Alert,
  Box,
  Button,
  Collapse,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width : 1000px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const {data} = await axios.post("http://localhost:3000/api/v1/auth/login", { email, password });
     if (data.token.accessToken) {
       localStorage.setItem("authToken" , true)
       toast.success("User Log In successfully");
       navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        // setError(err.response.data.error);
        setError(" Invalid credentials please check email or password")
      } else if (err.message) {
        // setError(err.message);
        setError(" Invalid credentials please check email or password")

      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2em"}
      m={"2em auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Sign In</Typography>
      
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Enter your email"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Enter your password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
        <Typography mt={2}>
          Dont have an account?
          <Link
            to="/register"
            style={{ textDecoration: "none", color: theme.palette.primary.main }}
          >
            Please Register
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;