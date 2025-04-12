import { useState } from "react";
import { askAI } from "@/lib/api";
import { useSalesReps } from "@/features/salesReps/useSalesReps";
import SalesRepList from "@/components/SalesRepList";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Paper
} from "@mui/material";

export default function Home() {
  const { salesReps, loading } = useSalesReps();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskQuestion = async () => {
    try {
      const data = await askAI(question);
      setAnswer(data.answer);
    } catch (error) {
      console.error("AI request error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Sales Dashboard
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ask a Question (AI Endpoint)
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAskQuestion}>
            Ask
          </Button>
        </Box>

        {answer && (
          <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              AI Response:
            </Typography>
            <Typography>{answer}</Typography>
          </Paper>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sales Representatives
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <SalesRepList reps={salesReps} />
        )}
      </Paper>
    </Container>
  );
}
