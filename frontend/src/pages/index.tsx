import { useState } from "react";
import { askAI } from "@/lib/api";
import { useSalesReps, useSalesRepsFilters } from "@/features/salesReps/useSalesReps";
import SalesRepList from "@/components/SalesRepList";
import SalesRepFilters from "@/components/SalesRepFilters";
import { Pagination } from "@mui/material";
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
import { fetchSalesStats, SalesStats } from "@/lib/api";
import { useEffect } from "react";
import TopRepsChart from "@/components/TopRepsChart";
import SalesSummary from "@/components/SalesSummary";

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
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);



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

  useEffect(() => {
    fetchSalesStats()
      .then(setStats)
      .catch(console.error);
  }, []);


  const handleAskQuestion = async () => {
    setAiLoading(true);
    try {
      const data = await askAI(question);
      setAnswer(data.answer);
    } catch (error) {
      console.error("AI request error:", error);
      setAnswer("AI is currently unavailable.");
    } finally {
      setAiLoading(false);
    }
  };


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Sales Dashboard Prod Pipeline test
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

        {aiLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={3}>
            <CircularProgress size={28} />
            <Typography sx={{ ml: 2 }}>Thinking...</Typography>
          </Box>
        ) : answer && (
          <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              AI Response:
            </Typography>
            <Typography>{answer}</Typography>
          </Paper>
        )}

      </Paper>

      {stats && <SalesSummary stats={stats} />}

      {stats?.top_5_reps && stats.top_5_reps.length > 0 && (
        <TopRepsChart reps={stats.top_5_reps} />
      )}

      <Button
        variant="outlined"
        onClick={() => setShowFilters((prev) => !prev)}
        sx={{ mb: 2 }}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>

      {showFilters && (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "background.paper",
            p: 2,
            mb: 4,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <SalesRepFilters
            filters={filters}
            loading={loadingFilters}
            region={region}
            role={role}
            industry={industry}
            sortBy={sortBy}
            sortOrder={sortOrder}
            search={search}
            onRegionChange={(val) => {
              setRegion(val);
              setPage(1);
            }}
            onRoleChange={(val) => {
              setRole(val);
              setPage(1);
            }}
            onIndustryChange={(val) => {
              setIndustry(val);
              setPage(1);
            }}
            onSortByChange={(val) => {
              setSortBy(val as "name" | "region" | "role" | "");
              setPage(1);
            }}
            onSortOrderChange={(val) => {
              setSortOrder(val);
              setPage(1);
            }}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            onClearFilters={() => {
              setRegion("");
              setRole("");
              setIndustry("");
              setSearch("");
              setSortBy("");
              setSortOrder("asc");
              setPage(1);
            }}
          />
        </Paper>
      )}


      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sales Representatives
        </Typography>
        <TextField
          label="Search by name or skill"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
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

            <SalesRepList
              reps={salesReps}
              totalSales={stats?.total_sales_value || 0}
              average={stats?.average_sales_per_rep || 0}
              topRepId={stats?.top_rep?.id ?? null}
            />

            <Paper
              elevation={3}
              sx={{
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "background.paper",
                py: 2,
                mt: 4,
                zIndex: 10,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Container maxWidth="md">
                <Box display="flex" justifyContent="center">
                  <Pagination
                    count={Math.ceil(total / 5)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              </Container>
            </Paper>

          </>
        )}
      </Paper>
    </Container>
  );
}
