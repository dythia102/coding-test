import { User } from "../lib/api";

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.role}
        </li>
      ))}
    </ul>
  );
}
