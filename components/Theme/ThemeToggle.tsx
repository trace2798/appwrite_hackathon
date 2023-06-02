"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Icons } from "../../components/Icons";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";

// A function component that renders a theme toggle button and menu
export function ThemeToggle() {
  // Destructure the setTheme function from the useTheme hook
  const { setTheme } = useTheme();

  return (
    // Use the DropdownMenu component to render a dropdown menu with the given props
    <DropdownMenu>
      {/* Use the DropdownMenuTrigger component to render a button that triggers
      the menu */}
      <DropdownMenuTrigger asChild>
        {/* Use the Button component to render a button with the given props and */}
        styles
        <Button variant="ghost" size="sm">
          {/* Use the Icons.Sun component to render a sun icon for the light
          theme */}
          <Icons.Sun className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100" />
          {/* Use the Icons.Moon component to render a moon icon for the dark
          theme with absolute positioning */}
          <Icons.Moon className="absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100" />
          {/* Render a span element that contains a text for screen readers only */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Use the DropdownMenuContent component to render the menu content with
      the given props and styles */}
      <DropdownMenuContent align="end" forceMount>
        {/* Use the DropdownMenuItem component to render a menu item for
        switching to light theme */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {/* Use the Icons.Sun component to render a sun icon for the menu item */}
          <Icons.Sun className="mr-2 h-4 w-4" />
          {/* Render a span element that contains the text "Light" for the menu
          item */}
          <span>Light</span>
        </DropdownMenuItem>
        {/* Use the DropdownMenuItem component to render a menu item for
        switching to dark theme */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {/* Use the Icons.Moon component to render a moon icon for the menu
          item */}
          <Icons.Moon className="mr-2 h-4 w-4" />
          {/* Render a span element that contains the text "Dark" for the menu
          item */}
          <span>Dark</span>
        </DropdownMenuItem>
        {/* Use the DropdownMenuItem component to render a menu item for
        switching to system theme */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {/* Use the Icons.Laptop component to render a laptop icon for the menu
          item */}
          <Icons.Laptop className="mr-2 h-4 w-4" />
          {/* Render a span element that contains the text "System" for the menu
          item */}
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
