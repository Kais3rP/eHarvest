import React from "react"
import styled from "styled-components"
import {
    flexColSpace,
    flexColCenter,
    flexRowSpace,
    flexRowCenter,
  } from "../styled-components/globalStyles"
  import Window from "./Window"
  import ShadowDiv from "./ShadowDiv"

export default function ({pic, onClick}) {
  return (
    <ShadowDiv onClick={onClick}>
    <WindowContainerDiv>
    <Window title={pic.name}>
    <ProductPicImg src={pic.pic}></ProductPicImg>
    </Window>
    </WindowContainerDiv>
    </ShadowDiv>
  )
}

const WindowContainerDiv = styled.div`
${flexColCenter};
width:70%;
`
const ProductPicImg = styled.img`
  width: 48%;
  margin: 5px;
`