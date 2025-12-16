import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy } from "react";
import NotFound from "@/pages/not-found";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const AreaPage = lazy(() => import("@/pages/Area"));
const Contact = lazy(() => import("@/pages/Contact"));
const Buy = lazy(() => import("@/pages/Buy"));
const Sell = lazy(() => import("@/pages/Sell"));
const Communities = lazy(() => import("@/pages/Communities"));
const About = lazy(() => import("@/pages/About"));
const HomeValue = lazy(() => import("@/pages/HomeValue"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-pulse w-12 h-12 bg-gray-200 rounded-full"></div></div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/area/:slug" component={AreaPage} />
        <Route path="/contact" component={Contact} />
        <Route path="/buy" component={Buy} />
        <Route path="/sell" component={Sell} />
        <Route path="/communities" component={Communities} />
        <Route path="/about" component={About} />
        <Route path="/home-value" component={HomeValue} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
