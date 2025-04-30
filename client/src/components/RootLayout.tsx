import React from "react";
import { NavigationMenu } from "@/components/NavigationMenu";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f9f7fe] flex flex-col">
      <NavigationMenu />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}