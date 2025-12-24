import React, { useState } from 'react'
import { BiCart } from "react-icons/bi";
import Order from './Order';

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach(el => summa += Number.parseFloat(el.price));
  return (<div>
    {props.orders.map(el => (
      <Order onDelete ={props.onDelete} key = {el.id} item = {el} />
    ))}
    <p className = 'summa'>Sum: {new Intl.NumberFormat().format(summa)}$</p>
  </div>)
}

const showNothing = () =>
{
  return (<div className = 'empty'>
    <h2>Bomjes karzinum ban chka</h2>
  </div>)
}

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false)

  return (
    <header>
        <div>
        <span className = 'logo'>L u x e</span>
        <ul className = 'nav'>
          <li>menu</li>
          <li>sign in</li>
          <li>registration</li>
        </ul>
        <BiCart onClick ={() => setCartOpen(cartOpen = !cartOpen)} className = {`shop-cart-button ${cartOpen && 'active'}`} />
        
        {cartOpen &&(
          <div className = 'shop-cart'>
           {props.orders.length > 0 ? 
           showOrders(props) : showNothing()}
          </div>
        )}
        </div>
        <div className = 'presentation'> </div>
        </header>
  )
}
