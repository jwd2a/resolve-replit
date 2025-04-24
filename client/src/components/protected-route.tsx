import { useAuth } from "@/hooks/use-auth";
import { Redirect, Route } from "wouter";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({
  path,
  component: Component,
  requireOnboarding = true,
}: {
  path: string;
  component: () => React.JSX.Element;
  requireOnboarding?: boolean;
}) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !user ? (
        <Redirect to="/auth" />
      ) : requireOnboarding && !user.onboardingComplete ? (
        <Redirect to="/onboarding" />
      ) : (
        <Component />
      )}
    </Route>
  );
}