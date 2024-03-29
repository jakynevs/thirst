import styles from "./DrinkPurchase.module.css";
import { useState, useEffect } from "react";
import Dropdown from "../ui/Components/Dropdown";
import EnterMoneyField from "../ui/Components/EnterMoneyField";
import Earnings from "./Earnings";
import { buyDrink } from "../api/api";

type DrinkPurchaseProps = {
  onDrinkPurchase: (message: string) => void;
};

function DrinkPurchase({ onDrinkPurchase }: DrinkPurchaseProps) {
  const [selectedDrink, setSelectedDrink] = useState({ name: "", price: 0 });
  const [moneyGiven, setMoneyGiven] = useState("");
  const [showEarnings, setShowEarnings] = useState(false);
  const [earningsTrigger, setEarningsTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleEarningsToggle = () => {
    setShowEarnings(!showEarnings);
  };

  const handleBuyClick = async (e) => {
    e.preventDefault();

    if (isLoading) {
      onDrinkPurchase("Fetching drink...");
    }
    if (!selectedDrink.name) {
      onDrinkPurchase("Please select a drink first.");
      setIsLoading(false);
      return;
    }
    onDrinkPurchase("Fetching drink...");
    setIsLoading(true);
    const moneyGivenNumber = parseFloat(moneyGiven);

    if (moneyGivenNumber < selectedDrink.price) {
      onDrinkPurchase(
        `Insufficient funds. ${selectedDrink.name} costs $${selectedDrink.price}.`
      );
      setIsLoading(false);
      return;
    }

    try {
      const resultMessage = await buyDrink(
        selectedDrink.name,
        moneyGivenNumber
      );
      onDrinkPurchase(resultMessage);
      setEarningsTrigger((prev) => prev + 1); // Increment to trigger re-fetch
    } catch (error) {
      if (error instanceof Error) {
        onDrinkPurchase(error.message); // Display the backend error message
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <Dropdown
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          className={styles.dropdown}
        />
        <EnterMoneyField
          moneyGiven={moneyGiven}
          setMoneyGiven={setMoneyGiven}
          className={styles.moneyField}
        />
        <button className={styles.buttons} onClick={handleBuyClick}>
          Buy
        </button>
        <button className={styles.buttons} onClick={handleEarningsToggle}>
          {showEarnings ? "Hide" : "Show"} Earnings
        </button>
        <div
          className={styles.container}
          style={{ display: showEarnings ? "block" : "none" }}
        >
          <Earnings triggerFetch={earningsTrigger} />
        </div>
      </div>
    </div>
  );
}

export default DrinkPurchase;
