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
      isValidName,
      isValidSurname,
      isValidEmail,
      isValidPwd, 
      validationParams, 
      pwdProps, 
      pwdCheckProps,
   nameProps,
surnameProps,
emailProps,
resetValidators } = usePwdValidator();
  
   function onSubmit(ev) {
      ev.preventDefault();
      if (password === passwordCheck &&
          isValidPwd     &&
          isValidName    &&
          isValidSurname &&
          isValidEmail) {
      dispatch(fetchRegister(ev));
      ev.target.reset();
      resetValidators();
          }
   }

   console.log('rerender')
   return (
      <RegisterForm onSubmit={onSubmit}>
         <Header3>Register</Header3>
         <FormElementWrapperDiv>
         {isValidName                  ?
         <ValidHeader>✔</ValidHeader> :
         <InvalidHeader>✖ </InvalidHeader>}
            <FormInput {...nameProps} />
            <Label>Name</Label>
         </FormElementWrapperDiv>
         <FormElementWrapperDiv>
         {isValidSurname                 ?
         <ValidHeader>✔</ValidHeader> :
         <InvalidHeader>✖ </InvalidHeader>}
            <FormInput {...surnameProps} />
            <Label>Surname</Label>
         </FormElementWrapperDiv>
         <FormElementWrapperDiv>
         {isValidEmail                  ?
         <ValidHeader>✔</ValidHeader> :
         <InvalidHeader>✖ </InvalidHeader>}
            <FormInput {...emailProps} />
            <Label>E-mail Address</Label>
         </FormElementWrapperDiv>
         <FormElementWrapperDiv>
         {isValidPwd                  ?
         <ValidHeader>✔</ValidHeader> :
         <InvalidHeader>✖ </InvalidHeader>}
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



