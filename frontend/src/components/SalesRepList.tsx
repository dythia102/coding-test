import { Suspense, lazy } from "react";
import { SalesRep } from "@/features/salesReps/types";
import { CircularProgress, Box } from "@mui/material";

const SalesRepCard = lazy(() => import("./SalesRepCard"));

export default function SalesRepList({ reps }: { reps: SalesRep[] }) {
  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      }
    >
      {reps.map((rep) => (
        <SalesRepCard key={rep.id} rep={rep} />
      ))}
    </Suspense>
  );
}
