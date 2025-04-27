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
import DashboardSimplified from "@/pages/dashboard-simplified";
import Home2 from "@/pages/home2";
import AITestPage from "@/pages/ai-test-page";
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
      <Route path="/dashboard-new" component={DashboardSimplified} />
      <Route path="/" component={DashboardSimplified} />
      <Route path="/home2" component={Home2} />
      <Route path="/course" component={Course} />
      <Route path="/parenting-plan" component={ParentingPlan} />
      <Route path="/ai-test" component={AITestPage} />
      
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
