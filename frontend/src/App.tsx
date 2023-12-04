import { useQuery } from "@apollo/client";
import { USERS_QUERY } from "@/graphql/queries";

const App = () => {
  const { data, loading } = useQuery(USERS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  const users = data?.users;

  return (
    <div className="bg-black text-white h-full flex items-center justify-center">
      <div>
        {users?.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
      </div>
    </div>
  );
};
export default App;
