import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
  ButtonAlt,
  ValidStrong,
  InvalidStrong,
  flexColCenter,
  flexRowSpace,
} from "../styled-components/globalStyles"
import { fetchRegister } from "../slices/userSlice"
import {} from "react-icons/fa"
import PasswordChecker from "./PasswordChecker"
import usePwdValidator from "./custom-hooks/usePwdValidator"

export default function () {
  const dispatch = useDispatch()
  const registrationResponse = useSelector(
    (state) => state.user.registrationResponse
  )

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
    resetValidators,
  } = usePwdValidator()

  function onSubmit(ev) {
    ev.preventDefault()
    if (
      password === passwordCheck &&
      isValidPwd &&
      isValidName &&
      isValidSurname &&
      isValidEmail
    ) {
      dispatch(fetchRegister(ev))
      ev.target.reset()
      resetValidators()
    }
  }

  return (
    <RegisterForm onSubmit={onSubmit}>
      <strong>Register</strong>
      <FormElementWrapperDiv>
        {isValidName ? (
          <ValidStrong>✔</ValidStrong>
        ) : (
          <InvalidStrong>✖ </InvalidStrong>
        )}
        <FormInput {...nameProps} />
        <Label>Name</Label>
      </FormElementWrapperDiv>
      <FormElementWrapperDiv>
        {isValidSurname ? (
          <ValidStrong>✔</ValidStrong>
        ) : (
          <InvalidStrong>✖ </InvalidStrong>
        )}
        <FormInput {...surnameProps} />
        <Label>Surname</Label>
      </FormElementWrapperDiv>
      <FormElementWrapperDiv>
        {isValidEmail ? (
          <ValidStrong>✔</ValidStrong>
        ) : (
          <InvalidStrong>✖ </InvalidStrong>
        )}
        <FormInput {...emailProps} />
        <Label>E-mail Address</Label>
      </FormElementWrapperDiv>
      <FormElementWrapperDiv>
        {isValidPwd ? (
          <ValidStrong>✔</ValidStrong>
        ) : (
          <InvalidStrong>✖ </InvalidStrong>
        )}
        <FormInput {...pwdProps} />
        <Label>Password</Label>
      </FormElementWrapperDiv>
      <FormElementWrapperDiv>
        {password.length !== 0 && password === passwordCheck ? (
          <ValidStrong>✔</ValidStrong>
        ) : (
          <InvalidStrong>✖</InvalidStrong>
        )}
        <FormInput {...pwdCheckProps} />
        <Label>Password Check</Label>
      </FormElementWrapperDiv>
      <ButtonAlt type="submit">Register</ButtonAlt>

      <strong>{registrationResponse || null}</strong>
      {isPwdCheckerOpen ? <PasswordChecker {...validationParams} /> : null}
    </RegisterForm>
  )
}

const RegisterForm = styled.form`
  ${flexColCenter};
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
`
const FormElementWrapperDiv = styled.div`
  ${flexRowSpace};
  width: 100%;
`
const Label = styled.label`
  font-size: 14px;
  width: 50%;
`

const FormInput = styled.input`
  width: 50%;
`
