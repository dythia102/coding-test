import { Suspense, lazy } from "react";
import { SalesRep } from "@/features/salesReps/types";
import { CircularProgress, Box } from "@mui/material";

const SalesRepCard = lazy(() => import("./SalesRepCard"));

export default function SalesRepList({
  reps,
  totalSales,
  average,
  topRepId,
}: {
  reps: SalesRep[];
  totalSales: number;
  average: number;
  topRepId: number | null;
}) {

  const maxDealValue = Math.max(
    ...reps.map((rep) => rep.deals.reduce((sum, d) => sum + d.value, 0))
  );

  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      }
    >
      {reps.map((rep) => {
        const repTotal = rep.deals.reduce((sum, d) => sum + d.value, 0);
        const contribution = totalSales > 0 ? (repTotal / totalSales) * 100 : 0;
        const isTopRep = rep.id === topRepId;
        const diffFromAvg = average > 0 ? ((repTotal - average) / average) * 100 : 0;

        return (
          <SalesRepCard
            key={rep.id}
            rep={rep}
            totalValue={repTotal}
            contribution={contribution}
            isTopRep={isTopRep}
            avgDiff={diffFromAvg}
          />
        );
      })}
    </Suspense>
  );
}
