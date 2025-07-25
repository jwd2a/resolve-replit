import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import ParentingPlan3 from "@/pages/parenting-plan3";
import DashboardSimplified from "@/pages/dashboard-simplified";

function Router() {
  return (
    <Switch>
      {/* Default route to dashboard */}
      <Route path="/" component={DashboardSimplified} />
      
      {/* Dashboard route */}
      <Route path="/dashboard" component={DashboardSimplified} />
      
      {/* Main parenting plan route */}
      <Route path="/parenting-plan3" component={ParentingPlan3} />
      
      {/* Fallback for unknown routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
