import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import {
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowCenter,
  TitleDiv,
  ContainerDiv,
  PicThumbnailContainerDiv
} from "../styled-components/globalStyles"
import PicThumbnail from "../containers/PicThumbnail.js"
import Window from "./Window"

export default function ({ mostSold }) {
  return (
  <Window title={"Most Sold"}>
      <PicThumbnailContainerDiv>
        {mostSold.map((item, i) => (
          <PicThumbnail key={i} item={item} idx={i + 100} />
        ))}
      </PicThumbnailContainerDiv>
    </Window>
  )
}

