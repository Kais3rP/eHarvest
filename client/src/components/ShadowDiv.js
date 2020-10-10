import React from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { flexRowCenter } from "../styled-components/globalStyles"
import { toggleCart } from "../slices/uiSlice"

export default function () {
  const dispatch = useDispatch()

  return (
    <ShadowDiv
      onClick={() => {
        dispatch(toggleCart())
      }}
    >
      <CloseDiv>&times;</CloseDiv>
    </ShadowDiv>
  )
}

const ShadowDiv = styled.div`
  ${flexRowCenter};
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.8;
  background: black;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 2;
`
const CloseDiv = styled.div`
  position: absolute;
  left: 10px;
  top: 195px;
  font-size: 50px;
`
