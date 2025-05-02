import { useState } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import logoSrc from "@assets/@Resolve Primary Logo - Main Color 02.png";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  displayName: z.string().min(2, { message: "Please enter your full name" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, isLoading, loginWithEmail, registerWithEmail, loginWithGoogle, loginWithApple, loginWithFacebook } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Login form setup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form setup
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handlers
  const onLoginSubmit = async (values: LoginFormValues) => {
    await loginWithEmail(values.email, values.password);
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    await registerWithEmail(values.email, values.username, values.password, values.displayName);
  };

  // If user is already logged in, redirect based on their onboarding status
  if (user) {
    if (!user.onboardingComplete) {
      // New users (from registration) need to complete onboarding
      return <Redirect to="/onboarding6step" />;
    }
    // Existing users (from login) go straight to dashboard
    return <Redirect to="/home6" />;
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-[#2e1a87] to-[#4730b8] items-center justify-center px-4 py-12">
      {/* Centered Authentication form */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Welcome to Resolve
          </h2>
          <p className="text-sm text-gray-600 text-center">
            A new path forward for you and your child(ren)
          </p>
        </div>

        <Tabs 
          defaultValue={authMode} 
          onValueChange={(value) => setAuthMode(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Social login buttons - displayed for both tabs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-center border-gray-300 hover:bg-gray-50 h-9 px-2" 
              onClick={() => loginWithGoogle()}
              disabled={isLoading}
            >
              <FaGoogle className="text-red-500" />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center border-gray-300 hover:bg-gray-50 h-9 px-2" 
              onClick={() => loginWithApple()}
              disabled={isLoading}
            >
              <FaApple className="text-black" />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center border-gray-300 hover:bg-gray-50 h-9 px-2" 
              onClick={() => loginWithFacebook()}
              disabled={isLoading}
            >
              <FaFacebook className="text-blue-600" />
            </Button>
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Login Tab Content */}
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-3">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="h-8" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs">Password</FormLabel>
                        <a href="#" className="text-xs font-medium text-primary hover:text-primary/90">
                          Forgot?
                        </a>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="h-8" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-[#2e1a87] hover:bg-[#25156d] mt-1 h-8 text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Register Tab Content */}
          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-2">
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="h-8" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs">Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} className="h-8" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-8" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="h-8" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs">Confirm</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="h-8" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#2e1a87] hover:bg-[#25156d] h-8 text-sm mt-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}