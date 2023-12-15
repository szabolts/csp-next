"use client";


import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme as useNextThemesTheme } from "next-themes";


export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    
    const { theme, setTheme: setNextThemesTheme } = useNextThemesTheme();
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    const handleThemeToggle = (isChecked: boolean) => {
      const newTheme = isChecked ? 'light' : 'dark';
      setNextThemesTheme(newTheme);
    }
  
    if (!mounted) return null;
  
    return (
      <div>
        <Switch
          defaultSelected={theme === 'light'}
          size="md"
          color="success"
          onChange={(event) => {
            if (event.target instanceof HTMLInputElement) {
              handleThemeToggle(event.target.checked);
            }
          }}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <MdLightMode className={className} />
            ) : (
              <MdDarkMode className={className} />
            )
          }
        >
          
        </Switch>
      </div>
    );
  }