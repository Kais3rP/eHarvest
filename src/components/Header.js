import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { resetCart } from '../slices/shopSlice';

export default function (){
    const dispatch = useDispatch();
    return (
        <HeaderWrapper>
<HeaderLink><Link to="/cart">Cart</Link></HeaderLink>
<HeaderLink><Link to="/">Home</Link></HeaderLink>
<ResetCartButton onClick={ () => {dispatch(resetCart())}}>Reset Cart</ResetCartButton>

        </HeaderWrapper>
       
    )
}

const HeaderWrapper = styled.div`
display:flex;
justify-content: flex-end;
align-items: center;
width:100%;
height:100px;
position: fixed;
top:0;
left:0;
background:yellow;
text-align:center;


`
const HeaderLink = styled.div`
margin:10px;

`
const ResetCartButton = styled.button`

width:100px;
height:40px;
background: violet;
border: 1px solid black;
margin:5px;

`