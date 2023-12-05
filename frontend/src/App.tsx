import { useEffect, useState } from "react";
import { Router } from "./router/router";

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URI_REFRESH, {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();

      localStorage.setItem("token", accessToken);

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Router />;
};
