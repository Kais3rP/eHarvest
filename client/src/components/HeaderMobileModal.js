import React from "react"
import {
  flexRowCenter,
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowStart,
} from "../styled-components/globalStyles"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {} from "../slices/uiSlice"
import { useDispatch } from "react-redux"

export default function ({ position }) {
  const dispatch = useDispatch()
  return (
    <Modal>
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
  width: 90%;
  padding: 20px;
  background: white;
  transition: top 0.4s ease-in;
  box-shadow: 1px 1px 10px 2px grey;
  z-index: 3;
`
const ModalWrapper = styled.div`
  ${flexRowSpace};
  width: 100%;
`
