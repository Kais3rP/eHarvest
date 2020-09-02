import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { flexRowCenter, flexColSpace, flexColCenter, flexRowSpace, flexRowStart } from '../styled-components/globalStyles';
import { useDispatch } from 'react-redux';
import { toggleCart, openHeaderModal } from '../slices/shopSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Logo from './Logo';



export default function () {
    const dispatch = useDispatch();
    return (
        <HeaderWrapper>
            <LeftHeaderContainer><Logo /></LeftHeaderContainer>
            <MidHeaderContainer>
                <HeaderLink><Link to="/">HOME</Link></HeaderLink>
                <HeaderLink><Link to="/fullshop">FULL SHOP</Link></HeaderLink>
                <HeaderLink onMouseOver={() => { dispatch(openHeaderModal()) }} >WHAT'S eHARVEST</HeaderLink> </MidHeaderContainer>
            <RightHeaderContainer>
                <LoginContainer>
                    <HeaderLink><Link to="/login">Sign In / Register</Link></HeaderLink>
                </LoginContainer>
                <IconContext.Provider value={{ style: { 'margin-right': '10px', color: 'grey', cursor: 'pointer' } }}  >
                    <FaShoppingCart size={30} onClick={() => { dispatch(toggleCart()) }} />
                </IconContext.Provider>
            </RightHeaderContainer>
        </HeaderWrapper>

    )
}

const HeaderWrapper = styled.div`
${flexRowCenter};
width:100%;
height:200px;
position: fixed;
top:0;
left:0;
text-align:center;
z-index:2;
background:white;
box-shadow: 1px 2px 10px 2px grey;
`
const LeftHeaderContainer = styled.div`
${flexRowStart};
width:30%;
height:100%;

`
const RightHeaderContainer = styled.div`

${flexRowCenter}
justify-content: flex-end;
width:30%;
height:100%;


`
const MidHeaderContainer = styled.div`

${flexRowCenter};
width:40%;

`



const HeaderLink = styled.div`
margin:10px;
color:grey;
cursor:pointer;

`
const LoginContainer = styled.div`

`