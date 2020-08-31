import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleCart, openHeaderModal } from '../slices/shopSlice';


export default function () {
    const dispatch = useDispatch();
    return (
        <HeaderWrapper>
            <LeftHeaderContainer>Left Controls</LeftHeaderContainer>
            <MidHeaderContainer>
                <HeaderLink><Link to="/">HOME</Link></HeaderLink>
                <HeaderLink><Link to="/full-shop">FULL SHOP</Link></HeaderLink>
                <HeaderLink onMouseOver={ ()=> {dispatch(openHeaderModal())}} ><Link to="/">WHAT'S eHARVEST</Link></HeaderLink> </MidHeaderContainer>
            <RightHeaderContainer>
                <CartButton onClick={() => { dispatch(toggleCart()) }}>Cart</CartButton>
            </RightHeaderContainer>
        </HeaderWrapper>

    )
}

const HeaderWrapper = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:100%;
height:100px;
position: fixed;
top:0;
left:0;
background:yellow;
text-align:center;
z-index:2;


`
const LeftHeaderContainer = styled.div`

display:flex;
justify-content: flex-start;
align-items: center;
width:30%;

`
const RightHeaderContainer = styled.div`

display:flex;
justify-content: flex-end;
align-items: center;
width:30%;

`
const MidHeaderContainer = styled.div`

display:flex;
justify-content: center;
align-items: center;
width:40%;

`

const CartButton = styled.button`

width:100px;
height:40px;
background: violet;
border: 1px solid black;
margin:5px;
cursor: pointer;

`

const HeaderLink = styled.div`
margin:10px;

`
