import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { } from '../slices/shopSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";




export default function () {
   const dispatch = useDispatch();
   const [isPwdCheckerOpen, setPwdCheckerOpen] = useState(false);
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const [isLowerCase, setIsLowerCase] = useState(false);
   const [isUpperCase, setIsUpperCase] = useState(false);
   const [isNumber, setIsNumber] = useState(false);
   const [isLongEnough, setIsLongEnough] = useState(false);

   return (
      <RegLogWrapper>
      <RegLogContainer>
         <RegisterForm action={'/auth/register'} method={'POST'}>
            <Input placeholder={'Name'} type={'text'} name="name" required />
            <Input placeholder={'Surname'} type={'text'} name="surname" required />
            <Input placeholder={'email@example.it'} type={'email'} name="email" required />
            <Input onChange={(ev) => {
               checkPwd(ev.target.value, setIsLowerCase, setIsUpperCase, setIsNumber, setIsLongEnough);
               setPassword(ev.target.value)}}
             onBlur={() => { setPwdCheckerOpen(false) }} onFocus={() => { setPwdCheckerOpen(true) }} placeholder={'Password'} 
             type={'password'} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
             title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
             name="password"
             required />
            <Input onChange={(ev)=>{
               validatePwd(password, ev.target);
               setPasswordConfirm(ev.target.value)}
               } onBlur={(ev) => { setPwdCheckerOpen(false) }} onFocus={() => { setPwdCheckerOpen(true) }} placeholder={'Repeat Password'} type={'password'} required />
           {passwordConfirm ? password === passwordConfirm ? <ValidHeader>✔ Passwords Match</ValidHeader> : <InvalidHeader>✖ Password don't match</InvalidHeader> : null}
            <ButtonAlt type='submit'>Register</ButtonAlt>
           </RegisterForm>
         <LoginForm action={'/auth/login'} method={'POST'}>
            <Input placeholder={'email@example.it'} type={'email'} name="email" required />
            <Input placeholder={'Password'} type={'password'} name="password" required />
            <ButtonAlt type='submit'>Log In</ButtonAlt>
         </LoginForm>
         </RegLogContainer>
         {isPwdCheckerOpen ? (
               <PasswordCheckContainer>
               <h3>Password must have:</h3>
               <CheckersWrapper>
               {isLowerCase ? "✔ " : "✖ "}<LetterChecker> At least a <b>lowercase</b> letter  </LetterChecker> 
               </CheckersWrapper>
               <CheckersWrapper> 
               {isUpperCase ? "✔ " : "✖ "}<LetterChecker> At least an <b>uppercase</b> letter  </LetterChecker> 
               </CheckersWrapper>
               <CheckersWrapper> 
               {isNumber ? "✔ " : "✖ "}<LetterChecker> At least a <b>number</b></LetterChecker> 
               </CheckersWrapper>
               <CheckersWrapper>
               {isLongEnough ? "✔ " : "✖ "}<LetterChecker> At least <b>8 characters</b>  </LetterChecker>
                </CheckersWrapper>              
            </PasswordCheckContainer>) :
               null}
      </RegLogWrapper>
   )
}

const RegLogWrapper = styled.div`
${flexColCenter};
width:100%;
margin-top:300px;
`
const RegisterForm = styled.form`
${flexColCenter};
justify-content:flex-start;
width:20%;
background:white;


`
const RegLogContainer = styled.div`
${flexRowCenter};
width:100%;
`

const PasswordCheckContainer = styled.div`

width:20%;
`
const CheckersWrapper = styled.div`
${flexRowCenter};

`
const LoginForm = styled.form`
${flexColCenter};
justify-content:flex-start;
width:20%;



`

const LetterChecker = styled.p`

`
function checkPwd(pwdText, setIsLowerCase, setIsUpperCase,setIsNumber, setIsLongEnough) {
   // Validate lowercase letters
   var lowerCaseLetters = /[a-z]/g;
   if (pwdText.match(lowerCaseLetters)) {
      setIsLowerCase(true);
   } else {
      setIsLowerCase(false);
   }

   // Validate capital letters
   var upperCaseLetters = /[A-Z]/g;
   if (pwdText.match(upperCaseLetters)) {
     setIsUpperCase(true);
   } else {
      setIsUpperCase(false);
   }

   // Validate numbers
   var numbers = /[0-9]/g;
   if (pwdText.match(numbers)) {
     setIsNumber(true);
   } else {
      setIsNumber(false);
   }

   // Validate length
   if (pwdText.length >= 8) {
     setIsLongEnough(true);
   } else {
      setIsLongEnough(false);
   }
}

function validatePwd(pwd, pwdConfirm){
   if(pwd !== pwdConfirm.value) {
     pwdConfirm.setCustomValidity("Passwords Don't Match");
   } else {
     pwdConfirm.setCustomValidity('');
   }
 }