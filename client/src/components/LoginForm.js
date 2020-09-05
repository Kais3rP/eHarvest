import React from 'react';
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, Header3 } from '../styled-components/globalStyles';
import { fetchLogin, fetchRegister } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from 'react-redux';





export default function () {
    const loginResponse = useSelector(state => state.user.loginResponse);
    const dispatch = useDispatch();
   return (
    <LoginForm onSubmit={(ev) => {
        ev.persist();
        ev.preventDefault(); //Prevents the form submitting
        dispatch(fetchLogin(ev));
        ev.target.reset();
     }}>
        <Label>Login</Label>
        <FormElementWrapper>
           <FormInput placeholder={'email@example.it'} type={'email'} name="email" required />
           <Label>E-mail Address</Label>
        </FormElementWrapper>
        <FormElementWrapper>
           <FormInput placeholder={'Password'} type={'password'} name="password" required />
           <Label>Password</Label>
        </FormElementWrapper>
        <ButtonAlt type='submit'>Log In</ButtonAlt>
        <Header3>{loginResponse ? loginResponse.message : null}</Header3>
     </LoginForm>
   )
}

const LoginForm = styled.form`
${flexColCenter};
justify-content:flex-start;
width:50%;

`
const FormElementWrapper = styled.div`
${flexRowSpace};
width:100%;
`
const Label = styled.label`
font-size:14px;
width:50%;
`

const FormInput = styled(Input)`
width:50%;
`

