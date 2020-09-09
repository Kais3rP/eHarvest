import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, Header3 } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin, fetchRegister } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';




export default function () {
  
return (
      <RegLogWrapper>
         <RegLogContainer>
           <RegisterForm/>
          { <LoginForm/> }
         </RegLogContainer>       
      </RegLogWrapper>
   )
}

const RegLogWrapper = styled.div`
${flexColCenter};
width:60%;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 13px #6b6b6b, 
             -5px -5px 13px #ffffff;
             padding:20px;
margin-top:300px;
@media (max-width:768px){
    ${flexColCenter};
    justify-content:flex-start;
    margin-top:10px;
    width:100%;
}
`
const RegLogContainer = styled.div`
${flexRowSpace};
align-items:flex-start;
width:100%;
`






