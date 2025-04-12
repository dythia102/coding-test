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

export const fetchSalesReps = async (params: SalesRepsQuery = {}): Promise<SalesRepsResponse> => {
  const url = new URL("http://localhost:8000/api/sales-reps");
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    } else if (value !== undefined) {
      url.searchParams.set(key, value.toString());
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch sales reps");
  return res.json();
};

export const askAI = async (question: string): Promise<AIResponse> => {
  const res = await fetch("http://localhost:8000/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    throw new Error("AI endpoint error");
  }
  return res.json();
};
