import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, Header3 } from '../styled-components/globalStyles';
import { fetchRegister } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { validatePwd } from '../helpers/validatePwd';
import { useSelector, useDispatch } from 'react-redux';
import PasswordChecker from './PasswordChecker';
import usePwdValidator from './custom-hooks/usePwdValidator';



export default function () {
   const dispatch = useDispatch();
   const registrationResponse = useSelector(state => state.user.registrationResponse);

   const { 
      isPwdCheckerOpen, 
      password, 
      passwordCheck, 
      isValidPwd, 
      validationParams, 
      pwdProps, 
      pwdCheckProps } = usePwdValidator();
  
   function onSubmit(ev) {
      ev.preventDefault();
      if (password !== passwordCheck || !isValidPwd) return;
      dispatch(fetchRegister(ev));
      ev.target.reset();
   }

   console.log('rerender')
   return (
      <RegisterForm onSubmit={onSubmit}>
         <Header3>Register</Header3>
         <FormElementWrapperDiv>
            <FormInput placeholder={'Name'} type={'text'} name="name" required />
            <Label>Name</Label>
         </FormElementWrapperDiv>
         <FormElementWrapperDiv>
            <FormInput placeholder={'Surname'} type={'text'} name="surname" required />
            <Label>Surname</Label>
         </FormElementWrapperDiv>
         <FormElementWrapperDiv>
            <FormInput placeholder={'email@example.it'} type={'email'} name="email" required />
            <Label>E-mail Address</Label>
         </FormElementWrapperDiv>
         <FormElementWrapperDiv>
         {
            isValidPwd ?
               <ValidHeader>✔</ValidHeader> :
               <InvalidHeader>✖ </InvalidHeader>
         }
            <FormInput {...pwdProps} />
            <Label>Password</Label>
         </FormElementWrapperDiv>
         <FormElementWrapperDiv>
         {  password.length !== 0 ?
            password === passwordCheck ?
               <ValidHeader>✔</ValidHeader> :
               <InvalidHeader>✖</InvalidHeader> :
               <InvalidHeader>✖</InvalidHeader> 
               }
            <FormInput {...pwdCheckProps} />
            <Label>Password Check</Label>
         </FormElementWrapperDiv>
         <ButtonAlt type='submit'>Register</ButtonAlt>
         
       
         <Header3>
            {registrationResponse ?
               registrationResponse :
               null}
         </Header3>
         {isPwdCheckerOpen ?
            <PasswordChecker {...validationParams} />
            :
            null}
      </RegisterForm>

   )
}

const RegisterForm = styled.form`
${flexColCenter};
justify-content:flex-start;
align-items:flex-start;
width:50%;
`
const FormElementWrapperDiv = styled.div`
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



