import React, { useEffect, useState } from "react";
import { fetchEarnings } from "../api/api";
import styles from "./Earnings.module.css";

// Add props type for Earnings
interface EarningsProps {
  refreshIndicator: number;
  // Add other props as needed
  className?: string; // This line should be added to include className as an optional prop
}
interface EarningsState {
  totalEarnings: number;
  earningsByDrink: Record<string, number>;
}

const Earnings: React.FC<EarningsProps> = ({ refreshIndicator }) => {
  // Updating the earnings state to have a more specific type
  const [earnings, setEarnings] = useState<EarningsState | null>(null);

  // Fetching on component mount
  useEffect(() => {
    fetchEarnings()
      .then(setEarnings) // Assuming the API always returns the current earnings
      .catch((error) => console.error("Error in fetchEarnings:", error));
  }, []); // Empty dependency array ensures this only runs once on mount

  // Refetch earnings when triggerFetch changes, except on initial mount.
  useEffect(() => {
    if (refreshIndicator === 0) return; // Skip the initial mount

    let isMounted = true;

    fetchEarnings()
      .then((data) => {
        if (isMounted && data) {
          setEarnings((prevEarnings) => {
            if (
              !prevEarnings ||
              prevEarnings.totalEarnings !== data.totalEarnings ||
              JSON.stringify(prevEarnings.earningsByDrink) !==
                JSON.stringify(data.earningsByDrink)
            ) {
              return data;
            }
            return prevEarnings;
          });
        }
      })
      .catch((error) => console.error("Error in fetchEarnings:", error));

    return () => {
      isMounted = false;
    };
  }, [refreshIndicator]);

  return (
    <div className={styles.earningsContainer}>
      <h3>
        Earnings: ${earnings ? earnings.totalEarnings.toFixed(2) : "Loading..."}
      </h3>
      <div>
        {earnings ? (
          <ul className={styles.earningsList}>
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
