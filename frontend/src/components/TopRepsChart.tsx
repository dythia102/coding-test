import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Typography, Paper } from "@mui/material";

interface TopRep {
    id: number;
    name: string;
    total_sales: number;
}

const COLORS = ["#1976d2", "#4caf50", "#ff9800", "#e91e63", "#9c27b0"];

export default function TopRepsChart({ reps }: { reps: TopRep[] }) {
    const total = reps.reduce((sum, r) => sum + r.total_sales, 0);

    const data = reps.map((rep) => ({
        name: rep.name,
        value: rep.total_sales,
        percent: total > 0 ? (rep.total_sales / total) * 100 : 0,
    }));

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Top 5 Reps – Sales Contribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label={({ name, percent }) =>
                            `${name}: ${percent.toFixed(1)}%`
                        }
                    >
                        {data.map((_, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}
