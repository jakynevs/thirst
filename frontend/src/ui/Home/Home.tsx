import React, { useState } from "react";
import styles from "./Home.module.css";
import DrinkPurchase from "../../features/DrinkPurchase";

type homeProps = {
  onDrinkPurchase: (text: string) => void;
};

const Home: React.FC<homeProps> = ({ onDrinkPurchase }) => {
  const [moneyGiven, setMoneyGiven] = useState("");

  return (
    <div className={styles.home}>
      <DrinkPurchase onDrinkPurchase={onDrinkPurchase} />
    </div>
  );
};

export default Home;
