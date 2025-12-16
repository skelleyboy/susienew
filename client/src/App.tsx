import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AreaPage from "@/pages/Area";
import Contact from "@/pages/Contact";

// Placeholder pages for Buy/Sell to avoid 404s on nav links
const Buy = () => <div className="p-20 text-center"><h1 className="text-4xl mb-4">Buy Page</h1><p>Coming Soon</p></div>;
const Sell = () => <div className="p-20 text-center"><h1 className="text-4xl mb-4">Sell Page</h1><p>Coming Soon</p></div>;
const Communities = () => <div className="p-20 text-center"><h1 className="text-4xl mb-4">All Communities</h1><p>Coming Soon</p></div>;
const About = () => <div className="p-20 text-center"><h1 className="text-4xl mb-4">About Page</h1><p>Coming Soon</p></div>;
const HomeValue = () => <div className="p-20 text-center"><h1 className="text-4xl mb-4">Home Valuation</h1><p>Coming Soon</p></div>;

function Router() {
  return (
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
