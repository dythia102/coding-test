import { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider
} from "@mui/material";
import { SalesRep } from "@/features/salesReps/types";

interface Props {
  rep: SalesRep;
}

const SalesRepCard = memo(function SalesRepCard({ rep }: Props) {
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
