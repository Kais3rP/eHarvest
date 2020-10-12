import React from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { flexRowCenter } from "../styled-components/globalStyles"
import { toggleCart } from "../slices/uiSlice"

export default function ({onClick, children}) {
  return (
    <ShadowDiv onClick={onClick}>
      <CloseDiv>&times;</CloseDiv>
      {children}
    </ShadowDiv>
  )
}

const ShadowDiv = styled.div`
  ${flexRowCenter};
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0,0,0,0.8);
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
