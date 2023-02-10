import './App.css';
import Header from './Components/Header';
import MenuContainer from './Components/MenuContainer';
import {
  AccountBalanceWalletRounded,
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  SummarizeRounded,
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import BannerName from './Components/BannerName';
import SubMenuContainer from './Components/SubMenuContainer';
import MenuCard from './Components/MenuCard';
import {MenuItems,Items} from "./Components/Data";
import ItemCard from './Components/ItemCard';
import DebitCard from './Components/DebitCard';
import CartItem from './Components/CartItem';
import { useStateValue } from "./Components/StateProvider";

function App() {
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId == "buger01")
  );
  const [{ cart, total }, dispatch] = useStateValue();
  const [totalPrice, setTotalPrice] = useState(0);
  

   useEffect(() =>{
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    //1 menu card aktiv elemek
    const menuCard = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenuCard");

      function setMenuCardActive() {
        menuCard.forEach((n) => n.classList.remove("active"));
        this.classList.add("active");
      }
      menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));
   }, [isMainData, cart, total, totalPrice]);
   const setData = (itemId) => {
    setMainData(Items.filter((element) => element.itemId == itemId));
  };
  return (
    <div className="App">
      {/* bura en ust hissedir,logo,serach,sebet,profil */}
      <Header/>
      
         {/*bura asagi button knopkalaridi*/}
      <div className="leftMenu">
        <ul id="menu">
          <MenuContainer link={'#'} icon = {<HomeRounded/>} isHome/>
          <MenuContainer link = {'#'} icon = {<Chat />}  />
          <MenuContainer link = {'#'} icon = {<AccountBalanceWalletRounded />}  />
          <MenuContainer link = {'#'} icon = {<Favorite />} />
          <MenuContainer link = {'#'} icon = {<SummarizeRounded />}  />
          <MenuContainer link = {'#'} icon = {<Settings />}  />
          <div className="indicator"></div>
        </ul>
      </div>

      {/* bura endirim hissesi */}
      <main>
        <div className="mainContainer">
          {/* Banner  */}
          <div className="banner">
            <BannerName name={"Elnur"} discount={"20"} more={"#"}/>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
              alt=""
              className="deliveryPic"
            />
          </div>
        
            {/*menu kateqori */}
          <div className="dishContainer">
            <div className="menuCard">
              <SubMenuContainer/>
            </div>
            <div className="rowContainer">
               {MenuItems &&
                 MenuItems.map((data) => (
                  <div key={data.id} onClick={() => setData(data.itemId)} >
                    <MenuCard
                      name={data.name}
                      imgSrc={data.imgSrc}
                      isActive={data.id === "1" ? true : false}
                    />
                  </div>
                ))}
            </div>

               {/*menu kateqori altindaki mallar */}
            <div className="dishItemContainer">
              {isMainData &&
                isMainData.map((data) => (
                  <ItemCard
                    key={data.id}
                    itemId={data.id}
                    imgSrc={data.imgSrc}
                    name={data.name}
                    ratings={data.ratings}
                    price={data.price}
                  />
                ))}
            </div>
        </div>
      </div>

         {/*bu hissede kard hissesidir */}
        <div className="rightMenu">
          <div className="debitCardContainer">
            <div className="debitCard">
              <DebitCard/>
            </div>
          </div>

          {!cart ? (
            <div className="addSomeItem">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2FemptyCart.png?alt=media&token=50b733d4-cdd9-4025-bffe-8efa4066ca24"
              alt=""
              className="emptyCart"
            />
          </div>
          ) :(
            <div className="cartCheckOutContianer">
            <div className="cartContainer">
              <SubMenuContainer />

              <div className="cartItems">
               {cart &&
                    cart.map((data) => (
                      <CartItem
                        key={data.id}
                        itemId={data.id}
                        name={data.name}
                        imgSrc={data.imgSrc}
                        qty={"4"}
                        price={data.price}
                      />
                    ))}
              </div>
            </div>
            <div className="totalSection">
              <h3>Total</h3>
              <p>
                <span >{ totalPrice}</span>
                <span>&#8380;</span>
              </p>
            </div>
            <button className="checkOut">Check Out</button>
          </div>
          )}
          
        </div>
      </main>
    </div>
  );
}

export default App;
// npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/icons-material
// npm i @emotion/styled