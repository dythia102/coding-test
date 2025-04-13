import { apiClient } from "./axiosClient";

// Types (same as before)
export interface Deal {
  client: string;
  value: number;
  status: "Closed Won" | "In Progress" | "Closed Lost";
}

export interface Client {
  name: string;
  industry: string;
  contact: string;
}

export interface SalesRep {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Deal[];
  clients: Client[];
}

export interface SalesRepsQuery {
  page?: number;
  page_size?: number;
  sort_by?: "name" | "region" | "role";
  sort_order?: "asc" | "desc";
  regions?: string[];
  roles?: string[];
  client_industries?: string[];
  search_term?: string;
}

export interface SalesRepsResponse {
  salesReps: SalesRep[];
  meta: {
    total: number;
    page: number;
    page_size: number;
  };
}

export interface AIResponse {
  answer: string;
}

export interface SalesStats {
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

export const fetchSalesReps = async (params: SalesRepsQuery = {}): Promise<SalesRepsResponse> => {
  const res = await apiClient.get("/api/sales-reps", { params });
  return res.data;
};

export const fetchSalesStats = async (): Promise<SalesStats> => {
  const res = await apiClient.get("/api/sales-reps/stats");
  return res.data;
};

export const askAI = async (question: string): Promise<AIResponse> => {
  const res = await apiClient.post("/api/ai", { question });
  return res.data;
};
