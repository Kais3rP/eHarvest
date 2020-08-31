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
                <HeaderLink><Link to="/full-shop">FULL SHOP</Link></HeaderLink>
                <HeaderLink onMouseOver={() => { dispatch(openHeaderModal()) }} ><Link to="/">WHAT'S eHARVEST</Link></HeaderLink> </MidHeaderContainer>
            <RightHeaderContainer>
            <LoginContainer>
            <HeaderLink><Link  to="/login">Sign In / Register</Link></HeaderLink>
            </LoginContainer>
                <IconContext.Provider value={{ style:{ 'margin-right':'10px', color:'grey', cursor:'pointer'} }}  >                
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
background:yellow;
text-align:center;
z-index:2;
`
const LeftHeaderContainer = styled.div`
${flexRowStart};
width:30%;
height:100%;
background:violet;
`
const RightHeaderContainer = styled.div`

${flexRowCenter}
justify-content: flex-end;
width:30%;
height:100%;
background:violet;

`
const MidHeaderContainer = styled.div`

${flexRowCenter};
width:40%;

`



const HeaderLink = styled.div`
margin:10px;
`
const LoginContainer = styled.div`

`