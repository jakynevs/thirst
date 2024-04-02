import { Application, Request, Response } from 'express';
import fs from 'fs'

const dataFilePath = process.env.DATA_FILE_PATH || 'data.json';

interface Drink {
  name: string;
  price: number;
}

interface DataStructure {
  earnings: {
    totalEarnings: number;
    earningsByDrink: Record<string, number>;
  };
  drinkType: Drink[];
}

let cachedData: DataStructure | null = null;



// Read data from the JSON file
const readDataFromFile = () => {
    if (!cachedData) {
        try {
            const data = fs.readFileSync(dataFilePath, 'utf8');
            try {
                cachedData = JSON.parse(data);
            } catch (jsonError) {
                console.error('Error parsing JSON data:', jsonError);
                cachedData = null;
            }
        } catch (err) {
            const error = err as Error;
            console.error('Error reading data from file:', error.message);
            cachedData = null;
        } 
    } 
    return cachedData;
};


function updateEarnings(drinkName: string, price: number) {
    const data = readDataFromFile()
    if (!data) {
        console.error("No data available to update earnings.");
        return; // Early exit if data is null
    }
    
    try {
        if (!data.earnings.earningsByDrink[drinkName]) {
            data.earnings.earningsByDrink[drinkName] = 0;
            }

        data.earnings.totalEarnings += price
        data.earnings.earningsByDrink[drinkName] += price

        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        cachedData = data
    } catch (err) {
        // Handle file read error or JSON parse error
        const error = err as Error;
        console.error('Error writing earnings data:', error.message);
    }
}

export const loadEndpoints = (app: Application): void => {

    app.get("/ping", (req: Request, res: Response) => {
        return res.status(200).send('pong')
    });
    
    app.get("/drinks", (req: Request, res: Response) => {
        const data = readDataFromFile();
        if (!data) {
            console.error("No data available to get drinks.");
            return res.status(500).json({ error: 'Error fetching drinks data' }); // Immediate return
        }
        const drinks = data.drinkType
        return res.status(200).json(drinks);
    });
    
    app.get("/earnings", (req: Request, res: Response) => {
        const data = readDataFromFile();
        if (!data) {
            console.error("No data available to get earnings.");
            return res.status(500).json({ error: 'Error fetching earnings data' }); // Immediate return
        }
        const earnings = data.earnings
        return res.status(200).json(earnings);
    });
    
    app.post("/order", (req: Request, res: Response) => {
        const { drinkName, enteredMoney } = req.body;   
        const data = readDataFromFile();       
        if (!data) {
            console.error("No data available to make order.");
        return res.status(500).json({ error: 'Error fetching drinks data' }); // Immediate return

    } 
        const drinkMenu = data.drinkType

        const selectedDrink = drinkMenu.find((drink) => drink.name === drinkName);
        if (!selectedDrink) {
             return res.status(404).json({ message: 'Drink not available' });
        }
        const { name, price } = selectedDrink;

        
        if (enteredMoney < price) {
            return res.status(400).json({ message: `Insufficient funds. ${drinkName} costs $${price}.` })
        }
        const change = enteredMoney - price
        updateEarnings(name, price)
        
        return res.status(200).json({ message: `Successful order!\nDrink: ${drinkName} - Change: ${change.toFixed(2)} \nFeel free to order something else...`});
    });
};  