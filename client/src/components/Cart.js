import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter, ButtonAlt, Header1, Header3, Header5, Input } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart, increaseCart, decreaseCart, calculateTotalPrice } from '../slices/shopSlice';
import { toggleCart } from '../slices/uiSlice';


export default function ({ position }) {
    const cart = useSelector(state => state.shop.cart);
    const totalPrice = useSelector(state => state.shop.totalPrice);
    const dispatch = useDispatch();


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
                {cart.map((item, i) => (<ThumbnailProductContainer key={i}>
                    <ProductPic  id={item.productName} src={item.pic}></ProductPic>
                    <Text>
                    <Header3>{item.productName}</Header3>
                    <Header5>Sold by: </Header5>
                    <Header3>{item.sellerName}</Header3>
                    </Text>
                    <QuantityControlContainer>
                    <Decrease onClick={() => {
                        dispatch(decreaseCart(item));
                        dispatch(calculateTotalPrice());
                    }}>-</Decrease>
                    <ProductQuantity >{item.quantityInCart}Kg</ProductQuantity>
                    <Increase onClick={() => {
                        dispatch(increaseCart(item));
                        dispatch(calculateTotalPrice());
                    }}>+</Increase>
                    </QuantityControlContainer>
                </ThumbnailProductContainer>))}
            </ThumbnailsWrapper>
        </CartWrapper>
    )
}

const CartWrapper = styled.div`
position:fixed;
right:0;
width:320px;
height:100%;
${flexColCenter};
justify-content:flex-start;
margin-top:0px;
transition: right 0.5s ease-in;
z-index:2;
overflow-y: scroll;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  1px 1px 5px #878787, 
             -1px -1px 5px #ffffff;
@media(min-width:768px){
    margin-top:200px;
}
`

const ControlCart = styled.div`
${flexRowSpace};
width:100%;
height:10%;
font-size:20px;
font-weight:bold;
padding:10px;
`

const ThumbnailsWrapper = styled.div`
${flexColCenter};
justify-content:flex-start;
width:100%;
height:80%;
`
const ThumbnailProductContainer = styled.div`
${flexRowSpace};
height:10%;
width:98%;
text-align:center;
margin:5px;
background: linear-gradient(145deg, #ffffff, #e6e6e6);

box-shadow:  1px 1px 5px #878787, 
             -1px -1px 5px #ffffff;
`


const ProductPic = styled.img`
width:23%;
`
const Text = styled.div`
${flexColCenter}

width:43%;

`
const QuantityControlContainer = styled.div`
${flexRowCenter};
width:30%;
`
const CloseCartButton = styled.div`
margin-right:5px;
cursor: pointer;
font-size:50px;
`
const TotalPriceContainer = styled.div`
width:98%;
height:10%;
`

const ProductQuantity = styled.div`
margin:10px;
`
const Increase = styled(Header1)`
cursor:pointer;
`

const Decrease = styled(Header1)`
cursor:pointer;
`