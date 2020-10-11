import React, { useEffect } from "react"
import Loader from "react-loader-spinner"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import {
  ContainerDiv,
  flexColCenter,
  flexColSpace,
  flexRowCenter,
  flexRowSpace,
  textSecondaryFont,
} from "../styled-components/globalStyles"
import { fetchPersonalProducts, fetchPersonalData } from "../slices/userSlice"
import PicThumbnail from "./PicThumbnail"
import UserInfo from "./UserInfo"
import UserPicture from "./UserPicture"
import UserDescription from "./UserDescription"
import Window from "../components/Window"

export default function () {
  const personalProducts = useSelector((state) => state.user.personalProducts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPersonalProducts())
    dispatch(fetchPersonalData())
  }, [])

  return personalProducts && personalProducts.length >= 0 ? (
    <MainDiv>
     <Window title={"Private Area"}/>
    <LayoutContainerDiv>
      <LeftWrapperDiv>
        <Window title={"User Info"}>
          <UserInfo />
        </Window>
        <Window title={"Your Picture"}>
          <UserPicture />
        </Window>
        <Window title={"Your Description"}>
          <UserDescription />
        </Window>
        <Window title={"Products you bought:"}>
          {/* Here goes the picthumbnail of productsBought array */}
        </Window>
      </LeftWrapperDiv>
      <RightWrapperDiv>
        <Window title={"Personal Products"}>
          <PicThumbnailContainer>
            {personalProducts.map((item, i) => (
              <PicThumbnail key={item._id} item={item} idx={i} priv />
            ))}
          </PicThumbnailContainer>
        </Window>
      </RightWrapperDiv>
      </LayoutContainerDiv>
    </MainDiv>
  ) : (
    <Loader
      type="TailSpin"
      color="black"
      height={50}
      width={50}
      timeout={6000} // 6 secs
    />
  )
}

const MainDiv = styled.div`
  & > * {
    ${textSecondaryFont};
  }
  ${flexColSpace};
  align-items: flex-start;
  width: 100%;
  margin-top: 230px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`
const LayoutContainerDiv = styled.div`
${flexRowSpace};
  align-items: flex-start;
  width: 98%;
  @media (max-width: 768px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 10px;
    width: 98%;
  }
`

const LeftWrapperDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const RightWrapperDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const PicThumbnailContainer = styled.div`
  ${flexRowCenter};
  width: 100%;
  height: 80%;
  flex-wrap: wrap;
`
