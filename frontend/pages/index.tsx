import { useState, useEffect } from "react";
import { fetchSalesReps, askAI, SalesRep } from "../lib/api";

export default function Home() {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    fetchSalesReps()
      .then((data) => setSalesReps(data.salesReps || []))
      .catch((err) => {
        console.error("Failed to fetch sales reps:", err);
      })
      .finally(() => setLoading(false));
  }, []);

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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {salesReps.map((rep) => (
              <li key={rep.id} style={{ marginBottom: "1rem" }}>
                <strong>{rep.name}</strong> - {rep.role} ({rep.region})
                <br />
                Skills: {rep.skills.join(", ")}
              </li>
            ))}
          </ul>
        )}
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
