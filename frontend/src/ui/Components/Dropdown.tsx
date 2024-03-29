import React, { useState, useEffect } from "react";
import { fetchDrinks, Drink } from "../../api/api";
import styles from "../../features/DrinkPurchase.module.css";

interface DropdownProps {
  selectedDrink: Drink;
  setSelectedDrink: (drink: Drink) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedDrink,
  setSelectedDrink,
}) => {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  const handleChange = (event) => {
    const selectedOption = drinks.find(
      (drink) => drink.name === event.target.value
    );
    if (selectedOption) {
      setSelectedDrink(selectedOption);
    } else {
      setSelectedDrink({ name: "", price: 0 }); // Reset or handle as necessary
    }
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
    <div className={styles.dropdown}>
      <select value={selectedDrink.name} onChange={handleChange}>
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

export default Dropdown;
