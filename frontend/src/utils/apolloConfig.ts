import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "./accessToken";
import { jwtDecode } from "jwt-decode";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URI,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  let token = getAccessToken();

  const { exp } = jwtDecode(token);
  const expirationTime = exp ? exp * 1000 : 0;
  const currentTime = new Date().getTime();

  // Refresh if it expires in the next 5 minutes
  const thresholdTime = 5 * 60 * 1000;

  if (
    !token ||
    (expirationTime && expirationTime - currentTime < thresholdTime)
  ) {
    const refreshAccessToken = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_URI_REFRESH, {
        method: "POST",
        credentials: "include",
      });

      const { accessToken } = await response.json();
      return accessToken;
    };

    token = await refreshAccessToken();
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
});
