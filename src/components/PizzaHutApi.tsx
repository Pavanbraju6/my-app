import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pizza {
  name: string;
  ingredients: string[];
  price: number;
}

interface Pizzeria {
  name: string;
  location: string;
  menu: Pizza[];
}

interface Data {
  pizzerias: Pizzeria[];
}
const PizzaHutApi: React.FC = () => {
    const [data, setData] = useState<Data | null>(null);
    const [location, setLocation] = useState<string>("");
    const [order, setOrder] = useState<Record<string, number>>({});
  
    useEffect(() => {
      axios.get<Data>("https://localhost:7267/api/pizzas").then((response) => setData(response.data));
    }, []);
  
    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLocation(event.target.value);
    };
  
    const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = parseInt(event.target.value);
      setOrder({ ...order, [name]: value });
    };
  
    const calculateTotalPrice = (): number => {
      if (!location || !data) {
        return 0;
      }
  
      const pizzeria = data.pizzerias.find((pizzeria) => pizzeria.location === location);
  
      if (!pizzeria) {
        return 0;
      }
  
      return Object.entries(order).reduce(
        (totalPrice, [name, quantity]) =>
          totalPrice + quantity * (pizzeria.menu.find((pizza) => pizza.name === name)?.price ?? 0),
        0
      );
    };
  
    return (
      <div>
        <h1>Pizza Order</h1>
        <select value={location} onChange={handleLocationChange}>
          <option value="">Select a pizzeria</option>
          {data?.pizzerias.map((pizzeria) => (
            <option key={pizzeria.location} value={pizzeria.location}>
              {pizzeria.name} ({pizzeria.location})
            </option>
          ))}
        </select>
        <h2>Menu</h2>
        {location && (
          <>
            {data?.pizzerias.find((pizzeria) => pizzeria.location === location)?.menu.map((pizza) => (
              <div key={pizza.name}>
                <h3>{pizza.name}</h3>
                <p>Ingredients: {pizza.ingredients.join(", ")}</p>
                <p>Price: ${pizza.price}</p>
                <input
                  type="number"
                  name={pizza.name}
                  min="0"
                  step="1"
                  value={order[pizza.name] ?? 0}
                  onChange={handleOrderChange}
                />
              </div>
            ))}
            <h2>Total Price: ${calculateTotalPrice()}</h2>
          </>
        )}
      </div>
    );
  };
export default PizzaHutApi;