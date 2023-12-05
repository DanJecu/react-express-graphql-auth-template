import { Input } from "@/components";
import { useAuthentication } from "@/hooks/useAuthentication";
import { FormEvent, useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { onRegister } = useAuthentication();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onRegister(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleRegister}
      className="w-full h-full flex items-center justify-center flex-col  gap-4"
    >
      <h1 className="font-medium text-xl">Register</h1>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        type="submit"
        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 duration-300 transition-colors"
      >
        Register
      </button>
    </form>
  );
};
