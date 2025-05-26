
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/*" element={<Docs />} />
          <Route path="/docs/introduction" element={<Docs />} />
          <Route path="/docs/quick-start" element={<Docs />} />
          <Route path="/docs/installation" element={<Docs />} />
          <Route path="/docs/setup" element={<Docs />} />
          <Route path="/docs/basic-tutorial" element={<Docs />} />
          <Route path="/docs/advanced-concepts" element={<Docs />} />
          <Route path="/docs/best-practices" element={<Docs />} />
          <Route path="/docs/api" element={<Docs />} />
          <Route path="/docs/configuration" element={<Docs />} />
          <Route path="/docs/troubleshooting" element={<Docs />} />
          <Route path="/docs/code-samples" element={<Docs />} />
          <Route path="/docs/use-cases" element={<Docs />} />
          <Route path="/docs/integrations" element={<Docs />} />
          <Route path="/docs/tutorials" element={<Docs />} />
          <Route path="/docs/reference" element={<Docs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
