import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Course from "@/pages/Course";
import ParentingPlan from "@/pages/ParentingPlan";
import AuthPage from "@/pages/auth-page";
import BetaAuth from "@/pages/beta-auth";
import OnboardingPage from "@/pages/onboarding-page";
import OnboardingPage3Step from "@/pages/onboarding-page-3step";
import Onboarding2 from "@/pages/onboarding2";
import Onboarding6Step from "@/pages/onboarding6step";
import DashboardPage from "@/pages/dashboard-page";
import DashboardSimplified from "@/pages/dashboard-simplified";
import Home2 from "@/pages/home2";
import Home3 from "@/pages/home3";
import Home4 from "@/pages/home4";
import Home5 from "@/pages/home5";
import CoParentVerification from "@/pages/co-parent-verification";
import AITestPage from "@/pages/ai-test-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";

function Router() {
  return (
    <Switch>
      {/* Public route for authentication */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Beta testing auth page */}
      <Route path="/beta-auth" component={BetaAuth} />
      
      {/* Protected routes that require authentication */}
      <ProtectedRoute path="/onboarding" component={OnboardingPage} requireOnboarding={false} />
      
      {/* For testing, make the 3-step onboarding public */}
      <Route path="/onboarding-3step" component={OnboardingPage3Step} />
      
      {/* For beta testing, make onboarding2 public */}
      <Route path="/onboarding2" component={Onboarding2} />
      
      {/* For the 6-step onboarding flow */}
      <Route path="/onboarding6step" component={Onboarding6Step} />
      
      {/* For now, we're keeping these routes public for demonstration purposes */}
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/dashboard-new" component={DashboardSimplified} />
      <Route path="/" component={DashboardSimplified} />
      <Route path="/home2" component={Home2} />
      <Route path="/home3" component={Home3} />
      <Route path="/home4" component={Home4} />
      <Route path="/home5" component={Home5} />
      <Route path="/co-parent-verification" component={CoParentVerification} />
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
