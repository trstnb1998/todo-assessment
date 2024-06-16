import { signIn } from "@/store.ts";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import Todos from "@/Todos.tsx";

import "./App.css";

function App() {
  useEffect(() => {
    signIn();
  }, []);

  return (
    <ThemeProvider defaultTheme={`dark`} storageKey={`ui-theme`}>
      <Todos />
    </ThemeProvider>
  );
}

export default App;
