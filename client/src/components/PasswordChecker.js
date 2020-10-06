

import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, Header3 } from '../styled-components/globalStyles';
import { fetchRegister } from '../slices/userSlice';


export default function ({ isLowerCase, isUpperCase, isNumber, isLongEnough }) {
   return (
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
    </PasswordCheckContainer>
   )
}

const PasswordCheckContainer = styled.div`
width:100%;
${flexColCenter};
align-items:flex-start;
`
const CheckersWrapper = styled.div`
${flexRowCenter};
`

const LetterChecker = styled.p`
`