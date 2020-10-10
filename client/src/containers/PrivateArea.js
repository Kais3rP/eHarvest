import React, { useEffect } from "react"
import Loader from "react-loader-spinner"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import {
  ContainerDiv,
  flexColCenter,
  flexRowCenter,
  flexRowSpace,
  textSecondaryFont,
} from "../styled-components/globalStyles"
import { fetchPersonalProducts, fetchPersonalData } from "../slices/userSlice"
import PicThumbnail from "./PicThumbnail"
import UserInfo from "./UserInfo"
import UserPicture from "./UserPicture"
import UserDescription from "./UserDescription"

export default function () {
  const personalProducts = useSelector((state) => state.user.personalProducts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPersonalProducts())
    dispatch(fetchPersonalData())
  }, [])

  return personalProducts && personalProducts.length >= 0 ? (
    <MainDiv>
      <LeftWrapperDiv>
        <LeftContainerDiv>
          <UserInfo />
        </LeftContainerDiv>
        <LeftContainerDiv>
          <UserPicture />
        </LeftContainerDiv>
        <LeftContainerDiv>
          <UserDescription />
        </LeftContainerDiv>
        <LeftContainerDiv>
          <strong>Products you bought:</strong>
          {/* Here goes the picthumbnail of productsBought array */}
        </LeftContainerDiv>
      </LeftWrapperDiv>
      <RightWrapperDiv>
        <RightContainerDiv>
          <strong>Personal Products</strong>
          <PicThumbnailContainer>
            {personalProducts.map((item, i) => (
              <PicThumbnail key={item._id} item={item} idx={i} priv />
            ))}
          </PicThumbnailContainer>
        </RightContainerDiv>
      </RightWrapperDiv>
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
  ${flexRowSpace};
  align-items: flex-start;
  width: 95%;
  margin-top: 300px;
  @media (max-width: 768px) {
    ${flexColCenter};
    justify-content: flex-start;
    margin-top: 10px;
    width: 100%;
  }
`

const LeftWrapperDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const LeftContainerDiv = styled(ContainerDiv)``
const RightWrapperDiv = styled.div`
  ${flexColCenter};
  width: 47%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const RightContainerDiv = styled(ContainerDiv)``
const PicThumbnailContainer = styled.div`
  ${flexRowCenter};
  width: 100%;
  height: 80%;
  flex-wrap: wrap;
`
