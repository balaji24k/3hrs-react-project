import './App.css';
import { useState } from "react";
import CartDetails from "./Components/Cart";
import ChoclateDetails from "./Components/ProductDetails";
import CartContext from "./Components/Cart-Context";
import { Card } from "react-bootstrap";
import ButtonDetails from './Components/Button';

const App = () => {
  const [updateDetails, setUpdateDetails] = useState([]);

  const addhandler = (name, des, price) => {
    setUpdateDetails((prevList) => {
      return [
        ...prevList,
        {
          candyName: name,
          description: des,
          price: price,
          id: Math.random().toString(),
        },
      ];
    });
  };
  return (
    <CartContext.Provider value={{ updateDetails, setUpdateDetails }}>
      <CartDetails />
      <ChoclateDetails onAdd={addhandler} />
      {updateDetails.map((user) => {
        return (
          <Card className="text-left">
            <Card.Title key={user.id}>
              <li>{user.candyName}</li>
            </Card.Title>
            <Card.Body>
              <h6>Description:{user.description}</h6>
              <h6>Rs {user.price}.00 </h6>
              <ButtonDetails />
            </Card.Body>
          </Card>
        );
      })}
    </CartContext.Provider>
  );
}

export default App;
