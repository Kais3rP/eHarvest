import React from "react"
import styled from "styled-components"
import { flexColCenter, flexRowSpace } from "../styled-components/globalStyles"
import RegisterForm from "../containers/RegisterForm"
import LoginForm from "../containers/LoginForm"
import Window from "./Window"

export default function () {
  return (
    <RegLogWrapperDiv>
    <Window title={"Register or Login"}>
      <RegLogContainerDiv>
        <RegisterForm />
        <LoginForm />
      </RegLogContainerDiv>
    </Window>
    </RegLogWrapperDiv>
  )
}

const RegLogWrapperDiv = styled.div`
  ${flexColCenter};
  width: 60%;
  margin-top: 300px;
  @media (max-width: 768px) {
    margin-top: 10px;
    width: 98%;
  }
`
const RegLogContainerDiv = styled.div`
  ${flexRowSpace};
  align-items: flex-start;
  width: 100%;
`
