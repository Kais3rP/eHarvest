import React, { useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import {
  ButtonAlt,
  flexColCenter,
  flexRowSpace,
} from "../styled-components/globalStyles"
import { fetchLogin } from "../slices/userSlice"

export default function () {
  const loginResponse = useSelector((state) => state.user.loginResponse)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const [errMsgLogin, setErrMsgLogin] = useState("")
  const dispatch = useDispatch()
  return (
    <LoginForm
      onSubmit={(ev) => {
        ev.preventDefault() // Prevents the form submitting
        if (!isLoggedIn) {
          dispatch(fetchLogin(ev))
          ev.target.reset()
        } else setErrMsgLogin("You are already logged!")
      }}
    >
      <strong>Login</strong>
      <FormElementWrapper>
        <FormInput
          placeholder="email@example.it"
          type="email"
          name="email"
          required
        />
        <Label>E-mail Address</Label>
      </FormElementWrapper>
      <FormElementWrapper>
        <FormInput
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <Label>Password</Label>
      </FormElementWrapper>
      <Footer>
        <ButtonAlt type="submit">Log In</ButtonAlt>
        <strong>{loginResponse || null}</strong>
        <strong>{errMsgLogin}</strong>
      </Footer>
    </LoginForm>
  )
}

const LoginForm = styled.form`
  ${flexColCenter};
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
`
const FormElementWrapper = styled.div`
  ${flexRowSpace};
  width: 100%;
`
const Footer = styled.div`
  ${flexColCenter};
`
const Label = styled.label`
  font-size: 14px;
  width: 50%;
`

const FormInput = styled.input`
  width: 50%;
`
