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
  maxValue: number;
}

const SalesRepCard = memo(function SalesRepCard({ rep, maxValue }: Props) {
  const totalValue = rep.deals.reduce((sum, deal) => sum + deal.value, 0);
  const progress = maxValue > 0 ? (totalValue / maxValue) * 100 : 0;

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {rep.name}
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

        <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
          Sales Contribution (% of total)
        </Typography>



        <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4, flexGrow: 1 }}
          />
          <Typography variant="body2" sx={{ minWidth: 40 }}>
            {Math.round(progress)}%
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ${totalValue.toLocaleString()}
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
