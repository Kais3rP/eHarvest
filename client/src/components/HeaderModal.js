import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { closeHeaderModal } from "../slices/uiSlice"
import {
  flexRowCenter,
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowStart,
} from "../styled-components/globalStyles"

export default function ({ position, onMouseLeave }) {
  const dispatch = useDispatch()
  return (
    <Modal onMouseLeave={onMouseLeave} style={{ top: position }}>
      <ModalWrapper>
        <strong>
          <Link to="/howitworks">How it works</Link>
        </strong>
        <strong>
          <Link to="/feedbacks">Our Feedbacks</Link>
        </strong>
        <strong>
          <Link to="/sell">Sell your harvest</Link>
        </strong>
        <strong>
          <Link to="/faq">FAQ</Link>
        </strong>
      </ModalWrapper>
    </Modal>
  )
}

const Modal = styled.div`
  ${flexRowCenter};
  margin-top: 100px;
  position: fixed;
  width: 105%;
  padding: 20px;
  background: white;
  transition: top 0.4s ease-in;
  box-shadow: 1px 1px 10px 2px grey;
  z-index: 3;
`
const ModalWrapper = styled.div`
  ${flexRowSpace};
  width: 50%;
`
