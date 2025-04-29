import { useState } from "react";
import { Link } from "wouter";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function BetaAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate login
    console.log("Logging in with email:", email);
    toast({
      title: "Login success",
      description: "Welcome to the beta test!",
    });
    window.location.href = "/onboarding2";
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate registration
    console.log("Registering with email:", email);
    toast({
      title: "Registration success",
      description: "Account created! You can now log in.",
    });
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    toast({
      title: `${provider} sign-in`,
      description: "Redirecting to authentication provider...",
    });

    // For beta testing, just go straight to onboarding
    setTimeout(() => {
      window.location.href = "/onboarding2";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e1a87] to-[#4730b8] relative">
      {/* Left side beta tester note */}
      <div style={{
        position: 'absolute',
        top: '120px',
        left: '50px',
        maxWidth: '300px',
        fontFamily: 'Caveat, cursive',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: 'white',
        transform: 'rotate(-5deg)',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        zIndex: 20
      }}>
        Thanks for taking the time to help us with beta testing.
      </div>
      
      {/* Right side beta tester note */}
      <div style={{
        position: 'absolute',
        top: '250px',
        right: '50px',
        maxWidth: '300px',
        fontFamily: 'Caveat, cursive',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: 'white',
        transform: 'rotate(3deg)',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        zIndex: 20
      }}>
        Please go through the setup just as a couple would. One parent starts the process and invites the other.
      </div>
      
      {/* Login form */}
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-bold">Welcome to Resolve</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              A new path forward for you and your child(ren)
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-blue-600 hover:underline">
                        Forgot?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#2e1a87]">
                    Log in
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#2e1a87]">
                    Register
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialSignIn('Google')}
                >
                  <FaGoogle className="h-4 w-4 text-red-500" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialSignIn('Apple')}
                >
                  <FaApple className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialSignIn('Facebook')}
                >
                  <FaFacebook className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}