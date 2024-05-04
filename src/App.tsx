import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Card from "./components/Card";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Card />
      </QueryClientProvider>
    </>
  );
}

export default App;
