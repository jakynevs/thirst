import { BrowserRouter as Router } from "react-router-dom";
import { useCallback, useState } from "react";
import { Header } from "./ui/Header";
import styles from "./App.module.css";
import Home from "./ui/Home/Home";

function App() {
  const [headerText, setHeaderText] = useState(
    "Please choose a drink and enter money"
  );

  const updateHeaderText = useCallback((newText: string) => {
    setHeaderText(newText);
  }, []);

  return (
    <Router>
      <div className={styles.App}>
        <Header text={headerText} />
        <Home onDrinkPurchase={updateHeaderText} />
      </div>
    </Router>
  );
}

export default App;
