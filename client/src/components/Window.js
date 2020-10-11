import React from "react"
import styled from "styled-components"
import {
    flexColSpace,
    flexColCenter,
    flexRowSpace,
    flexRowCenter,
    TitleDiv,
    ContainerDiv,
    PicThumbnailContainerDiv
  } from "../styled-components/globalStyles"

export default function ({title,children}) {
  return (
    <ContainerDiv>
    <TitleDiv>
        <strong>{title}</strong>
        </TitleDiv>
        {children}
    </ContainerDiv>
  )
}

