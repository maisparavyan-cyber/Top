import React, { Component } from 'react'
import { HiFaceFrown } from "react-icons/hi2";

export class Order extends Component {
  render() {
    return (
      <div className = 'item'>
         <img src = {"./img/" + this.props.item.img} />
        <h2>{this.props.item.title}</h2>
          <b>{this.props.item.price}$</b>
          <HiFaceFrown className = 'delete-icon' onClick ={() => this.props.onDelete(this.props.item.id)} />
      </div>
    )
  }
}

export default Order