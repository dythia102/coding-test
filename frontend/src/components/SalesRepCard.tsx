import { SalesRep } from "@/features/salesReps/types";

export default function SalesRepCard({ rep }: { rep: SalesRep }) {
  return (
    <li style={{ marginBottom: "1rem" }}>
      <strong>{rep.name}</strong> - {rep.role} ({rep.region})<br />
      Skills: {rep.skills.join(", ")}
    </li>
  );
}
