import { useContext } from "react";
import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");
  function toggleMode() {
    setDarkMode((mode) => !mode);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const data = useContext(DarkModeContext);
  if (!data) throw new Error("You are outside the Dark mode context");
  return data;
}

export { DarkModeProvider, useDarkMode };
