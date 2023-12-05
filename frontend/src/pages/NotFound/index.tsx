import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-full w-full bg-neutral-900 text-white flex justify-center items-center flex-col gap-10">
      <h1 className="text-4xl">Page not found</h1>
      <p className="text-2xl">The page you are looking for does not exist. </p>
      <Link
        to="/"
        className="text-2xl text-indigo-600 hover:text-white transition duration-300"
      >
        Go back
      </Link>
    </div>
  );
};
