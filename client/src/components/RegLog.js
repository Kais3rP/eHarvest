import React from "react"
import styled from "styled-components"
import { flexColCenter, flexRowSpace } from "../styled-components/globalStyles"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"

export default function () {
  return (
    <RegLogWrapperDiv>
      <RegLogContainerDiv>
        <RegisterForm />
        <LoginForm />
      </RegLogContainerDiv>
    </RegLogWrapperDiv>
  )
}

const RegLogWrapperDiv = styled.div`
  ${flexColCenter};
  width: 60%;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 5px 5px 13px #6b6b6b, -5px -5px 13px #ffffff;
  padding: 20px;
  margin-top: 300px;
  @media (max-width: 768px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 10px;
    width: 100%;
  }
`
const RegLogContainerDiv = styled.div`
  ${flexRowSpace};
  align-items: flex-start;
  width: 100%;
`
