import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="h-full flex flex-col">
      <nav className="w-full h-1/12 sticky bg-black text-white flex flex-row gap-10 px-8 py-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <main className="px-8 w-full h-full justify-center">
        <Outlet />
      </main>
    </div>
  );
};
