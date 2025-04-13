import { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Box,
  LinearProgress,
} from "@mui/material";
import { SalesRep } from "@/features/salesReps/types";

interface Props {
  rep: SalesRep;
  totalValue: number;
  contribution: number;
  isTopRep: boolean;
  avgDiff: number;
}


const SalesRepCard = memo(function SalesRepCard({
  rep,
  totalValue,
  contribution,
  isTopRep,
  avgDiff,
}: Props) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>

        <Typography variant="h6" component="div" gutterBottom>
          {rep.name}
          {isTopRep && (
            <Chip
              label="Top Rep"
              color="success"
              size="small"
              sx={{ ml: 1, fontWeight: "bold" }}
            />
          )}
        </Typography>

        <Typography color="text.secondary">
          {rep.role} &mdash; {rep.region}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" fontWeight={500}>
          Skills:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
          {rep.skills.map((skill, i) => (
            <Chip key={i} label={skill} size="small" color="primary" />
          ))}
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Chip
          label={`${Math.round(contribution)}% of total sales contribution`}
          color="primary"
          size="small"
          sx={{ fontWeight: 500, my: 1 }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ${totalValue.toLocaleString()} Sales
        </Typography>

        <Typography
          variant="caption"
          color={avgDiff >= 0 ? "success.main" : "error.main"}
          sx={{ fontWeight: 500 }}
        >
          {avgDiff >= 0 ? "+" : ""}
          {avgDiff.toFixed(1)}% {avgDiff >= 0 ? "above" : "below"} avg
        </Typography>


        <Typography variant="body2" fontWeight={500}>
          Top Clients:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          {rep.clients.slice(0, 2).map((client, idx) => (
            <li key={idx}>
              {client.name} ({client.industry})
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
});

export default SalesRepCard;
