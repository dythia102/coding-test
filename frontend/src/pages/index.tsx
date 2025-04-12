import { useState } from "react";
import { askAI } from "@/lib/api";
import { useSalesReps, useSalesRepsFilters } from "@/features/salesReps/useSalesReps";
import SalesRepList from "@/components/SalesRepList";
import { Pagination, MenuItem } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "region" | "role" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { filters, loading: loadingFilters } = useSalesRepsFilters();

  const debouncedSearch = useDebounce(search);

  const { salesReps, loading, total } = useSalesReps({
    search_term: debouncedSearch,
    page,
    page_size: 5,
    regions: region ? [region] : undefined,
    roles: role ? [role] : undefined,
    client_industries: industry ? [industry] : undefined,
    sort_by: sortBy || undefined,
    sort_order: sortOrder,
  });


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

        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <TextField
            label="Region"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setPage(1);
            }}
            select
            fullWidth
            disabled={loadingFilters}
          >
            <MenuItem value="">All</MenuItem>
            {filters.regions.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
            select
            fullWidth
            disabled={loadingFilters}
          >
            <MenuItem value="">All</MenuItem>
            {filters.roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Industry"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              setPage(1);
            }}
            select
            fullWidth
            disabled={loadingFilters}
          >
            <MenuItem value="">All</MenuItem>
            {filters.industries.map((ind) => (
              <MenuItem key={ind} value={ind}>
                {ind}
              </MenuItem>
            ))}
          </TextField>

          {/*  SORTING */}
          <TextField
            label="Sort By"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as typeof sortBy);
              setPage(1);
            }}
            select
            fullWidth
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="region">Region</MenuItem>
            <MenuItem value="role">Role</MenuItem>
          </TextField>

          <TextField
            label={`Sort Order${sortBy ? ` (${sortBy})` : ""}`}
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as typeof sortOrder);
              setPage(1);
            }}
            select
            fullWidth
            disabled={!sortBy} // 👈 disable unless sort_by is selected
          >
            <MenuItem value="asc">Ascending (A → Z)</MenuItem>
            <MenuItem value="desc">Descending (Z → A)</MenuItem>
          </TextField>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setRegion("");
              setRole("");
              setIndustry("");
              setSearch("");
              setSortBy("");
              setSortOrder("asc");
              setPage(1);
            }}
          >
            Clear Filters
          </Button>

        </Box>
        <TextField
          label="Search by name or skill"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
          fullWidth
          margin="normal"
        />

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : salesReps.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" gutterBottom>
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters or search term.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              {total} {total === 1 ? "result" : "results"} found
            </Typography>

            <SalesRepList reps={salesReps} />
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(total / 5)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}

      </Paper>
    </Container>
  );
}
