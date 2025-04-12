import { SalesRep } from "@/features/salesReps/types";
import SalesRepCard from "./SalesRepCard";

export default function SalesRepList({ reps }: { reps: SalesRep[] }) {
  return (
    <ul>
      {reps.map((rep) => (
        <SalesRepCard key={rep.id} rep={rep} />
      ))}
    </ul>
  );
}
