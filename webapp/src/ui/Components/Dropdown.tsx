import React, { useState, useEffect} from 'react';

interface Drink {
    name: string;
    price: Float32Array;
  }

function Dropdown() {
    const[drinks, setDrinks] = useState<Drink[]>([]);
    const[selectedDrink, setSelectedDrink] = useState('');

    // Handler for value change
    const handleChange = (event) => {
        setSelectedDrink(event.target.value);
    };

    useEffect(() => {
        console.log("Fetching drinks data");

        fetch('http://localhost:8000/drinks')
        .then(response => response.json())
        .then(drinksData => {
            const drinksArray: Drink[] = Object.keys(drinksData).map(key => ({
                name: key,
                price: drinksData[key]
            }))
            console.log("DrinksArray: ", drinksArray)
            setDrinks(drinksArray);
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