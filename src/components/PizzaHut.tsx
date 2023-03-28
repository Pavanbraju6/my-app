import React, { useState } from 'react';
type Pizza = {
    name: string;
    ingredients: string[];
    price: number;
  };
  
  type Pizzeria = {
    name: string;
    menu: Pizza[];
    location: string;
  };

type Props = {
    data: Pizzeria[];
  };
  export const PizzaHut =  ({ data }: Props) => {
    const [location, setLocation] = useState("");
    const [order, setOrder] = useState<{ [key: string]: number }>({});
  
    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLocation(event.target.value);
    };
  
    const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const pizzaName = event.target.name;
      const pizzaQuantity = parseInt(event.target.value);
      setOrder((prevOrder) => ({ ...prevOrder, [pizzaName]: pizzaQuantity }));
    };
  
    const calculateTotalPrice = () => {
      const pizzeria = data.find((p) => p.location === location);
      if (!pizzeria) return 0;
  
      const orderTotal = Object.entries(order).reduce((acc, [pizzaName, quantity]) => {
        const pizza = pizzeria.menu.find((p) => p.name === pizzaName);
        if (!pizza) return acc;
  
        const toppingsPrice = pizza.ingredients.reduce((toppingAcc, topping) => {
          if (["Cheese", "Capsicum", "Salami", "Olives"].includes(topping)) {
            return toppingAcc + 1;
          } else {
            return toppingAcc;
          }
        }, 0);
  
        return acc + pizza.price * quantity + toppingsPrice * quantity;
      }, 0);
  
      return orderTotal;
    };
  
    return (
      <div>
        <select value={location} onChange={handleLocationChange}>
          <option value="">Select a pizzeria</option>
          {data.map((pizzeria) => (
            <option key={pizzeria.location} value={pizzeria.location}>
              {pizzeria.name} ({pizzeria.location})
            </option>
            ))}
            </select>
            <h2>Menu</h2>
            {location && (
            <>
            {data.find((pizzeria) => pizzeria.location === location)?.menu.map((pizza) => (
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
// const PizzaHut: React.FC = () => {
//   return (
//     <div>
//       <h1>PizzaHut Page</h1>
//       <p>Learn more PizzaHut me!</p>
//     </div>
//   );
// };
