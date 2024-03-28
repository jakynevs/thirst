import React, { useEffect, useState } from "react";
import { fetchEarnings } from "../api/api";
// Add props type for Earnings
type EarningsProps = {
  triggerFetch: number;
};

const Earnings: React.FC<EarningsProps> = ({ triggerFetch }) => {
  // Updating the earnings state to have a more specific type
  const [earnings, setEarnings] = useState<{
    totalEarnings: number;
    earningsByDrink: Record<string, number>;
  } | null>(null);

  useEffect(() => {
    fetchEarnings().then((data) => {
      if (data) {
        setEarnings(data);
      }
    });
  }, [triggerFetch]);

  return (
    <div>
      <h3>
        Earnings: ${earnings ? earnings.totalEarnings.toFixed(2) : "Loading..."}
      </h3>
      <div>
        {earnings ? (
          <ul>
            {Object.entries(earnings.earningsByDrink).map(([drink, amount]) => (
              <li key={drink}>
                {drink}: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading earnings by drink...</p>
        )}
      </div>
    </div>
  );
};

export default Earnings;
