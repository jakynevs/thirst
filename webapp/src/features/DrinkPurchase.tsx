import { useState } from "react";
import Dropdown from "../ui/Components/Dropdown";
import EnterMoneyField from "../ui/Components/EnterMoneyField";
import Earnings from "./Earnings";
import { buyDrink } from "../api/api";

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
      return;
    }
    const moneyGivenNumber = parseFloat(moneyGiven);

    console.log(`Purchasing ${selectedDrink} with ${moneyGiven}`);
    try {
      const resultMessage = await buyDrink(selectedDrink, moneyGivenNumber);
      onDrinkPurchase(resultMessage);
      handleFetchEarnings();
    } catch (error) {
      console.log("Network error", error);
      onDrinkPurchase("Failed to complete purchase due to a network error.");
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
