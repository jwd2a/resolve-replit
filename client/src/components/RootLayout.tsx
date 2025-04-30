import React from "react";
import { NavigationMenu } from "@/components/NavigationMenu";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <NavigationMenu />
      <main>{children}</main>
    </>
  );
}