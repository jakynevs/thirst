export interface Drink {
  name: string;
  price: number;
}

type EarningsData = {
  totalEarnings: number;
  earningsByDrink: Record<string, number>;
};

export const fetchDrinks = async (): Promise<Drink[]> => {
  try {
    const response = await fetch("http://localhost:8000/drinks");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const drinksData: Drink[] = await response.json();
    return drinksData;
  } catch (error) {
    console.error("Error fetching drinks:", error);
    throw error; // Re-throwing the error to handle it in the component
  }
};

export const fetchEarnings = async (): Promise<EarningsData | null> => {
  try {
    const response = await fetch("http://localhost:8000/earnings");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: EarningsData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching earnings data", error);
    throw error;
  }
};

export const buyDrink = async (
  drinkName: string,
  enteredMoney: number
): Promise<string> => {
  try {
    const response = await fetch("http://localhost:8000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        drinkName,
        enteredMoney,
      }),
    });

    if (!response.ok) {
      // Attempt to parse error details from the response
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Network response was not ok");
    }

    const result = await response.json();
    return result.message;
  } catch (error) {
    console.error("Error purchasing drinks:", error);
    throw error; // Re-throwing the error to handle it in the component
  }
};
