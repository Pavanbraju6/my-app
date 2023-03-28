import React from 'react';
import { BrowserRouter as Router,  } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { PizzaHut } from './components/PizzaHut';
import PizzaHutApi from './components/PizzaHutApi';


//mock data start 
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
  
  const mockData: Pizzeria[] = [
    {
      name: "Preston Pizzeria",
      location: "Preston",
      menu: [
        {
          name: "Capricciosa",
          ingredients: ["Cheese", "Ham", "Mushrooms", "Olives"],
          price: 20,
        },
        {
          name: "Mexicana",
          ingredients: ["Cheese", "Salami", "Capsicum", "Chilli"],
          price: 18,
        },
        {
          name: "Margherita",
          ingredients: ["Cheese", "Spinach", "Ricotta", "Cherry Tomatoes"],
          price: 22,
        },
      ],
    },
    {
      name: "Southbank Pizzeria",
      location: "Southbank",
      menu: [
        {
          name: "Capricciosa",
          ingredients: ["Cheese", "Ham", "Mushrooms", "Olives"],
          price: 25,
        },
        {
          name: "Vegetarian",
          ingredients: ["Cheese", "Mushrooms", "Capsicum", "Onion", "Olives"],
          price: 17,
        },
      ],
    },
  ];
  
//mock data end 

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/PizzaHut' element={<PizzaHut    data={mockData} />} />
      <Route path='/PizzaHutApi' element={<PizzaHutApi/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
