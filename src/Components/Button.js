import { useContext } from "react";
import CartContext from "./Cart-Context";
import classes from "./Button.module.css";
import { Button } from "react-bootstrap";

function ButtonDetails(props) {
  const cartCtx = useContext(CartContext);

  const buy1Handler = () => {
    cartCtx.setUpdateDetails((prevList) =>
      prevList.map((item) =>
        item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const buy2Handler = () => {
    cartCtx.setUpdateDetails((prevList) =>
      prevList.map((item) =>
        item.id === props.id ? { ...item, quantity: item.quantity + 2 } : item
      )
    );
  };

  const buy3Handler = () => {
    cartCtx.setUpdateDetails((prevList) =>
      prevList.map((item) =>
        item.id === props.id ? { ...item, quantity: item.quantity + 3 } : item
      )
    );
  };

  return (
    <div className={classes.div}>
      <Button onClick={buy1Handler}>Buy1</Button>
      <Button variant="success" onClick={buy2Handler}>
        Buy2
      </Button>
      <Button onClick={buy3Handler}>
        Buy3
      </Button>
    </div>
  );
}

export default ButtonDetails;