import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Course from "@/pages/Course";
import ParentingPlan from "@/pages/ParentingPlan";
import AuthPage from "@/pages/auth-page";
import OnboardingPage from "@/pages/onboarding-page";
import DashboardPage from "@/pages/dashboard-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";

function Router() {
  return (
    <Switch>
      {/* Public route for authentication */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Protected routes that require authentication */}
      <ProtectedRoute path="/onboarding" component={OnboardingPage} requireOnboarding={false} />
      
      {/* For now, we're keeping these routes public for demonstration purposes */}
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/" component={Course} />
      <Route path="/course" component={Course} />
      <Route path="/parenting-plan" component={ParentingPlan} />
      
      {/* Fallback for unknown routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
