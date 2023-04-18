import { useContext, useState } from "react";
import {
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import CartContext from "./Cart-Context";
import classes from "./ProductDetails.module.css";

const ChoclateDetails = (props) => {
  const CartCntx=useContext(CartContext)
  
  const [candyName, setCandyName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const CandyHandler = (event) => {
    setCandyName(event.target.value);
  };

  const DescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const PriceHandler = (event) => {
    setPrice(event.target.value);
  };

  const SubmitHandler=(e)=>{
    e.preventDefault(); 
    const ItemList = {
        candyName,
        description,
        price,
        quantity: 1,
    };

    let CurrentItem = false;
    const ModifiedCart = CartCntx.updateDetails.map((item) => {
      if (item.candyName===ItemList.candyName) {
        item.quantity+=1;
        CurrentItem = true;
        const Email = true;
        const userEmail = Email ? "balajigmailcom":"viratgmailcom";

          fetch(
            `https://crudcrud.com/api/4e4ecece10704df59666161388bfde10/${userEmail}/${item._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                quantity: item.quantity,
              }),
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to update item in cart");
              }
            })
            .catch((error) => console.error(error));
      }
      return item;
    });
    if (!CurrentItem) {
      ModifiedCart.push(ItemList);

      const Email = true;
      const userEmail = Email ? "balajigmailcom":"viratgmailcom";
    fetch(
      `https://crudcrud.com/api/4e4ecece10704df59666161388bfde10/${userEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ItemList),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item to cart");
        }
      })
      .catch((error) => console.error(error));
    }

        CartCntx.setUpdateDetails(ModifiedCart);
        setCandyName("");
        setDescription("");
        setPrice("");
      }

  return (
    <Card>
      <Card.Body className={classes.label}>
        <Form   onSubmit={SubmitHandler}>
          <Row>
            <Col>
              <FormGroup className="mb-3 ">
                <FormLabel style={{color:"white" }}>CandyName</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Candy"
                  onChange={CandyHandler}
                  value={candyName}
                 required 
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mb-3">
                <FormLabel style={{color:"white" }}>Description</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Description"
                  onChange={DescriptionHandler}
                  value={description} required 
                />
              </FormGroup>
            </Col>
            <Col>
              {" "}
              <FormGroup className="mb-3">
                <FormLabel style={{color:"white" }}>Price</FormLabel>
                <FormControl
                  type="number"
                  placeholder="price"
                  onChange={PriceHandler}
                  value={price} required 
                />
              </FormGroup>
            </Col>
          </Row>
          <div>
            <Button type="submit" className="btn-dark btn-outline-success">
              Add Candy
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default ChoclateDetails;