import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import {
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowCenter,
  PicThumbnailContainerDiv
} from "../styled-components/globalStyles"
import PicThumbnail from "../containers/PicThumbnail.js"
import Window from "./Window"

export default function ({ offersItems }) {
  return (
   <Window title={"Offers"}>
      <PicThumbnailContainerDiv>
        {offersItems.map((item, i) => (
          <PicThumbnail key={i} item={item} idx={i} />
        ))}
      </PicThumbnailContainerDiv>
    </Window>
  )
}

