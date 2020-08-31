import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter, ButtonAlt } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart, toggleCart } from '../slices/shopSlice';


export default function ({ position }) {
    const cart = useSelector(state => state.shop.cart);
    const totalPrice = useSelector(state => state.shop.totalPrice);
    const dispatch = useDispatch();
    let mimeType = "image/png";

    return (
        <CartWrapper style={{ right: position }}>
            <ControlCart>
                <ButtonAlt onClick={() => { dispatch(resetCart()) }}>Reset Cart</ButtonAlt>
                <CloseCartButton onClick={() => { dispatch(toggleCart()) }}>&times;</CloseCartButton>
            </ControlCart>
            <ThumbnailsWrapper>
                {cart.map((item, i) => (<ThumbnailProductContainer> <ProductPic key={i} id={item.id} src={`data:${mimeType};base64,${item.pic}`}></ProductPic><ProductQuantity>{item.quantityInCart}Kg</ProductQuantity></ThumbnailProductContainer>))}
            </ThumbnailsWrapper>
            <TotalPriceContainer>
                TOTAL TO PAY: {totalPrice.toFixed(2)}€
        </TotalPriceContainer>
        </CartWrapper>
  )
}

const CartWrapper = styled.div`
position:fixed;
right:0;
width:20%;
height:100%;
${flexColSpace};
background:green;
margin-top:200px;
transition: right 0.5s ease-in;
z-index:1;
overflow-y: scroll;
`

const ControlCart = styled.div`

${flexRowSpace};
width:100%;
height:5%;
background:orange;
font-size:20px;
font-weight:bold;


`

const ThumbnailsWrapper = styled.div`
${flexRowCenter};
align-items: flex-start;
width:100%;
height:70%;
flex-wrap:wrap;

`
const ThumbnailProductContainer = styled.div`
${flexColCenter};
width:30%;
text-align:center;
border: 1px solid red;
margin:5px;
`
const ProductPic = styled.img`
width:98%;
height:80%;
`
const ProductQuantity = styled.div`
width:98%;
height:20%;
background:white;
`
const CloseCartButton = styled.div`
margin-right:5px;
cursor: pointer;
`
const TotalPriceContainer = styled.div`
width:98%;
height:30%;
background:white;
`