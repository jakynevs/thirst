import React, { useState, useEffect } from "react";
import { fetchDrinks, Drink } from "../../api/api";
import styles from "../../features/DrinkPurchase.module.css";

interface DrinkSelectorProps {
  selectedDrink: Drink;
  setSelectedDrink: (drink: Drink) => void;
  className?: string;
}

const DrinkSelector: React.FC<DrinkSelectorProps> = ({
  selectedDrink,
  setSelectedDrink,
}) => {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = drinks.find(
      (drink) => drink.name === e.target.value
    );
    setSelectedDrink(selectedOption || { name: "", price: 0 });
  };

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const drinksData = await fetchDrinks();
        setDrinks(drinksData);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    getDrinks();
  }, []);

  return (
    <div className={styles.DrinkSelector}>
      <select
        value={selectedDrink.name}
        onChange={handleChange}
        aria-label="Select a drink"
      >
        <option value="">Choose your drink</option>
        {drinks.map((drink) => (
          <option key={drink.name} value={drink.name}>
            {drink.name} - ${drink.price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DrinkSelector;
