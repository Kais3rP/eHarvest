import React from 'react';
import styled from 'styled-components';
import { Button, Header5, flexRowCenter, flexRowSpace } from '../styled-components/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, toggleCart, calculateTotalPrice } from '../slices/shopSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from "react-icons";


export default function ({ item }) {
    const isCartOpen = useSelector(state => state.shop.isCartOpen)
    const dispatch = useDispatch();
    return (
        <ButtonItem onClick={() => {
            dispatch(addToCart(item));
            dispatch(calculateTotalPrice());
            if (!isCartOpen) dispatch(toggleCart());
        }}>
            <IconContainer>
                <IconContext.Provider value={{ style: { display: 'inline', color: 'grey', cursor: 'pointer' } }}  >
                    <FaShoppingCart size={20} />
                </IconContext.Provider>
            </IconContainer>
            <Title>Add To Cart</Title>
        </ButtonItem>

    )
}


const ButtonItem = styled(Button)`
${flexRowCenter};
justify-content:flex-start;
height:10%;
width:100%;
border-bottom-left-radius:50px;
border-bottom-right-radius:50px;

background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 13px #6b6b6b, 
             -5px -5px 13px #ffffff;
`
const Title = styled(Header5)`
width:90%;`

const IconContainer = styled.div`
${flexRowCenter};
justify-content:flex-start;
width:10%;
margin-left:5px;
`
