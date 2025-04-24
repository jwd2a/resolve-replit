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

  // If user is already logged in, redirect to dashboard
  if (user) {
    if (!user.onboardingComplete) {
      return <Redirect to="/onboarding" />;
    }
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left column - Authentication forms */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center mb-8">
            <img 
              src={logoSrc} 
              alt="Resolve Logo" 
              className="h-16 w-auto" 
            />
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
              Welcome to Resolve
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              The simple way to create comprehensive parenting agreements
            </p>
          </div>

          <Tabs 
            defaultValue={authMode} 
            onValueChange={(value) => setAuthMode(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Social login buttons - displayed for both tabs */}
            <div className="mb-6 space-y-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50" 
                onClick={() => loginWithGoogle()}
                disabled={isLoading}
              >
                <FaGoogle className="text-red-500" />
                <span>Continue with Google</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50" 
                onClick={() => loginWithApple()}
                disabled={isLoading}
              >
                <FaApple className="text-black" />
                <span>Continue with Apple</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50" 
                onClick={() => loginWithFacebook()}
                disabled={isLoading}
              >
                <FaFacebook className="text-blue-600" />
                <span>Continue with Facebook</span>
              </Button>
            </div>

            <div className="relative mb-6">
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
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary hover:text-primary/90">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
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
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
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

      {/* Right column - Hero section */}
      <div className="hidden lg:block relative w-0 flex-1 bg-[#2e1a87]">
        <div className="flex flex-col h-full justify-center items-center px-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Create a Successful Parenting Plan
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl">
            Resolve helps co-parents create comprehensive, legally sound parenting agreements through guided step-by-step process and expert advice.
          </p>
          <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
            <Card className="bg-white/10 border-0 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Guided Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Our step-by-step approach ensures you cover all essential aspects of your parenting plan.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Legal Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  All plans are created with legal expertise to ensure they're valid in your jurisdiction.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">AI Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Our AI helps draft and refine your plan based on your unique family situation.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-0 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Co-Parent Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Tools for collaboration make it easy to work with your co-parent for the best outcome.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}