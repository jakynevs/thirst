import React, { useEffect, useState } from "react";

// Add props type for Earnings
type EarningsProps = {
    triggerFetch: number;
  };
  
const Earnings: React.FC<EarningsProps> = ({triggerFetch}) => {
    // Updating the earnings state to have a more specific type
    const [earnings, setEarnings] = useState<{
        totalEarnings: number;
        earningsByDrink: Record<string, number>;
    } | null>(null);
    
    const fetchEarnings = async () => {
        try {
            const response = await fetch('http://localhost:8000/earnings')
            if (!response.ok) {
                throw new Error('Network reponse was not ok')
            }
            const data = await response.json()
            setEarnings(data)
        } catch(error) {
            console.error('Error fetching earnings data', error)
        }
    }
    
    useEffect(() => {
        console.log("Test")
        fetchEarnings();
    }, [triggerFetch])

    return (
    <div>
        <h3>
            Earnings: ${earnings ? earnings.totalEarnings.toFixed(2) : "Loading..."}
        </h3>
        <div>
            {earnings ? (
                <ul>
                    {Object.entries(earnings.earningsByDrink).map(([drink, amount]) =>
                    <li key={drink}>{drink}: ${amount.toFixed(2)}</li>)}
                </ul>
            ) : (
                    <p>Loading earnings by drink...</p>
                )}
        </div>
    </div>
    )
}

export default Earnings 
