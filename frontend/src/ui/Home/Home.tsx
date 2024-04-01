import React from "react";
import styles from "./Home.module.css";
import DrinkPurchase from "../../features/DrinkPurchase";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <DrinkPurchase />
    </div>
  );
};

export default Home;
