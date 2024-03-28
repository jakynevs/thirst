import { useState } from "react";
import Dropdown from "../ui/Components/Dropdown";
import EnterMoneyField from "../ui/Components/EnterMoneyField";
import Earnings from "./Earnings";

type DrinkPurchaseProps = {
  onDrinkPurchase: (message: string) => void;
};

function DrinkPurchase({ onDrinkPurchase }: DrinkPurchaseProps) {
  const [selectedDrink, setSelectedDrink] = useState("");
  const [moneyGiven, setMoneyGiven] = useState("");
  const [showEarnings, setShowEarnings] = useState(false);
  const [earningsTrigger, setEarningsTrigger] = useState(0);

  const handleEarningsToggle = () => {
    setShowEarnings(!showEarnings);
  };

  // Function to increment triggerFetch
  const handleFetchEarnings = () => {
    setEarningsTrigger((prev) => prev + 1);
  };

  const handleBuyClick = async (e) => {
    e.preventDefault();
    if (!selectedDrink) {
      onDrinkPurchase("Please select a drink first.");
    } else {
      console.log(`Purchasing ${selectedDrink} with ${moneyGiven}`);
      try {
        const response = await fetch("http://localhost:8000/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drinkName: selectedDrink,
            moneyGiven: moneyGiven,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Success", result);
          onDrinkPurchase(result.message);
          handleFetchEarnings();
        } else {
          console.error("HTTP error:", response.status);
          onDrinkPurchase(result.message);
        }
      } catch (error) {
        console.log("Network error", error);
        onDrinkPurchase("Failed to complete purchase due to a network error.");
      }
    }
  };

  return (
    <div>
      <Dropdown
        selectedDrink={selectedDrink}
        setSelectedDrink={setSelectedDrink}
      />
      <EnterMoneyField moneyGiven={moneyGiven} setMoneyGiven={setMoneyGiven} />
      <button onClick={handleBuyClick}>Buy</button>
      <button onClick={handleEarningsToggle}>
        {showEarnings ? "Hide" : "Show"} Earnings
      </button>
      <div style={{ display: showEarnings ? "block" : "none" }}>
        <Earnings triggerFetch={earningsTrigger} />
      </div>
    </div>
  );
}

export default DrinkPurchase;
