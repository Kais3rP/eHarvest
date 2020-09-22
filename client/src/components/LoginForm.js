import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, Header3 } from '../styled-components/globalStyles';
import { fetchLogin, fetchRegister } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from 'react-redux';





export default function () {
    const loginResponse = useSelector(state => state.user.loginResponse);
    const isLoggedIn = useSelector( state => state.user.isLoggedIn );
    const [errMsgLogin, setErrMsgLogin] = useState('');
    const dispatch = useDispatch();
    console.log(loginResponse);
   return (
    <LoginForm onSubmit={(ev) => {
        ev.preventDefault(); //Prevents the form submitting
        if (!isLoggedIn) {
        dispatch(fetchLogin(ev));
        ev.target.reset(); }
        else setErrMsgLogin('You are already logged!');
     }}>
        <Header3>Login</Header3>
        <FormElementWrapper>
           <FormInput placeholder={'email@example.it'} type={'email'} name="email" required />
           <Label>E-mail Address</Label>
        </FormElementWrapper>
        <FormElementWrapper>
           <FormInput placeholder={'Password'} type={'password'} name="password" required />
           <Label>Password</Label>
        </FormElementWrapper>
        <Footer>
        <ButtonAlt type='submit'>Log In</ButtonAlt>
        <Header3>{loginResponse ? loginResponse : null}</Header3>
        <Header3>{errMsgLogin}</Header3>
        </Footer>
     </LoginForm>
   )
}

const LoginForm = styled.form`
${flexColCenter};
justify-content:flex-start;
align-items:flex-start;
width:50%;

`
const FormElementWrapper = styled.div`
${flexRowSpace};
width:100%;
`
const Footer = styled.div`
${flexColCenter};

`
const Label = styled.label`
font-size:14px;
width:50%;
`

const FormInput = styled(Input)`
width:50%;
`

