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

export interface SalesRepsResponse {
  salesReps: SalesRep[];
}

export interface AIResponse {
  answer: string;
}

export const fetchSalesReps = async (): Promise<SalesRepsResponse> => {
  const res = await fetch("http://localhost:8000/api/sales-reps");
  if (!res.ok) {
    throw new Error("Failed to fetch sales reps");
  }
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
