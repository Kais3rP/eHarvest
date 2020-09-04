import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { flexRowCenter, flexColSpace, flexColCenter, flexRowSpace, flexRowStart, Header3, ButtonAlt } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, openHeaderModal } from '../slices/shopSlice';
import { fetchLogout } from '../slices/userSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Logo from './Logo';



export default function () {
    const isLoggedIn = useSelector( state => state.user.isLoggedIn);
    const userLogged = useSelector( state => state.user.userLogged);
    const dispatch = useDispatch();
    return (
        <HeaderWrapper>
            <LeftHeaderContainer><Logo /></LeftHeaderContainer>
            <MidHeaderContainer>
                <HeaderLink><Link to="/">HOME</Link></HeaderLink>
                <HeaderLink><Link to="/fullshop">FULL SHOP</Link></HeaderLink>
                <HeaderLink onMouseOver={() => { dispatch(openHeaderModal()) }} ><a>WHAT'S eHARVEST</a></HeaderLink> </MidHeaderContainer>
            <RightHeaderContainer>
                <LoginContainer>
                    <HeaderLink><Link to="/login">Sign In / Register</Link></HeaderLink>
                    <Header3>User:{isLoggedIn ? userLogged : 'Not Logged'}</Header3>
                    <ButtonAlt type='Button' onClick={()=>{dispatch(fetchLogout())}}>Log Out</ButtonAlt>
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
z-index:4;
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