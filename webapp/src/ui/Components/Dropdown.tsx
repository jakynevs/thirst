import React, { useState, useEffect} from 'react';

interface Drink {
    name: string;
    price: number;
  }

function Dropdown() {
    const[drinks, setDrinks] = useState<Drink[]>([]);
    const[selectedDrink, setSelectedDrink] = useState('');

    // Handler for value change
    const handleChange = (event) => {
        setSelectedDrink(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:8000/drinks')
        .then(response => response.json())
        .then(drinksData => { 
            console.log("DrinksArray: ", drinksData)
            setDrinks(drinksData);
         })
         .catch(error => console.error('Error fetching drinks:', error));
    }, [])

    return (
        <div>
            <select value={selectedDrink} onChange={handleChange}>
                <option value="">Choose your drink</option>
                {drinks.map((drink) => (
                    <option key={drink.name} value={drink.name}>{drink.name} - ${drink.price}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;