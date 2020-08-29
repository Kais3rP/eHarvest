import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../slices/shopSlice';



export default function ({ pic, id }){
    const cart = useSelector( state => state.shop.cart)
    const dispatch = useDispatch();
    return (
     <CartButton onClick = {() => { dispatch(addToCart({pic,id})) } }>
         Add To Cart
     </CartButton>
       
    )
}


const CartButton = styled.button`

width:100%;
height:30px;
border:1px solid black;
background:yellow;


`