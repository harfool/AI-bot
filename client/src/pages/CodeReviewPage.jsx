import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  CircularProgress,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeReview = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // States
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter some code to review.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/jarvus/ai/get-code-review",
        { code : code } 
      );
      setReview(data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width={isNotMobile ? "60%" : "90%"}
      p={4}
      m={"2rem auto"}
      borderRadius={3}
      sx={{ boxShadow: 3, backgroundColor: theme.palette.background.alt }}
    >
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Code Review
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          multiline
          rows={10}
          fullWidth
          required
          margin="normal"
          variant="outlined"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            fontFamily: "monospace",
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2, py: 1.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Review Code"}
        </Button>

        <Typography variant="body2" mt={2} textAlign="center">
          Not this tool? <Link to="/">Go Back</Link>
        </Typography>
      </form>

      {review ? (
        <Card
          sx={{
            mt: 4,
            p: 3,
            border: 1,
            borderRadius: 2,
            borderColor: "divider",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Code Review Result:
          </Typography>
          <SyntaxHighlighter
            language="javascript" // Change this based on the user's code language
            style={materialDark}
            customStyle={{
              borderRadius: "4px",
              padding: "16px",
              fontFamily: "monospace",
            }}
          >
            {review}
          </SyntaxHighlighter>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            p: 3,
            border: 1,
            borderRadius: 2,
            borderColor: "divider",
            backgroundColor: theme.palette.background.paper,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Your code review will appear here.
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default CodeReview;