import React, { useEffect, useState } from "react";
import SunIcon from "../ui/icons/SunIcon";
import MoonIcon from "../ui/icons/MoonIcon";

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <button onClick={toggleTheme} className="">
      {isDarkMode ? <SunIcon color="#F7F7F7" /> : <MoonIcon color="#F7F7F7" />}
    </button>
  );
};

export default ThemeToggle;
