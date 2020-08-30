import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, toggleCart, calculateTotalPrice } from '../slices/shopSlice';



export default function ({ item }){
    const cart = useSelector( state => state.shop.cart);
    const isCartOpen = useSelector( state => state.shop.isCartOpen)
    const dispatch = useDispatch();
    return (
     <CartButton onClick = {() => { 
         dispatch(addToCart(item));
         dispatch(calculateTotalPrice(item.price))
         if (!isCartOpen) dispatch(toggleCart())
          } }>
         Add To Cart
     </CartButton>
       
    )
}


const CartButton = styled.button`

width:100%;
height:10%;
border:1px solid black;
background:yellow;
outline:none;
&:hover{
    opacity:0.7;
    
};
&:active{
    border: 2px inset black;
}


`