import { useState } from 'react';
import Dropdown from '../../ui/Components/Dropdown';
import EnterMoneyField from '../../ui/Components/EnterMoneyField';

type DrinkPurchaseProps = {
    onDrinkPurchase: (message: string) => void; // Adding this line
  };

function DrinkPurchase({ onDrinkPurchase }: DrinkPurchaseProps) {
    const [selectedDrink, setSelectedDrink] = useState('');    
    const [moneyGiven, setMoneyGiven] = useState('');

    const handleBuyClick = async (e) => {
        e.preventDefault();
        console.log(`Purchasing ${selectedDrink} with ${moneyGiven}`);

        try {
            const response = await fetch('http://localhost:8000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    drinkName: selectedDrink,
                    moneyGiven: moneyGiven
                }),
            })
            
            const result = await response.json();
            if (response.ok) {
                console.log('Success', result)
                onDrinkPurchase(result.message)
                
            } else {
                console.error('HTTP error:', response.status);
                onDrinkPurchase(result.message)
                
            }
        } catch (error) {
            console.log('Network error', error)
            onDrinkPurchase('Failed to complete purchase due to a network error.');
        }
    
    };
  
    return (
      <div>
        <Dropdown selectedDrink={selectedDrink} setSelectedDrink={setSelectedDrink} />
        <EnterMoneyField moneyGiven={moneyGiven} setMoneyGiven={setMoneyGiven} />
        <button onClick={handleBuyClick}>Buy</button>
      </div>
    );
  }

  export default DrinkPurchase;

