import { Box, Paper, Typography } from "@mui/material";

interface SalesStats {
    total_sales_value: number;
    average_sales_per_rep: number;
    top_rep: {
        id: number;
        name: string;
        total_sales: number;
    } | null;
    top_5_reps: {
        id: number;
        name: string;
        total_sales: number;
    }[];
}

export default function SalesSummary({ stats }: { stats: SalesStats }) {
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Sales Summary
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={4}>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Total Sales
                    </Typography>
                    <Typography variant="subtitle1">
                        ${stats.total_sales_value.toLocaleString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Average per Rep
                    </Typography>
                    <Typography variant="subtitle1">
                        ${stats.average_sales_per_rep.toLocaleString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Top Rep Sales
                    </Typography>
                    <Typography variant="subtitle1">
                        ${stats.top_rep?.total_sales.toLocaleString() ?? "—"}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Lowest (Top 5)
                    </Typography>
                    <Typography variant="subtitle1">
                        ${Math.min(...stats.top_5_reps.map((r) => r.total_sales)).toLocaleString()}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
