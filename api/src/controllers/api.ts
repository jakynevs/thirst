import { Application, Request, Response } from 'express';
import path from 'path';

const fs = require('fs');

const dataFilePath = 'data.json';
// Read data from the JSON file
const readDataFromFile = (dataFilePath: string) => {

    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      const cleanData = JSON.parse(data);
      return cleanData;
    
    } catch (err) {
          // Handle file read error or JSON parse error
          const error = err as Error;
          console.error('Error reading data:', error.message);
          return null;
    }
  };

function updateEarnings(drinkName: string, price: number) {
    const data = readDataFromFile(dataFilePath)
    data.earnings.totalEarnings += price
    
    data.earnings.earningsByDrink[drinkName] += price

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export const loadEndpoints = (app: Application): void => {

    app.get("/ping", (req: Request, res: Response) => {
        return res.status(200).send('pong')
    });
    
    app.get("/drinks", (req: Request, res: Response) => {
        const data = readDataFromFile(dataFilePath);
        const drinks = data.drinkType
        if (drinks) {
            return res.status(200).json(drinks);
        } else {
            return res.status(500).json({ error: 'Error fetching drinks data' })
        }
    });
    
    app.get("/earnings", (req: Request, res: Response) => {
        const data = readDataFromFile(dataFilePath);
        const earnings = data.earnings
        if (earnings) {
            return res.status(200).json(earnings);
        } else {
            return res.status(500).json({ error: 'Error fetching earnings data' })
        }
    });
    
    app.post("/order", (req: Request, res: Response) => {
        const { drinkName, moneyGiven } = req.body;        
        const data = readDataFromFile(dataFilePath);        
        const drinkMenu = data.drinkType
        const drinkOnMenu = drinkMenu.some((drink) => drink.name === drinkName)
        
        if (!drinkOnMenu) {
            return res.status(404).json({ message: 'Drink not available' })
        }

        const drinkPrice = drinkMenu.find((drink) => drink.name === drinkName).price;
        const selectedDrink = drinkMenu.find((drink) => drink.name === drinkName).name;
        
        if (moneyGiven < drinkPrice) {
            return res.status(400).json({ message: `Insufficient funds. ${drinkName} costs $${drinkPrice}.` })
        }
        const change = moneyGiven - drinkPrice
        updateEarnings(selectedDrink, drinkPrice)
        
        return res.status(200).json({ message: `Successful order - here is your ${drinkName} and your change is ${change.toFixed(2)}. \nFeel free to order something else...`});
    });
};  