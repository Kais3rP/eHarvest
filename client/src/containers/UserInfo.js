import React, { useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { ButtonAlt } from "../styled-components/globalStyles"
import { fetchUserDataUpdate } from "../slices/userSlice"

export default function () {
  const personalData = useSelector((state) => state.user.personalData)
  const [isEditInfoMode, setIsEditInfoMode] = useState(false)
  const [nameInput, setNameInput] = useState(personalData.name)
  const [surnameInput, setSurnameInput] = useState(personalData.surname)
  const [emailInput, setEmailInput] = useState(personalData.email)
  const dispatch = useDispatch()

  function onClick() {
    if (isEditInfoMode) {
      dispatch(
        fetchUserDataUpdate({
          name: nameInput,
          surname: surnameInput,
          email: emailInput,
        })
      )
      setIsEditInfoMode(false)
    } else setIsEditInfoMode(true)
  }

  return (
    <>
      <em>Name: {`${personalData.name} ${personalData.surname}`}</em>
      <em>E-mail: {personalData.email}</em>

      {isEditInfoMode ? (
        <>
          <Input
            onChange={(ev) => {
              setNameInput(ev.target.value)
            }}
            value={nameInput}
          />
          <Input
            onChange={(ev) => {
              setSurnameInput(ev.target.value)
            }}
            value={surnameInput}
          />
          <Input
            onChange={(ev) => {
              setEmailInput(ev.target.value)
            }}
            value={emailInput}
          />
        </>
      ) : null}
      <ButtonAlt onClick={onClick}>
        {isEditInfoMode ? "Submit Changes" : "Edit Info"}
      </ButtonAlt>
    </>
  )
}

const Input = styled.input``
