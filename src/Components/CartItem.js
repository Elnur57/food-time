import { AddRounded, RemoveRounded } from '@mui/icons-material';
import React, {useState, useEffect} from 'react'
import { actionType } from "./Reducer";
import { useStateValue } from "./StateProvider";
let cartItems = [];

function CartItem({itemId, name, imgSrc, price}) {
  const [qty, setQty] = useState(1);
  const [{ cart,total}, dispatch] = useStateValue();
  const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price));
  useEffect(() => {
    cartItems = cart;
    setItemPrice(parseInt(qty) * parseFloat(price));
  }, [qty]);

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        cartItems.pop(id);
        dispatch({
          type: actionType.SET_CART,
          cart: cartItems,
        });
      } else {
        setQty(qty - 1);
        console.log(qty);
      }
    }
  };

  return (
    <div className="CartItem" id={itemId}>
        <div className="imgBox">
            <img src={imgSrc} alt=""/>
        </div>
        <div className="itemSection">
            <h2 className="itemName">{name}</h2>
            <div className="itemQuantity">
                <span>x {qty}</span>
                <div className="quantity">
                    <RemoveRounded
                      onClick={() => updateQty("remove", itemId)}
                      className="itemRemove"/>

                    <AddRounded
                      onClick={() => updateQty("add", itemId)}
                      className="itemAdd"/>
                </div>
            </div>
        </div>
        <p className="itemPrice">
        <span className="itemPriceValue">{itemPrice}</span>
        <span className="dolorSign">&#8380;</span>{" "}
       
        </p>
    </div>
  );
};

export default CartItem;
//kart mallarin elave silinmesi total
