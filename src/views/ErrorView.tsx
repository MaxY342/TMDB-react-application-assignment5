import { Button } from "@/components";
import { useNavigate } from "react-router-dom";

export const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">418</h1>
      <p className="text-gray-500">I'm a teapot</p>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </main>
  );
};
