import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, Header3 } from '../styled-components/globalStyles';
import { fetchRegister } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { validatePwd } from '../helpers/validatePwd'
import { checkPwd } from '../helpers/checkPwd'
import { useSelector, useDispatch } from 'react-redux';



export default function () {
    const dispatch = useDispatch();
    const registrationResponse = useSelector(state => state.user.registrationResponse);
    const [isPwdCheckerOpen, setPwdCheckerOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLowerCase, setIsLowerCase] = useState(false);
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    const [isLongEnough, setIsLongEnough] = useState(false);
   return (
    <RegisterForm onSubmit={(ev) => {
        ev.preventDefault();
        dispatch(fetchRegister(ev));
        ev.target.reset();
     }}>
        <Label>Register</Label>
        <FormElementWrapper>
           <FormInput placeholder={'Name'} type={'text'} name="name" required />
           <Label>Name</Label>
        </FormElementWrapper>
        <FormElementWrapper>
           <FormInput placeholder={'Surname'} type={'text'} name="surname" required />
           <Label>Surname</Label>
        </FormElementWrapper>
        <FormElementWrapper>
           <FormInput placeholder={'email@example.it'} type={'email'} name="email" required />
           <Label>E-mail Address</Label>
        </FormElementWrapper>
        <FormElementWrapper>
           <FormInput onChange={(ev) => {
              checkPwd(ev.target.value, setIsLowerCase, setIsUpperCase, setIsNumber, setIsLongEnough);
              setPassword(ev.target.value)
           }}
              onBlur={() => { setPwdCheckerOpen(false) }}
              onFocus={() => { setPwdCheckerOpen(true) }}
              placeholder={'Password'}
              type={'password'} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              name="password"
              required />
           <Label>Password</Label>
        </FormElementWrapper>
        <FormElementWrapper>
           <FormInput onChange={(ev) => {
              validatePwd(password, ev.target);
              setPasswordConfirm(ev.target.value);
             
           }
           } onBlur={(ev) => { setPwdCheckerOpen(false) }}
              onFocus={() => { setPwdCheckerOpen(true) }}
              placeholder={'Repeat Password'}
              type={'password'} required />
           <Label>Password Check</Label>
        </FormElementWrapper>
       
        <ButtonAlt type='submit'>Register</ButtonAlt>
        {(passwordConfirm.length === password.length && password.length !== 0) ? password === passwordConfirm ? <ValidHeader>✔ Passwords Match</ValidHeader> : <InvalidHeader>✖ Password don't match</InvalidHeader> : null}
         <Header3>{registrationResponse ? registrationResponse.isOk ? 'Registration Successfull' : registrationResponse.error : null}</Header3>
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
     </RegisterForm>
  
   )
}

const RegisterForm = styled.form`
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
const PasswordCheckContainer = styled.div`
width:20%;
`
const CheckersWrapper = styled.div`
${flexRowCenter};
`


const LetterChecker = styled.p`
`