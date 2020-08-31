import React from 'react';
import styled from 'styled-components';
import { Button } from '../styled-components/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, toggleCart, calculateTotalPrice } from '../slices/shopSlice';



export default function ({ item }){
    const cart = useSelector( state => state.shop.cart);
    const isCartOpen = useSelector( state => state.shop.isCartOpen)
    const dispatch = useDispatch();
    return (
     <Button onClick = {() => { 
         dispatch(addToCart(item));
         dispatch(calculateTotalPrice(item.price))
         if (!isCartOpen) dispatch(toggleCart())
          } }>
         Add To Cart
     </Button>
       
    )
}


