import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter, ButtonAlt, Header3, Input } from '../styled-components/globalStyles';
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
            <TotalPriceContainer>
               <Header3> TOTAL TO PAY: {totalPrice.toFixed(2)}€</Header3>
        </TotalPriceContainer>
            <ThumbnailsWrapper>
           
                {cart.map((item, i) => (<ThumbnailProductContainer> <ProductPic key={i} id={item.id} src={`data:${mimeType};base64,${item.pic}`}></ProductPic><ProductQuantity value={`${item.quantityInCart}Kg`} readOnly={true}></ProductQuantity></ThumbnailProductContainer>))}
                
            </ThumbnailsWrapper>
           
        </CartWrapper>
  )
}

const CartWrapper = styled.div`
position:fixed;
right:0;
width:20%;
height:100%;
${flexColCenter};
justify-content:flex-start;
margin-top:200px;
transition: right 0.5s ease-in;
z-index:1;
overflow-y: scroll;
background:white;
box-shadow: 1px 2px 10px 2px grey;
`

const ControlCart = styled.div`

${flexRowSpace};
width:100%;
height:5%;
font-size:20px;
font-weight:bold;



`

const ThumbnailsWrapper = styled.div`
${flexColCenter};
justify-content:flex-start;
width:100%;
height:70%;




`
const ThumbnailProductContainer = styled.div`
${flexRowSpace};
height:10%;
width:98%;
text-align:center;
margin:5px;
box-shadow: 1px 2px 10px 2px grey;
`
const ProductPic = styled.img`

height:100%;

`
const ProductQuantity = styled(Input)`
width:30%;
height:100%;
border:none;
font-size:30px;

`
const CloseCartButton = styled.div`
margin-right:5px;
cursor: pointer;
font-size:50px;
`
const TotalPriceContainer = styled.div`
display:block;
width:98%;
height:5%;
`