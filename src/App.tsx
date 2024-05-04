import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const queryClient = new QueryClient();
  const rootContainer = useRef<HTMLElement>(null);

  return (
    <main ref={rootContainer}>
      <QueryClientProvider client={queryClient}>
        <Card ref={rootContainer} />
      </QueryClientProvider>
    </main>
  );
}

export default App;
