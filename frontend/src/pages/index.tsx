import { useState } from "react";
import { askAI } from "@/lib/api";
import { useSalesReps } from "@/features/salesReps/useSalesReps";
import SalesRepList from "@/components/SalesRepList";

export default function Home() {
  const { salesReps, loading } = useSalesReps();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskQuestion = async () => {
    try {
      const data = await askAI(question);
      setAnswer(data.answer);
    } catch (error) {
      console.error("AI request error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Next.js + FastAPI Sample (TypeScript)</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Sales Representatives</h2>
        {loading ? <p>Loading...</p> : <SalesRepList reps={salesReps} />}
      </section>

      <section>
        <h2>Ask a Question (AI Endpoint)</h2>
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAskQuestion} style={{ marginLeft: "0.5rem" }}>
          Ask
        </button>
        {answer && (
          <div style={{ marginTop: "1rem" }}>
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
    </div>
  );
}
