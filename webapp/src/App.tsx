import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./ui/Header";
import styles from './App.module.css';
import Home from "./ui/Home/Home";

function App() {
    return (
        <Router>
            <div className={styles.App}>
                <Header />
                <Home />
            </div>
        </Router>
    )
}

export default App;
