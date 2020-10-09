import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { FaBars } from "react-icons/fa"
import { IconContext } from "react-icons"
import { toggleHeaderMobile, toggleCart } from "../slices/uiSlice"

export default function () {
  const dispatch = useDispatch()
  const isCartOpen = useSelector((state) => state.ui.isCartOpen)
  return (
    <IconContext.Provider
      value={{
        style: {
          display: "inline",
          color: "grey",
          zIndex: 5,
          position: "fixed",
          left: 0,
        },
      }}
    >
      <FaBars
        size={50}
        onClick={() => {
          if (isCartOpen) dispatch(toggleCart())
          dispatch(toggleHeaderMobile())
        }}
      />
    </IconContext.Provider>
  )
}
