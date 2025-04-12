import { useEffect, useState } from "react";
import { SalesRep } from "./types";
import { fetchSalesReps, SalesRepsQuery } from "@/lib/api";

export const useSalesReps = (queryParams: SalesRepsQuery = {}) => {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    fetchSalesReps(queryParams)
      .then((data) => {
        setSalesReps(data.salesReps || []);
        setTotal(data.meta.total || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [JSON.stringify(queryParams)]); // re-run on param change

  return { salesReps, total, loading };
};

export interface SalesRepFilterOptions {
  regions: string[];
  roles: string[];
  industries: string[];
}

export const useSalesRepsFilters = () => {
  const [filters, setFilters] = useState<SalesRepFilterOptions>({
    regions: [],
    roles: [],
    industries: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/sales-reps/filters")
      .then((res) => res.json())
      .then(setFilters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { filters, loading };
};