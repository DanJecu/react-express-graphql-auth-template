import { LOGIN_USER, REGISTER_USER } from "@/graphql/mutations";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
  const navigate = useNavigate();

  // Register
  const [registerUser] = useMutation(REGISTER_USER);

  const onRegister = async (email: string, password: string) => {
    try {
      const response = await registerUser({ variables: { email, password } });

      if (response.data?.register) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Login

  const [loginUser] = useMutation(LOGIN_USER);

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser({ variables: { email, password } });

      if (response && response.data) {
        localStorage.setItem("token", response.data.login.accessToken);
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return { onRegister, onLogin };
};
