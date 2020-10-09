import React, { useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { ButtonAlt } from "../styled-components/globalStyles"
import { fetchUserDataUpdate } from "../slices/userSlice"
import handleAutoResize from "../helpers/autoResizeTextArea"

export default function () {
  const personalData = useSelector((state) => state.user.personalData)
  const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false)
  const [descriptionText, setDescriptionText] = useState(
    personalData.description
  )
  const dispatch = useDispatch()
  function onChange(ev) {
    handleAutoResize(ev)
    setDescriptionText(ev.target.value)
  }

  function onClick() {
    if (isEditDescriptionMode) {
      dispatch(fetchUserDataUpdate({ description: descriptionText }))
      setIsEditDescriptionMode(false)
    } else setIsEditDescriptionMode(true)
  }
  return (
    <>
      <strong>Your personal description as a seller:</strong>
      <DescriptiontextP>{personalData.description}</DescriptiontextP>
      {isEditDescriptionMode && (
        <DescriptionTextArea onChange={onChange} value={descriptionText} />
      )}
      <ButtonAlt onClick={onClick}>
        {isEditDescriptionMode ? "Submit Changes" : "Edit Description"}
      </ButtonAlt>
    </>
  )
}

const DescriptionTextArea = styled.textarea`
  width: 100%;
`

const DescriptiontextP = styled.p``
