import { PROTECTED_QUERY, USERS_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export const Home = () => {
  const { data, loading } = useQuery(USERS_QUERY);
  const { data: protectedData } = useQuery(PROTECTED_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-4xl w-full h-full text-orange-600">
      <h1>Home</h1>
      {data?.users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
      <div className="text-red-600">
        {protectedData?.helloProtectedRoute ? (
          <h1>Success</h1>
        ) : (
          <h1>Failed</h1>
        )}
      </div>
    </div>
  );
};
