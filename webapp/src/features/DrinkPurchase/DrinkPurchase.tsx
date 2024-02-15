import { useState } from 'react';
import Dropdown from '../../ui/Components/Dropdown';
import EnterMoneyField from '../../ui/Components/EnterMoneyField';
  
function DrinkPurchase() {
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
            
            if (response.ok) {
                const result = await response.json()
                console.log('Success', result)
            } else {
                console.error('HTTP error:', response.status);
            }
        } catch (error) {
            console.log('Network error', error)
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
  