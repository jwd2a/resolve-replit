import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Course from "@/pages/Course";
import ParentingPlan from "@/pages/ParentingPlan";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Course} />
      <Route path="/course" component={Course} />
      <Route path="/parenting-plan" component={ParentingPlan} />
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
