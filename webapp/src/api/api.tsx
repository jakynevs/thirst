export interface Drink {
  name: string;
  price: number;
}

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

export const buyDrink = async (
  drinkName: string,
  moneyGiven: number
): Promise<string> => {
  console.log("Request being made in 'buyDrink()");
  try {
    const response = await fetch("http://localhost:8000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        drinkName,
        moneyGiven,
      }),
    });

    const result = await response.json();
    console.log("result: ", result);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return result.message;
  } catch (error) {
    console.error("Error purchasing drinks:", error);
    throw error; // Re-throwing the error to handle it in the component
  }
};
