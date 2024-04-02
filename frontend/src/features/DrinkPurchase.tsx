import styles from "./DrinkPurchase.module.css";
import { useState } from "react";
import DrinkSelector from "../ui/Components/DrinkSelector";
import EnterMoneyField from "../ui/Components/EnterMoneyField";
import Earnings from "./Earnings";
import { buyDrink } from "../api/api";
import { TransactionMessage } from "./TransactionMessage";

function DrinkPurchase() {
  const [selectedDrink, setSelectedDrink] = useState({ name: "", price: 0 });
  const [enteredMoney, setenteredMoney] = useState("");
  const [showEarnings, setShowEarnings] = useState(false);
  const [earningsRefreshCount, setEarningsRefreshCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionMessageText, setTransactionMessageText] = useState(
    "Please choose a drink and enter money"
  );

  const toggleEarningsVisibility = () => {
    setShowEarnings(!showEarnings);
  };

  const updateTransactionMessage = (newText: string) => {
    setTransactionMessageText(newText);
  };

  const handleBuyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Early exit if already processing another purchase
    if (isLoading) return;

    setIsLoading(true); // Set loading state at the beginning

    if (!selectedDrink.name) {
      updateTransactionMessage("Please select a drink first.");
    } else {
      const moneyGivenNumber = parseFloat(enteredMoney);
      if (moneyGivenNumber < selectedDrink.price) {
        updateTransactionMessage(
          `Insufficient funds. ${
            selectedDrink.name
          } costs $${selectedDrink.price.toFixed(2)}.`
        );
      } else {
        try {
          const resultMessage = await buyDrink(
            selectedDrink.name,
            moneyGivenNumber
          );
          updateTransactionMessage(resultMessage);
          setEarningsRefreshCount((prev) => prev + 1); // Increment to trigger re-fetch of earnings
        } catch (error) {
          updateTransactionMessage(
            error instanceof Error ? error.message : "An error occurred"
          );
        }
      }
    }

    setIsLoading(false); // Reset loading state at the end, regardless of the outcome
  };

  return (
    <div className={styles.container}>
      <TransactionMessage text={transactionMessageText} />
      <DrinkSelector
        selectedDrink={selectedDrink}
        setSelectedDrink={setSelectedDrink}
        className={styles.drinkSelector}
      />
      <EnterMoneyField
        enteredMoney={enteredMoney}
        setenteredMoney={setenteredMoney}
        className={styles.moneyField} // Make sure this matches the CSS class name
      />
      <div className={styles.buttonContainer}>
        <button onClick={handleBuyClick} className={styles.buyButton}>
          Buy
        </button>
        <button
          onClick={toggleEarningsVisibility}
          className={styles.toggleEarningsButton}
        >
          {showEarnings ? "Hide" : "Show"} Earnings
        </button>
      </div>
      <div style={{ display: showEarnings ? "block" : "none" }}>
        <Earnings refreshIndicator={earningsRefreshCount} />
      </div>
    </div>
  );
}

export default DrinkPurchase;
