interface Drink {
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
