import { Application, Request, Response } from 'express';
import fs from 'fs'

const dataFilePath = 'data.json';
let cachedData: any = null;

// Read data from the JSON file
const readDataFromFile = () => {
    if (!cachedData) {
        try {
          const data = fs.readFileSync(dataFilePath, 'utf8');
          cachedData = JSON.parse(data);
        } catch (err) {
            // Handle file read error or JSON parse error
            const error = err as Error;
            console.error('Error reading data:', error.message);
            cachedData = null;
        } 
        } else {
    }; // This should log on subsequent requests
    return cachedData
  };

function updateEarnings(drinkName: string, price: number) {
    const data = readDataFromFile()
    if (!data) return
    
    data.earnings.totalEarnings += price
    data.earnings.earningsByDrink[drinkName] += price

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    cachedData = data
}

export const loadEndpoints = (app: Application): void => {

    app.get("/ping", (req: Request, res: Response) => {
        return res.status(200).send('pong')
    });
    
    app.get("/drinks", (req: Request, res: Response) => {
        const data = readDataFromFile();
        const drinks = data.drinkType
        if (drinks) {
            return res.status(200).json(drinks);
        } else {
            return res.status(500).json({ error: 'Error fetching drinks data' })
        }
    });
    
    app.get("/earnings", (req: Request, res: Response) => {
        const data = readDataFromFile();
        const earnings = data.earnings
        if (earnings) {
            return res.status(200).json(earnings);
        } else {
            return res.status(500).json({ error: 'Error fetching earnings data' })
        }
    });
    
    app.post("/order", (req: Request, res: Response) => {
        const { drinkName, moneyGiven } = req.body;        
        const data = readDataFromFile();        
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
        
        return res.status(200).json({ message: `Successful order!\nDrink: ${drinkName} - Change: ${change.toFixed(2)} \nFeel free to order something else...`});
    });
};  