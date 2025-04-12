import { useEffect, useState } from "react";
import { SalesRep } from "./types";
import { fetchSalesReps } from "@/lib/api";

export const useSalesReps = () => {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesReps()
      .then((data) => setSalesReps(data.salesReps || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { salesReps, loading };
};
