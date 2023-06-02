"use client";
import { ThemeProvider } from "next-themes";
import type { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

// Defining a function component that renders a theme provider with the given props
const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    // Use the ThemeProvider component to enable theme switching and system preference detection
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Render the children elements passed as props inside the theme provider */}
      {children}
    </ThemeProvider>
  );
};

export default Providers;
