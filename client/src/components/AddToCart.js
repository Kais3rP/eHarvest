import React from 'react';
import styled from 'styled-components';
import { Button, Header5, flexRowCenter, flexRowSpace } from '../styled-components/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, calculateTotalPrice } from '../slices/shopSlice';
import { toggleCart } from '../slices/uiSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from "react-icons";


export default function ({ item, priv, setHasBeenAdded }) {
    const isCartOpen = useSelector(state => state.ui.isCartOpen);
    const windowSize = useSelector(state => state.ui.windowSize);
    const dispatch = useDispatch();
    return (
        <ButtonItem onClick={() => {
            if (!priv){
            dispatch(addToCart(item));
            dispatch(calculateTotalPrice());
            if (!isCartOpen) dispatch(toggleCart());
            }
            setHasBeenAdded(true);
            setTimeout(()=> {setHasBeenAdded(false)},3000)    
        }}>
            <IconContainer>
                <IconContext.Provider value={{ style: { color: 'grey', cursor: 'pointer' } }}  >
                    <FaShoppingCart size={30} />
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
box-shadow:  1px 1px 5px #6b6b6b, 
             -1px -1px 5px #ffffff;
             font-size:8px;
@media(min-width:768px){
font-size:10px;
}
@media(min-width:1200px){
font-size:16px;
`
const Title = styled(Header5)`
width:90%;`

const IconContainer = styled.div`
${flexRowCenter};
justify-content:flex-start;
width:10%;
margin-left:5px;
`
