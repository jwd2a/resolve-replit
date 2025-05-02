import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Course from "@/pages/Course";
import CoursePage from "@/pages/course-page";
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
import Home6 from "@/pages/home6";
import CoParentVerification from "@/pages/co-parent-verification";
import CoParentingSchedule from "@/pages/co-parenting-schedule";
import FamilyInformation from "@/pages/family-information";
import CoParentInvitation from "@/pages/co-parent-invitation";
import WaiversAndAgreements from "@/pages/waivers-and-agreements";
import HolidayPreferences from "@/pages/holiday-preferences";
import ScheduleCourse from "@/pages/schedule-course";
import CourseSessionDemo from "@/pages/course-session-demo";
import AITestPage from "@/pages/ai-test-page";
import AdminUsersFamilies from "@/pages/admin/users-families";
import AdminFamiliesList from "@/pages/admin/families-list";
import { AuthProvider } from "@/hooks/use-auth";
import { PaymentStatusProvider } from "@/hooks/use-payment-status";
import { ProtectedRoute } from "@/components/protected-route";
import { RootLayout } from "@/components/RootLayout";

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
      <Route path="/" component={Home6} />
      <Route path="/home2" component={Home2} />
      <Route path="/home3" component={Home3} />
      <Route path="/home4" component={Home4} />
      <Route path="/home5" component={Home5} />
      <Route path="/home6" component={Home6} />
      <Route path="/co-parent-verification" component={CoParentVerification} />
      <Route path="/co-parenting-schedule" component={CoParentingSchedule} />
      <Route path="/family-information" component={FamilyInformation} />
      <Route path="/co-parent-invitation" component={CoParentInvitation} />
      <Route path="/waivers-and-agreements" component={WaiversAndAgreements} />
      <Route path="/holiday-preferences" component={HolidayPreferences} />
      <Route path="/schedule-course" component={ScheduleCourse} />
      <Route path="/course" component={Course} />
      <Route path="/course-page" component={CoursePage} />
      <Route path="/course-session-demo" component={CourseSessionDemo} />
      <Route path="/parenting-plan" component={ParentingPlan} />
      <Route path="/ai-test" component={AITestPage} />
      
      {/* Admin routes */}
      <Route path="/admin/families" component={AdminFamiliesList} />
      <Route path="/admin/users-families" component={AdminUsersFamilies} />
      
      {/* Fallback for unknown routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaymentStatusProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </PaymentStatusProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
