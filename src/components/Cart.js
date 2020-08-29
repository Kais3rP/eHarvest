import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


export default function (){
    const cart = useSelector( state => state.shop.cart);
    return (
        <CartWrapper>
        {cart.map( (item,i) => (<ThumbnailProductContainer> <ProductPic key={i} id={item.id} src={item.pic}></ProductPic>`item${item.id}`</ThumbnailProductContainer>))}
        </CartWrapper>
        
       
    )
}

const CartWrapper = styled.div`

width:100%;
height:100%;
display:flex;
justify-content: center;
align-items: center;
background:lavender;
margin-top:5%;


`
const ThumbnailProductContainer = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
width:10%;
text-align:center;
border: 1px solid red;
margin:5px;
`
const ProductPic = styled.img`

width:98%;


`